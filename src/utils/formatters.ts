export function formatPrice(price: number): string {
  if (!Number.isFinite(price) || price <= 0) {
    return '-'
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(price)
}

export function formatRating(rating: number | null): string {
  if (rating === null || !Number.isFinite(rating)) {
    return ''
  }

  return rating.toFixed(1)
}
