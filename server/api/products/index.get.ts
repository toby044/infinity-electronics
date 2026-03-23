import type { Product } from "~/types/product";

export default defineCachedEventHandler(
  async (): Promise<Product[]> => {
    const { upstreamApiUrl } = useRuntimeConfig();
    return $fetch<Product[]>(`${upstreamApiUrl}/products`);
  },
  {
    maxAge: 60 * 5, // 5 minutes
    name: "products-all",
    getKey: () => "all",
  },
);
