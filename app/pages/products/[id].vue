
<script setup lang="ts">
const route = useRoute()
const id = computed(() => Number(route.params.id))

const { product, status, error } = useProduct(id)
const { addItem } = useCart()

const quantity = ref(1)
const added = ref(false)

useSeoMeta({
  title: () => product.value
    ? `${product.value.title} — InfinityElectronics`
    : 'Product — InfinityElectronics',
  description: () => product.value?.description,
  ogTitle: () => product.value?.title,
  ogDescription: () => product.value?.description,
  ogImage: () => product.value?.image,
})

function increment() { quantity.value++ }
function decrement() { if (quantity.value > 1) quantity.value-- }

function handleAddToCart() {
  if (!product.value) return
  addItem(product.value, quantity.value)
  added.value = true
  setTimeout(() => { added.value = false }, 1800)
}

const fillPercent = computed(() =>
  product.value ? (product.value.rating.rate / 5) * 100 : 0,
)
</script>

<template>
  <main class="c-product-detail">
    <div class="c-product-detail__container">

      <nav class="c-product-detail__breadcrumb" aria-label="Breadcrumb">
        <ol class="c-product-detail__breadcrumb-list">
          <li class="c-product-detail__breadcrumb-item">
            <NuxtLink to="/" class="c-product-detail__breadcrumb-link">Home</NuxtLink>
          </li>
          <li class="c-product-detail__breadcrumb-sep" aria-hidden="true">/</li>
          <li class="c-product-detail__breadcrumb-item">
            <NuxtLink to="/products" class="c-product-detail__breadcrumb-link">Products</NuxtLink>
          </li>
          <template v-if="product">
            <li class="c-product-detail__breadcrumb-sep" aria-hidden="true">/</li>
            <li class="c-product-detail__breadcrumb-item c-product-detail__breadcrumb-item--current" aria-current="page">
              {{ product.title }}
            </li>
          </template>
        </ol>
      </nav>

      <div v-if="status === 'error'" class="c-product-detail__error" role="alert">
        <p class="c-product-detail__error-title">Product not found</p>
        <p class="c-product-detail__error-detail">{{ error?.message ?? 'This product does not exist or could not be loaded.' }}</p>
        <NuxtLink to="/products" class="c-product-detail__error-back">
          ← Back to Products
        </NuxtLink>
      </div>

      <!-- Loading skeleton -->
      <div v-else-if="status === 'pending'" class="c-product-detail__layout">
        <div class="c-product-detail__image-col">
          <div class="c-product-detail__image-bone" />
        </div>
        <div class="c-product-detail__info-col">
          <div class="c-product-detail__bone c-product-detail__bone--badge" />
          <div class="c-product-detail__bone c-product-detail__bone--title" />
          <div class="c-product-detail__bone c-product-detail__bone--title c-product-detail__bone--title-short" />
          <div class="c-product-detail__bone c-product-detail__bone--price" />
          <div class="c-product-detail__bone" />
          <div class="c-product-detail__bone" />
          <div class="c-product-detail__bone c-product-detail__bone--sm" />
        </div>
      </div>

      <!-- Product content -->
      <div v-else-if="product" class="c-product-detail__layout">

        <div class="c-product-detail__image-col">
          <div class="c-product-detail__image-wrapper">
            <NuxtImg
              class="c-product-detail__image"
              :src="product.image"
              :alt="product.title"
              width="520"
              height="520"
              loading="eager"
              fetchpriority="high"
              fit="cover"
            />
          </div>
        </div>

        <div class="c-product-detail__info-col">

          <span class="c-product-detail__category">{{ product.category }}</span>
          <h1 class="c-product-detail__title">{{ product.title }}</h1>

          <div class="c-product-detail__rating">
            <span
              class="c-product-detail__stars"
              :style="`--fill: ${fillPercent}%`"
              :aria-label="`Rated ${product.rating.rate} out of 5`"
            >★★★★★</span>
            <span class="c-product-detail__rating-score">{{ product.rating.rate.toFixed(1) }}</span>
            <span class="c-product-detail__rating-count">({{ product.rating.count }} reviews)</span>
          </div>

          <p class="c-product-detail__price">${{ product.price.toFixed(2) }}</p>

          <p class="c-product-detail__description">{{ product.description }}</p>

          <div class="c-product-detail__actions">

            <!-- Quantity selector -->
            <div class="c-product-detail__qty" role="group" aria-label="Quantity">
              <button
                class="c-product-detail__qty-btn"
                :disabled="quantity <= 1"
                aria-label="Decrease quantity"
                @click="decrement"
              >−</button>
              <span class="c-product-detail__qty-value" aria-live="polite">{{ quantity }}</span>
              <button
                class="c-product-detail__qty-btn"
                aria-label="Increase quantity"
                @click="increment"
              >+</button>
            </div>

            <!-- Add to cart -->
            <BaseButton
              variant="secondary"
              @click="handleAddToCart"
            >
              <span v-if="added">✓ Added to Cart</span>
              <span v-else>Add to Cart</span>
            </BaseButton>

          </div>
        </div>

      </div>

    </div>
  </main>
</template>

<style lang="postcss" scoped>
.c-product-detail {
  @apply min-h-screen bg-gray-50;

  .c-product-detail__container {
    @apply max-w-6xl mx-auto px-4 py-10 sm:(px-6) lg:(px-8);
  }

  /* Breadcrumb */
  .c-product-detail__breadcrumb {
    @apply mb-8;
  }

  .c-product-detail__breadcrumb-list {
    @apply flex items-center flex-wrap gap-1.5 list-none p-0 m-0;
  }

  .c-product-detail__breadcrumb-item {
    @apply text-sm text-gray-400 truncate max-w-48;

    &.c-product-detail__breadcrumb-item--current {
      @apply text-gray-700 font-medium;
    }
  }

  .c-product-detail__breadcrumb-link {
    @apply text-black hover:underline ;
  }

  .c-product-detail__breadcrumb-sep {
    @apply text-gray-300 text-sm select-none;
  }

  /* Two-column layout */
  .c-product-detail__layout {
    @apply grid grid-cols-1 gap-10 md:(grid-cols-2 gap-16) items-start;
  }

  /* Image column */
  .c-product-detail__image-col {
    @apply ;
  }

  .c-product-detail__image-wrapper {
    @apply rounded-3xl bg-white overflow-hidden;
    aspect-ratio: 1 / 1;
  }

  .c-product-detail__image {
    @apply w-full h-full object-contain p-10;
  }

  /* Info column */
  .c-product-detail__info-col {
    @apply flex flex-col gap-5;
  }

  .c-product-detail__category {
    @apply text-xs font-semibold text-neutral-600 uppercase tracking-widest;
  }

  .c-product-detail__title {
    @apply text-2xl font-bold text-gray-900 leading-snug sm:text-3xl;
  }

  /* Rating */
  .c-product-detail__rating {
    @apply flex items-center gap-2;
  }

  .c-product-detail__stars {
    @apply relative inline-block text-gray-200 text-xl leading-none;

    &::before {
      content: '★★★★★';
      @apply absolute top-0 left-0 text-amber-400 overflow-hidden whitespace-nowrap;
      width: var(--fill, 0%);
    }
  }

  .c-product-detail__rating-score {
    @apply text-sm font-semibold text-gray-700;
  }

  .c-product-detail__rating-count {
    @apply text-sm text-gray-600;
  }

  .c-product-detail__price {
    @apply text-3xl font-bold text-gray-900;
  }

  .c-product-detail__description {
    @apply text-sm text-gray-600 leading-relaxed;
  }

  /* Actions row */
  .c-product-detail__actions {
    @apply flex items-center gap-4 flex-wrap;
  }

  /* Quantity selector */
  .c-product-detail__qty {
    @apply flex items-center rounded-xl border border-gray-200 bg-white overflow-hidden shrink-0;
  }

  .c-product-detail__qty-btn {
    @apply w-10 h-11 text-lg font-medium text-gray-600 cursor-pointer transition-colors duration-150 hover:bg-gray-50 disabled:(text-gray-300 cursor-not-allowed);
  }

  .c-product-detail__qty-value {
    @apply w-10 text-center text-sm font-semibold text-gray-900 select-none;
  }


  /* Error state */
  .c-product-detail__error {
    @apply rounded-2xl bg-red-50 border border-red-200 p-10 text-center;

    .c-product-detail__error-title {
      @apply text-xl font-semibold text-red-700 mb-2;
    }

    .c-product-detail__error-detail {
      @apply text-sm text-red-400 mb-6;
    }

    .c-product-detail__error-back {
      @apply inline-block text-sm font-medium text-indigo-600 underline underline-offset-2 hover:text-indigo-800;
    }
  }

  /* Skeleton bones */
  .c-product-detail__image-bone {
    @apply w-full rounded-2xl bg-gray-200 animate-pulse;
    aspect-ratio: 1 / 1;
  }

  .c-product-detail__bone {
    @apply h-4 rounded-lg bg-gray-200 animate-pulse w-full;

    &.c-product-detail__bone--badge  { @apply w-24 h-3; }
    &.c-product-detail__bone--title  { @apply h-8; }
    &.c-product-detail__bone--title-short { @apply w-3/5; }
    &.c-product-detail__bone--price  { @apply w-32 h-9; }
    &.c-product-detail__bone--sm     { @apply w-2/5; }
  }
}
</style>
