import type { Product } from '../../types/product'
import { formatPrice, formatRating } from '../../utils/formatters'

const placeholderImage = '/product-placeholder.svg'

interface ProductCardProps {
  readonly product: Product
  readonly onClick: (product: Product) => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const rating = formatRating(product.rating)

  return (
    <button
      type="button"
      onClick={() => onClick(product)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white text-left transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
    >
      <img
        src={product.thumbnail || placeholderImage}
        alt={product.title}
        onError={(event) => {
          event.currentTarget.src = placeholderImage
        }}
        className="h-52 w-full bg-gray-100 object-contain p-4 transition group-hover:scale-[1.02]"
      />
      <div className="space-y-3 p-5">
        <p className="inline-flex rounded-full bg-gray-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
          {product.category || 'Tanpa kategori'}
        </p>
        <h2 className="line-clamp-2 min-h-12 font-semibold leading-6 text-gray-900">
          {product.title}
        </h2>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-950">{formatPrice(product.price)}</span>
          {rating && <span className="text-sm font-medium text-amber-500">★ {rating}</span>}
        </div>
      </div>
    </button>
  )
}
