import { useParams, useNavigate } from "react-router-dom"
import { Star, MapPin, ArrowLeft, ShieldCheck, Package } from "lucide-react"
import { MarketLayout } from "@/components/MarketLayout"
import { ListingCard } from "@/components/ListingCard"
import { LISTINGS } from "@/data/listings"
import { Button } from "@/components/ui/button"

export default function SellerProfile() {
  const { id } = useParams()
  const navigate = useNavigate()

  const listings = LISTINGS.filter((l) => l.sellerId === id)
  const seller = listings[0]

  if (!seller) {
    return (
      <MarketLayout>
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <p className="text-5xl mb-4">👤</p>
          <p className="text-xl font-semibold text-white">Продавец не найден</p>
          <Button onClick={() => navigate("/catalog")} className="mt-6">В каталог</Button>
        </div>
      </MarketLayout>
    )
  }

  return (
    <MarketLayout>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Назад
        </button>

        {/* Profile header */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-8">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-white/25 to-white/5 text-4xl font-bold text-white">
              {seller.sellerName.charAt(0)}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">{seller.sellerName}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Star size={15} className="fill-amber-400 text-amber-400" />
                  <span className="font-medium text-white">{seller.sellerRating}</span>
                  <span>({seller.sellerReviews} отзывов)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Package size={15} />
                  {listings.length} объявлений
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={15} />
                  {seller.city}
                </span>
              </div>
            </div>

            {seller.sellerRating >= 4.8 && (
              <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2">
                <ShieldCheck size={18} className="text-green-400" />
                <span className="text-sm font-medium text-green-300">Надёжный продавец</span>
              </div>
            )}
          </div>
        </div>

        {/* Listings */}
        <div>
          <h2 className="mb-5 text-xl font-bold text-white">
            Объявления продавца ({listings.length})
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {listings.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>

          {listings.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-gray-400">У этого продавца нет активных объявлений</p>
            </div>
          )}
        </div>
      </div>
    </MarketLayout>
  )
}
