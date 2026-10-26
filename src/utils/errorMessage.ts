import axios from 'axios'

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
    }

    const responseMessage = error.response.data as { message?: unknown } | undefined
    if (typeof responseMessage?.message === 'string') {
      return responseMessage.message
    }
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return 'Terjadi kesalahan. Silakan coba lagi.'
}
