import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import { VolumeBadge } from "@/components/ui/VolumeBadge"
import { BOGOLabel } from "@/components/ui/BOGOLabel"
import { PriceRuleBadge } from "@/components/ui/PriceRuleBadge"
import { usePriceRules } from "@/hooks/usePriceRules"
import type { Product } from "@/lib/supabase"
import { Star } from "lucide-react"

interface ProductCardUIProps {
  product: Product
}

const StarRating = () => (
  <div className="flex items-center gap-0.5 my-2">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="h-3 w-3 fill-secondary text-secondary" />
    ))}
  </div>
)

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  const { getRulesForProduct } = usePriceRules()
  const productRules = getRulesForProduct(product.id)

  return (
    <HeadlessProductCard product={product}>
      {(logic) => (
        <div className="group flex flex-col hover-lift">
          <Link to={`/productos/${logic.product.slug}`} className="block">
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-sm bg-muted mb-4" style={{ aspectRatio: '1/1' }}>
              {(logic.matchingVariant?.image || (logic.product.images && logic.product.images.length > 0)) ? (
                <>
                  <img
                    src={logic.matchingVariant?.image_urls?.[0] || (logic.matchingVariant?.image as any) || logic.product.images![0]}
                    alt={logic.product.title}
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                      logic.product.images && logic.product.images.length > 1 && !logic.matchingVariant?.image && !logic.matchingVariant?.image_urls?.[0]
                        ? 'group-hover:opacity-0'
                        : ''
                    }`}
                  />
                  {logic.product.images && logic.product.images.length > 1 && !logic.matchingVariant?.image && !logic.matchingVariant?.image_urls?.[0] && (
                    <img
                      src={logic.product.images[1]}
                      alt={`${logic.product.title} - alternativa`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                  Sin imagen
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {logic.discountPercentage && (
                  <span className="bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-sm font-medium tracking-wide uppercase">
                    -{logic.discountPercentage}%
                  </span>
                )}
                {logic.product.featured && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-sm font-medium tracking-wide uppercase">
                    Destacado
                  </span>
                )}
                {!logic.inStock && (
                  <span className="bg-foreground/80 text-primary-foreground text-xs px-2 py-0.5 rounded-sm font-medium tracking-wide uppercase">
                    Agotado
                  </span>
                )}
                <VolumeBadge productId={product.id} />
                <BOGOLabel productId={product.id} />
                {productRules
                  .filter(r => r.rule_type !== 'volume' && r.rule_type !== 'bogo')
                  .map(rule => (
                    <PriceRuleBadge key={rule.id} rule={rule} />
                  ))}
              </div>
            </div>

            {/* Stars */}
            <StarRating />

            {/* Title */}
            <h3 className="font-playfair text-foreground font-medium text-base mb-1 line-clamp-2 leading-snug">
              {logic.product.title}
            </h3>
            {logic.product.description && (
              <p className="text-muted-foreground text-xs mb-3 line-clamp-2 font-lato leading-relaxed">
                {logic.product.description.replace(/<[^>]*>/g, '')}
              </p>
            )}
          </Link>

          {/* Variant Options */}
          {logic.hasVariants && logic.options && (
            <div className="mb-3 space-y-2">
              {logic.options.map((opt) => (
                <div key={opt.id}>
                  <div className="text-xs font-medium text-foreground/70 mb-1.5 uppercase tracking-wide">{opt.name}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {opt.values.filter(val => logic.isOptionValueAvailable(opt.name, val)).map((val) => {
                      const isSelected = logic.selected[opt.name] === val
                      const swatch = opt.name.toLowerCase() === 'color' ? opt.swatches?.[val] : undefined

                      if (swatch) {
                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() => logic.handleOptionChange(opt.name, val)}
                            title={`${opt.name}: ${val}`}
                            className={`h-6 w-6 rounded-full border-2 transition-all ${
                              isSelected ? 'border-primary scale-110' : 'border-border'
                            }`}
                            style={{ backgroundColor: swatch }}
                            aria-label={`${opt.name}: ${val}`}
                          />
                        )
                      }

                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => logic.handleOptionChange(opt.name, val)}
                          className={`border rounded-sm px-2.5 py-1 text-xs font-medium transition-all ${
                            isSelected
                              ? 'border-primary bg-primary text-primary-foreground'
                              : logic.selected[opt.name] && !isSelected
                                ? 'border-border bg-card text-muted-foreground opacity-50'
                                : 'border-border bg-card text-foreground hover:border-primary'
                          }`}
                          aria-pressed={isSelected}
                          aria-label={`${opt.name}: ${val}`}
                        >
                          {val}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Price + Add to Cart */}
          <div className="flex items-center justify-between mt-auto pt-2">
            <div className="flex flex-col">
              <span className="text-foreground font-semibold text-base">
                {logic.formatMoney(logic.currentPrice)}
              </span>
              {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                <span className="text-muted-foreground text-xs line-through">
                  {logic.formatMoney(logic.currentCompareAt)}
                </span>
              )}
            </div>
            <Button
              size="sm"
              onClick={() => {
                logic.onAddToCartSuccess()
                logic.handleAddToCart()
              }}
              disabled={!logic.canAddToCart}
              className="bg-primary text-primary-foreground hover:bg-accent border-0 text-xs tracking-wider uppercase font-medium px-4 disabled:opacity-40"
            >
              {logic.inStock ? 'Agregar' : 'Agotado'}
            </Button>
          </div>
        </div>
      )}
    </HeadlessProductCard>
  )
}