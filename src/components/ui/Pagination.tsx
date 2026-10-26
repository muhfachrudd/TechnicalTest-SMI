interface PaginationProps {
  readonly page: number
  readonly totalPages: number
  readonly onChange: (page: number) => void
}

type PageItem = number | 'ellipsis'

function getPageItems(page: number, totalPages: number): PageItem[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (page <= 3) {
    return [1, 2, 3, 'ellipsis', totalPages]
  }

  if (page >= totalPages - 2) {
    return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages]
  }

  return [1, 'ellipsis', page, 'ellipsis', totalPages]
}

export function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  const isFirstPage = page <= 1
  const isLastPage = page >= totalPages
  const pageItems = getPageItems(page, totalPages)

  return (
    <nav
      className="flex items-center justify-center border-t border-gray-200 pt-6"
      aria-label="Navigasi halaman produk"
    >
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Halaman sebelumnya"
          disabled={isFirstPage}
          onClick={() => onChange(page - 1)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-gray-100 text-lg font-semibold text-gray-800 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-300"
        >
          ‹
        </button>
        {pageItems.map((item, index) =>
          item === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-sm text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-current={item === page ? 'page' : undefined}
              onClick={() => onChange(item)}
              className={`flex h-8 min-w-8 cursor-pointer items-center justify-center rounded-md px-2 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 ${
                item === page
                  ? 'bg-gray-900 font-semibold text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item}
            </button>
          ),
        )}
        <button
          type="button"
          aria-label="Halaman berikutnya"
          disabled={isLastPage}
          onClick={() => onChange(page + 1)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-gray-100 text-lg font-semibold text-gray-800 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-300"
        >
          ›
        </button>
      </div>
    </nav>
  )
}
