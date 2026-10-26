import { Button } from './Button'

interface EmptyStateProps {
  readonly title: string
  readonly description?: string
  readonly actionLabel?: string
  readonly onAction?: () => void
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <section className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
      <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
      {description && <p className="mt-2 max-w-md text-sm text-slate-600">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="secondary" className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </section>
  )
}
