<script setup lang="ts">
useSeoMeta({
  title: "Your Cart — InfinityElectronics",
  description: "Review your selected items and proceed to checkout.",
});

const { items, itemCount, totalPrice, removeItem, updateQuantity, clearCart } =
  useCart();

type CheckoutState = "idle" | "confirmed";
const checkoutState = ref<CheckoutState>("idle");

function checkout() {
  clearCart();
  checkoutState.value = "confirmed";
}
</script>

<template>
  <main class="c-cart-page">
    <div class="c-cart-page__container">
      <h1 class="c-cart-page__title">Your Cart</h1>

      <div v-if="checkoutState === 'confirmed'" class="c-cart-page__confirmed">
        <div class="c-cart-page__confirmed-icon" aria-hidden="true">✓</div>
        <h2 class="c-cart-page__confirmed-heading">Order Confirmed!</h2>
        <p class="c-cart-page__confirmed-sub">
          Thanks for your order. You'll receive a confirmation email shortly.
        </p>
        <NuxtLink to="/products">
          <BaseButton variant="secondary">Continue Shopping</BaseButton>
        </NuxtLink>
      </div>

      <div v-else-if="items.length === 0" class="c-cart-page__empty">
        <Icon name="uil:shopping-bag" class="text-black size-10" />
        <p class="c-cart-page__empty-heading">Your cart is empty</p>
        <p class="c-cart-page__empty-sub">
          Looks like you haven't added anything yet.
        </p>
        <NuxtLink to="/products">
          <BaseButton variant="secondary">Browse Products</BaseButton>
        </NuxtLink>
      </div>

      <div v-else class="c-cart-page__layout">
        <section class="c-cart-page__items" aria-label="Cart items">
          <TransitionGroup name="item" tag="ul" class="c-cart-page__list">
            <li
              v-for="item in items"
              :key="item.productId"
              class="c-cart-page__item"
            >
              <NuxtLink
                :to="`/products/${item.productId}`"
                class="c-cart-page__item-image-link"
              >
                <NuxtImg
                  class="c-cart-page__item-image"
                  :src="item.image"
                  :alt="item.title"
                  width="96"
                  height="96"
                  loading="lazy"
                />
              </NuxtLink>

              <div class="c-cart-page__item-details">
                <span class="c-cart-page__item-category">{{
                  item.category
                }}</span>
                <NuxtLink
                  :to="`/products/${item.productId}`"
                  class="c-cart-page__item-title"
                >
                  {{ item.title }}
                </NuxtLink>
                <span class="c-cart-page__item-unit-price"
                  >${{ item.price.toFixed(2) }} each</span
                >
              </div>

              <div class="c-cart-page__item-actions">
                <div
                  class="c-cart-page__item-qty"
                  role="group"
                  :aria-label="`Quantity for ${item.title}`"
                >
                  <button
                    class="c-cart-page__qty-btn"
                    :disabled="item.quantity <= 1"
                    aria-label="Decrease"
                    @click="updateQuantity(item.productId, item.quantity - 1)"
                  >
                    −
                  </button>
                  <span class="c-cart-page__qty-value" aria-live="polite">{{
                    item.quantity
                  }}</span>
                  <button
                    class="c-cart-page__qty-btn"
                    aria-label="Increase"
                    @click="updateQuantity(item.productId, item.quantity + 1)"
                  >
                    +
                  </button>
                </div>

                <span class="c-cart-page__item-total">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </span>

                <button
                  class="c-cart-page__item-remove"
                  :aria-label="`Remove ${item.title} from cart`"
                  @click="removeItem(item.productId)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    class="c-cart-page__remove-icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </li>
          </TransitionGroup>
        </section>

        <aside class="c-cart-page__summary">
          <h2 class="c-cart-page__summary-title">Order Summary</h2>

          <dl class="c-cart-page__summary-lines">
            <div class="c-cart-page__summary-row">
              <dt class="c-cart-page__summary-label">
                Items ({{ itemCount }})
              </dt>
              <dd class="c-cart-page__summary-value">
                ${{ totalPrice.toFixed(2) }}
              </dd>
            </div>
            <div class="c-cart-page__summary-row">
              <dt class="c-cart-page__summary-label">Shipping</dt>
              <dd
                class="c-cart-page__summary-value c-cart-page__summary-value--free"
              >
                Free
              </dd>
            </div>
          </dl>

          <div class="c-cart-page__summary-total">
            <span class="c-cart-page__summary-total-label">Total</span>
            <span class="c-cart-page__summary-total-value"
              >${{ totalPrice.toFixed(2) }}</span
            >
          </div>

          <BaseButton variant="secondary" @click="checkout"
            >Checkout</BaseButton
          >

          <NuxtLink to="/products" class="block w-full">
            <BaseButton variant="secondary" class="w-full"
              >← Continue Shopping</BaseButton
            >
          </NuxtLink>
        </aside>
      </div>
    </div>
  </main>
</template>

<style lang="postcss" scoped>
.c-cart-page {
  @apply min-h-screen bg-gray-50;

  .c-cart-page__container {
    @apply max-w-6xl mx-auto px-4 py-10 sm:(px-6) lg:(px-8);
  }

  .c-cart-page__title {
    @apply text-3xl font-bold text-gray-900 mb-8;
  }

  .c-cart-page__confirmed {
    @apply flex flex-col items-center text-center py-20 gap-4;

    .c-cart-page__confirmed-icon {
      @apply w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 text-3xl font-bold flex items-center justify-center;
    }

    .c-cart-page__confirmed-heading {
      @apply text-2xl font-bold text-gray-900;
    }

    .c-cart-page__confirmed-sub {
      @apply text-sm text-gray-500 max-w-sm;
    }
  }

  .c-cart-page__empty {
    @apply flex flex-col items-center text-center py-24 gap-3 text-gray-400;

    .c-cart-page__empty-icon {
      @apply w-16 h-16 mb-2;
    }

    .c-cart-page__empty-heading {
      @apply text-xl font-semibold text-gray-700;
    }

    .c-cart-page__empty-sub {
      @apply text-sm;
    }
  }

  .c-cart-page__layout {
    @apply grid grid-cols-1 gap-8 lg:(grid-cols-[1fr_360px] gap-12) items-start;
  }

  .c-cart-page__list {
    @apply flex flex-col gap-4 list-none p-0 m-0;
  }

  .c-cart-page__item {
    @apply grid items-center gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm;
    grid-template-columns: 96px 1fr;

    @screen sm {
      grid-template-columns: 96px 1fr auto;
    }
  }

  .c-cart-page__item-actions {
    @apply flex items-center gap-4;
    grid-column: 1 / -1;

    @screen sm {
      grid-column: auto;
    }
  }

  .c-cart-page__item-image-link {
    @apply block rounded-xl overflow-hidden bg-gray-50 shrink-0;
    aspect-ratio: 1 / 1;
  }

  .c-cart-page__item-image {
    @apply w-full h-full object-contain p-2;
  }

  .c-cart-page__item-details {
    @apply flex flex-col gap-1 min-w-0;

    .c-cart-page__item-category {
      @apply text-xs font-semibold text-black uppercase tracking-wider text-neutral-500;
    }

    .c-cart-page__item-title {
      @apply text-sm font-semibold text-gray-900 leading-snug line-clamp-2 hover:text-black transition-colors duration-150;
    }

    .c-cart-page__item-unit-price {
      @apply text-xs text-gray-400;
    }
  }

  .c-cart-page__item-qty {
    @apply flex items-center rounded-xl border border-gray-200 overflow-hidden shrink-0;
  }

  .c-cart-page__qty-btn {
    @apply w-9 h-9 text-base font-medium text-gray-600 cursor-pointer transition-colors duration-150 hover:bg-gray-50 disabled:(text-gray-300 cursor-not-allowed);
  }

  .c-cart-page__qty-value {
    @apply w-8 text-center text-sm font-semibold text-gray-900 select-none;
  }

  .c-cart-page__item-total {
    @apply text-sm font-bold text-gray-900 shrink-0 min-w-16 text-right;
  }

  .c-cart-page__item-remove {
    @apply w-8 h-8 rounded-lg text-gray-400 cursor-pointer transition-colors duration-150 hover:(text-red-500 bg-red-50) flex items-center justify-center shrink-0;

    .c-cart-page__remove-icon {
      @apply w-4 h-4;
    }
  }

  /* ── Summary sidebar ───────────────────────────────────────────────────── */
  .c-cart-page__summary {
    @apply sticky top-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4;
  }

  .c-cart-page__summary-title {
    @apply text-lg font-bold text-gray-900;
  }

  .c-cart-page__summary-lines {
    @apply flex flex-col gap-3;
  }

  .c-cart-page__summary-row {
    @apply flex justify-between items-center;

    .c-cart-page__summary-label {
      @apply text-sm text-gray-500;
    }

    .c-cart-page__summary-value {
      @apply text-sm font-medium text-gray-900;

      &.c-cart-page__summary-value--free {
        @apply text-emerald-600 font-semibold;
      }
    }
  }

  .c-cart-page__summary-total {
    @apply flex justify-between items-center pt-4 border-t border-gray-100;

    .c-cart-page__summary-total-label {
      @apply text-base font-bold text-gray-900;
    }

    .c-cart-page__summary-total-value {
      @apply text-xl font-bold text-gray-900;
    }
  }
}

/* Line item enter/leave animation */
.item-enter-active,
.item-leave-active {
  @apply transition-all duration-300;
}
.item-enter-from {
  @apply opacity-0 -translate-y-2;
}
.item-leave-to {
  @apply opacity-0 translate-x-4;
}
.item-leave-active {
  @apply absolute w-full;
}
</style>
