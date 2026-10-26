import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useAuth } from '../context/useAuth'
import { getErrorMessage } from '../utils/errorMessage'
import { validateEmail, validatePassword } from '../utils/validators'

interface LoginFormErrors {
  readonly email?: string
  readonly password?: string
}

export function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/products" replace />
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: LoginFormErrors = {
      email: validateEmail(email) ?? undefined,
      password: validatePassword(password) ?? undefined,
    }

    setErrors(nextErrors)
    setSubmitError(null)
    if (nextErrors.email || nextErrors.password) {
      return
    }

    setIsSubmitting(true)
    try {
      await login({ email, password })
      const state = location.state as { from?: { pathname?: string } } | null
      const destination = state?.from?.pathname ?? '/products'
      navigate(destination, { replace: true })
    } catch (error: unknown) {
      setSubmitError(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-6 sm:px-8 sm:py-10">
      <section className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-[0_24px_70px_-30px_rgba(15,23,42,0.35)] lg:min-h-[720px] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative hidden overflow-hidden bg-gray-950 p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[34px] border-gray-500/20" />
          <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full border-[42px] border-gray-700/50" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-700 text-lg font-bold">
                P
              </span>
              <span className="text-sm font-semibold tracking-wide text-gray-200">
                PRODUCT CATALOG
              </span>
            </div>
          </div>

          <div className="relative max-w-sm">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-gray-300">
              Temukan pilihanmu
            </p>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight">
              Semua produk yang kamu cari, di satu tempat.
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-6 text-gray-400">
              Jelajahi katalog produk dengan pengalaman yang cepat dan sederhana.
            </p>
          </div>

          <p className="relative text-xs text-gray-400">Katalog produk pilihan</p>
        </div>

        <div className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16">
          <div className="w-full max-w-md">
            <div className="mb-9 text-center lg:text-left">
              <div className="mb-6 flex items-center justify-center gap-3 lg:hidden">
                <span className="text-sm font-bold tracking-wide text-gray-900">
                  PRODUCT CATALOG
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-700">Selamat datang kembali</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">Masuk ke akun</h1>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                Masuk untuk melanjutkan ke katalog produk.
              </p>
            </div>

            {submitError && (
              <div
                className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
              >
                {submitError}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <Input
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                error={errors.email}
              />
              <Input
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                error={errors.password}
              />
              <Button
                type="submit"
                loading={isSubmitting}
                className="mt-2 w-full !bg-gray-900 py-3 !text-white hover:!bg-gray-800 focus-visible:!ring-gray-500"
              >
                Masuk
              </Button>
            </form>

            <div className="mt-7 border-t border-gray-200 pt-5 text-xs leading-5 text-gray-500">
              <p className="font-semibold text-gray-700">Akun demo :</p>
              <p className="mt-1 break-all">emily.johnson@x.dummyjson.com</p>
              <p>emilyspass</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
