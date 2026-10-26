import { createContext } from 'react'
import type { AuthUser, LoginPayload } from '../types/auth'

export interface AuthContextValue {
  readonly user: AuthUser | null
  readonly isAuthenticated: boolean
  readonly login: (payload: LoginPayload) => Promise<void>
  readonly logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
