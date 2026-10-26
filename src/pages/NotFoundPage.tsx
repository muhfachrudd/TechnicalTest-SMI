import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <section className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">404</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Halaman tidak ditemukan</h1>
        <p className="mt-3 text-slate-600">Halaman yang Anda cari tidak tersedia.</p>
        <Link
          to="/products"
          className="mt-6 inline-flex cursor-pointer rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          Kembali ke produk
        </Link>
      </section>
    </main>
  )
}
