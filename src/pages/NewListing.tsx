import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Upload, X, ArrowLeft, CheckCircle } from "lucide-react"
import { MarketLayout } from "@/components/MarketLayout"
import { CATEGORIES } from "@/data/listings"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function NewListing() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    condition: "",
    city: "",
    description: "",
  })
  const [images, setImages] = useState<string[]>([])

  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  const isStep1Valid = form.category !== ""
  const isStep2Valid = form.title.length >= 5 && form.price !== "" && form.condition !== "" && form.city !== ""

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <MarketLayout>
        <div className="flex flex-col items-center justify-center py-32 text-center px-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 mb-6">
            <CheckCircle size={40} className="text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Объявление опубликовано!</h1>
          <p className="text-gray-400 mb-8 max-w-sm">
            Ваше объявление успешно размещено и уже видно другим пользователям.
          </p>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate("/catalog")}
              className="bg-white text-black hover:bg-gray-100 font-semibold"
            >
              Перейти в каталог
            </Button>
            <Button
              variant="outline"
              onClick={() => { setSubmitted(false); setStep(1); setForm({ title: "", category: "", price: "", condition: "", city: "", description: "" }); setImages([]) }}
              className="border-white/20 text-gray-300 hover:text-white"
            >
              Ещё одно
            </Button>
          </div>
        </div>
      </MarketLayout>
    )
  }

  return (
    <MarketLayout>
      <div className="mx-auto max-w-2xl px-4 py-8">
        <button
          onClick={() => step > 1 ? setStep(s => s - 1) : navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> {step > 1 ? "Назад" : "Отмена"}
        </button>

        <h1 className="mb-2 text-2xl font-bold text-white">Разместить объявление</h1>
        <p className="mb-8 text-sm text-gray-400">Это бесплатно и займёт пару минут</p>

        {/* Steps */}
        <div className="mb-8 flex gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-1 flex-col gap-1.5">
              <div className={`h-1 rounded-full transition-colors ${step >= s ? "bg-white" : "bg-white/15"}`} />
              <span className={`text-xs ${step >= s ? "text-gray-300" : "text-gray-600"}`}>
                {s === 1 ? "Категория" : s === 2 ? "Детали" : "Фото"}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Category */}
        {step === 1 && (
          <div>
            <h2 className="mb-4 font-semibold text-white">Выберите категорию</h2>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { set("category", cat.id); setStep(2) }}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    form.category === cat.id
                      ? "border-white/40 bg-white/15 text-white"
                      : "border-white/10 bg-white/5 text-gray-300 hover:border-white/25 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <p className="font-medium">{cat.name}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{cat.count.toLocaleString("ru-RU")} объявлений</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <Label className="mb-2 block text-sm text-gray-300">Заголовок объявления *</Label>
              <Input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Например: iPhone 14 Pro, 256GB, фиолетовый"
                className="border-white/15 bg-white/8 text-white placeholder:text-gray-500"
              />
              <p className="mt-1 text-xs text-gray-500">{form.title.length}/100 символов</p>
            </div>

            <div>
              <Label className="mb-2 block text-sm text-gray-300">Цена, ₽ *</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                placeholder="0"
                className="border-white/15 bg-white/8 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm text-gray-300">Состояние *</Label>
              <div className="flex gap-2">
                {[
                  { value: "new", label: "Новое" },
                  { value: "excellent", label: "Отличное" },
                  { value: "used", label: "Б/у" },
                ].map((c) => (
                  <button
                    key={c.value}
                    onClick={() => set("condition", c.value)}
                    className={`flex-1 rounded-xl border py-2.5 text-sm font-medium transition-all ${
                      form.condition === c.value
                        ? "border-white/40 bg-white/15 text-white"
                        : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-gray-200"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-2 block text-sm text-gray-300">Город *</Label>
              <Input
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                placeholder="Москва"
                className="border-white/15 bg-white/8 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm text-gray-300">Описание</Label>
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Расскажите подробнее о товаре: состояние, комплектация, причина продажи..."
                rows={5}
                className="w-full resize-none rounded-xl border border-white/15 bg-white/8 p-3 text-sm text-white placeholder:text-gray-500 outline-none focus:border-white/30 transition-colors"
              />
            </div>

            <Button
              onClick={() => setStep(3)}
              disabled={!isStep2Valid}
              className="w-full bg-white text-black hover:bg-gray-100 font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Далее →
            </Button>
          </div>
        )}

        {/* Step 3: Photos */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="font-semibold text-white">Добавьте фотографии</h2>
            <p className="text-sm text-gray-400">Объявления с фото получают в 3 раза больше откликов</p>

            <div className="grid grid-cols-3 gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                  <img src={img} alt="" className="h-full w-full object-cover" />
                  <button
                    onClick={() => setImages((imgs) => imgs.filter((_, j) => j !== i))}
                    className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 hover:bg-black/80"
                  >
                    <X size={12} className="text-white" />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
                      Главное
                    </span>
                  )}
                </div>
              ))}

              {images.length < 10 && (
                <button
                  onClick={() => {
                    const stockPhotos = [
                      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
                      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80",
                      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80",
                    ]
                    setImages((imgs) => [...imgs, stockPhotos[imgs.length % stockPhotos.length]])
                  }}
                  className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/20 text-gray-500 transition-colors hover:border-white/40 hover:text-gray-300"
                >
                  <Upload size={24} />
                  <span className="text-xs">Добавить</span>
                </button>
              )}
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="mb-3 text-sm font-medium text-white">Итог:</h3>
              <div className="space-y-1.5 text-sm text-gray-400">
                <div className="flex justify-between"><span>Категория</span><span className="text-white">{CATEGORIES.find(c => c.id === form.category)?.name}</span></div>
                <div className="flex justify-between"><span>Название</span><span className="text-white truncate ml-4 max-w-[200px]">{form.title}</span></div>
                <div className="flex justify-between"><span>Цена</span><span className="text-white">{Number(form.price).toLocaleString("ru-RU")} ₽</span></div>
                <div className="flex justify-between"><span>Город</span><span className="text-white">{form.city}</span></div>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-white text-black hover:bg-gray-100 font-semibold h-12"
            >
              Опубликовать объявление
            </Button>
          </div>
        )}
      </div>
    </MarketLayout>
  )
}
