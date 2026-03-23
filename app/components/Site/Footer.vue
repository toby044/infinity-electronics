<script setup lang="ts">
const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
  },
  {
    label: "X / Twitter",
    href: "https://x.com",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  },
];

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="c-app-footer">
    <div class="c-app-footer__container">
      <div class="c-app-footer__grid">
        <div class="c-app-footer__col">
          <NuxtLink to="/" class="c-app-footer__brand">
            <span class="c-app-footer__brand-text">InfinityElectronics</span>
          </NuxtLink>
          <p class="c-app-footer__about">
            Premium electronics and accessories for every lifestyle. Curated
            quality, delivered fast.
          </p>
          <nav class="c-app-footer__nav" aria-label="Footer navigation">
            <NuxtLink
              v-for="link in quickLinks"
              :key="link.to"
              :to="link.to"
              class="c-app-footer__nav-link"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>

        <div class="c-app-footer__col">
          <h3 class="c-app-footer__col-heading">Legal</h3>
          <nav class="c-app-footer__nav" aria-label="Legal navigation">
            <span class="c-app-footer__nav-link">Privacy Policy</span>
            <span class="c-app-footer__nav-link">Terms of Service</span>
          </nav>
        </div>

        <div class="c-app-footer__col c-app-footer__col--social">
          <h3 class="c-app-footer__col-heading">Follow Us</h3>
          <div class="c-app-footer__social">
            <a
              v-for="link in socialLinks"
              :key="link.label"
              :href="link.href"
              :aria-label="link.label"
              class="c-app-footer__social-link"
              target="_blank"
              rel="noopener noreferrer"
              v-html="link.icon"
            />
          </div>
        </div>

        <div class="c-app-footer__bottom">
          <p class="c-app-footer__copyright">
            &copy; {{ currentYear }} InfinityElectronics. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="postcss" scoped>
.c-app-footer {
  @apply bg-white text-black mt-20;

  .c-app-footer__container {
    @apply max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8;
  }

  .c-app-footer__grid {
    @apply grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3;
  }

  .c-app-footer__col {
    @apply flex flex-col gap-4;
  }

  .c-app-footer__brand {
    @apply flex items-center gap-1.5 text-black w-fit;
  }

  .c-app-footer__brand-text {
    @apply text-sm font-bold tracking-tight;
  }

  .c-app-footer__about {
    @apply text-sm leading-relaxed max-w-xs;
  }

  .c-app-footer__col-heading {
    @apply text-xs font-semibold text-black uppercase tracking-widest;
  }

  .c-app-footer__nav {
    @apply flex flex-col gap-2;
  }

  .c-app-footer__nav-link {
    @apply text-sm text-black w-fit underline-offset-2 hover:underline transition-all duration-150;
  }

  .c-app-footer__col--social {
    @apply lg:items-end;
  }

  .c-app-footer__social {
    @apply flex gap-3;
  }

  .c-app-footer__social-link {
    @apply w-5 h-5 text-black opacity-70 hover:opacity-100 transition-opacity duration-150;

    & :deep(svg) {
      @apply w-full h-full;
    }
  }

  .c-app-footer__bottom {
    @apply col-span-full;
  }
  .c-app-footer__copyright {
    @apply text-xs text-black text-center;
  }
}
</style>
