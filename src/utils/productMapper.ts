import type {
  Category,
  Product,
  ProductListResponse,
  ProductReview,
} from '../types/product'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

function asNumber(value: unknown, fallback = 0): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function normalizeReview(raw: unknown): ProductReview {
  const review = isRecord(raw) ? raw : {}
  return {
    rating: asNumber(review.rating),
    comment: asString(review.comment),
    date: asString(review.date),
    reviewerName: asString(review.reviewerName),
    reviewerEmail: asString(review.reviewerEmail),
  }
}

export function normalizeProduct(raw: unknown): Product {
  const product = isRecord(raw) ? raw : {}
  const images = Array.isArray(product.images)
    ? product.images.filter((image): image is string => typeof image === 'string')
    : []
  const reviews = Array.isArray(product.reviews)
    ? product.reviews.map(normalizeReview)
    : []
  const rawRating = product.rating

  return {
    id: asNumber(product.id),
    title: asString(product.title, 'Tanpa judul') || 'Tanpa judul',
    description: asString(product.description),
    category: asString(product.category),
    price: asNumber(product.price),
    discountPercentage: asNumber(product.discountPercentage),
    rating:
      typeof rawRating === 'number' && Number.isFinite(rawRating)
        ? rawRating
        : null,
    stock: asNumber(product.stock),
    brand: asString(product.brand),
    thumbnail: asString(product.thumbnail),
    images,
    reviews,
  }
}

export function normalizeProductList(raw: unknown): ProductListResponse {
  if (!isRecord(raw) || !Array.isArray(raw.products)) {
    throw new Error('Format data tidak valid')
  }

  return {
    products: raw.products.map(normalizeProduct),
    total: asNumber(raw.total),
    skip: asNumber(raw.skip),
    limit: asNumber(raw.limit),
  }
}

export function normalizeCategories(raw: unknown): Category[] {
  if (!Array.isArray(raw)) {
    throw new Error('Format kategori tidak valid')
  }

  return raw.flatMap((item): Category[] => {
    if (typeof item === 'string') {
      return [{ slug: item, name: item, url: '' }]
    }

    if (!isRecord(item) || typeof item.slug !== 'string') {
      return []
    }

    return [{
      slug: item.slug,
      name: asString(item.name, item.slug),
      url: asString(item.url),
    }]
  })
}
