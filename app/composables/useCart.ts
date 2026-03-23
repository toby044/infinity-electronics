import type { Product } from '~/types/product'
import type { CartItem } from '~/types/cart'

const STORAGE_KEY = 'ie-cart'

function isValidCartItem(item: unknown): item is CartItem {
  if (!item || typeof item !== 'object') return false
  const i = item as Record<string, unknown>
  return (
    typeof i.productId === 'number' &&
    typeof i.title === 'string' &&
    typeof i.price === 'number' && i.price >= 0 &&
    typeof i.image === 'string' &&
    typeof i.category === 'string' &&
    typeof i.quantity === 'number' && i.quantity >= 1
  )
}

let _synced = false

export function useCart() {
  const items = useState<CartItem[]>('cart', () => [])

  if (import.meta.client && !_synced) {
    _synced = true

    onMounted(() => {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed) && parsed.every(isValidCartItem)) {
            items.value = parsed
          } else {
            localStorage.removeItem(STORAGE_KEY)
          }
        } catch {
          localStorage.removeItem(STORAGE_KEY)
        }
      }

      watch(
        items,
        (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)),
        { deep: true },
      )
    })
  }

  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  function addItem(product: Product, quantity = 1) {
    const existing = items.value.find((i) => i.productId === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity,
      })
    }
  }

  function removeItem(productId: number) {
    items.value = items.value.filter((i) => i.productId !== productId)
  }

  function updateQuantity(productId: number, quantity: number) {
    if (quantity < 1) return removeItem(productId)
    const item = items.value.find((i) => i.productId === productId)
    if (item) item.quantity = quantity
  }

  function clearCart() {
    items.value = []
  }

  return { items, itemCount, totalPrice, addItem, removeItem, updateQuantity, clearCart }
}
