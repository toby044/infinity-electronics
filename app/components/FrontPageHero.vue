<script setup lang="ts">
const { y } = useWindowScroll();

const borderAmount = 60;
const borderRadius = computed(() => {
  if (!import.meta.client) return "0px";
  const progress = Math.min(y.value / (window.innerHeight * 0.5), 1);
  return `${progress * borderAmount}px`;
});

const containerRef = ref(null);
const swiper = useSwiper(containerRef, {
  loop: true,
  slidesPerView: 1,
});

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Coffee bag",
    title: "new<br />coffee<br />blend",
    sub: "freshly roasted, available now",
  },
  {
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Polaroid camera",
    title: "polaroid<br />one step<br />camera",
    sub: "capture the moment instantly",
  },
  {
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=2334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Computer mouse",
    title: "precision<br />computer<br />mouse",
    sub: "engineered for performance",
  },
];
</script>
<template>
  <section class="c-front-page-hero" :style="{ borderRadius }">
    <ClientOnly>
      <swiper-container
        ref="containerRef"
        :init="false"
        class="c-front-page-hero__swiper"
      >
        <swiper-slide v-for="(slide, i) in slides" :key="slide.title">
          <div class="c-front-page-hero__slide">
            <NuxtImg
              :src="slide.image"
              :alt="slide.alt"
              class="c-front-page-hero__image"
              :loading="i === 0 ? 'eager' : 'lazy'"
              :fetchpriority="i === 0 ? 'high' : 'auto'"
              width="2340"
              height="1560"
            />
            <div class="c-front-page-hero__content">
              <h1 class="c-front-page-hero__title" v-html="slide.title" />
              <p class="c-front-page-hero__sub">{{ slide.sub }}</p>
              <NuxtLink to="/products">
                <BaseButton>shop</BaseButton>
              </NuxtLink>
            </div>
          </div>
        </swiper-slide>
      </swiper-container>
    </ClientOnly>

    <!-- Custom navigation arrows -->
    <div class="c-front-page-hero__arrows">
      <button
        class="c-front-page-hero__arrow"
        aria-label="Previous slide"
        @click="swiper.prev()"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 4l-6 6 6 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button
        class="c-front-page-hero__arrow"
        aria-label="Next slide"
        @click="swiper.next()"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M8 4l6 6-6 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.c-front-page-hero {
  @apply relative w-full overflow-hidden;
  height: calc(100dvh - var(--dynamic-site-header-height, 64px));

  .c-front-page-hero__swiper {
    @apply w-full h-full;
  }

  .c-front-page-hero__slide {
    @apply relative w-full h-full;
  }

  .c-front-page-hero__image {
    @apply absolute inset-0 w-full h-full object-cover;
  }

  .c-front-page-hero__content {
    @apply absolute flex flex-col items-start gap-8 z-10 bottom-6 left-5 md:(bottom-16 left-12);
  }

  .c-front-page-hero__title {
    @apply text-6xl sm:text-8xl font-black text-white;
    line-height: 0.92;
  }

  .c-front-page-hero__sub {
    @apply text-base font-semibold text-white tracking-wide;
  }

.c-front-page-hero__arrows {
    @apply absolute bottom-6 right-5 flex gap-2 z-10 md:(bottom-16 right-12);
  }

  .c-front-page-hero__arrow {
    @apply w-11 h-11 rounded-full bg-white text-gray-900 flex items-center justify-center
           hover:bg-gray-100 transition-colors duration-150 cursor-pointer;
  }
}
</style>
