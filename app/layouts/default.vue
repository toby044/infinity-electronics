<template>
  <div class="l-default bg-neutral-100">
    <SiteHeader />
    <slot />
    <SiteFooter />
  </div>
</template>

<style lang="postcss">
.l-default {
  @apply flex flex-col min-h-screen;
  margin-top: var(--dynamic-site-header-height, 64px);
}
</style>
