import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmptyState } from '../components/ui/EmptyState'
import { ErrorState } from '../components/ui/ErrorState'
import { Pagination } from '../components/ui/Pagination'
import { Skeleton } from '../components/ui/Skeleton'
import { Header } from '../components/layout/Header'
import { PageContainer } from '../components/layout/PageContainer'
import { ProductFilters } from '../components/product/ProductFilters'
import { ProductGrid } from '../components/product/ProductGrid'
import { useCategories } from '../hooks/useCategories'
import { useProducts, type ProductListQuery } from '../hooks/useProducts'

const initialSort: ProductListQuery['sort'] = ''

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 8 }, (_, index) => (
        <div key={index} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <Skeleton className="h-52 rounded-none" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-5 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ProductListPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState<ProductListQuery['sort']>(initialSort)
  const { categories } = useCategories()
  const productsState = useProducts({ page, search, category, sort })

  const resetFilters = () => {
    setSearch('')
    setCategory('')
    setSort(initialSort)
    setPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    setPage(1)
  }

  const handleSortChange = (value: ProductListQuery['sort']) => {
    setSort(value)
    setPage(1)
  }

  const isLoading = productsState.status === 'idle' || productsState.status === 'loading'

  return (
    <>
      <Header />
      <PageContainer className="flex min-h-[calc(100vh-73px)] flex-col">
        <div className="relative mb-8 overflow-hidden rounded-2xl bg-gray-950 px-6 py-10 text-white sm:px-10">
          <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border-[30px] border-gray-500/20" />
          <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full border-[36px] border-gray-700/40" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-300">
              Product Catalog
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Product catalog
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400">
              Jelajahi pilihan produk yang tersedia untukmu.
            </p>
          </div>
        </div>

        <div className="grid flex-1 items-start gap-8 lg:min-h-[620px] lg:grid-cols-[230px_minmax(0,1fr)]">
          <ProductFilters
            category={category}
            sort={sort}
            categories={categories}
            onCategoryChange={handleCategoryChange}
            onSortChange={handleSortChange}
          />

          <div>
            <div className="mb-5 flex flex-col gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                {productsState.status === 'success' && productsState.total > 0 ? (
                  <>
                    <span className="font-semibold text-gray-900">{productsState.total}</span> produk
                  </>
                ) : (
                  'Daftar produk'
                )}
              </p>
              <label className="relative block w-full sm:max-w-xs" htmlFor="product-search">
                <span className="sr-only">Cari produk</span>
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="6.5" />
                  <path strokeLinecap="round" d="m16 16 4 4" />
                </svg>
                <input
                  id="product-search"
                  type="search"
                  value={search}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  placeholder="Cari produk..."
                  className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                />
              </label>
            </div>
            {isLoading && <ProductGridSkeleton />}
            {productsState.status === 'error' && productsState.error && (
              <ErrorState message={productsState.error} onRetry={productsState.refetch} />
            )}
            {productsState.status === 'success' && productsState.products.length === 0 && (
              <EmptyState
                title="Produk tidak ditemukan"
                description="Coba ubah kata pencarian atau filter kategori."
                actionLabel="Reset filter"
                onAction={resetFilters}
              />
            )}
            {productsState.status === 'success' && productsState.products.length > 0 && (
              <ProductGrid
                products={productsState.products}
                onProductClick={(product) => navigate(`/products/${product.id}`)}
              />
            )}
          </div>
        </div>

        {productsState.status === 'success' && productsState.total > 0 && (
          <div className="mt-auto pt-8">
            <Pagination
              page={page}
              totalPages={productsState.totalPages}
              onChange={setPage}
            />
          </div>
        )}
      </PageContainer>
    </>
  )
}
