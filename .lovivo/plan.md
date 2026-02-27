# Store Plan — Ritual Botánico

## Current State
**Store**: Ritual Botánico — Tea Bath Rituals para México
**Concept**: Inspired by Inoki Bathhouse (US) but tropicalized for Mexico with native botanicals
**Status**: Homepage MVP complete ✅, Product page needs redesign ⚠️, No bundles ❌, No price rules ❌, No subscriptions ❌

## User Preferences
- Language: Spanish (Mexico)
- Style: Luxury botanical spa, like Inoki Bathhouse
- Colors: Warm cream background + deep forest green + warm amber/terracotta
- Fonts: Playfair Display (headings) + Lato (body)
- Vibe: Elegant, ancestral Mexican wellness, "tropicalized" version of Inoki

## Design System
- Background: hsl(42 35% 96%) — warm cream
- Primary: hsl(152 42% 18%) — deep forest green
- Secondary: hsl(32 42% 52%) — warm amber
- Foreground: hsl(28 30% 12%) — deep warm charcoal
- Fonts: font-playfair (Playfair Display) + font-lato (Lato)
- Radius: 0.25rem (minimal, luxury feel)

## Products (5 active)
1. Jardín de Hibisco — Mini $299 / Full $599 (id: e70a43e9)
2. Selva Tropical — Mini $299 / Full $599 (id: e1622e5d)
3. Cempasúchil Dorado — Mini $349 / Full $699 (id: ea014742)
4. Bosque de Copal — Mini $299 / Full $599 (id: 22b515bc)
5. Aloe & Maguey — Mini $279 / Full $549 (id: 05156d23)

## Collections (1)
- Rituales de Té de Baño (all 5 products)

## Images Generated
- Hero: hero-bath.jpg (1344x768)
- Lifestyle: lifestyle-bath.jpg (1344x768)
- Product images (all .webp, 1024x1024): hibisco, selva-tropical, cempasuchil, copal, aloe-maguey

## Recent Changes
- Full design system: index.css + tailwind.config.ts
- Homepage sections: Hero, Product Grid, Lifestyle, How-To, Benefits Strip, Press Marquee, Newsletter
- EcommerceTemplate: Announcement bar, redesigned header (centered logo, left nav, right icons)
- BrandLogoLeft: "Ritual / BOTÁNICO" elegant text logo
- ProductCardUI: Botanical design with stars, hover effects, design tokens

---

## 🎯 ACTIVE PLAN: CRO + AOV Optimization
**Goal**: Maximize conversion rate and average order value for Ritual Botánico

### PHASE 1 — Bundles (Highest AOV Impact)

Create 3 bundles in the ecommerce platform:

#### Bundle 1: "Kit Descubrimiento Botánico" — Sampler set
- All 5 Minis (Hibisco + Selva Tropical + Cempasúchil + Copal + Aloe & Maguey)
- Regular value: $1,525 MXN (sum of all minis)
- Bundle price: $1,199 MXN (saves ~$326, ~21% off)
- Positioning: "Prueba los 5 rituales antes de elegir tu favorito"
- Great as gift set

#### Bundle 2: "Dúo de Rituales"
- Any 2 Full Size products (pick 2 bestsellers: Hibisco + Selva Tropical)
- Regular value: $1,198 MXN
- Bundle price: $999 MXN (saves ~$199, ~17% off)
- Positioning: "Para rutinas de día y de noche"

#### Bundle 3: "Colección Completa Botánica" — Premium
- All 5 Full Size products
- Regular value: $3,045 MXN
- Bundle price: $2,299 MXN (saves ~$746, ~24% off)
- Positioning: "La experiencia completa del spa mexicano"
- Show prominently as "más popular" / premium gift

### PHASE 2 — Price Rules (Volume Discounts)

Create these price rules:

#### Price Rule 1: "Descuento por Volumen"
- Type: Volume
- Buy 2 products → 10% off
- Buy 3+ products → 15% off
- Applies to all products
- Label badge: "¡Ahorra más comprando más!"

#### Price Rule 2: "Primera Compra"
- Type: Fixed discount code
- Code: BIENVENIDA10
- 10% off first purchase
- No minimum amount
- Single use per customer
- Integrate with newsletter signup (offer code as incentive)

#### Price Rule 3: "Envío Gratis"
- Type: Free shipping trigger
- Cart over $799 MXN = free shipping
- Already shown in announcement bar, needs actual rule to back it up

### PHASE 3 — Subscription Selling Plan (LTV)

Create a selling plan:
- Name: "Ritual Mensual — Suscríbete y Ahorra"
- Discount: 15% off (like Inoki's "Subscribe & Save 15%")
- Interval: Monthly (every 1 month)
- Applies to all full-size products
- Show on product page as: "Compra única" vs "Suscríbete y Ahorra 15%"

### PHASE 4 — Product Page Redesign (Conversion)

Redesign `src/pages/ui/ProductPageUI.tsx` to match brand:
- Apply brand design system (font-playfair headings, design tokens, no generic gray styling)
- Add benefit tags (pill badges like Inoki: "Sin Químicos", "Hasta 4 Usos", "Botánica Ancestral", "Apto Piel Sensible")
- Improve subscription selector UI to look like Inoki's purchase options
- Add ingredients section with expandable accordion
- Add "¿Por qué funciona?" section with 3 botanical benefits
- Add "Completa tu ritual" related products section (upsell)
- Star ratings display (35,000+ rituales recreados)
- Trust badges row: 🌿 100% Natural | ✓ Sin Parabenos | 📦 Envío Express | 🔄 Hasta 4 Usos
- Remove quantity input field (too transactional) — just +/- buttons cleaner
- Sticky add-to-cart bar already exists, make it match brand colors

### PHASE 5 — Homepage Improvements (Social Proof + Conversion)

#### 5a: Testimonials Section
Add after the lifestyle image section in `src/pages/ui/IndexUI.tsx`:
- Section title: "Lo que dicen nuestras clientas"
- 6 fake testimonials (real-sounding Mexican names, specific details)
- Star ratings on each
- Clean card layout with green accents
- Sample testimonials:
  - "El Jardín de Hibisco cambió mis domingos completamente..." — Valentina R., CDMX
  - "Llevo 3 meses con mi suscripción y mi piel nunca había estado mejor..." — Sofía M., Guadalajara
  - "El Cempasúchil Dorado es el regalo perfecto. Lo compré para mi mamá y ahora ella lo pide cada mes" — Camila P., Monterrey
  - etc.

#### 5b: WhatsApp Floating Button
Add to `EcommerceTemplate.tsx`:
- Fixed bottom-right button (WhatsApp green)
- Opens wa.me link
- Small tooltip: "¿Tienes preguntas? ¡Escríbenos!"
- Use WhatsApp icon from lucide or SVG

#### 5c: Mobile Navigation Menu (Hamburger)
Implement in `EcommerceTemplate.tsx`:
- Hamburger icon on mobile (right side of header)
- Slide-in drawer menu from left
- Links: Inicio, Rituales, Bundles, Sobre nosotros
- Brand styled with forest green background

---

## Implementation Order (Priority)
1. ✅ Create bundles (Kit Descubrimiento, Dúo, Colección Completa)
2. ✅ Create price rules (Volume discount + BIENVENIDA10 code)
3. ✅ Create subscription selling plan (Ritual Mensual -15%)
4. ✅ Redesign product page to match brand
5. ✅ Add testimonials section to homepage
6. ✅ Add WhatsApp floating button
7. [ ] Mobile hamburger menu
8. [ ] Quiz "Encuentra tu Ritual"
9. [ ] Blog content

## Known Issues
- None currently

## Notes for Craft Mode
- All bundle/price rule/selling plan creation should be done via ecommerce admin tools
- Product page redesign is the biggest code change — file: `src/pages/ui/ProductPageUI.tsx`
- Homepage additions go in: `src/pages/ui/IndexUI.tsx`
- WhatsApp + mobile menu go in: `src/templates/EcommerceTemplate.tsx`
- Keep all brand design tokens (font-playfair, text-primary, bg-background, etc.)
- Do NOT use generic blue/gray — always use the brand color system