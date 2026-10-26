import { useCallback, useEffect, useState } from 'react'
import { DEBOUNCE_MS, PAGE_SIZE } from '../constants/config'
import {
  getProducts,
  getProductsByCategory,
  searchProducts,
  type ProductQuery,
} from '../services/productService'
import type { Product } from '../types/product'
import { getErrorMessage } from '../utils/errorMessage'
import { useDebounce } from './useDebounce'

type RequestStatus = 'idle' | 'loading' | 'success' | 'error'
type SortOption = '' | 'price-asc' | 'price-desc' | 'rating-desc'

export interface ProductListQuery {
  readonly page: number
  readonly search: string
  readonly category: string
  readonly sort: SortOption
}

function getSortQuery(sort: SortOption): ProductQuery {
  if (!sort) {
    return {}
  }

  const [sortBy, order] = sort.split('-') as ['price' | 'rating', 'asc' | 'desc']
  return { sortBy, order }
}

export function useProducts({ page, search, category, sort }: ProductListQuery) {
  const debouncedSearch = useDebounce(search.trim(), DEBOUNCE_MS)
  const [products, setProducts] = useState<readonly Product[]>([])
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState<RequestStatus>('loading')
  const [error, setError] = useState<string | null>(null)
  const [retryKey, setRetryKey] = useState(0)

  const refetch = useCallback(() => setRetryKey((current) => current + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    const query = {
      limit: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      ...getSortQuery(sort),
    }

    const request = debouncedSearch
      ? searchProducts(debouncedSearch, query, controller.signal)
      : category
        ? getProductsByCategory(category, query, controller.signal)
        : getProducts(query, controller.signal)

    void Promise.resolve().then(() => {
      if (!controller.signal.aborted) {
        setStatus('loading')
        setError(null)
      }
    })

    void request
      .then((result) => {
        setProducts(result.products)
        setTotal(result.total)
        setStatus('success')
      })
      .catch((requestError: unknown) => {
        if (controller.signal.aborted) {
          return
        }
        setError(getErrorMessage(requestError))
        setStatus('error')
      })

    return () => controller.abort()
  }, [category, debouncedSearch, page, retryKey, sort])

  return {
    products,
    total,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
    status,
    error,
    refetch,
  }
}
