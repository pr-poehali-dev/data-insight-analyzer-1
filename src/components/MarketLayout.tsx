import { Link, useNavigate } from "react-router-dom"
import { Search, Heart, User, Plus, ShoppingBag, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
}

export function MarketLayout({ children }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) navigate(`/catalog?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d0d0f]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center gap-4">
            {/* Logo */}
            <Link to="/" className="flex shrink-0 items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <ShoppingBag size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">Bazaar</span>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="mx-4 hidden flex-1 md:flex">
              <div className="relative w-full max-w-2xl">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Поиск по объявлениям..."
                  className="w-full rounded-xl border-white/15 bg-white/8 pl-9 text-sm text-white placeholder:text-gray-500 focus:border-white/30 focus:bg-white/10"
                />
              </div>
            </form>

            {/* Nav */}
            <nav className="ml-auto hidden items-center gap-2 md:flex">
              <Link to="/catalog">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                  Каталог
                </Button>
              </Link>
              <Link to="/favorites">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                  <Heart size={16} className="mr-1.5" />
                  Избранное
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                  <User size={16} className="mr-1.5" />
                  Профиль
                </Button>
              </Link>
              <Link to="/new">
                <Button size="sm" className="bg-white text-black hover:bg-gray-100 font-semibold ml-2">
                  <Plus size={16} className="mr-1.5" />
                  Разместить
                </Button>
              </Link>
            </nav>

            {/* Mobile menu toggle */}
            <button
              className="ml-auto md:hidden text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile search */}
          <form onSubmit={handleSearch} className="pb-3 md:hidden">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск..."
                className="w-full rounded-xl border-white/15 bg-white/8 pl-9 text-sm text-white placeholder:text-gray-500"
              />
            </div>
          </form>
        </div>

        {/* Mobile menu */}
        <div className={cn("border-t border-white/10 bg-[#0d0d0f] md:hidden", mobileMenuOpen ? "block" : "hidden")}>
          <div className="flex flex-col gap-1 p-4">
            <Link to="/catalog" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Каталог</Link>
            <Link to="/favorites" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Избранное</Link>
            <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">Профиль</Link>
            <Link to="/new" onClick={() => setMobileMenuOpen(false)}>
              <Button size="sm" className="mt-2 w-full bg-white text-black hover:bg-gray-100 font-semibold">
                <Plus size={16} className="mr-1.5" />
                Разместить объявление
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/10 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-white/60" />
              <span className="text-sm font-bold text-white/60">Bazaar</span>
            </div>
            <p className="text-xs text-gray-500">© 2024 Bazaar. Безопасные сделки по всей России.</p>
            <div className="flex gap-4 text-xs text-gray-500">
              <span className="cursor-pointer hover:text-gray-300">Правила</span>
              <span className="cursor-pointer hover:text-gray-300">Безопасность</span>
              <span className="cursor-pointer hover:text-gray-300">Помощь</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
