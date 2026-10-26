interface SpinnerProps {
  readonly size?: 'sm' | 'md' | 'lg'
  readonly label?: string
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-4',
  lg: 'h-12 w-12 border-4',
} as const

export function Spinner({ size = 'md', label = 'Memuat' }: SpinnerProps) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-current border-t-transparent ${sizeClasses[size]}`}
      role="status"
      aria-label={label}
    />
  )
}
