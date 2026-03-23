# Architecture Thoughts — InfinityElectronics

Chosen techs: Nuxt + modules, UnoCSS

---

## Scaling & extensibility

**Server layer decouples the frontend from data sources.** 

All product fetching goes through `server/api/products/` with `defineCachedEventHandler`. Swapping the upstream (FakeStore → real DB, CMS, microservice) only touches the server handlers. Cache storage can be upgraded to Redis via a single Nitro config change.

**Composables centralise data access.** `useProducts`, `useProduct`, `useCart` etc. mean pagination, filtering, or sync behaviour can be added in one place, not scattered across pages.

**Typed interfaces enforce contracts.** `Product` and `CartItem` types are the single source of truth. Adding a field surfaces every callsite at compile time. New domain types (`Order`, `User`) follow the same pattern.

**File-based routing with no config.** New pages and dynamic routes drop into `app/pages/` and inherit the layout, headers, and security rules automatically.

---

## Component hierarchy & atomic design

Components are organised around atomic design principles — each component encapsulates its own logic, state, and visuals, with no leaking concerns between layers:

- **Base/** — pure UI primitives with no business logic (`BaseButton`). These form the design system foundation and are reused everywhere.
- **Domain directories** (`Product/`, `Cart/`, `Site/`) — feature-level components that compose Base primitives and wire in composable logic. A `Product/Card` knows about a product; `Base/Button` does not.
- **Pages** — thin orchestration only. Pages call composables, pass data to components, and handle routing. No visual logic lives here.

This separation means visual changes stay in components, data-fetching changes stay in composables, and pages rarely need to change at all. Adding a new feature area is a new directory — `Wishlist/`, `Checkout/`, `Auth/` — following the same pattern with no rewiring needed.

**Data-driven component rendering via Doctypes.** A natural extension of this hierarchy is a `Doctypes/` component folder — one component per product type (e.g. `FeaturedProduct`, `BundleProduct`, `DigitalProduct`). The product page itself never needs to know which layout to render; it reads a `type` field from the API response and uses Vue's `<component :is>` to resolve the correct Doctype. Adding a new product presentation is then purely additive: send a new type through the data and create the corresponding component. The page and routing stay untouched.

---

## Lazy-loading strategy

Nuxt handles the baseline automatically — each page is a separate chunk and is only loaded when navigated to. Beyond that, the approach at a component level is:

- **Heavy or below-the-fold components** (carousels, product grids, modals) should use `defineAsyncComponent` or Nuxt's `<LazyComponentName />` auto-prefix to defer their JS until needed.
- **Images** use `@nuxt/image` with `loading="lazy"` by default, with `loading="eager"` and `fetchpriority="high"` reserved for above-the-fold hero images (as already applied on the product detail page).
- **Route-level data** is fetched via `useFetch` which integrates with SSR — data is resolved on the server and hydrated on the client, avoiding a waterfall on page load.

---

## UnoCSS & design system

UnoCSS was chosen because its transformer and preset system can be expanded to consume Figma design tokens directly — spacing, colour, and typography scales pipe into utility generation without a manual sync step. This makes a future design system hand-off straightforward.

**Theming is a first-class concern in UnoCSS.** The `theme` object in `uno.config.ts` is the single source of truth for the design system — colours, spacing, type scales, border radii, and shadows are all defined there and automatically generate the full utility set. Swapping a brand colour or adjusting the spacing scale is a one-line config change; every component that uses those utilities updates automatically with no find-and-replace across files.

This also makes multi-theme and dark mode support clean to implement. UnoCSS supports CSS custom properties as theme values natively, so themes can be expressed as variable overrides scoped to a `[data-theme="dark"]` selector or the `prefers-color-scheme` media query. Components never need to know which theme is active — they reference the token, the token resolves to whatever the current theme defines. Adding a new brand theme (e.g. for a white-label variant) means adding a new variable set, not touching component code.

Authoring uses BEM-IT class naming (`.c-product-detail__image-col`, `.l-default`) with `@apply` to compose atomic utilities under the hood. This keeps component styles readable and structured while staying close to the token source of truth.

---

## Modules

These are purely chosen for fast development, but can easily be used in larger-scaled production if needed.

a11y, vueuse and image are always in my projects as they just bring too much value out of the box. 

| Module | Role |
|---|---|
| `@nuxt/a11y` | Accessibility auditing in the dev workflow — catches issues early rather than as a retrofit |
| `@nuxt/image` | Optimised image delivery with provider-agnostic config (swap to Cloudinary, imgix, etc.) |
| `@nuxt/fonts` | Self-hosted or Google font loading configured in one place |
| `@nuxt/icon` | Icon library without manual asset management |
| `@nuxt/test-utils` | E2E and unit testing infrastructure ready to use |
| `@vueuse/nuxt` | Composable utilities (intersection observer, media queries, etc.) available app-wide |
| `nuxt-swiper` | Carousel support for galleries and promotional banners |
| `@unocss/nuxt` | Atomic CSS with design token extensibility |

New capabilities follow the same pattern — add the module, configure in `nuxt.config.ts`.

---