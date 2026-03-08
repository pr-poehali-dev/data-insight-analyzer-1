import { useState, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { SlidersHorizontal, ChevronDown, X } from "lucide-react"
import { MarketLayout } from "@/components/MarketLayout"
import { ListingCard } from "@/components/ListingCard"
import { LISTINGS, CATEGORIES } from "@/data/listings"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const SORT_OPTIONS = [
  { value: "date", label: "По дате" },
  { value: "price_asc", label: "Цена: по возрастанию" },
  { value: "price_desc", label: "Цена: по убыванию" },
  { value: "views", label: "По просмотрам" },
]

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sort, setSort] = useState("date")
  const [sortOpen, setSortOpen] = useState(false)
  const [priceFrom, setPriceFrom] = useState("")
  const [priceTo, setPriceTo] = useState("")
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])

  const q = searchParams.get("q") || ""
  const categoryId = searchParams.get("category") || ""

  const filtered = useMemo(() => {
    let result = [...LISTINGS]
    if (q) result = result.filter((l) => l.title.toLowerCase().includes(q.toLowerCase()) || l.description.toLowerCase().includes(q.toLowerCase()))
    if (categoryId) result = result.filter((l) => l.categoryId === categoryId)
    if (priceFrom) result = result.filter((l) => l.price >= Number(priceFrom))
    if (priceTo) result = result.filter((l) => l.price <= Number(priceTo))
    if (selectedConditions.length) result = result.filter((l) => selectedConditions.includes(l.condition))

    if (sort === "price_asc") result.sort((a, b) => a.price - b.price)
    else if (sort === "price_desc") result.sort((a, b) => b.price - a.price)
    else if (sort === "views") result.sort((a, b) => b.views - a.views)
    else result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return result
  }, [q, categoryId, priceFrom, priceTo, selectedConditions, sort])

  const toggleCondition = (c: string) => {
    setSelectedConditions((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c])
  }

  const clearFilters = () => {
    setPriceFrom("")
    setPriceTo("")
    setSelectedConditions([])
    setSearchParams({})
  }

  const hasFilters = q || categoryId || priceFrom || priceTo || selectedConditions.length > 0
  const currentCategory = CATEGORIES.find((c) => c.id === categoryId)

  return (
    <MarketLayout>
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {q ? `Поиск: «${q}»` : currentCategory ? currentCategory.name : "Все объявления"}
            </h1>
            <p className="mt-1 text-sm text-gray-400">Найдено {filtered.length} объявлений</p>
          </div>

          <div className="flex gap-2">
            {/* Sort */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOpen(!sortOpen)}
                className="border-white/15 bg-white/5 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
              >
                {SORT_OPTIONS.find((o) => o.value === sort)?.label}
                <ChevronDown size={14} className="ml-2" />
              </Button>
              {sortOpen && (
                <div className="absolute right-0 top-10 z-50 w-52 rounded-xl border border-white/15 bg-[#1a1a1e] shadow-xl">
                  {SORT_OPTIONS.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => { setSort(o.value); setSortOpen(false) }}
                      className={cn(
                        "block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-white/10",
                        sort === o.value ? "text-white font-medium" : "text-gray-400"
                      )}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filters toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="border-white/15 bg-white/5 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <SlidersHorizontal size={14} className="mr-2" />
              Фильтры
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar filters */}
          <aside className={cn("w-64 shrink-0", filtersOpen ? "block" : "hidden lg:block")}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-semibold text-white">Фильтры</h3>
                {hasFilters && (
                  <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-gray-400 hover:text-white">
                    <X size={12} /> Сбросить
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Категория</p>
                <div className="space-y-1">
                  <button
                    onClick={() => setSearchParams(q ? { q } : {})}
                    className={cn(
                      "block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      !categoryId ? "bg-white/15 text-white font-medium" : "text-gray-400 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    Все категории
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSearchParams(q ? { q, category: cat.id } : { category: cat.id })}
                      className={cn(
                        "block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                        categoryId === cat.id ? "bg-white/15 text-white font-medium" : "text-gray-400 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Цена, ₽</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="От"
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                    className="border-white/15 bg-white/8 text-sm text-white placeholder:text-gray-600"
                  />
                  <Input
                    placeholder="До"
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                    className="border-white/15 bg-white/8 text-sm text-white placeholder:text-gray-600"
                  />
                </div>
              </div>

              {/* Condition */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Состояние</p>
                <div className="space-y-2">
                  {[
                    { value: "new", label: "Новое" },
                    { value: "excellent", label: "Отличное" },
                    { value: "used", label: "Б/у" },
                  ].map((c) => (
                    <label key={c.value} className="flex cursor-pointer items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedConditions.includes(c.value)}
                        onChange={() => toggleCondition(c.value)}
                        className="h-4 w-4 rounded border-white/20 bg-white/10 accent-white"
                      />
                      <span className="text-sm text-gray-300">{c.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-5xl mb-4">🔍</p>
                <p className="text-lg font-semibold text-white">Ничего не найдено</p>
                <p className="mt-1 text-sm text-gray-400">Попробуйте изменить фильтры или поисковый запрос</p>
                <Button onClick={clearFilters} variant="outline" size="sm" className="mt-4 border-white/20 text-gray-300 hover:text-white">
                  Сбросить фильтры
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((l) => (
                  <ListingCard key={l.id} listing={l} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MarketLayout>
  )
}
