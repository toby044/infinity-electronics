import type { Product } from "~/types/product";

const { upstreamApiUrl } = useRuntimeConfig();

export default defineCachedEventHandler(
  async (): Promise<Product[]> => {
    return $fetch<Product[]>(`${upstreamApiUrl}/products`);
  },
  {
    maxAge: 60 * 5, // 5 minutes
    name: "products-all",
    getKey: () => "all",
  },
);
