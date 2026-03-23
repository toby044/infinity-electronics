<script setup lang="ts">
const { itemCount } = useCart();
</script>

<template>
  <NuxtLink to="/cart" class="c-cart-icon" aria-label="Shopping cart">
    <Icon name="uil:shopping-bag" class="text-black size-5" />

    <ClientOnly>
      <Transition name="badge">
        <span v-if="itemCount > 0" class="c-cart-icon__badge" aria-hidden="true">
          {{ itemCount > 99 ? "99+" : itemCount }}
        </span>
      </Transition>
    </ClientOnly>
  </NuxtLink>
</template>

<style lang="postcss" scoped>
.c-cart-icon {
  @apply relative inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 transition-colors duration-150 hover:bg-neutral-200;

  .c-cart-icon__badge {
    @apply absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center leading-none;
  }
}

.badge-enter-active,
.badge-leave-active {
  @apply transition-all duration-200;
}
.badge-enter-from,
.badge-leave-to {
  @apply opacity-0 scale-50;
}
</style>
