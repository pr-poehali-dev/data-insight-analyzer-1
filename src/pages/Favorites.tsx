import { Link } from "react-router-dom"
import { Heart } from "lucide-react"
import { MarketLayout } from "@/components/MarketLayout"
import { Button } from "@/components/ui/button"

export default function Favorites() {
  return (
    <MarketLayout>
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 mx-auto mb-6">
          <Heart size={32} className="text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Избранное пусто</h1>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto">
          Нажмите на ❤️ в любом объявлении, чтобы сохранить его здесь
        </p>
        <Link to="/catalog">
          <Button className="bg-white text-black hover:bg-gray-100 font-semibold">
            Перейти в каталог
          </Button>
        </Link>
      </div>
    </MarketLayout>
  )
}
