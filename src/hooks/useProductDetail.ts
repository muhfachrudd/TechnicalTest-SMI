import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { getProduct } from '../services/productService'
import type { Product } from '../types/product'
import { getErrorMessage } from '../utils/errorMessage'

type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

export function useProductDetail(id: number | null) {
  const [product, setProduct] = useState<Product | null>(null)
  const [status, setStatus] = useState<RequestStatus>(id ? 'loading' : 'success')
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(id === null)
  const [retryKey, setRetryKey] = useState(0)

  const refetch = useCallback(() => setRetryKey((current) => current + 1), [])

  useEffect(() => {
    if (id === null) {
      return
    }

    const controller = new AbortController()
    void getProduct(id, controller.signal)
      .then((result) => {
        setProduct(result)
        setNotFound(false)
        setStatus('success')
      })
      .catch((requestError: unknown) => {
        if (controller.signal.aborted) {
          return
        }
        if (axios.isAxiosError(requestError) && requestError.response?.status === 404) {
          setNotFound(true)
          setStatus('success')
          return
        }
        setError(getErrorMessage(requestError))
        setStatus('error')
      })

    return () => controller.abort()
  }, [id, retryKey])

  return { product, status, error, notFound, refetch }
}
