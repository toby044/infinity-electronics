<script setup lang="ts">
const { products, status, error } = useFeaturedProducts(5);

const skeletonKeys = Array.from({ length: 5 }, (_, i) => i);
</script>

<template>
  <section class="c-featured-products">
    <div class="c-featured-products__container">
      <header class="c-featured-products__header">
        <div>
          <h2 class="c-featured-products__heading">Featured Products</h2>
          <p class="c-featured-products__sub">
            A selection of our most popular items across every category.
          </p>
        </div>
        <NuxtLink to="/products">
          <BaseButton>View All Products →</BaseButton>
        </NuxtLink>
      </header>

      <div
        v-if="status === 'error'"
        class="c-featured-products__error"
        role="alert"
      >
        <p>Could not load featured products.</p>
        <p class="c-featured-products__error-detail">{{ error?.message }}</p>
      </div>

      <div v-else class="c-featured-products__grid">
        <template v-if="status === 'pending'">
          <ProductCard v-for="key in skeletonKeys" :key="key" loading />
        </template>
        <template v-else>
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </template>
      </div>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.c-featured-products {
  @apply py-20;

  .c-featured-products__container {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  .c-featured-products__header {
    @apply mb-8 flex flex-col sm:(justify-between flex-row items-end) gap-2;
  }

  .c-featured-products__heading {
    @apply text-3xl font-bold text-gray-900 sm:text-4xl;
  }

  .c-featured-products__sub {
    @apply text-sm text-gray-600 mt-2 max-w-md;
  }

  .c-featured-products__grid {
    @apply grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5;
  }

  .c-featured-products__error {
    @apply rounded-2xl bg-red-50 border border-red-200 p-10 text-center text-red-600 text-sm;

    .c-featured-products__error-detail {
      @apply text-red-400 mt-1;
    }
  }
}
</style>
