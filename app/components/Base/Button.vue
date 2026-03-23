<script setup lang="ts">
interface Props {
  /** Visual style of the button. */
  variant?: 'primary' | 'secondary' | 'sort'
  /** Whether the button renders in its active/selected state. */
  active?: boolean
  /** Native button type. Defaults to 'button' to prevent accidental form submission. */
  type?: 'button' | 'submit' | 'reset'
  /** Disables the button and prevents interaction. */
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  active: false,
  type: 'button',
  disabled: false,
})
</script>

<template>
  <button
    class="c-base-button"
    :class="[`c-base-button--${variant}`, { 'c-base-button--active': active }]"
    :type="type"
    :disabled="disabled"
  >
    <span class="c-base-button__text"><slot /></span>
  </button>
</template>

<style lang="postcss" scoped>
.c-base-button {
  @apply cursor-pointer;

  &:disabled {
    @apply opacity-40 cursor-not-allowed pointer-events-none;
  }

  &.c-base-button--primary {
    @apply px-8 py-3 rounded-full bg-white text-gray-900 font-semibold text-base;

    .c-base-button__text {
      @apply inline-block transition-transform duration-150;
    }

    &:hover .c-base-button__text {
      @apply -translate-y-0.5;
    }

    &.c-base-button--active {
      @apply bg-gray-900 text-white;
    }
  }

  &.c-base-button--secondary {
    @apply px-8 py-3 rounded-full bg-gray-900 text-white font-semibold text-base transition-colors duration-150 hover:bg-neutral-700;

    .c-base-button__text {
      @apply inline-block transition-transform duration-150;
    }

    &:hover .c-base-button__text {
      @apply -translate-y-0.5;
    }
  }

  &.c-base-button--sort {
    @apply flex items-center px-4 py-1.5 rounded-full text-sm font-medium border border-gray-200 bg-white text-gray-600 transition-colors duration-150 whitespace-nowrap;

    .c-base-button__text {
      @apply flex justify-between w-full items-center gap-1.5;
    }

    &.c-base-button--active {
      @apply border-gray-400 text-gray-900;
    }
  }
}
</style>
