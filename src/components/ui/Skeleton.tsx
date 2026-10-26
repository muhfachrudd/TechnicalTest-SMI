interface SkeletonProps {
  readonly className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <span
      className={`block animate-pulse rounded-md bg-slate-200 ${className}`}
      aria-hidden="true"
    />
  )
}
