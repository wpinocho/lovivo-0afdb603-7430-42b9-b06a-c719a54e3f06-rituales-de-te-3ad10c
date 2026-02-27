import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { EcommerceTemplate } from "@/templates/EcommerceTemplate"
import { ShoppingCart, ArrowLeft, Plus, Minus, Leaf, RefreshCw, Star, ChevronDown, ChevronUp, Truck, Package } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import type { SellingPlan } from "@/lib/supabase"
import { VolumeBadge } from "@/components/ui/VolumeBadge"
import { BOGOLabel } from "@/components/ui/BOGOLabel"
import { intervalLabel } from "@/lib/subscription-utils"

/**
 * EDITABLE UI COMPONENT - ProductPageUI
 * Ritual Botánico — Luxury branded product page
 */

const BENEFIT_TAGS = [
  "100% Natural",
  "Sin Parabenos",
  "Hasta 4 Usos",
  "Botánica Ancestral",
  "Apto Piel Sensible",
]

const TRUST_BADGES = [
  { icon: Leaf, label: "100% Natural" },
  { icon: RefreshCw, label: "Hasta 4 Usos" },
  { icon: Truck, label: "Envío Express" },
  { icon: Package, label: "Sin Químicos" },
]

interface ProductPageUIProps {
  logic: {
    product: any
    loading: boolean
    notFound: boolean
    selected: Record<string, string>
    quantity: number
    matchingVariant: any
    currentPrice: number
    currentCompareAt: number | null
    currentImage: string | null
    inStock: boolean
    handleOptionSelect: (optionName: string, value: string) => void
    handleQuantityChange: (quantity: number) => void
    handleAddToCart: () => void
    handleNavigateBack: () => void
    isOptionValueAvailable: (optionName: string, value: string) => boolean
    [key: string]: any
  }
}

export const ProductPageUI = ({ logic }: ProductPageUIProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [ingredientsOpen, setIngredientsOpen] = useState(false)
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0 })

  const displayImage = selectedImage || logic.displayImages?.[0] || logic.currentImage || "/placeholder.svg"

  useEffect(() => {
    setSelectedImage(null)
  }, [logic.matchingVariant])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (logic.loading) {
    return (
      <EcommerceTemplate>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-8">
          <Skeleton className="aspect-square rounded-sm" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </EcommerceTemplate>
    )
  }

  if (logic.notFound) {
    return (
      <EcommerceTemplate>
        <div className="text-center py-24">
          <h1 className="font-playfair text-4xl text-foreground mb-4">Ritual no encontrado</h1>
          <p className="text-muted-foreground font-lato mb-10">El ritual que buscas no existe o ha sido eliminado.</p>
          <Button asChild className="rounded-none px-8 tracking-wider uppercase text-sm font-lato">
            <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" />Volver al inicio</Link>
          </Button>
        </div>
      </EcommerceTemplate>
    )
  }

  if (!logic.product) return null

  const discountPercent = logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice
    ? Math.round((1 - logic.currentPrice / logic.currentCompareAt) * 100)
    : null

  return (
    <EcommerceTemplate hideFloatingCartOnMobile>

      {/* Breadcrumb */}
      <nav className="mb-6 text-xs font-lato text-muted-foreground tracking-wide">
        <Link to="/" className="hover:text-primary transition-colors">Inicio</Link>
        <span className="mx-2">·</span>
        <Link to="/#products" className="hover:text-primary transition-colors">Rituales</Link>
        <span className="mx-2">·</span>
        <span className="text-foreground">{logic.product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

        {/* ── LEFT: Product Images ── */}
        <div className="space-y-4">
          {/* Main Image - Desktop */}
          <div className="hidden md:block aspect-square rounded-sm overflow-hidden bg-muted relative">
            <img
              src={displayImage}
              alt={logic.product.title}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            {discountPercent && (
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-lato font-bold tracking-wider uppercase px-3 py-1">
                -{discountPercent}%
              </div>
            )}
          </div>

          {/* Mobile Carousel */}
          {logic.displayImages && logic.displayImages.length > 1 ? (
            <div className="md:hidden relative">
              <Carousel className="w-full">
                <CarouselContent>
                  {logic.displayImages.map((img: string, index: number) => (
                    <CarouselItem key={index}>
                      <div className="aspect-square rounded-sm overflow-hidden bg-muted">
                        <img src={img} alt={`${logic.product.title} ${index + 1}`} loading="lazy" className="w-full h-full object-cover" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
              {discountPercent && (
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-lato font-bold tracking-wider uppercase px-3 py-1">
                  -{discountPercent}%
                </div>
              )}
            </div>
          ) : (
            <div className="md:hidden aspect-square rounded-sm overflow-hidden bg-muted relative">
              <img src={displayImage} alt={logic.product.title} className="w-full h-full object-cover" />
              {discountPercent && (
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-lato font-bold tracking-wider uppercase px-3 py-1">
                  -{discountPercent}%
                </div>
              )}
            </div>
          )}

          {/* Thumbnails - Desktop */}
          {logic.displayImages && logic.displayImages.length > 1 && (
            <div className="hidden md:flex gap-2 overflow-x-auto pb-1">
              {logic.displayImages.map((img: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={cn(
                    "flex-shrink-0 w-16 h-16 rounded-sm overflow-hidden border-2 transition-all",
                    (selectedImage === img || (!selectedImage && index === 0))
                      ? "border-primary" : "border-transparent hover:border-border"
                  )}
                >
                  <img src={img} alt={`miniatura ${index + 1}`} loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: Product Info ── */}
        <div className="space-y-7">

          {/* Title & Rating */}
          <div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {BENEFIT_TAGS.map((tag) => (
                <span key={tag} className="text-[10px] font-lato tracking-wider uppercase px-2.5 py-0.5 bg-primary/8 text-primary border border-primary/20 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-playfair text-3xl lg:text-4xl text-foreground leading-tight mb-3">
              {logic.product.title}
            </h1>
            {/* Star Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
                ))}
              </div>
              <span className="font-lato text-sm text-muted-foreground">4.9 (2,847 rituales)</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="font-playfair text-3xl font-bold text-foreground">
              {logic.formatMoney(logic.currentPrice)}
            </span>
            {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
              <span className="font-lato text-lg text-muted-foreground line-through mb-0.5">
                {logic.formatMoney(logic.currentCompareAt)}
              </span>
            )}
            {discountPercent && (
              <span className="font-lato text-sm font-semibold text-primary mb-0.5">
                Ahorras {discountPercent}%
              </span>
            )}
          </div>

          {/* Price rule badges */}
          {logic.product?.id && (
            <div className="flex flex-wrap gap-2">
              <VolumeBadge productId={logic.product.id} />
              <BOGOLabel productId={logic.product.id} />
            </div>
          )}

          {/* Selling Plan Selector */}
          {logic.sellingPlans && logic.sellingPlans.length > 0 && (
            <div className="space-y-2">
              <p className="font-lato text-xs tracking-[0.15em] uppercase text-muted-foreground">Tipo de compra</p>
              <div className="space-y-2">
                <label className={cn(
                  "flex items-center justify-between p-4 border cursor-pointer transition-all",
                  !logic.selectedPlan ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"
                )}>
                  <div className="flex items-center gap-3">
                    <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center", !logic.selectedPlan ? "border-primary" : "border-muted-foreground/40")}>
                      {!logic.selectedPlan && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    <span className="font-lato font-medium text-sm">Compra única</span>
                  </div>
                  <span className="font-lato font-semibold text-sm">{logic.formatMoney(logic.currentPrice)}</span>
                  <input type="radio" name="selling-plan" checked={!logic.selectedPlan} onChange={() => logic.setSelectedPlan(null)} className="sr-only" />
                </label>

                {logic.sellingPlans.map((plan: SellingPlan) => {
                  const subPrice = plan.discount_type === 'percentage' && plan.discount_value
                    ? logic.currentPrice * (1 - plan.discount_value / 100)
                    : plan.discount_type === 'fixed' && plan.discount_value
                      ? Math.max(0, logic.currentPrice - plan.discount_value)
                      : logic.currentPrice

                  return (
                    <label key={plan.id} className={cn(
                      "flex items-center justify-between p-4 border cursor-pointer transition-all",
                      logic.selectedPlan?.id === plan.id ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"
                    )}>
                      <div className="flex items-center gap-3">
                        <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center", logic.selectedPlan?.id === plan.id ? "border-primary" : "border-muted-foreground/40")}>
                          {logic.selectedPlan?.id === plan.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                        </div>
                        <div>
                          <span className="font-lato font-medium text-sm">{plan.name}</span>
                          {plan.discount_value && plan.discount_value > 0 && (
                            <span className="ml-2 text-xs font-lato font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                              -{plan.discount_value}{plan.discount_type === 'percentage' ? '%' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="font-lato font-semibold text-sm">
                        {logic.formatMoney(subPrice)}/{intervalLabel(plan.interval, plan.interval_count)}
                      </span>
                      <input type="radio" name="selling-plan" checked={logic.selectedPlan?.id === plan.id} onChange={() => logic.setSelectedPlan(plan)} className="sr-only" />
                    </label>
                  )
                })}
              </div>
            </div>
          )}

          {/* Product Options */}
          {logic.product.options && logic.product.options.length > 0 && (
            <div className="space-y-4">
              {logic.product.options.map((option: any) => (
                <div key={option.name}>
                  <p className="font-lato text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                    {option.name}: <span className="text-foreground font-medium normal-case tracking-normal">{logic.selected[option.name]}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value: string) => {
                      const isSelected = logic.selected[option.name] === value
                      const isAvailable = logic.isOptionValueAvailable(option.name, value)
                      return (
                        <button
                          key={value}
                          disabled={!isAvailable}
                          onClick={() => logic.handleOptionSelect(option.name, value)}
                          className={cn(
                            "px-4 py-2 text-sm font-lato border transition-all",
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground"
                              : isAvailable
                                ? "border-border hover:border-primary text-foreground"
                                : "border-border text-muted-foreground opacity-40 cursor-not-allowed line-through"
                          )}
                        >
                          {value}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quantity + CTA */}
          <div className="space-y-3" ref={ctaRef}>
            <div className="flex items-center gap-4">
              <p className="font-lato text-xs tracking-[0.15em] uppercase text-muted-foreground">Cantidad</p>
              <div className="flex items-center border border-border">
                <button
                  onClick={() => logic.handleQuantityChange(Math.max(1, logic.quantity - 1))}
                  disabled={logic.quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 h-10 flex items-center justify-center font-lato text-sm font-medium border-x border-border">
                  {logic.quantity}
                </span>
                <button
                  onClick={() => logic.handleQuantityChange(logic.quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <Button
              onClick={logic.handleAddToCart}
              disabled={!logic.inStock}
              className="w-full h-12 rounded-none font-lato text-sm tracking-[0.12em] uppercase"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {logic.inStock
                ? (logic.selectedPlan
                  ? `Suscribirme — ${logic.formatMoney(logic.subscriptionPrice || logic.currentPrice)}/${intervalLabel(logic.selectedPlan.interval, logic.selectedPlan.interval_count)}`
                  : 'Agregar al Carrito')
                : 'Agotado'}
            </Button>

            {logic.inStock && (
              <Button
                onClick={logic.handleBuyNow}
                variant="outline"
                className="w-full h-12 rounded-none font-lato text-sm tracking-[0.12em] uppercase border-foreground text-foreground hover:bg-foreground hover:text-primary-foreground"
                size="lg"
              >
                Comprar Ahora
              </Button>
            )}

            {!logic.inStock && (
              <p className="text-center font-lato text-sm text-muted-foreground">
                Actualmente agotado — ingresa tu correo para ser notificada
              </p>
            )}
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-4 gap-2 py-4 border-y border-border">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                <Icon className="h-5 w-5 text-primary" />
                <span className="font-lato text-[10px] text-muted-foreground leading-tight">{label}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          {logic.product.description && (
            <div>
              <p className="font-lato text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">Sobre este Ritual</p>
              <div
                className="font-lato text-sm text-foreground/80 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: logic.product.description }}
              />
            </div>
          )}

          {/* Ingredients accordion */}
          <div className="border-y border-border">
            <button
              onClick={() => setIngredientsOpen(!ingredientsOpen)}
              className="w-full flex items-center justify-between py-4 font-lato text-xs tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors"
            >
              <span>Ingredientes & Botánica</span>
              {ingredientsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {ingredientsOpen && (
              <div className="pb-4 font-lato text-sm text-muted-foreground leading-relaxed">
                <p className="mb-2">Todos nuestros rituales están elaborados con ingredientes 100% naturales y de origen mexicano, sin conservadores artificiales, parabenos ni sulfatos.</p>
                <p>Los botánicos se secan al sol y se combinan en proporciones cuidadosamente formuladas para maximizar sus beneficios en la piel y el sistema nervioso.</p>
              </div>
            )}
          </div>

          {/* Back link */}
          <button
            onClick={logic.handleNavigateBack}
            className="flex items-center gap-2 font-lato text-xs tracking-[0.12em] uppercase text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Seguir explorando
          </button>

        </div>
      </div>

      {/* ── Sticky Add to Cart Bar ── */}
      {logic.inStock && (
        <div className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-foreground text-primary-foreground border-t border-primary/20 shadow-2xl transition-transform duration-300 ease-out pb-[env(safe-area-inset-bottom)]",
          ctaInView ? "translate-y-full" : "translate-y-0"
        )}>
          <div className="max-w-7xl mx-auto px-6 py-3">
            {/* Desktop */}
            <div className="hidden md:flex items-center justify-between gap-6">
              <div className="flex items-center gap-4 min-w-0">
                <h3 className="font-playfair text-lg font-semibold truncate">{logic.product.title}</h3>
                <span className="font-lato font-bold text-xl shrink-0">{logic.formatMoney(logic.currentPrice)}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Button
                  onClick={logic.handleAddToCart}
                  className="rounded-none font-lato text-xs tracking-wider uppercase px-6 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Agregar al Carrito
                </Button>
                <Button
                  onClick={logic.handleBuyNow}
                  variant="outline"
                  className="rounded-none font-lato text-xs tracking-wider uppercase px-6 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Comprar Ahora
                </Button>
              </div>
            </div>
            {/* Mobile */}
            <div className="md:hidden space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-playfair text-sm font-semibold truncate">{logic.product.title}</h3>
                <span className="font-lato font-bold shrink-0">{logic.formatMoney(logic.currentPrice)}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={logic.handleAddToCart}
                  size="sm"
                  className="flex-1 rounded-none font-lato text-[11px] tracking-wider uppercase bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  <ShoppingCart className="mr-1 h-3.5 w-3.5" />
                  Agregar
                </Button>
                <Button
                  onClick={logic.handleBuyNow}
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-none font-lato text-[11px] tracking-wider uppercase border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Comprar Ahora
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </EcommerceTemplate>
  )
}