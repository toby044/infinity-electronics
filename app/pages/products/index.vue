<script setup lang="ts">
import type { Product } from '~/types/product'

useSeoMeta({
  title: 'All Products — InfinityElectronics',
  description: 'Browse our full catalogue of electronics and accessories.',
  ogTitle: 'All Products — InfinityElectronics',
  ogDescription: 'Browse our full catalogue of electronics and accessories.',
})

const PAGE_SIZE = 8

const { products, status, error } = useProducts()

const selectedCategory = ref<string>('all')

const categories = computed<string[]>(() => {
  if (!products.value?.length) return ['all']
  return ['all', ...new Set(products.value.map((p) => p.category))]
})

type SortKey = 'price-asc' | 'price-desc' | 'rating' | 'name-asc'

const selectedSort = ref<SortKey>('price-asc')

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
  { value: 'name-asc',   label: 'Name A–Z' },
]

const visibleCount = ref(PAGE_SIZE)

const filteredProducts = computed<Product[]>(() => {
  if (!products.value) return []
  if (selectedCategory.value === 'all') return products.value
  return products.value.filter((p) => p.category === selectedCategory.value)
})

const sortedProducts = computed<Product[]>(() => {
  const list = [...filteredProducts.value]
  switch (selectedSort.value) {
    case 'price-asc':  return list.sort((a, b) => a.price - b.price)
    case 'price-desc': return list.sort((a, b) => b.price - a.price)
    case 'rating':     return list.sort((a, b) => b.rating.rate - a.rating.rate)
    case 'name-asc':   return list.sort((a, b) => a.title.localeCompare(b.title))
    default:           return list
  }
})

watch([selectedCategory, selectedSort], () => {
  visibleCount.value = PAGE_SIZE
})

const visibleProducts = computed<Product[]>(() => sortedProducts.value.slice(0, visibleCount.value))

const hasMore = computed(() => visibleCount.value < sortedProducts.value.length)

const sentinel = ref<HTMLElement | null>(null)

useIntersectionObserver(sentinel, (entries) => {
  if (entries[0]?.isIntersecting && hasMore.value) {
    visibleCount.value += PAGE_SIZE
  }
})

const skeletonKeys = Array.from({ length: PAGE_SIZE }, (_, i) => i)
const sortOpen = ref(false)
const sortDropdownRef = ref<HTMLElement | null>(null)
onClickOutside(sortDropdownRef, () => { sortOpen.value = false })
</script>

<template>
  <main class="c-products-page">
    <div class="c-products-page__container">

      <header class="c-products-page__header">
        <h1 class="c-products-page__title">All Products</h1>
        <p v-if="status === 'success'" class="c-products-page__subtitle">
          {{ filteredProducts.length }} product{{ filteredProducts.length === 1 ? '' : 's' }}
        </p>
      </header>

      <div class="c-products-page__controls">
        <div class="c-products-page__filters" role="group" aria-label="Filter by category">
          <BaseButton
            v-for="cat in categories"
            :key="cat"
            :active="selectedCategory === cat"
            @click="selectedCategory = cat"
          >
            {{ cat === 'all' ? 'All' : cat }}
          </BaseButton>
        </div>

        <div ref="sortDropdownRef" class="c-products-page__sort">
          <span class="c-products-page__sort-label">Sort by</span>
          <BaseButton variant="sort" :active="sortOpen" @click="sortOpen = !sortOpen" class="min-w-176px">
            {{ sortOptions.find(o => o.value === selectedSort)?.label }}
            <svg class="c-products-page__sort-chevron" :class="{ 'c-products-page__sort-chevron--open': sortOpen }" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </BaseButton>
          <Transition name="sort-dropdown">
            <div v-if="sortOpen" class="c-products-page__sort-menu">
              <button
                v-for="opt in sortOptions"
                :key="opt.value"
                class="c-products-page__sort-option"
                :class="{ 'c-products-page__sort-option--active': selectedSort === opt.value }"
                @click="selectedSort = opt.value; sortOpen = false"
              >
                {{ opt.label }}
              </button>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Error state -->
      <div v-if="status === 'error'" class="c-products-page__error" role="alert">
        <p class="c-products-page__error-title">Failed to load products</p>
        <p class="c-products-page__error-detail">{{ error?.message ?? 'An unexpected error occurred.' }}</p>
      </div>

      <!-- Grid: skeleton | empty | results -->
      <div v-else class="c-products-page__grid">

        <!-- Loading skeleton -->
        <template v-if="status === 'pending'">
          <ProductCard v-for="key in skeletonKeys" :key="key" loading />
        </template>

        <!-- Empty state (filter returned nothing) -->
        <div
          v-else-if="visibleProducts.length === 0"
          class="c-products-page__empty"
        >
          <p class="c-products-page__empty-message">
            No products found in <strong>{{ selectedCategory }}</strong>.
          </p>
          <button class="c-products-page__empty-reset" @click="selectedCategory = 'all'">
            Clear filter
          </button>
        </div>

        <!-- Product cards -->
        <template v-else>
          <ProductCard
            v-for="product in visibleProducts"
            :key="product.id"
            :product="product"
          />
        </template>

      </div>

      <!-- Infinite scroll sentinel -->
      <div ref="sentinel" class="c-products-page__sentinel" aria-hidden="true" />

      <!-- Loading more indicator -->
      <div v-if="hasMore" class="c-products-page__loading-more">
        <span class="c-products-page__loading-dot" />
        <span class="c-products-page__loading-dot" />
        <span class="c-products-page__loading-dot" />
      </div>

    </div>
  </main>
</template>

<style lang="postcss" scoped>
.c-products-page {
  @apply min-h-screen;

  .c-products-page__container {
    @apply max-w-7xl mx-auto px-4 py-10 sm:(px-6) lg:(px-8);
  }

  /* Header */
  .c-products-page__header {
    @apply mb-8;
  }

  .c-products-page__title {
    @apply text-3xl font-bold text-gray-900;
  }

  .c-products-page__subtitle {
    @apply mt-1 text-sm text-gray-600;
  }

  /* Controls row */
  .c-products-page__controls {
    @apply flex flex-col gap-4 mb-8 sm:(flex-row items-center justify-between);
  }

  .c-products-page__filters {
    @apply flex flex-wrap gap-2;
  }

.c-products-page__sort {
    @apply relative flex items-center gap-2 shrink-0 w-fit;
  }

  .c-products-page__sort-label {
    @apply text-sm text-black whitespace-nowrap;
  }

  .c-products-page__sort-chevron {
    @apply transition-transform duration-200;

    &.c-products-page__sort-chevron--open {
      @apply rotate-180;
    }
  }

  .c-products-page__sort-menu {
    @apply absolute right-0 top-full mt-1.5 z-20 min-w-44 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden flex flex-col py-1;
  }

  .c-products-page__sort-option {
    @apply px-4 py-2 text-sm text-gray-600 text-left cursor-pointer transition-colors duration-100;

    &:hover {
      @apply bg-gray-50 text-black;
    }

    &.c-products-page__sort-option--active {
      @apply text-black font-medium bg-gray-50;
    }
  }

  /* Grid */
  .c-products-page__grid {
    @apply grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
  }

  /* Error state */
  .c-products-page__error {
    @apply rounded-2xl bg-red-50 border border-red-200 p-10 text-center;

    .c-products-page__error-title {
      @apply text-lg font-semibold text-red-700 mb-1;
    }

    .c-products-page__error-detail {
      @apply text-sm text-red-400;
    }
  }

  /* Empty state */
  .c-products-page__empty {
    @apply col-span-full flex flex-col items-center justify-center py-24 text-gray-400;

    .c-products-page__empty-message {
      @apply text-base mb-4;
    }

    .c-products-page__empty-reset {
      @apply text-sm font-medium text-indigo-600 underline underline-offset-2 cursor-pointer hover:text-indigo-800;
    }
  }

  /* Infinite scroll */
  .c-products-page__sentinel {
    @apply h-1;
  }

  .c-products-page__loading-more {
    @apply flex items-center justify-center gap-2 mt-10 mb-4;
  }

  .c-products-page__loading-dot {
    @apply w-2.5 h-2.5 rounded-full bg-indigo-400 animate-bounce;

    &:nth-child(2) { animation-delay: 0.15s; }
    &:nth-child(3) { animation-delay: 0.3s; }
  }
}

.sort-dropdown-enter-active,
.sort-dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.sort-dropdown-enter-from,
.sort-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
