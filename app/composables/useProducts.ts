import type { Product } from '~/types/product'

export function useProducts() {
  const { data: products, status, error, refresh } = useFetch<Product[]>(
    '/api/products',
    { key: 'products-all' },
  )

  return { products, status, error, refresh }
}

export function useFeaturedProducts(limit = 4) {
  const { data: products, status, error } = useFetch<Product[]>(
    '/api/products/featured',
    { key: `products-featured-${limit}`, query: { limit } },
  )

  return { products, status, error }
}

export function useProduct(id: MaybeRefOrGetter<number | string>) {
  const { data: product, status, error, refresh } = useFetch<Product>(
    () => `/api/products/${toValue(id)}`,
    { key: () => `product-${toValue(id)}` },
  )

  return { product, status, error, refresh }
}
