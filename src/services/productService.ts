import { PAGE_SIZE } from '../constants/config'
import type { Category, Product, ProductListResponse } from '../types/product'
import { httpClient } from './httpClient'
import {
  normalizeCategories,
  normalizeProduct,
  normalizeProductList,
} from '../utils/productMapper'

export interface ProductQuery {
  readonly limit?: number
  readonly skip?: number
  readonly sortBy?: 'price' | 'rating'
  readonly order?: 'asc' | 'desc'
}

export async function getProducts(
  query: ProductQuery = {},
  signal?: AbortSignal,
): Promise<ProductListResponse> {
  const response = await httpClient.get('/products', {
    params: { limit: PAGE_SIZE, ...query },
    signal,
  })
  return normalizeProductList(response.data)
}

export async function searchProducts(
  query: string,
  options: ProductQuery = {},
  signal?: AbortSignal,
): Promise<ProductListResponse> {
  const response = await httpClient.get('/products/search', {
    params: { q: query, limit: PAGE_SIZE, ...options },
    signal,
  })
  return normalizeProductList(response.data)
}

export async function getProductsByCategory(
  category: string,
  query: ProductQuery = {},
  signal?: AbortSignal,
): Promise<ProductListResponse> {
  const response = await httpClient.get(`/products/category/${encodeURIComponent(category)}`, {
    params: { limit: PAGE_SIZE, ...query },
    signal,
  })
  return normalizeProductList(response.data)
}

export async function getCategories(signal?: AbortSignal): Promise<Category[]> {
  const response = await httpClient.get('/products/categories', { signal })
  return normalizeCategories(response.data)
}

export async function getProduct(id: number, signal?: AbortSignal): Promise<Product> {
  const response = await httpClient.get(`/products/${id}`, { signal })
  return normalizeProduct(response.data)
}
