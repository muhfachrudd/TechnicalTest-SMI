import type { ReactNode } from 'react'

interface PageContainerProps {
  readonly children: ReactNode
  readonly className?: string
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <main className={`mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </main>
  )
}
