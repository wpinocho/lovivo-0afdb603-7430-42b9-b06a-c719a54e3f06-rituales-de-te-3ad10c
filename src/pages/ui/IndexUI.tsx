import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { NewsletterSection } from '@/components/NewsletterSection';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import { BundleCard } from '@/components/ui/BundleCard';
import { useBundles } from '@/hooks/useBundles';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Droplets, Music, Sparkles } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: "Valentina R.",
    location: "CDMX",
    product: "Jardín de Hibisco",
    text: "El Jardín de Hibisco cambió mis domingos completamente. Antes era el día de estrés de la semana. Ahora es mi momento sagrado. Mi piel se siente increíblemente suave y mi mente se calma al instante.",
  },
  {
    name: "Sofía M.",
    location: "Guadalajara",
    product: "Ritual Mensual",
    text: "Llevo 3 meses con mi suscripción y mi piel nunca había estado tan bien. El Aloe & Maguey es un milagro para mi piel sensible. Llegó puntual, el packaging es bellísimo y el aroma es de otro mundo.",
  },
  {
    name: "Camila P.",
    location: "Monterrey",
    product: "Cempasúchil Dorado",
    text: "El Cempasúchil Dorado es el regalo perfecto. Lo compré para mi mamá y ahora ella lo pide cada mes. El aroma es cálido, especiado, totalmente mexicano. Se siente como un abrazo.",
  },
  {
    name: "Andrea L.",
    location: "CDMX",
    product: "Selva Tropical",
    text: "Trabajo frente a computadora todo el día y llego con los músculos contracturados. La Selva Tropical es lo único que me relaja de verdad. Duermo mucho mejor desde que la uso los miércoles.",
  },
  {
    name: "Isabela T.",
    location: "Querétaro",
    product: "Bosque de Copal",
    text: "Compré el Kit Descubrimiento y el Bosque de Copal se convirtió en mi favorito inmediatamente. Es como un temazcal en casa. El olor a copal me transporta a algo muy ancestral y poderoso.",
  },
  {
    name: "Mariana V.",
    location: "Puebla",
    product: "Kit Descubrimiento",
    text: "Recibí el Kit Descubrimiento como regalo de cumpleaños y fue lo mejor que me pudieron dar. Cada ritual es distinto y especial. Ahora tengo uno para cada estado de ánimo. ¡100% recomendado!",
  },
]

/**
 * EDITABLE UI - IndexUI
 * Ritual Botánico — Luxury Mexican Bath Tea Homepage
 */

const HERO_IMAGE = 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/0afdb603-7430-42b9-b06a-c719a54e3f06/hero-bath.jpg'
const LIFESTYLE_IMAGE = 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/0afdb603-7430-42b9-b06a-c719a54e3f06/lifestyle-bath.jpg'

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

const HOW_TO_STEPS = [
  {
    icon: Leaf,
    number: '01',
    title: 'Elige Tu Ritual',
    description: 'Selecciona la mezcla botánica que tu cuerpo necesita hoy. Cada fórmula está diseñada para un beneficio específico.',
  },
  {
    icon: Droplets,
    number: '02',
    title: 'Prepara el Baño',
    description: 'Sumerge la bolsa de té en agua caliente por 5 minutos (opcional). Nuestros rituales pueden reutilizarse hasta 4 veces.',
  },
  {
    icon: Music,
    number: '03',
    title: 'Respira & Sumérgete',
    description: 'Accede a nuestra playlist de respiración guiada y meditación en Spotify. Deja que el aroma te envuelva.',
  },
  {
    icon: Sparkles,
    number: '04',
    title: 'Transforma tu Mente',
    description: 'Deja que los botánicos disuelvan el estrés y la tensión. En solo 30 minutos, siéntete completamente renovada.',
  },
]

const PRESS_LOGOS = [
  'Vogue México',
  'Elle México',
  'Chilango',
  'El Universal',
  'Forbes México',
  'Time Out CDMX',
  'Expansión',
  'Reforma',
]

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    loading,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
    selectedCollectionId,
    collections,
  } = logic;

  const { bundles, loading: loadingBundles } = useBundles();

  return (
    <EcommerceTemplate showCart={true} layout="full-width">

      {/* ─── HERO SECTION ─── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: '80vh' }}
        aria-label="Hero — Ritual Botánico"
      >
        <img
          src={HERO_IMAGE}
          alt="Baño ritual con flores mexicanas — Ritual Botánico"
          className="absolute inset-0 w-full h-full object-cover object-center"
          fetchPriority="high"
          loading="eager"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/30 to-transparent" />

        {/* Text */}
        <div className="relative z-10 flex items-center" style={{ minHeight: '80vh' }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
            <div className="max-w-xl animate-slide-up">
              <p className="text-primary-foreground/80 text-sm font-lato tracking-[0.2em] uppercase mb-4">
                Botánica Mexicana · Bienestar Ancestral
              </p>
              <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl text-primary-foreground leading-[1.1] mb-6">
                El Lujo del<br />
                Baño Ancestral<br />
                Mexicano
              </h1>
              <p className="text-primary-foreground/80 text-lg font-lato leading-relaxed mb-10 max-w-md">
                Rituales de Té de Baño elaborados con botánica mexicana premium.
                Transforma tu baño en un santuario de bienestar en 30 minutos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-lato text-sm tracking-[0.15em] uppercase px-8 py-3 h-auto rounded-none"
                >
                  <a href="#products">Ver Rituales →</a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-lato text-sm tracking-[0.15em] uppercase px-8 py-3 h-auto rounded-none bg-transparent"
                >
                  <a href="#how-to">¿Cómo Funciona?</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HEADLINE + PRODUCT GRID ─── */}
      <section id="products" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Headline */}
          <div className="text-center mb-14">
            <h2 className="font-playfair text-4xl sm:text-5xl text-primary leading-tight mb-4">
              Alivia la Tensión. Restaura el Equilibrio.<br className="hidden sm:block" /> Siéntete Tú de Nuevo.
            </h2>
            <p className="text-muted-foreground font-lato text-lg max-w-2xl mx-auto mb-8">
              El Reset de 30 Minutos Que Siente Como un Día de Spa de Lujo
            </p>
            <a
              href="#products"
              className="inline-flex items-center gap-2 text-primary font-lato text-sm tracking-[0.15em] uppercase border-b border-primary pb-0.5 hover:opacity-70 transition-opacity"
            >
              Ver Todo <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-muted rounded-sm animate-pulse" style={{ aspectRatio: '4/5' }} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              No hay rituales disponibles en este momento.
            </div>
          )}

          {selectedCollectionId && (
            <div className="text-center mt-10">
              <Button variant="outline" onClick={handleShowAllProducts} className="rounded-none border-foreground text-foreground tracking-wider uppercase text-sm">
                Ver Todos los Rituales
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ─── BUNDLES SECTION (if any) ─── */}
      {!loadingBundles && bundles.length > 0 && (
        <section id="bundles" className="py-20 bg-muted/40">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="text-center mb-14">
              <p className="font-lato text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Kits Curados</p>
              <h2 className="font-playfair text-4xl sm:text-5xl text-primary leading-tight mb-4">
                Ahorra Más, Rituales Completos
              </h2>
              <p className="font-lato text-muted-foreground max-w-xl mx-auto">
                Combinaciones diseñadas para maximizar tus beneficios. Cada kit incluye nuestros rituales más amados a un precio especial.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {bundles.map((bundle) => (
                <BundleCard key={bundle.id} bundle={bundle} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── TESTIMONIALS SECTION ─── */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-14">
            <p className="font-lato text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Rituales Reales</p>
            <h2 className="font-playfair text-4xl sm:text-5xl text-primary leading-tight mb-4">
              Lo que Dicen Nuestras Clientas
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[hsl(var(--gold))] text-lg">★</span>
                ))}
              </div>
              <span className="font-lato text-muted-foreground text-sm">4.9 de 5 · +35,000 rituales recreados</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-card border border-border p-6 space-y-4 hover:border-primary/30 transition-colors">
                <div className="flex">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-[hsl(var(--gold))] text-sm">★</span>
                  ))}
                </div>
                <p className="font-lato text-sm text-foreground/80 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-playfair text-sm text-primary font-bold">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-lato text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="font-lato text-xs text-muted-foreground">{t.location} · {t.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LIFESTYLE FULL-WIDTH SECTION ─── */}
      <section className="relative overflow-hidden" style={{ minHeight: '60vh' }}>
        <img
          src={LIFESTYLE_IMAGE}
          alt="Mujer relajándose en baño botánico mexicano"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-foreground/45" />
        <div className="relative z-10 flex items-center justify-center text-center" style={{ minHeight: '60vh' }}>
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-playfair text-4xl sm:text-5xl text-primary-foreground mb-6 leading-tight">
              Alivio Sin Igual al Estrés y Relajación Profunda
            </h2>
            <p className="text-primary-foreground/80 font-lato text-lg leading-relaxed mb-10">
              Regresa a las tradiciones milenarias de baño diseñadas para calmar la mente y renovar el cuerpo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-lato text-sm tracking-[0.15em] uppercase px-8 py-3 h-auto rounded-none"
              >
                <a href="#products">Comprar Todo</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW-TO SECTION ─── */}
      <section id="how-to" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl sm:text-5xl text-primary mb-3">
              Pequeño Ritual, Gran Transformación
            </h2>
            <p className="text-muted-foreground font-lato text-lg">
              4 pasos para convertir tu baño en un spa de lujo mexicano
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_TO_STEPS.map((step) => (
              <div key={step.number} className="text-center group">
                {/* Icon Circle */}
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors duration-300 relative">
                  <step.icon className="h-8 w-8 text-primary" />
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold font-lato">
                    {step.number.replace('0', '')}
                  </span>
                </div>
                <h3 className="font-playfair text-lg text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground font-lato text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Extra note */}
          <div className="mt-14 text-center">
            <p className="text-muted-foreground font-lato text-sm italic">
              * Nuestros rituales spa-grade pueden dividirse hasta en 4 usos y reutilizarse al día siguiente
            </p>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS STRIP ─── */}
      <section className="py-10 bg-primary">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { title: '100% Natural', desc: 'Botánica mexicana pura' },
              { title: 'Hasta 4 Usos', desc: 'Por cada ritual full size' },
              { title: 'Sin Químicos', desc: 'Sin parabenos ni sulfatos' },
              { title: 'Envío Express', desc: 'A todo México' },
            ].map((item) => (
              <div key={item.title} className="text-primary-foreground">
                <p className="font-playfair text-lg font-semibold mb-1">{item.title}</p>
                <p className="font-lato text-sm text-primary-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRESS / AS SEEN IN ─── */}
      <section className="py-14 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="text-center font-lato text-sm tracking-[0.2em] uppercase text-muted-foreground mb-10">
            Como apareció en
          </p>
          {/* Marquee */}
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
              {[...PRESS_LOGOS, ...PRESS_LOGOS].map((logo, i) => (
                <span
                  key={i}
                  className="font-playfair text-lg font-semibold text-foreground/30 hover:text-foreground/60 transition-colors cursor-default shrink-0 italic"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <NewsletterSection />

    </EcommerceTemplate>
  );
};