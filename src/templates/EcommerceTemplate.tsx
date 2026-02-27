import { ReactNode, useState } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { ProfileMenu } from '@/components/ProfileMenu'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Menu, X } from 'lucide-react'
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-foreground"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Abrir menú"
              >
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

      {/* ── Mobile Menu Drawer ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute top-0 right-0 h-full w-72 bg-primary flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-primary-foreground/10">
              <div>
                <span className="font-playfair text-xl text-primary-foreground leading-none">Ritual</span>
                <span className="block text-[8px] font-lato font-bold tracking-[0.35em] text-primary-foreground/50 uppercase mt-0.5">Botánico</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
              {[
                { label: 'Inicio', to: '/' },
                { label: 'Rituales', to: '/#products', scroll: true },
                { label: 'Kits & Bundles', to: '/#bundles', scroll: true },
                { label: '¿Cómo Funciona?', to: '/#how-to', scroll: true },
                { label: 'Blog', to: '/blog' },
              ].map((item) => (
                item.scroll ? (
                  <ScrollLink
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-lato text-sm tracking-[0.12em] uppercase text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/8 px-4 py-3 transition-colors rounded-sm"
                  >
                    {item.label}
                  </ScrollLink>
                ) : (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-lato text-sm tracking-[0.12em] uppercase text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/8 px-4 py-3 transition-colors rounded-sm"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </nav>
            <div className="px-6 py-6 border-t border-primary-foreground/10">
              <p className="font-lato text-xs text-primary-foreground/30 italic">Hecho con ♥ en México</p>
            </div>
          </div>
        </div>
      )}

      {/* ── WhatsApp Floating Button ── */}
      <a
        href="https://wa.me/5215500000000?text=Hola%2C%20me%20interesa%20saber%20más%20sobre%20los%20Rituales%20Botánicos%20✨"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Chatea con nosotros en WhatsApp"
      >
        <div className="relative flex items-center">
          {/* Tooltip */}
          <div className="absolute right-14 bg-foreground text-primary-foreground text-xs font-lato px-3 py-2 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
            ¿Tienes preguntas? ¡Escríbenos!
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 border-4 border-transparent border-l-foreground" />
          </div>
          {/* Button */}
          <div className="w-13 h-13 w-[52px] h-[52px] rounded-full bg-[#25D366] flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
        </div>
      </a>
    </>
  )
}