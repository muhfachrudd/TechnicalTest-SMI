import { useCallback, useEffect, useState } from 'react'
import { getCategories } from '../services/productService'
import type { Category } from '../types/product'
import { getErrorMessage } from '../utils/errorMessage'

type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [status, setStatus] = useState<RequestStatus>('loading')
  const [error, setError] = useState<string | null>(null)
  const [retryKey, setRetryKey] = useState(0)

  const refetch = useCallback(() => setRetryKey((current) => current + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    Promise.resolve().then(() => {
      if (!controller.signal.aborted) {
        setStatus('loading')
        setError(null)
      }
    })

    void getCategories(controller.signal)
      .then((result) => {
        setCategories(result)
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
  }, [retryKey])

  return { categories, status, error, refetch }
}
