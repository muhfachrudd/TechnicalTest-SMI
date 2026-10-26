const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(email: string): string | null {
  if (!email.trim()) {
    return 'Email wajib diisi.'
  }

  if (!EMAIL_PATTERN.test(email.trim())) {
    return 'Format email tidak valid.'
  }

  return null
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return 'Password wajib diisi.'
  }

  if (password.length < 6) {
    return 'Password minimal 6 karakter.'
  }

  return null
}
