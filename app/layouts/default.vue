<template>
  <div class="l-default">
    <SiteHeader />
    <slot />
    <SiteFooter />
  </div>
</template>

<style lang="postcss">
.l-default {
  @apply flex flex-col min-h-screen;
}
</style>
