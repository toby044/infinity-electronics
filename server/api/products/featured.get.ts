import type { Product } from "~/types/product";

const { upstreamApiUrl } = useRuntimeConfig();

export default defineCachedEventHandler(
  async (event): Promise<Product[]> => {
    const query = getQuery(event);
    const raw = Number(query.limit ?? 4);
    const limit = Number.isFinite(raw)
      ? Math.min(Math.max(1, Math.floor(raw)), 20)
      : 4;

    return $fetch<Product[]>(`${upstreamApiUrl}/products`, {
      query: { limit },
    });
  },
  {
    maxAge: 60 * 5,
    name: "products-featured",
    getKey: (event) => {
      const raw = Number(getQuery(event).limit ?? 4);
      const limit = Number.isFinite(raw)
        ? Math.min(Math.max(1, Math.floor(raw)), 20)
        : 4;
      return `limit-${limit}`;
    },
  },
);
