export interface AuthUser {
  readonly id: number
  readonly username: string
  readonly email: string
  readonly firstName: string
  readonly lastName: string
  readonly image: string
  readonly accessToken: string
}

export interface LoginPayload {
  readonly email: string
  readonly password: string
}
