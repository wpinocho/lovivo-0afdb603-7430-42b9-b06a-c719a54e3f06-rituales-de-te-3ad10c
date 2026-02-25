

# Plan Final: Implementacion de Suscripciones (Selling Plans) — Robustecido

He revisado a fondo todo el codigo del repo y el manual de integracion del backend. El plan esta solido. A continuacion el plan final con todos los detalles de implementacion, incluyendo los puntos que confirmaste con tu equipo backend.

---

## Validaciones confirmadas con backend

1. **order-get y checkout-update devuelven `selling_plan_id`** en cada order_item — Confirmado
2. **subscription-create acepta `order_id`** — Confirmado (lo pasa como `metadata[order_id]`)
3. **V1: limitar a 1 selling plan por carrito** — Confirmado

---

## Fase 1: Tipos, Cart, Hook y UI en Producto

### 1.1 `src/lib/supabase.ts` — Nuevos tipos

Agregar despues de `StoreSettings` (linea 257):

```typescript
export type SellingPlan = {
  id: string
  store_id: string
  name: string
  description?: string
  interval: 'day' | 'week' | 'month' | 'year'
  interval_count: number
  discount_type?: 'percentage' | 'fixed' | null
  discount_value?: number | null
  trial_days?: number
  active?: boolean
}

export type ProductSellingPlan = {
  id: string
  product_id: string
  selling_plan_id: string
  store_id: string
  selling_plans?: SellingPlan
}

export type SubscriptionContract = {
  id: string
  store_id: string
  customer_id?: string
  selling_plan_id: string
  product_id?: string
  variant_id?: string
  quantity: number
  status: 'active' | 'paused' | 'cancelled' | 'expired'
  stripe_subscription_id: string
  stripe_customer_id: string
  current_period_start?: string
  current_period_end?: string
  next_billing_date?: string
  cancelled_at?: string
  cancel_reason?: string
  selling_plans?: SellingPlan
  products?: { title: string; images?: string[] }
}
```

Agregar `selling_plan_id` al tipo `CheckoutItem` (linea 89-93):

```typescript
export interface CheckoutItem {
  product_id: string
  quantity: number
  variant_id?: string
  selling_plan_id?: string  // NUEVO
}
```

Agregar `selling_plan_id` al tipo `OrderItem` (linea 95-105):

```typescript
export interface OrderItem {
  // ... campos existentes ...
  selling_plan_id?: string  // NUEVO
}
```

### 1.2 `src/contexts/CartContext.tsx` — Soporte para selling plans

**CartProductItem** — agregar `sellingPlan?`:

```typescript
export interface CartProductItem {
  type: 'product'
  key: string
  product: Product
  variant?: ProductVariant
  sellingPlan?: SellingPlan  // NUEVO
  quantity: number
}
```

**ADD_ITEM action** — actualizar key para incluir plan:

```typescript
case 'ADD_ITEM': {
  const { product, variant, sellingPlan } = action.payload
  const key = `${product.id}${variant ? `:${variant.id}` : ''}${sellingPlan ? `:${sellingPlan.id}` : ''}`
  // ... resto igual pero incluir sellingPlan en el nuevo item
}
```

**addItem firma** — agregar tercer parametro opcional:

```typescript
const addItem = (product: Product, variant?: ProductVariant, sellingPlan?: SellingPlan) => {
  dispatch({ type: 'ADD_ITEM', payload: { product, variant, sellingPlan } })
}
```

**Validacion V1** — dentro de `addItem`, antes del dispatch, verificar que no haya otro selling plan diferente en el carrito:

```typescript
const addItem = (product: Product, variant?: ProductVariant, sellingPlan?: SellingPlan) => {
  if (sellingPlan) {
    const existingPlanId = state.items.find(
      i => i.type === 'product' && (i as CartProductItem).sellingPlan?.id
    )
    if (existingPlanId && (existingPlanId as CartProductItem).sellingPlan?.id !== sellingPlan.id) {
      // No dispatch — la UI debe manejar esto con un toast
      return false
    }
  }
  dispatch({ type: 'ADD_ITEM', payload: { product, variant, sellingPlan } })
  return true
}
```

**Context type** — actualizar la firma de addItem en `CartContextType`.

### 1.3 `src/lib/cart-utils.ts` — Merge key con selling_plan_id

Actualizar la clave de merge para incluir `selling_plan_id`:

```typescript
// Para items tipo 'product'
const key = `${product.id}:${variant?.id || ''}:${(item as any).sellingPlan?.id || ''}`

// En el output
map.set(key, {
  product_id: product.id,
  quantity: item.quantity,
  ...(variant && { variant_id: variant.id }),
  ...((item as any).sellingPlan && { selling_plan_id: (item as any).sellingPlan.id }),
})
```

### 1.4 Nuevo archivo `src/hooks/useSellingPlans.ts`

```typescript
import { useState, useEffect } from 'react'
import { supabase, type SellingPlan } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'

export const useSellingPlans = (productId: string | undefined) => {
  const [plans, setPlans] = useState<SellingPlan[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!productId) return
    setLoading(true)
    supabase
      .from('product_selling_plans')
      .select('selling_plan_id, selling_plans(*)')
      .eq('product_id', productId)
      .eq('store_id', STORE_ID)
      .then(({ data }) => {
        const activePlans = (data || [])
          .map((d: any) => d.selling_plans)
          .filter((p: any) => p?.active !== false)
        setPlans(activePlans)
      })
      .finally(() => setLoading(false))
  }, [productId])

  return { plans, loading }
}
```

### 1.5 Nuevo archivo `src/lib/subscription-utils.ts`

Helper para traducir intervalos y calcular precios con descuento:

```typescript
import type { SellingPlan } from '@/lib/supabase'

export const intervalLabel = (interval: string, count: number): string => {
  const labels: Record<string, string> = { day: 'dia', week: 'semana', month: 'mes', year: 'año' }
  const plural: Record<string, string> = { day: 'dias', week: 'semanas', month: 'meses', year: 'años' }
  return count === 1 ? labels[interval] || interval : `${count} ${plural[interval] || interval}`
}

export const calcSubscriptionPrice = (basePrice: number, plan: SellingPlan): number => {
  if (!plan.discount_type || !plan.discount_value) return basePrice
  if (plan.discount_type === 'percentage') return basePrice * (1 - plan.discount_value / 100)
  if (plan.discount_type === 'fixed') return Math.max(0, basePrice - plan.discount_value)
  return basePrice
}
```

### 1.6 `src/components/headless/HeadlessProduct.tsx` — Integrar selling plans

- Importar `useSellingPlans` y `calcSubscriptionPrice`
- Agregar estado: `const [selectedPlan, setSelectedPlan] = useState<SellingPlan | null>(null)`
- Llamar: `const { plans: sellingPlans } = useSellingPlans(product?.id)`
- En `handleAddToCart`: pasar `selectedPlan` a `addItem(product, variantToAdd, selectedPlan || undefined)`
- Calcular `subscriptionPrice` con `calcSubscriptionPrice(currentPrice, selectedPlan)` cuando hay plan
- Exponer: `sellingPlans`, `selectedPlan`, `setSelectedPlan`, `subscriptionPrice`
- En `handleBuyNow`: igual, pasar `selectedPlan`

### 1.7 `src/pages/ui/ProductPageUI.tsx` — Selector de plan

Agregar despues de la seccion de precio (linea ~218) y antes de la descripcion:

```text
┌─────────────────────────────────────────────┐
│ ○ Compra unica — $100                       │
│ ● Suscripcion Mensual (-10%) — $90/mes      │
└─────────────────────────────────────────────┘
```

- Solo se muestra si `logic.sellingPlans?.length > 0`
- Radio buttons con estilos del design system (`border-primary`, `bg-primary/5`)
- El precio en el selector muestra el precio con descuento calculado localmente
- El CTA cambia a "Suscribirse — $90/mes" cuando hay plan seleccionado
- El boton "Comprar ahora" tambien respeta el plan seleccionado

### 1.8 `src/components/CartSidebar.tsx` — Badge de suscripcion

En la seccion de product items (linea ~188-211), despues del titulo del producto, agregar:

```tsx
{item.type === 'product' && (item as CartProductItem).sellingPlan && (
  <div className="flex items-center gap-1 mt-0.5">
    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
      Suscripcion
    </Badge>
    <span className="text-xs text-muted-foreground">
      cada {intervalLabel(
        (item as CartProductItem).sellingPlan!.interval,
        (item as CartProductItem).sellingPlan!.interval_count
      )}
    </span>
  </div>
)}
```

### 1.9 `src/pages/ui/CartUI.tsx` — Lo mismo para la pagina completa del carrito

Agregar badge y frecuencia de suscripcion en los items del carrito (patron identico a CartSidebar).

---

## Fase 2: Flujo de Pago

### 2.1 `src/hooks/useOrderItems.ts` — Key con selling_plan_id

Linea 208, actualizar el key para incluir `selling_plan_id`:

```typescript
key: `${item.product_id}${variant_id ? `:${variant_id}` : ''}${item.selling_plan_id ? `:${item.selling_plan_id}` : ''}`
```

Agregar `selling_plan_id` al tipo `OrderItem` del hook (linea 10-28):

```typescript
export interface OrderItem {
  key: string
  product_id: string
  variant_id?: string
  selling_plan_id?: string  // NUEVO
  // ... resto igual
}
```

Y en `transformOrderItems`, incluir `selling_plan_id: item.selling_plan_id` en el return.

### 2.2 `src/components/StripePayment.tsx` — Branching one-time vs subscription

Este es el cambio mas critico. La prop `items` que recibe StripePayment ya incluira `selling_plan_id` desde `useOrderItems`.

Dentro de `handleFinalizarCompra`, despues de construir `paymentItems` (linea ~139), agregar la deteccion:

```typescript
const hasSubscription = paymentItems.some((it: any) => it.selling_plan_id)

if (hasSubscription) {
  // FLUJO SUSCRIPCION
  const subscriptionItems = paymentItems.filter((it: any) => it.selling_plan_id)
  const oneTimeItems = paymentItems.filter((it: any) => !it.selling_plan_id)
  const mainItem = subscriptionItems[0]

  const subPayload = {
    store_id: STORE_ID,
    selling_plan_id: mainItem.selling_plan_id,
    product_id: mainItem.product_id,
    variant_id: mainItem.variant_id,
    quantity: mainItem.quantity,
    order_id: orderId,
    customer: { email, name },
    one_time_items: oneTimeItems.map((i: any) => ({
      product_id: i.product_id,
      variant_id: i.variant_id,
      quantity: i.quantity,
      price: i.price,
      title: i.product_name || '',
    })),
  }

  const data = await callEdge('subscription-create', subPayload)
  client_secret = data.client_secret
  // Continuar con stripe.confirmCardPayment igual que antes
} else {
  // FLUJO ACTUAL (payments-create-intent) — sin cambios
}
```

Para que esto funcione, necesitamos pasar `selling_plan_id` en los items normalizados. Actualizar la normalizacion (linea ~125-131) para incluir:

```typescript
const normalizedItems = rawItems.map((it: any) => ({
  product_id: it.product_id || it.product?.id || '',
  variant_id: it.variant_id || it.variant?.id,
  quantity: Number(it.quantity ?? 0),
  price: Number(it.variant_price ?? it.variant?.price ?? it.price ?? it.unit_price ?? 0),
  selling_plan_id: it.selling_plan_id || undefined,  // NUEVO
  product_name: it.product_name || it.product?.name || '',  // NUEVO (para one_time_items)
}))
```

Y en el dedup key (linea ~135):

```typescript
const key = `${it.product_id}:${it.variant_id ?? ''}:${it.selling_plan_id ?? ''}`
```

### 2.3 `src/pages/ui/CheckoutUI.tsx` — Resumen de suscripcion

En el resumen de items (linea ~639-685), agregar debajo del nombre de variante:

```tsx
{item.selling_plan_id && (
  <p className="text-xs text-primary mt-0.5">
    Se renueva cada {intervalLabel(item.selling_plan_interval, item.selling_plan_interval_count)}
  </p>
)}
```

Nota: Para esto, `useOrderItems` necesitaria tambien exponer los datos del plan (interval, interval_count). Dado que el backend devuelve `selling_plan_id` pero no los datos del plan directamente en `order_items`, hay dos opciones:

**Opcion A** (simple): Hacer un fetch de `selling_plans` por ID cuando el checkout tiene items con `selling_plan_id`. Un solo query para todos los planes del carrito.

**Opcion B** (mas simple): Guardar los datos del plan en el `CartProductItem` del localStorage — que ya tiene `sellingPlan` con todos los datos. El `CheckoutAdapter` puede leer del cart en sessionStorage.

Recomiendo **Opcion A**: crear un mini-hook o query inline en `CheckoutAdapter` que, al detectar `selling_plan_id` en los orderItems, haga un fetch de `selling_plans` para mostrar la info. Es un solo query y mantiene la fuente de verdad en el backend.

### 2.4 `src/adapters/CheckoutAdapter.tsx` — Exponer datos de suscripcion

Agregar logica para:
1. Detectar si hay items con `selling_plan_id` en `orderItems`
2. Fetch de los selling plans correspondientes (query a `selling_plans` por IDs)
3. Exponer `hasSubscriptionItems: boolean` y `sellingPlansMap: Record<string, SellingPlan>` en el return

---

## Fase 3: Portal de Suscripciones

### 3.1 Nuevo archivo `src/hooks/useSubscriptions.ts`

Hook que consulta `subscription_contracts` para el usuario logueado:

```typescript
// Query: supabase.from('subscription_contracts')
//   .select('*, selling_plans(*), products(title, images)')
//   .eq('store_id', STORE_ID)
//   .eq('customer_id', userId)
//   .order('created_at', { ascending: false })
```

Expone: `contracts`, `loading`, `error`, `refetch`

Acciones via edge functions:
- `pause(contractId)` → `callEdge('subscription-manage', { contract_id, store_id, action: 'pause' })`
- `resume(contractId)` → `callEdge('subscription-manage', { ... action: 'resume' })`
- `cancel(contractId)` → `callEdge('subscription-manage', { ... action: 'cancel' })`

### 3.2 Nuevos archivos de pagina

- `src/pages/MySubscriptions.tsx` — Route component
- `src/pages/ui/MySubscriptionsUI.tsx` — UI con lista de suscripciones, badges de estado, botones de accion

UI muestra cada contrato con:
- Nombre del producto + imagen
- Nombre del plan + frecuencia
- Estado (badge: Active/Paused/Cancelled)
- Proxima fecha de cobro
- Botones: Pausar/Reanudar/Cancelar segun estado

### 3.3 `src/components/ProfileMenu.tsx` — Link a suscripciones

Agregar despues de "My Orders" (linea 87):

```tsx
<DropdownMenuItem onClick={() => navigate('/mis-suscripciones')}>
  <RefreshCw className="mr-2 h-4 w-4" />
  My Subscriptions
</DropdownMenuItem>
```

### 3.4 `src/App.tsx` — Nueva ruta

```typescript
const MySubscriptions = lazy(() => import('./pages/MySubscriptions'))
// ...
<Route path="/mis-suscripciones" element={<MySubscriptions />} />
```

---

## Resumen de archivos

| Archivo | Accion | Fase |
|---------|--------|------|
| `src/lib/supabase.ts` | Modificar — tipos SellingPlan, CheckoutItem, OrderItem | 1 |
| `src/lib/subscription-utils.ts` | **Nuevo** — helpers de intervalos y precios | 1 |
| `src/hooks/useSellingPlans.ts` | **Nuevo** — fetch planes por producto | 1 |
| `src/contexts/CartContext.tsx` | Modificar — sellingPlan en items, key, addItem, validacion V1 | 1 |
| `src/lib/cart-utils.ts` | Modificar — merge key y output con selling_plan_id | 1 |
| `src/components/headless/HeadlessProduct.tsx` | Modificar — integrar selling plans, selectedPlan | 1 |
| `src/pages/ui/ProductPageUI.tsx` | Modificar — selector radio de plan, CTA dinamico | 1 |
| `src/components/CartSidebar.tsx` | Modificar — badge y frecuencia en items con plan | 1 |
| `src/pages/ui/CartUI.tsx` | Modificar — badge y frecuencia en items con plan | 1 |
| `src/hooks/useOrderItems.ts` | Modificar — key con selling_plan_id, exponer en tipo | 2 |
| `src/components/StripePayment.tsx` | Modificar — branching one-time vs subscription-create | 2 |
| `src/adapters/CheckoutAdapter.tsx` | Modificar — fetch selling plans, exponer hasSubscription | 2 |
| `src/pages/ui/CheckoutUI.tsx` | Modificar — mostrar frecuencia en resumen | 2 |
| `src/hooks/useSubscriptions.ts` | **Nuevo** — fetch y acciones sobre contratos | 3 |
| `src/pages/MySubscriptions.tsx` | **Nuevo** — route component | 3 |
| `src/pages/ui/MySubscriptionsUI.tsx` | **Nuevo** — UI del portal | 3 |
| `src/components/ProfileMenu.tsx` | Modificar — link a mis suscripciones | 3 |
| `src/App.tsx` | Modificar — rutas /mis-suscripciones | 3 |

---

## Detalle tecnico: Punto critico en StripePayment

El cambio mas delicado es en `StripePayment.tsx`. Actualmente la funcion `handleFinalizarCompra` construye el payload y llama a `payments-create-intent`. El branching debe:

1. Construir `paymentItems` normalizados (ya lo hace)
2. Detectar `hasSubscription` en esos items
3. Si hay suscripcion: llamar `subscription-create` con el payload descrito en el manual
4. Si no: seguir el flujo actual sin cambios
5. En ambos casos: el `client_secret` resultante se usa con `stripe.confirmCardPayment` — el flujo post-pago (tracking, clearCart, redirect) es identico

La estructura del response de `subscription-create` (`{ client_secret, contract_id, subscription_id, status }`) es compatible con el flujo actual ya que solo necesitamos `client_secret`.

