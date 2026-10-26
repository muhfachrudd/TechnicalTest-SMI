import type { ChangeEvent, ReactNode } from 'react'
import type { Category } from '../../types/product'
import type { ProductListQuery } from '../../hooks/useProducts'

interface ProductFiltersProps {
  readonly category: string
  readonly sort: ProductListQuery['sort']
  readonly categories: readonly Category[]
  readonly onCategoryChange: (value: string) => void
  readonly onSortChange: (value: ProductListQuery['sort']) => void
  /** Opsional: kalau diisi, tombol "Reset" akan muncul saat ada filter aktif */
  readonly onReset?: () => void
}

const sortLabels: Record<string, string> = {
  'price-asc': 'Harga terendah',
  'price-desc': 'Harga tertinggi',
  'rating-desc': 'Rating tertinggi',
}

const selectClass =
  'w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50/60 py-2.5 pl-3.5 pr-10 text-sm text-gray-800 outline-none transition hover:border-gray-300 hover:bg-white focus:border-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-900/5'

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  )
}

function Field({
  id,
  label,
  icon,
  children,
}: {
  readonly id: string
  readonly label: string
  readonly icon: ReactNode
  readonly children: ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500"
      >
        <span className="text-gray-400">{icon}</span>
        {label}
      </label>
      <div className="relative">{children}</div>
    </div>
  )
}

export function ProductFilters({
  category,
  sort,
  categories,
  onCategoryChange,
  onSortChange,
  onReset,
}: ProductFiltersProps) {
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ProductListQuery['sort'])
  }

  const activeCategory = categories.find((item) => item.slug === category)
  const activeSortLabel = sort ? sortLabels[sort] : ''
  const hasActiveFilter = Boolean(category || sort)

  return (
    <aside className="self-start rounded-2xl border border-gray-200 bg-white p-5 lg:sticky lg:top-24">
      <div className="mb-5 flex items-start justify-between gap-3 border-b border-gray-100 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
            Filter katalog
          </p>
          <h2 className="mt-2 text-lg font-semibold text-gray-950">Sesuaikan pilihan</h2>
        </div>
        {onReset && hasActiveFilter && (
          <button
            type="button"
            onClick={onReset}
            className="cursor-pointer rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          >
            Reset
          </button>
        )}
      </div>

      <div className="space-y-5">
        <Field
          id="product-category"
          label="Kategori"
          icon={
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          }
        >
          <select
            id="product-category"
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className={selectClass}
          >
            <option value="">Semua kategori</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
          <Chevron />
        </Field>

        <Field
          id="product-sort"
          label="Urutkan"
          icon={
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 12h10M10 18h4" />
            </svg>
          }
        >
          <select id="product-sort" value={sort} onChange={handleSortChange} className={selectClass}>
            <option value="">Urutan default</option>
            <option value="price-asc">Harga terendah</option>
            <option value="price-desc">Harga tertinggi</option>
            <option value="rating-desc">Rating tertinggi</option>
          </select>
          <Chevron />
        </Field>
      </div>

      {hasActiveFilter && (
        <div className="mt-5 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
          {activeCategory && (
            <button
              type="button"
              onClick={() => onCategoryChange('')}
              className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-900 py-1 pl-3 pr-2 text-xs font-medium text-white transition hover:bg-gray-700"
              aria-label={`Hapus filter kategori ${activeCategory.name}`}
            >
              {activeCategory.name}
              <span className="text-gray-400 group-hover:text-white">✕</span>
            </button>
          )}
          {activeSortLabel && (
            <button
              type="button"
              onClick={() => onSortChange('' as ProductListQuery['sort'])}
              className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 py-1 pl-3 pr-2 text-xs font-medium text-gray-700 transition hover:bg-gray-200"
              aria-label={`Hapus urutan ${activeSortLabel}`}
            >
              {activeSortLabel}
              <span className="text-gray-400 group-hover:text-gray-700">✕</span>
            </button>
          )}
        </div>
      )}
    </aside>
  )
}