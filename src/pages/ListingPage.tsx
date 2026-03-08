import { useParams, Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Heart, Eye, MapPin, Calendar, Share2, ChevronLeft, ChevronRight, MessageCircle, Star, Shield, ArrowLeft } from "lucide-react"
import { MarketLayout } from "@/components/MarketLayout"
import { ListingCard } from "@/components/ListingCard"
import { LISTINGS, formatPrice, getConditionLabel } from "@/data/listings"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ListingPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const listing = LISTINGS.find((l) => l.id === id)
  const [imgIdx, setImgIdx] = useState(0)
  const [fav, setFav] = useState(false)
  const [messageOpen, setMessageOpen] = useState(false)
  const [message, setMessage] = useState("")

  if (!listing) {
    return (
      <MarketLayout>
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <p className="text-5xl mb-4">😕</p>
          <p className="text-xl font-semibold text-white">Объявление не найдено</p>
          <Button onClick={() => navigate("/catalog")} className="mt-6">Вернуться в каталог</Button>
        </div>
      </MarketLayout>
    )
  }

  const similar = LISTINGS.filter((l) => l.categoryId === listing.categoryId && l.id !== listing.id).slice(0, 4)

  return (
    <MarketLayout>
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Назад
        </button>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left: images + description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image gallery */}
            <div className="relative overflow-hidden rounded-2xl bg-white/5">
              <img
                src={listing.images[imgIdx]}
                alt={listing.title}
                className="h-[380px] w-full object-cover md:h-[480px]"
              />

              {listing.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIdx((i) => Math.max(0, i - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
                  >
                    <ChevronLeft size={20} className="text-white" />
                  </button>
                  <button
                    onClick={() => setImgIdx((i) => Math.min(listing.images.length - 1, i + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
                  >
                    <ChevronRight size={20} className="text-white" />
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {listing.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIdx(i)}
                        className={cn("h-1.5 rounded-full transition-all", i === imgIdx ? "w-6 bg-white" : "w-1.5 bg-white/40")}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Thumbnails */}
              {listing.images.length > 1 && (
                <div className="absolute bottom-8 right-3 flex flex-col gap-1.5">
                  {listing.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className={cn("h-14 w-14 overflow-hidden rounded-lg border-2 transition-all", i === imgIdx ? "border-white" : "border-transparent opacity-60 hover:opacity-100")}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title + price */}
            <div>
              <div className="mb-2 flex flex-wrap gap-2">
                {listing.badge === "top" && (
                  <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400">ТОП</span>
                )}
                {listing.badge === "urgent" && (
                  <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-400">СРОЧНО</span>
                )}
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">
                  {getConditionLabel(listing.condition)}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">
                  {listing.category}
                </span>
              </div>

              <h1 className="mb-3 text-2xl font-bold leading-snug text-white md:text-3xl">{listing.title}</h1>
              <p className="text-3xl font-bold text-white">{formatPrice(listing.price)}</p>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5"><MapPin size={14} />{listing.city}</span>
                <span className="flex items-center gap-1.5"><Eye size={14} />{listing.views.toLocaleString("ru-RU")} просмотров</span>
                <span className="flex items-center gap-1.5"><Calendar size={14} />{new Date(listing.createdAt).toLocaleDateString("ru-RU")}</span>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="mb-3 font-semibold text-white">Описание</h2>
              <p className="text-sm leading-relaxed text-gray-300 whitespace-pre-line">{listing.description}</p>
            </div>
          </div>

          {/* Right: seller card + actions */}
          <div className="space-y-4">
            {/* Action buttons */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
              <Button
                onClick={() => setMessageOpen(true)}
                className="w-full bg-white text-black hover:bg-gray-100 font-semibold"
              >
                <MessageCircle size={16} className="mr-2" />
                Написать продавцу
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setFav(!fav)}
                  className={cn("flex-1 border-white/15 bg-white/5 hover:bg-white/10", fav ? "text-red-400 border-red-400/40" : "text-gray-300")}
                >
                  <Heart size={16} className={cn("mr-2", fav && "fill-red-400")} />
                  {fav ? "В избранном" : "В избранное"}
                </Button>
                <Button
                  variant="outline"
                  className="border-white/15 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                  onClick={() => navigator.share?.({ title: listing.title, url: window.location.href })}
                >
                  <Share2 size={16} />
                </Button>
              </div>
            </div>

            {/* Seller card */}
            <Link to={`/seller/${listing.sellerId}`}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-white/20 hover:bg-white/8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-white/5 text-lg font-bold text-white">
                    {listing.sellerName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{listing.sellerName}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-sm text-gray-300">{listing.sellerRating}</span>
                      <span className="text-xs text-gray-500">({listing.sellerReviews} отзывов)</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-400 hover:text-white transition-colors">Смотреть профиль →</span>
              </div>
            </Link>

            {/* Safety tip */}
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-4">
              <div className="flex gap-3">
                <Shield size={18} className="mt-0.5 shrink-0 text-green-400" />
                <div>
                  <p className="text-sm font-medium text-green-300">Безопасная сделка</p>
                  <p className="mt-1 text-xs text-gray-400 leading-relaxed">
                    Никогда не переводите деньги заранее. Встречайтесь лично или используйте наш безопасный эскроу.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-white">Похожие объявления</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Message modal */}
      {messageOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#1a1a1e] p-6 shadow-2xl">
            <h3 className="mb-4 text-lg font-semibold text-white">Написать продавцу</h3>
            <p className="mb-3 text-sm text-gray-400">Объявление: {listing.title}</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Здравствуйте! Интересует ваш товар..."
              rows={4}
              className="w-full resize-none rounded-xl border border-white/15 bg-white/8 p-3 text-sm text-white placeholder:text-gray-500 outline-none focus:border-white/30"
            />
            <div className="mt-4 flex gap-3">
              <Button
                onClick={() => { setMessageOpen(false); setMessage("") }}
                variant="outline"
                className="flex-1 border-white/15 text-gray-300 hover:text-white"
              >
                Отмена
              </Button>
              <Button
                onClick={() => { setMessageOpen(false); setMessage("") }}
                className="flex-1 bg-white text-black hover:bg-gray-100 font-semibold"
              >
                Отправить
              </Button>
            </div>
          </div>
        </div>
      )}
    </MarketLayout>
  )
}
