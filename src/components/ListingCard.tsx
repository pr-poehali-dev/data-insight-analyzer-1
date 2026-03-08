import { Link } from "react-router-dom"
import { Heart, Eye, MapPin } from "lucide-react"
import { useState } from "react"
import { type Listing, formatPrice, getConditionLabel } from "@/data/listings"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Props = {
  listing: Listing
}

export function ListingCard({ listing }: Props) {
  const [fav, setFav] = useState(listing.isFavorite ?? false)

  return (
    <Link to={`/listing/${listing.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex gap-2">
            {listing.badge === "top" && (
              <span className="rounded-full bg-amber-500/90 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
                ТОП
              </span>
            )}
            {listing.badge === "urgent" && (
              <span className="rounded-full bg-red-500/90 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
                СРОЧНО
              </span>
            )}
          </div>

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setFav(!fav)
            }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-colors hover:bg-black/60"
          >
            <Heart
              size={16}
              className={cn("transition-colors", fav ? "fill-red-500 text-red-500" : "text-white")}
            />
          </button>

          {/* Condition */}
          <div className="absolute bottom-3 left-3">
            <span className="rounded-full bg-black/50 px-2.5 py-0.5 text-xs text-white/80 backdrop-blur-sm">
              {getConditionLabel(listing.condition)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="mb-1 line-clamp-2 text-sm font-semibold leading-snug text-white">
            {listing.title}
          </p>

          <p className="mb-3 text-xl font-bold text-white">
            {formatPrice(listing.price)}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin size={11} />
              <span>{listing.city}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={11} />
              <span>{listing.views.toLocaleString("ru-RU")}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
