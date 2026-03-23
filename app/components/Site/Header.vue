<script setup lang="ts">
const route = useRoute();
const menuOpen = ref(false);

const headerEl = ref<HTMLElement | null>(null);
const { height } = useElementSize(headerEl);

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
];

function isActive(to: string) {
  return to === "/" ? route.path === "/" : route.path.startsWith(to);
}

watch(
  () => route.path,
  () => {
    menuOpen.value = false;
  },
);

const hidden = ref(false);
let lastScrollY = 0;

function onScroll() {
  const y = window.scrollY;
  hidden.value = y > lastScrollY && y > 64;
  lastScrollY = y;
}

useEventListener("scroll", onScroll, { passive: true });

watchEffect(() => {
  if (!headerEl.value) return;
  document.documentElement.style.setProperty(
    "--dynamic-site-header-height",
    `${height.value}px`,
  );
});
</script>

<template>
  <header
    ref="headerEl"
    class="c-site-header"
    :class="{ 'c-site-header--hidden': hidden }"
  >
    <div class="c-site-header__container">
      <NuxtLink
        to="/"
        class="c-site-header__logo"
        aria-label="InfinityElectronics home"
      >
        <span class="c-site-header__logo-text">InfinityElectronics</span>
      </NuxtLink>

      <nav class="c-site-header__links" aria-label="Main navigation">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="c-site-header__link"
          :class="{ 'c-site-header__link--active': isActive(link.to) }"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="c-site-header__actions">
        <CartIcon />

        <button
          class="c-site-header__hamburger"
          :class="{ 'c-site-header__hamburger--open': menuOpen }"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
          @click="menuOpen = !menuOpen"
        >
          <span class="c-site-header__bar" />
          <span class="c-site-header__bar" />
          <span class="c-site-header__bar" />
        </button>
      </div>
    </div>

    <Transition name="mobile-menu">
      <nav
        v-if="menuOpen"
        id="mobile-nav"
        class="c-site-header__mobile-menu"
        aria-label="Mobile navigation"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="c-site-header__mobile-link"
          :class="{ 'c-site-header__mobile-link--active': isActive(link.to) }"
        >
          {{ link.label }}
        </NuxtLink>
        <span class="c-site-header__mobile-link">About</span>
        <span class="c-site-header__mobile-link">Contact</span>
      </nav>
    </Transition>
  </header>
</template>

<style lang="postcss" scoped>
.c-site-header {
  @apply fixed top-0 z-50 w-full bg-white transition-transform duration-300;

  &.c-site-header--hidden {
    @apply -translate-y-full;
  }

  .c-site-header__container {
    @apply max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-6 sm:px-6 lg:px-8;
  }

  .c-site-header__logo {
    @apply flex items-center gap-1.5 shrink-0 text-black transition-colors duration-150;
  }

  .c-site-header__logo-text {
    @apply text-base font-bold tracking-tight;
  }

  .c-site-header__links {
    @apply hidden md:flex items-center gap-1 flex-1 justify-center;
  }

  .c-site-header__link {
    @apply mx-4 rounded-lg text-sm font-medium text-black underline-slide;
  }

  .c-site-header__actions {
    @apply flex items-center gap-1 shrink-0;
  }

  .c-site-header__hamburger {
    @apply md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-gray-50;
  }

  .c-site-header__bar {
    @apply block w-5 h-0.5 bg-gray-600 rounded-full transition-all duration-200 origin-center;
  }

  &:has(.c-site-header__hamburger--open) .c-site-header__bar:nth-child(1),
  .c-site-header__hamburger--open .c-site-header__bar:nth-child(1) {
    @apply rotate-45 translate-y-2;
  }

  .c-site-header__hamburger--open .c-site-header__bar:nth-child(2) {
    @apply opacity-0 scale-x-0;
  }

  .c-site-header__hamburger--open .c-site-header__bar:nth-child(3) {
    @apply -rotate-45 -translate-y-2;
  }

  .c-site-header__mobile-menu {
    @apply md:hidden absolute top-full left-0 w-full flex flex-col border-t border-gray-100 bg-white px-4 py-3 gap-1;
  }

  .c-site-header__mobile-link {
    @apply px-4 py-3 rounded-xl text-sm font-medium text-gray-600 transition-colors duration-150;
  }
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  @apply transition-all duration-200;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  @apply opacity-0 -translate-y-2;
}

.mobile-menu-enter-to,
.mobile-menu-leave-from {
  @apply opacity-100 translate-y-0;
}
</style>
