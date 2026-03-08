import { useState } from "react"
import { Link } from "react-router-dom"
import { User, Package, Star, Settings, LogOut, Plus, Shield } from "lucide-react"
import { MarketLayout } from "@/components/MarketLayout"
import { ListingCard } from "@/components/ListingCard"
import { LISTINGS } from "@/data/listings"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Tab = "listings" | "reviews" | "settings"

export default function Profile() {
  const [tab, setTab] = useState<Tab>("listings")
  const [isLoggedIn] = useState(true)

  const myListings = LISTINGS.slice(0, 3)

  if (!isLoggedIn) {
    return (
      <MarketLayout>
        <div className="flex flex-col items-center justify-center py-32 text-center px-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 mb-6">
            <User size={32} className="text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Войдите в аккаунт</h1>
          <p className="text-gray-400 mb-8">Чтобы управлять объявлениями и просматривать историю</p>
          <Button className="bg-white text-black hover:bg-gray-100 font-semibold px-8">
            Войти / Зарегистрироваться
          </Button>
        </div>
      </MarketLayout>
    )
  }

  return (
    <MarketLayout>
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Profile header */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-white/25 to-white/5 text-3xl font-bold text-white">
              А
            </div>

            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">Алексей Иванов</h1>
              <p className="mt-0.5 text-sm text-gray-400">alexey@email.com · Москва</p>
              <div className="mt-2 flex flex-wrap gap-3 text-sm">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Star size={14} className="fill-amber-400" />
                  <span>4.9</span>
                  <span className="text-gray-500">(23 отзыва)</span>
                </span>
                <span className="flex items-center gap-1.5 text-gray-400">
                  <Package size={14} />
                  {myListings.length} объявлений
                </span>
                <span className="flex items-center gap-1.5 text-green-400">
                  <Shield size={14} />
                  Верифицирован
                </span>
              </div>
            </div>

            <Link to="/new">
              <Button size="sm" className="bg-white text-black hover:bg-gray-100 font-semibold">
                <Plus size={16} className="mr-1.5" />
                Новое объявление
              </Button>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
          {([
            { key: "listings", label: "Мои объявления", icon: Package },
            { key: "reviews", label: "Отзывы", icon: Star },
            { key: "settings", label: "Настройки", icon: Settings },
          ] as const).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-all",
                tab === key ? "bg-white/15 text-white" : "text-gray-400 hover:text-white"
              )}
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "listings" && (
          <div>
            {myListings.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {myListings.map((l) => (
                  <ListingCard key={l.id} listing={l} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-gray-400 mb-4">У вас пока нет объявлений</p>
                <Link to="/new">
                  <Button size="sm" className="bg-white text-black hover:bg-gray-100">
                    Разместить первое
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {tab === "reviews" && (
          <div className="space-y-4">
            {[
              { name: "Михаил В.", rating: 5, text: "Отличный продавец! Всё как описано, быстро договорились. Рекомендую.", date: "01.03.2024" },
              { name: "Ольга С.", rating: 5, text: "Спасибо за честную продажу, товар в идеальном состоянии.", date: "15.02.2024" },
              { name: "Игорь Н.", rating: 4, text: "Хороший продавец, немного задержался с ответом, но в целом всё хорошо.", date: "10.02.2024" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{r.name}</p>
                      <p className="text-xs text-gray-500">{r.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={13} className={j < r.rating ? "fill-amber-400 text-amber-400" : "text-gray-600"} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-300">{r.text}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "settings" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
              <h3 className="font-semibold text-white">Личные данные</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[
                  { label: "Имя", placeholder: "Алексей" },
                  { label: "Фамилия", placeholder: "Иванов" },
                  { label: "Email", placeholder: "alexey@email.com" },
                  { label: "Телефон", placeholder: "+7 (999) 123-45-67" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="mb-1.5 block text-xs text-gray-400">{f.label}</label>
                    <input
                      placeholder={f.placeholder}
                      defaultValue={f.placeholder}
                      className="w-full rounded-xl border border-white/15 bg-white/8 px-3 py-2 text-sm text-white outline-none focus:border-white/30"
                    />
                  </div>
                ))}
              </div>
              <Button className="bg-white text-black hover:bg-gray-100 font-semibold">
                Сохранить
              </Button>
            </div>

            <button className="flex w-full items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-4 text-sm text-red-400 transition-colors hover:bg-red-500/10">
              <LogOut size={16} />
              Выйти из аккаунта
            </button>
          </div>
        )}
      </div>
    </MarketLayout>
  )
}
