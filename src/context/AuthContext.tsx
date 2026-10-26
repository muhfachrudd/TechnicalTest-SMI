import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { STORAGE_KEY } from '../constants/config'
import type { AuthUser, LoginPayload } from '../types/auth'
import * as authService from '../services/authService'
import { AuthContext } from './authContextStore'

function readStoredUser(): AuthUser | null {
  const storedValue = localStorage.getItem(STORAGE_KEY)
  if (!storedValue) {
    return null
  }

  try {
    const parsed: unknown = JSON.parse(storedValue)
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'id' in parsed &&
      'email' in parsed &&
      'accessToken' in parsed
    ) {
      return parsed as AuthUser
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY)
  }

  return null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser)

  const login = useCallback(async (payload: LoginPayload) => {
    const authenticatedUser = await authService.login(payload)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser))
    setUser(authenticatedUser)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      login,
      logout,
    }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
