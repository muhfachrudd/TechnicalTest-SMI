export interface ProductReview {
  readonly rating: number
  readonly comment: string
  readonly date: string
  readonly reviewerName: string
  readonly reviewerEmail: string
}

export interface Product {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly category: string
  readonly price: number
  readonly discountPercentage: number
  readonly rating: number | null
  readonly stock: number
  readonly brand: string
  readonly thumbnail: string
  readonly images: readonly string[]
  readonly reviews: readonly ProductReview[]
}

export interface ProductListResponse {
  readonly products: readonly Product[]
  readonly total: number
  readonly skip: number
  readonly limit: number
}

export interface Category {
  readonly slug: string
  readonly name: string
  readonly url: string
}
