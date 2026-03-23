<script setup lang="ts">
/**
 * BaseButton — stories
 *
 * Variants: primary | secondary | sort
 * States:   default | active | disabled
 */

const sortActive = ref(false)
</script>

<template>
  <main class="c-story">
    <NuxtLink to="/stories" class="c-story__back">← Stories</NuxtLink>
    <h1 class="c-story__title">BaseButton</h1>
    <p class="c-story__description">
      General-purpose button. Defaults to <code>type="button"</code> to prevent
      accidental form submission. Use <code>variant</code> to switch between
      visual styles, <code>active</code> for toggled/selected state, and
      <code>disabled</code> to block interaction.
    </p>

    <!-- Primary -->
    <section class="c-story__section">
      <h2 class="c-story__section-title">Primary</h2>
      <p class="c-story__section-description">Default variant. White pill on dark backgrounds.</p>
      <div class="c-story__row c-story__row--dark">
        <BaseButton>Shop Now</BaseButton>
        <BaseButton :active="true">Active</BaseButton>
        <BaseButton :disabled="true">Disabled</BaseButton>
      </div>
    </section>

    <!-- Secondary -->
    <section class="c-story__section">
      <h2 class="c-story__section-title">Secondary</h2>
      <p class="c-story__section-description">Dark pill. Suited for light backgrounds.</p>
      <div class="c-story__row">
        <BaseButton variant="secondary">Add to Cart</BaseButton>
        <BaseButton variant="secondary" :disabled="true">Disabled</BaseButton>
      </div>
    </section>

    <!-- Sort -->
    <section class="c-story__section">
      <h2 class="c-story__section-title">Sort</h2>
      <p class="c-story__section-description">
        Small pill with border. Used in dropdowns and toolbar controls. Slot
        content accepts inline SVG icons.
      </p>
      <div class="c-story__row">
        <BaseButton variant="sort">Price: Low to High</BaseButton>
        <BaseButton variant="sort" :active="true">Top Rated (active)</BaseButton>
        <BaseButton variant="sort" :active="sortActive" @click="sortActive = !sortActive">
          Toggle me
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M2 4L6 8L10 4"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </BaseButton>
      </div>
    </section>

    <!-- Inside a form (type="submit") -->
    <section class="c-story__section">
      <h2 class="c-story__section-title">Inside a form</h2>
      <p class="c-story__section-description">
        Use <code>type="submit"</code> explicitly when the button should submit a
        form. The default is <code>type="button"</code>.
      </p>
      <form class="c-story__row" @submit.prevent>
        <BaseButton type="submit" variant="secondary">Submit form</BaseButton>
      </form>
    </section>
  </main>
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

  .c-story__row {
    @apply flex flex-wrap items-center gap-4 p-6 rounded-2xl bg-gray-50;

    &.c-story__row--dark {
      @apply bg-gray-900;
    }
  }
}
</style>
