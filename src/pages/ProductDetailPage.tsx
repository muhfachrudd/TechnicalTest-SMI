import { Link, useParams } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { PageContainer } from '../components/layout/PageContainer'
import { ImageGallery } from '../components/product/ImageGallery'
import { ErrorState } from '../components/ui/ErrorState'
import { Skeleton } from '../components/ui/Skeleton'
import { useProductDetail } from '../hooks/useProductDetail'
import { formatPrice, formatRating } from '../utils/formatters'

function ProductDetailSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <Skeleton className="aspect-square" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-4/5" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-12 w-1/2" />
      </div>
    </div>
  )
}

export function ProductDetailPage() {
  const { id: idParam } = useParams()
  const parsedId = Number(idParam)
  const productId = Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null
  const { product, status, error, notFound, refetch } = useProductDetail(productId)

  if (status === 'loading' || status === 'idle') {
    return (
      <>
        <Header />
        <PageContainer className="min-h-[calc(100vh-73px)]">
          <ProductDetailSkeleton />
        </PageContainer>
      </>
    )
  }

  if (notFound || productId === null) {
    return (
      <>
        <Header />
        <PageContainer>
          <section className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-14 text-center">
            <h1 className="text-xl font-semibold text-gray-950">Produk tidak ditemukan</h1>
            <p className="mt-2 text-sm text-gray-600">
              ID produk yang diminta tidak valid atau tidak tersedia.
            </p>
            <Link
              to="/products"
              className="mt-5 inline-flex cursor-pointer rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Kembali ke produk
            </Link>
          </section>
        </PageContainer>
      </>
    )
  }

  if (status === 'error' && error) {
    return (
      <>
        <Header />
        <PageContainer>
          <ErrorState message={error} onRetry={refetch} />
        </PageContainer>
      </>
    )
  }

  if (!product) {
    return null
  }

  const rating = formatRating(product.rating)

  return (
    <>
      <Header />
      <PageContainer>
        <div className="mb-7 flex items-center justify-between gap-4">
          <Link
            to="/products"
            className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-950"
          >
            <span aria-hidden="true">&lt;</span>
            Kembali ke produk
          </Link>
          <span className="hidden text-xs font-medium uppercase tracking-[0.16em] text-gray-400 sm:inline">
            Detail produk
          </span>
        </div>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <ImageGallery product={product} />
          <article className="lg:pt-2">
            <p className="inline-flex rounded-full bg-gray-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
              {product.category || 'Tanpa kategori'}
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-gray-950 sm:text-4xl">
              {product.title}
            </h1>
            {product.brand && <p className="mt-3 text-sm text-gray-500">Brand: {product.brand}</p>}
            <div className="mt-6 flex flex-wrap items-center gap-3 border-b border-gray-200 pb-6">
              <span className="text-3xl font-bold text-gray-950">{formatPrice(product.price)}</span>
              {product.discountPercentage > 0 && (
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                  Diskon {product.discountPercentage}%
                </span>
              )}
              {rating && <span className="text-sm font-medium text-amber-500">★ {rating}</span>}
            </div>
            <div className="mt-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">Deskripsi</h2>
              <p className="mt-3 leading-7 text-gray-600">
                {product.description || 'Tidak ada deskripsi.'}
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-gray-200 pt-5">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Stok tersedia</p>
                <p className="mt-1 text-lg font-semibold text-gray-950">{product.stock}</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Rating</p>
                <p className="mt-1 text-lg font-semibold text-gray-950">{rating || '-'}</p>
              </div>
            </div>
          </article>
        </div>

        {product.reviews.length > 0 && (
          <section className="mt-14 border-t border-gray-200 pt-9">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                  Customer feedback
                </p>
                <h2 className="mt-2 text-2xl font-bold text-gray-950">Ulasan pembeli</h2>
              </div>
              <span className="text-sm text-gray-500">{product.reviews.length} ulasan</span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {product.reviews.map((review, index) => (
                <article key={`${review.reviewerEmail}-${index}`} className="rounded-2xl border border-gray-200 bg-white p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-gray-950">{review.reviewerName || 'Anonim'}</h3>
                    <span className="text-sm font-medium text-amber-500">★ {review.rating}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{review.comment}</p>
                  {review.date && <p className="mt-4 text-xs text-gray-400">{review.date}</p>}
                </article>
              ))}
            </div>
          </section>
        )}
      </PageContainer>
    </>
  )
}
