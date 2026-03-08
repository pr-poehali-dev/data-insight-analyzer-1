import { Link, useNavigate } from "react-router-dom"
import { Search, TrendingUp, Shield, MessageCircle, Star } from "lucide-react"
import { useState } from "react"
import { MarketLayout } from "@/components/MarketLayout"
import { ListingCard } from "@/components/ListingCard"
import { CATEGORIES, LISTINGS } from "@/data/listings"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Icon from "@/components/ui/icon"

export default function Home() {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/catalog?q=${encodeURIComponent(query.trim())}`)
  }

  const featured = LISTINGS.filter((l) => l.badge === "top").slice(0, 4)
  const recent = LISTINGS.slice(0, 8)

  return (
    <MarketLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#111115] via-[#161618] to-[#0d0d0f] py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/3 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-500/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Найди. Купи.{" "}
            <span className="bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
              Продай.
            </span>
          </h1>
          <p className="mb-8 text-lg text-gray-400">
            Миллионы объявлений — квартиры, машины, электроника и многое другое
          </p>

          <form onSubmit={handleSearch} className="mx-auto flex max-w-2xl gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Что ищете? iPhone, квартира, BMW..."
                className="h-12 rounded-xl border-white/15 bg-white/8 pl-11 text-base text-white placeholder:text-gray-500 focus:border-white/30"
              />
            </div>
            <Button type="submit" className="h-12 rounded-xl bg-white px-6 font-semibold text-black hover:bg-gray-100">
              Найти
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["iPhone 15", "Toyota Camry", "Квартира в Москве", "MacBook Pro"].map((s) => (
              <button
                key={s}
                onClick={() => navigate(`/catalog?q=${encodeURIComponent(s)}`)}
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-gray-400 transition-colors hover:border-white/30 hover:text-gray-200"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6 text-xl font-bold text-white">Категории</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/catalog?category=${cat.id}`}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-center transition-all hover:border-white/25 hover:bg-white/10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition-colors group-hover:bg-white/15">
                <Icon name={cat.icon} size={20} className="text-white" />
              </div>
              <span className="text-xs font-medium leading-tight text-gray-300 group-hover:text-white">
                {cat.name}
              </span>
              <span className="text-xs text-gray-500">{cat.count.toLocaleString("ru-RU")}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white">
            <TrendingUp size={20} className="text-amber-400" />
            Топ объявления
          </h2>
          <Link to="/catalog" className="text-sm text-gray-400 hover:text-white">
            Все →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </section>

      {/* Recent */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Свежие объявления</h2>
          <Link to="/catalog" className="text-sm text-gray-400 hover:text-white">
            Смотреть всё →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recent.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="border-t border-white/10 bg-white/2 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-10 text-center text-2xl font-bold text-white">Почему Bazaar?</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: <Shield size={28} className="text-green-400" />,
                title: "Безопасные сделки",
                desc: "Защита покупателя и продавца. Деньги хранятся на эскроу до подтверждения получения товара.",
              },
              {
                icon: <MessageCircle size={28} className="text-blue-400" />,
                title: "Чат внутри платформы",
                desc: "Общайтесь с продавцом прямо в приложении — без лишних звонков и личных данных.",
              },
              {
                icon: <Star size={28} className="text-amber-400" />,
                title: "Проверенные продавцы",
                desc: "Рейтинги и отзывы реальных покупателей помогут выбрать надёжного продавца.",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="mb-4">{item.icon}</div>
                <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketLayout>
  )
}