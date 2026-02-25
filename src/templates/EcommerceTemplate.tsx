import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { ProfileMenu } from '@/components/ProfileMenu'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Menu } from 'lucide-react'
import { useCartUISafe } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'
import { useCollections } from '@/hooks/useCollections'
import { ScrollLink } from '@/components/ScrollLink'

/**
 * EDITABLE TEMPLATE - EcommerceTemplate
 * Ritual Botánico — Luxury Mexican Bath Tea
 */

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
  hideFloatingCartOnMobile?: boolean
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default',
  hideFloatingCartOnMobile = false
}: EcommerceTemplateProps) => {
  const cartUI = useCartUISafe()
  const openCart = cartUI?.openCart ?? (() => {})
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()
  const { hasCollections, loading: loadingCollections } = useCollections()

  const header = (
    <div className={headerClassName}>
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center">
        <p className="font-lato text-xs tracking-[0.12em] uppercase">
          ✦ Envío gratis en pedidos mayores a $899 MXN ✦ 100% Botánica Mexicana ✦
        </p>
      </div>

      {/* Main Header */}
      <div className="bg-background border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between">

            {/* Left Nav */}
            <nav className="hidden md:flex items-center gap-8 w-1/3">
              <ScrollLink
                to="/#products"
                className="font-lato text-xs tracking-[0.12em] uppercase text-foreground/60 hover:text-primary transition-colors"
              >
                Rituales
              </ScrollLink>
              {!loadingCollections && hasCollections && (
                <ScrollLink
                  to="/#collections"
                  className="font-lato text-xs tracking-[0.12em] uppercase text-foreground/60 hover:text-primary transition-colors"
                >
                  Colecciones
                </ScrollLink>
              )}
              <ScrollLink
                to="/#how-to"
                className="font-lato text-xs tracking-[0.12em] uppercase text-foreground/60 hover:text-primary transition-colors"
              >
                ¿Cómo Funciona?
              </ScrollLink>
              <Link
                to="/blog"
                className="font-lato text-xs tracking-[0.12em] uppercase text-foreground/60 hover:text-primary transition-colors"
              >
                Blog
              </Link>
            </nav>

            {/* Center Logo */}
            <div className="flex justify-center md:justify-center w-full md:w-1/3">
              <BrandLogoLeft />
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-1 justify-end w-auto md:w-1/3">
              <ProfileMenu />

              {showCart && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={openCart}
                  className="relative text-foreground hover:text-primary"
                  aria-label="Ver carrito"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </Button>
              )}

              {/* Mobile menu hint */}
              <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Page Title */}
          {pageTitle && (
            <div className="mt-6 text-center">
              <h1 className="font-playfair text-3xl text-foreground">{pageTitle}</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const footer = (
    <footer className={`bg-foreground text-primary-foreground py-16 ${footerClassName ?? ''}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex flex-col mb-4">
              <span className="font-playfair text-2xl text-primary-foreground leading-none">Ritual</span>
              <span className="text-[9px] font-lato font-bold tracking-[0.35em] text-primary-foreground/50 uppercase mt-0.5">Botánico</span>
            </div>
            <p className="font-lato text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
              Rituales de Té de Baño elaborados con botánica mexicana premium para transformar tu bienestar diario.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-lato text-xs tracking-[0.2em] uppercase text-primary-foreground/40 mb-5">Explorar</h3>
            <div className="space-y-3">
              <Link to="/" className="block font-lato text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Inicio</Link>
              <ScrollLink to="/#products" className="block font-lato text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Rituales</ScrollLink>
              <Link to="/blog" className="block font-lato text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Blog</Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-lato text-xs tracking-[0.2em] uppercase text-primary-foreground/40 mb-5">Síguenos</h3>
            <SocialLinks />
            <p className="font-lato text-xs text-primary-foreground/40 mt-6 leading-relaxed">
              Etiquétanos en tu ritual de baño con <br />
              <span className="text-primary-foreground/60">#RitualBotanico</span>
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-lato text-xs text-primary-foreground/40">
            &copy; 2025 Ritual Botánico. Todos los derechos reservados.
          </p>
          <p className="font-lato text-xs text-primary-foreground/30 italic">
            Hecho con ♥ en México
          </p>
        </div>
      </div>
    </footer>
  )

  return (
    <>
      <PageTemplate
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>

      {showCart && <FloatingCart hideOnMobile={hideFloatingCartOnMobile} />}
    </>
  )
}