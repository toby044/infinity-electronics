<template>
  <main class="c-stories-index">
    <h1 class="c-stories-index__title">Component Stories</h1>
    <nav class="c-stories-index__nav">
      <NuxtLink to="/stories/base-button" class="c-stories-index__link">BaseButton</NuxtLink>
      <NuxtLink to="/stories/product-card" class="c-stories-index__link">ProductCard</NuxtLink>
      <NuxtLink to="/stories/front-page-hero" class="c-stories-index__link">FrontPageHero</NuxtLink>
      <NuxtLink to="/stories/featured-products" class="c-stories-index__link">FeaturedProducts</NuxtLink>
    </nav>
  </main>
</template>

<style lang="postcss" scoped>
.c-stories-index {
  @apply max-w-5xl mx-auto px-6 py-16 grow w-full;

  .c-stories-index__title {
    @apply text-3xl font-bold text-gray-900 mb-8;
  }

  .c-stories-index__nav {
    @apply flex flex-col gap-2;
  }

  .c-stories-index__link {
    @apply text-base font-medium text-indigo-600 hover:text-indigo-800 underline underline-offset-2;
  }
}
</style>
