<script setup lang="ts">
/**
 * ProductCard — stories
 *
 * Props: product (Product) | loading (boolean)
 * States: default | loading skeleton | no prop (renders nothing)
 */

import type { Product } from "~/types/product";

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Wireless Noise-Cancelling Headphones",
    price: 149.99,
    description: "Premium over-ear headphones with active noise cancellation.",
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: { rate: 4.5, count: 312 },
  },
  {
    id: 2,
    title: "Men's Slim-Fit Chino Trousers",
    price: 49.95,
    description: "Comfortable slim-fit chinos in a neutral beige.",
    category: "men's clothing",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: { rate: 3.8, count: 120 },
  },
  {
    id: 3,
    title: "Diamond Stud Earrings",
    price: 199.0,
    description: "Classic round-cut diamond studs in 14k white gold.",
    category: "jewelery",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: { rate: 4.9, count: 78 },
  },
];
</script>

<template>
  <main class="c-story">
    <NuxtLink to="/stories" class="c-story__back">← Stories</NuxtLink>
    <h1 class="c-story__title">ProductCard</h1>
    <p class="c-story__description">
      Renders a product as a card linking to its detail page. Pass
      <code>loading</code>
      to show the skeleton placeholder while data is fetching. When neither
      <code>product</code> nor <code>loading</code> is set the card renders
      nothing.
    </p>

    <!-- Loaded state -->
    <section class="c-story__section">
      <h2 class="c-story__section-title">Loaded</h2>
      <p class="c-story__section-description">
        Three products across different categories.
      </p>
      <div class="c-story__grid">
        <ProductCard v-for="p in mockProducts" :key="p.id" :product="p" />
      </div>
    </section>

    <!-- Loading skeleton -->
    <section class="c-story__section">
      <h2 class="c-story__section-title">Loading skeleton</h2>
      <p class="c-story__section-description">
        Shown while the API response is pending.
      </p>
      <div class="c-story__grid">
        <ProductCard v-for="n in 3" :key="n" loading />
      </div>
    </section>
  </main>
</template>

<style lang="postcss" scoped>
.c-story {
  @apply max-w-5xl mx-auto px-6 py-16;

  .c-story__back {
    @apply text-sm text-gray-500 hover:text-gray-900 mb-6 inline-block;
  }

  .c-story__title {
    @apply text-3xl font-bold text-gray-900 mb-2;
  }

  .c-story__description {
    @apply text-sm text-gray-600 mb-10 leading-relaxed;
  }

  .c-story__section {
    @apply mb-12;
  }

  .c-story__section-title {
    @apply text-lg font-semibold text-gray-800 mb-1;
  }

  .c-story__section-description {
    @apply text-xs text-gray-500 mb-4;
  }

  .c-story__grid {
    @apply grid grid-cols-1 gap-5 sm:grid-cols-3;
  }
}
</style>
