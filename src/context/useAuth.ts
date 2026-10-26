import { useContext } from 'react'
import { AuthContext } from './authContextStore'
import type { AuthContextValue } from './authContextStore'

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider')
  }

  return context
}
