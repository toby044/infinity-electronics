<template>
  <main class="c-story">
    <NuxtLink to="/stories" class="c-story__back">← Stories</NuxtLink>
    <h1 class="c-story__title">FrontPageHero</h1>
    <p class="c-story__description">
      Full-viewport hero with a looping Swiper carousel. Scroll-driven
      <code>border-radius</code> reveals the section below as the user scrolls
      down. Navigation arrows allow manual slide control. Images and copy are
      hardcoded in the component (editorial content, not data-driven).
    </p>

    <section class="c-story__section">
      <h2 class="c-story__section-title">Live preview</h2>
      <p class="c-story__section-description">
        Scroll down within this page to see the border-radius animation. Click
        the arrows to cycle slides.
      </p>
    </section>
  </main>

  <FrontPageHero />
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
