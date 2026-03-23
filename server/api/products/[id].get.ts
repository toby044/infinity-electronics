import type { Product } from "~/types/product";

export default defineCachedEventHandler(
  async (event): Promise<Product> => {
    const { upstreamApiUrl } = useRuntimeConfig();
    const raw = getRouterParam(event, "id");
    const id = Number(raw);

    if (!Number.isInteger(id) || id < 1) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid product id",
      });
    }

    return $fetch<Product>(`${upstreamApiUrl}/products/${id}`);
  },
  {
    maxAge: 60 * 5,
    name: "product-single",
    getKey: (event) => getRouterParam(event, "id") ?? "unknown",
  },
);
