import { Button } from './Button'

interface ErrorStateProps {
  readonly message: string
  readonly onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <section
      className="flex flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50 px-6 py-10 text-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold text-red-800">Terjadi kesalahan</h2>
      <p className="mt-2 max-w-md text-sm text-red-700">{message}</p>
      <Button variant="secondary" className="mt-5" onClick={onRetry}>
        Coba lagi
      </Button>
    </section>
  )
}
