import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Spinner } from './Spinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: 'primary' | 'secondary'
  readonly loading?: boolean
  readonly children: ReactNode
}

export function Button({
  variant = 'primary',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const variantClass =
    variant === 'primary'
      ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500'
      : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-400'

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variantClass} ${className}`}
    >
      {loading && <Spinner size="sm" label="Memproses" />}
      {loading ? 'Memproses...' : children}
    </button>
  )
}
