<script setup lang="ts">
import type { Product } from "~/types/product";

interface Props {
  product?: Product;
  loading?: boolean;
}

withDefaults(defineProps<Props>(), {
  loading: false,
});
</script>

<template>
  <article
    class="c-product-card"
    :class="{ 'c-product-card--skeleton': loading }"
  >
    <template v-if="loading">
      <div class="c-product-card__image-wrapper">
        <div class="c-product-card__image-bone" />
      </div>
      <div class="c-product-card__body">
        <div class="c-product-card__bone c-product-card__bone--sm" />
        <div class="c-product-card__bone" />
        <div class="c-product-card__bone c-product-card__bone--sm" />
        <div class="c-product-card__bone c-product-card__bone--xs" />
      </div>
    </template>

    <template v-else-if="product">
      <NuxtLink :to="`/products/${product.id}`" class="c-product-card__link">
        <div class="c-product-card__image-wrapper">
          <NuxtImg
            class="c-product-card__image"
            :src="product.image"
            :alt="product.title"
            width="280"
            height="280"
            loading="lazy"
            fit="cover"
          />
        </div>

        <div class="c-product-card__body">
          <span class="c-product-card__category">{{ product.category }}</span>
          <h3 class="c-product-card__title">{{ product.title }}</h3>

          <div class="c-product-card__footer">
            <span class="c-product-card__price"
              >${{ product.price.toFixed(2) }}</span
            >
          </div>
        </div>
      </NuxtLink>
    </template>
  </article>
</template>

<style lang="postcss" scoped>
.c-product-card {
  @apply flex flex-col rounded-3xl overflow-hidden bg-white transition-all duration-200 hover:rounded-10;

  .c-product-card__image-wrapper {
    @apply block relative w-full p-5 overflow-hidden;
    aspect-ratio: 1 / 1;
  }

  .c-product-card__image {
    @apply w-full h-full object-cover bg-gray-50 rounded-3xl transition-all duration-300;
  }

  &:hover .c-product-card__image {
    @apply rounded-10 scale-97;
  }

  .c-product-card__body {
    @apply flex flex-col gap-2 pt-2 pb-5 px-5 flex-1;
  }

  .c-product-card__category {
    @apply text-xs font-semibold text-neutral-500 uppercase tracking-widest;
  }

  .c-product-card__title {
    @apply text-sm font-semibold text-black leading-snug flex-1;
  }

  .c-product-card__footer {
    @apply flex items-center justify-between mt-auto pt-2;
  }

  .c-product-card__price {
    @apply text-xl font-bold text-black;
  }

  .c-product-card__link {
    @apply flex flex-col flex-1 no-underline;
  }

  /* --- Skeleton modifier --- */
  &.c-product-card--skeleton {
    @apply pointer-events-none select-none;

    .c-product-card__image-bone {
      @apply w-full h-full bg-gray-200 animate-pulse;
    }

    .c-product-card__bone {
      @apply h-4 rounded-lg bg-gray-200 animate-pulse w-full;

      &.c-product-card__bone--sm {
        @apply w-3/5;
      }

      &.c-product-card__bone--xs {
        @apply w-2/5 h-3;
      }
    }
  }
}
</style>
