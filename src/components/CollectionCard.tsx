import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'
import { ArrowRight } from 'lucide-react'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
  eager?: boolean
}

export const CollectionCard = ({ collection, onViewProducts, eager }: CollectionCardProps) => {
  return (
    <div className="group overflow-hidden hover-lift">
      {/* Image */}
      <div className="overflow-hidden rounded-sm" style={{ aspectRatio: '4/3' }}>
        {collection.image ? (
          <img
            src={collection.image}
            alt={collection.name}
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : undefined}
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-lato">
            Sin imagen
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pt-5 pb-2">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-playfair text-xl text-foreground leading-snug line-clamp-1">
            {collection.name}
          </h3>
          {collection.featured && (
            <span className="bg-secondary/20 text-secondary text-xs px-2 py-0.5 rounded-sm font-lato font-medium tracking-wide uppercase shrink-0 ml-2">
              Destacada
            </span>
          )}
        </div>

        {collection.description && (
          <p className="font-lato text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
            {collection.description}
          </p>
        )}

        <button
          onClick={() => onViewProducts(collection.id)}
          className="inline-flex items-center gap-2 font-lato text-xs tracking-[0.15em] uppercase text-primary border-b border-primary pb-0.5 hover:opacity-70 transition-opacity"
        >
          Ver Rituales <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}