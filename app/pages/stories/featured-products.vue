<template>
  <main class="c-story">
    <NuxtLink to="/stories" class="c-story__back">← Stories</NuxtLink>
    <h1 class="c-story__title">FeaturedProducts</h1>
    <p class="c-story__description">
      Displays a configurable number of featured products fetched from
      <code>/api/products/featured</code>. Shows a skeleton grid while loading
      and an error state if the request fails. The "View All Products" link uses
      <code>BaseButton</code>.
    </p>

    <section class="c-story__section">
      <h2 class="c-story__section-title">Live preview (5 products)</h2>
      <p class="c-story__section-description">
        Data is fetched live. Skeleton appears briefly on first load.
      </p>
    </section>
  </main>

  <FeaturedProducts />
</template>

<style lang="postcss" scoped>
.c-story {
  @apply max-w-3xl mx-auto px-6 py-16;

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
    @apply mb-10;
  }

  .c-story__section-title {
    @apply text-lg font-semibold text-gray-800 mb-1;
  }

  .c-story__section-description {
    @apply text-xs text-gray-500 mb-4;
  }
}
</style>
