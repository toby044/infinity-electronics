<script setup lang="ts">
useSeoMeta({
  title: 'InfinityElectronics — Premium Electronics for Every Lifestyle',
  description: 'Discover top-rated electronics and accessories, curated for quality and performance.',
  ogTitle: 'InfinityElectronics',
  ogDescription: 'Premium electronics for every lifestyle.',
})
</script>

<template>
  <main class="c-home-page">
    <FrontPageHero />
    <FeaturedProducts />
  </main>
</template>

<style lang="postcss" scoped>
.c-home-page {
  @apply flex flex-col;
}
</style>
