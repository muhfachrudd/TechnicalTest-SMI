import type { AuthUser, LoginPayload } from '../types/auth'
import { httpClient } from './httpClient'

interface UserLookupResponse {
  users?: Array<{
    id?: number
    username?: string
    email?: string
    firstName?: string
    lastName?: string
    image?: string
  }>
}

interface LoginResponse {
  id?: number
  username?: string
  email?: string
  firstName?: string
  lastName?: string
  image?: string
  accessToken?: string
  token?: string
}

export async function login(payload: LoginPayload): Promise<AuthUser> {
  const lookup = await httpClient.get<UserLookupResponse>('/users/filter', {
    params: { key: 'email', value: payload.email.trim() },
  })
  const matchedUser = lookup.data.users?.[0]

  if (!matchedUser?.username) {
    throw new Error('Email atau password salah')
  }

  const response = await httpClient.post<LoginResponse>('/auth/login', {
    username: matchedUser.username,
    password: payload.password,
  })
  const data = response.data
  const accessToken = data.accessToken ?? data.token

  if (
    typeof data.id !== 'number' ||
    typeof data.username !== 'string' ||
    typeof data.email !== 'string' ||
    typeof accessToken !== 'string'
  ) {
    throw new Error('Respons login tidak valid')
  }

  return {
    id: data.id,
    username: data.username,
    email: data.email,
    firstName: data.firstName ?? '',
    lastName: data.lastName ?? '',
    image: data.image ?? '',
    accessToken,
  }
}
