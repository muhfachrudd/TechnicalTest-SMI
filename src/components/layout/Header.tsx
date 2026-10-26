import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { Button } from '../ui/Button'

function getUserInitials(firstName: string, lastName: string, username: string): string {
  const names = `${firstName} ${lastName}`.trim().split(/\s+/).filter(Boolean)
  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase()
  }

  return (names[0]?.[0] ?? username[0] ?? 'U').toUpperCase()
}

export function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const settingsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isSettingsOpen) {
      return
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isSettingsOpen])
  const displayName = user
    ? `${user.firstName} ${user.lastName}`.trim() || user.username
    : 'Pengguna'
  const initials = user
    ? getUserInitials(user.firstName, user.lastName, user.username)
    : 'U'

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="cursor-pointer text-lg font-bold tracking-tight text-gray-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
        >
          Product Catalog
        </button>
        <div ref={settingsRef} className="relative">
          <button
            type="button"
            aria-expanded={isSettingsOpen}
            aria-haspopup="menu"
            onClick={() => setIsSettingsOpen((isOpen) => !isOpen)}
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065Z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <span className="hidden sm:inline">Settings</span>
          </button>

          {isSettingsOpen && (
            <div
              className="absolute right-0 z-10 mt-3 w-64 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg"
              role="menu"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 px-2 pb-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
                  {initials}
                </span>
                <div className="min-w-0 leading-tight">
                  <p className="truncate text-sm font-semibold text-gray-900">{displayName}</p>
                  <p className="mt-1 text-xs text-gray-500">Akun pengguna</p>
                </div>
              </div>
              <Button
                variant="secondary"
                onClick={handleLogout}
                className="mt-3 w-full !border-gray-900 !bg-gray-900 !text-white hover:!bg-gray-800 focus-visible:!ring-gray-500"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
