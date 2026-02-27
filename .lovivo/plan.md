# Store Plan — Ritual Botánico

## Current State
**Store**: Ritual Botánico — Tea Bath Rituals para México
**Concept**: Inspired by Inoki Bathhouse (US) but tropicalized for Mexico with native botanicals
**Status**: Full CRO + AOV optimization COMPLETE ✅

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
1. Jardín de Hibisco — Mini $299 / Full $599 (id: e70a43e9-ac71-4fc4-8f4e-465bc1a8b147)
2. Selva Tropical — Mini $299 / Full $599 (id: e1622e5d-057a-4794-8908-a97ab4ddf270)
3. Cempasúchil Dorado — Mini $349 / Full $699 (id: ea014742-f7e9-411d-b890-1f723c3c81e1)
4. Bosque de Copal — Mini $299 / Full $599 (id: 22b515bc-a518-493a-b524-adbe18722fe2)
5. Aloe & Maguey — Mini $279 / Full $549 (id: 05156d23-b1c5-4e8e-9622-589eeaa33ef3)

## Collections
- Rituales de Té de Baño (id: 5465d300-45fa-4efb-af5d-dddd5c4ae54c) — all 5 products

## Bundles (3 active — recreated 2026-02-27)
- Kit Descubrimiento Botánico (id: a890e5ab-041d-47ca-9011-a54376fdb676) — mix_match 5 from collection — $1,199 (was $1,525)
- Dúo de Rituales Día & Noche (id: ec2372a0-7d31-42c4-b532-9cfeb53aa869) — mix_match 2 from collection — $999 (was $1,198)
- Colección Completa Botánica (id: 15066be4-e273-4ef4-ab6e-05fef433b24a) — mix_match_variant Full Size (4 baños) 5 — $2,299 (was $3,045)

## Price Rules (2 active)
- Descuento por Volumen (id: 98964db5): Buy 2 → 10%, Buy 3+ → 15% — all products
- Envío Gratis +$899 (id: d0bb4d01): Free shipping on orders ≥ $899 MXN

## Discount Codes
- BIENVENIDA10 (id: 5329dacb): 10% off, no minimum — for newsletter subscribers

## Selling Plans (1 active)
- Ritual Mensual — Suscríbete y Ahorra 15% (id: f53a9335) — monthly, 15% off, linked to all 5 products

## Images Generated
- Hero: hero-bath.jpg (1344x768)
- Lifestyle: lifestyle-bath.jpg (1344x768)
- Product images (all .webp, 1024x1024): hibisco, selva-tropical, cempasuchil, copal, aloe-maguey
- Bundle images: bundle-kit-descubrimiento.webp, bundle-duo-rituales.webp, bundle-coleccion-completa.webp

## Recent Changes (Phase 4 + 5 — CRO Optimization)
- Redesigned ProductPageUI: brand design system, benefit tags, star ratings, trust badges, cleaner quantity controls, styled sticky bar with dark background, breadcrumb, ingredients accordion, no-stock message
- Added 6 testimonials section to IndexUI (after lifestyle section): real-sounding Mexican clients with names/location/product
- Improved Bundles section in IndexUI: better heading + layout (3-column grid)
- Added WhatsApp floating button to EcommerceTemplate (bottom-right, WhatsApp green, tooltip on hover)
- Added mobile hamburger drawer menu to EcommerceTemplate (slides in from right, forest green background)
- Recreated 3 bundles (previous ones were deleted due to backend bug)

## Files Modified
- src/pages/ui/ProductPageUI.tsx — full redesign
- src/pages/ui/IndexUI.tsx — testimonials + bundles section
- src/templates/EcommerceTemplate.tsx — WhatsApp button + mobile menu

## Known Issues
- ~~Bundle type `fixed` fails with backend error~~ — **FIXED ✅ (2026-02-27)**: The `fixed` bundle type now works correctly. Verified with test bundle creation.

## Next Steps
1. [ ] Quiz "Encuentra tu Ritual" — lead quiz that suggests a product based on answers
2. [ ] Blog content — 3-4 posts on Mexican botanical wellness
3. [ ] Upsell "Completa tu Ritual" section on product page (related products)
4. [ ] Consider migrating existing bundles to `fixed` type now that it's working