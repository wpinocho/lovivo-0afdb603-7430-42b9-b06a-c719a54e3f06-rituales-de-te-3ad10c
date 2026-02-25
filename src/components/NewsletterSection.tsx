import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HeadlessNewsletter } from '@/components/headless/HeadlessNewsletter';
import { Leaf } from 'lucide-react';

export const NewsletterSection = () => {
  return (
    <HeadlessNewsletter>
      {(logic) => (
        <section className="bg-muted py-20 border-y border-border">
          <div className="max-w-2xl mx-auto px-6 sm:px-10 text-center">
            {logic.success ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="bg-primary/10 rounded-full p-4">
                    <Leaf className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-playfair text-3xl text-foreground">
                  ¡Gracias por unirte al ritual!
                </h3>
                <p className="font-lato text-muted-foreground">
                  Recibirás nuestras mejores ofertas y rituales exclusivos muy pronto.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-3">
                  <p className="font-lato text-xs tracking-[0.2em] uppercase text-muted-foreground">
                    Únete al Ritual
                  </p>
                  <h3 className="font-playfair text-3xl sm:text-4xl text-foreground">
                    Recibe Rituales Exclusivos<br /> y Ofertas Especiales
                  </h3>
                  <p className="font-lato text-muted-foreground text-base">
                    Suscríbete y recibe un <strong>10% de descuento</strong> en tu primer pedido más guías de bienestar, rituales de temporada y acceso anticipado a nuevas colecciones.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    logic.handleSubscribe();
                  }}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <Input
                    type="email"
                    placeholder="tu@correo.com"
                    value={logic.email}
                    onChange={(e) => logic.setEmail(e.target.value)}
                    disabled={logic.isSubmitting}
                    className="flex-1 bg-background border-border rounded-none h-11 font-lato placeholder:text-muted-foreground/60 focus:ring-primary"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={logic.isSubmitting}
                    className="bg-primary text-primary-foreground hover:bg-accent font-lato text-xs tracking-[0.15em] uppercase px-8 h-11 rounded-none"
                  >
                    {logic.isSubmitting ? 'Suscribiendo...' : 'Suscribirme'}
                  </Button>
                </form>

                {logic.error && (
                  <p className="font-lato text-sm text-destructive">
                    {logic.error}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </HeadlessNewsletter>
  );
};