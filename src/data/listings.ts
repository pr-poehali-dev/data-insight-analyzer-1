export type Category = {
  id: string
  name: string
  icon: string
  count: number
}

export type Listing = {
  id: string
  title: string
  price: number
  currency: string
  category: string
  categoryId: string
  city: string
  condition: "new" | "used" | "excellent"
  description: string
  images: string[]
  sellerId: string
  sellerName: string
  sellerRating: number
  sellerReviews: number
  createdAt: string
  views: number
  isFavorite?: boolean
  badge?: "top" | "urgent" | null
}

export const CATEGORIES: Category[] = [
  { id: "realty", name: "Недвижимость", icon: "Building2", count: 12480 },
  { id: "cars", name: "Автомобили", icon: "Car", count: 8920 },
  { id: "electronics", name: "Электроника", icon: "Smartphone", count: 34210 },
  { id: "clothes", name: "Одежда", icon: "Shirt", count: 18750 },
  { id: "furniture", name: "Мебель", icon: "Sofa", count: 6340 },
  { id: "sport", name: "Спорт", icon: "Dumbbell", count: 4120 },
  { id: "kids", name: "Детские товары", icon: "Baby", count: 9870 },
  { id: "garden", name: "Дача и сад", icon: "Leaf", count: 2890 },
]

export const LISTINGS: Listing[] = [
  {
    id: "1",
    title: "iPhone 15 Pro Max 256GB Natural Titanium",
    price: 89900,
    currency: "₽",
    category: "Электроника",
    categoryId: "electronics",
    city: "Москва",
    condition: "excellent",
    description: "Куплен 3 месяца назад, в идеальном состоянии. Комплект полный: коробка, все кабели, документы. Есть чек. Причина продажи — подарили новый. Торг уместен.",
    images: [
      "https://images.unsplash.com/photo-1696446702183-8d78b027e9e2?w=600&q=80",
      "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600&q=80",
    ],
    sellerId: "u1",
    sellerName: "Алексей К.",
    sellerRating: 4.9,
    sellerReviews: 47,
    createdAt: "2024-03-01",
    views: 1243,
    badge: "top",
  },
  {
    id: "2",
    title: "Квартира 2-комнатная, 58 м², Пресненский район",
    price: 18500000,
    currency: "₽",
    category: "Недвижимость",
    categoryId: "realty",
    city: "Москва",
    condition: "excellent",
    description: "Продаётся уютная двушка в тихом центре. Евроремонт 2022 года. Кухня-студия, панорамные окна. Развитая инфраструктура. Рядом метро Баррикадная (5 мин пешком).",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&q=80",
    ],
    sellerId: "u2",
    sellerName: "Ирина М.",
    sellerRating: 5.0,
    sellerReviews: 12,
    createdAt: "2024-02-28",
    views: 4890,
    badge: null,
  },
  {
    id: "3",
    title: "BMW X5 xDrive40i 2021, 48 000 км",
    price: 6200000,
    currency: "₽",
    category: "Автомобили",
    categoryId: "cars",
    city: "Санкт-Петербург",
    condition: "excellent",
    description: "Один владелец, полная история обслуживания в официальном дилере. Все ТО пройдены. Комплектация M Sport, панорамная крыша, кожаный салон. Не крашена.",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
      "https://images.unsplash.com/photo-1617531653332-bd46c16f7d5b?w=600&q=80",
    ],
    sellerId: "u3",
    sellerName: "Дмитрий Р.",
    sellerRating: 4.7,
    sellerReviews: 23,
    createdAt: "2024-02-25",
    views: 3210,
    badge: "urgent",
  },
  {
    id: "4",
    title: "MacBook Pro 14\" M3 Pro, 18GB/512GB",
    price: 159000,
    currency: "₽",
    category: "Электроника",
    categoryId: "electronics",
    city: "Москва",
    condition: "new",
    description: "Запечатанный, не вскрывался. Куплен в официальном магазине Apple. Цвет — Space Black. Гарантия Apple 1 год. Чек в наличии.",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    ],
    sellerId: "u4",
    sellerName: "Мария С.",
    sellerRating: 4.8,
    sellerReviews: 89,
    createdAt: "2024-03-02",
    views: 892,
    badge: "top",
  },
  {
    id: "5",
    title: "Диван угловой, серый, 280×180 см",
    price: 34500,
    currency: "₽",
    category: "Мебель",
    categoryId: "furniture",
    city: "Екатеринбург",
    condition: "used",
    description: "Продаю в связи с переездом. Диван в хорошем состоянии, без пятен и разрывов. Механизм раскладывания работает отлично. Самовывоз или доставка за счёт покупателя.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    ],
    sellerId: "u5",
    sellerName: "Сергей Л.",
    sellerRating: 4.5,
    sellerReviews: 8,
    createdAt: "2024-02-20",
    views: 456,
    badge: null,
  },
  {
    id: "6",
    title: "Nike Air Jordan 1 Retro High, 42 EU",
    price: 18900,
    currency: "₽",
    category: "Одежда",
    categoryId: "clothes",
    city: "Казань",
    condition: "new",
    description: "Новые, ни разу не надевались. Куплены в оригинальном магазине, есть чек. Оригинал 100%. Коробка сохранена. Размер 42 EU / 9 US.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    ],
    sellerId: "u6",
    sellerName: "Артём Н.",
    sellerRating: 4.6,
    sellerReviews: 31,
    createdAt: "2024-03-03",
    views: 1102,
    badge: null,
  },
  {
    id: "7",
    title: "Samsung 65\" QLED 4K Smart TV 2023",
    price: 74900,
    currency: "₽",
    category: "Электроника",
    categoryId: "electronics",
    city: "Новосибирск",
    condition: "excellent",
    description: "Телевизор в идеальном состоянии, использовался 8 месяцев. Все настройки сброшены. Работает безупречно. Отдам с оригинальной подставкой и пультом.",
    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80",
    ],
    sellerId: "u7",
    sellerName: "Наталья В.",
    sellerRating: 4.9,
    sellerReviews: 15,
    createdAt: "2024-02-15",
    views: 2341,
    badge: null,
  },
  {
    id: "8",
    title: "Toyota Camry 3.5 V6 2020, 62 000 км",
    price: 2850000,
    currency: "₽",
    category: "Автомобили",
    categoryId: "cars",
    city: "Краснодар",
    condition: "excellent",
    description: "Один хозяин, не такси, не аренда. Обслуживание у официального дилера. Комплектация Premium+. Подогрев сидений и руля, камера 360°. Без ДТП.",
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80",
    ],
    sellerId: "u8",
    sellerName: "Павел Г.",
    sellerRating: 4.8,
    sellerReviews: 19,
    createdAt: "2024-02-18",
    views: 5670,
    badge: "urgent",
  },
  {
    id: "9",
    title: "Студия 32 м², ЖК «Символ», Лефортово",
    price: 7900000,
    currency: "₽",
    category: "Недвижимость",
    categoryId: "realty",
    city: "Москва",
    condition: "new",
    description: "Квартира в новом доме, чистовая отделка от застройщика. Высокие потолки 2.9м. Хорошая транспортная доступность. Рядом парк «Лефортово».",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    ],
    sellerId: "u9",
    sellerName: "Анна Б.",
    sellerRating: 4.7,
    sellerReviews: 6,
    createdAt: "2024-03-04",
    views: 3120,
    badge: null,
  },
  {
    id: "10",
    title: "PS5 + 3 игры + два геймпада",
    price: 52000,
    currency: "₽",
    category: "Электроника",
    categoryId: "electronics",
    city: "Уфа",
    condition: "excellent",
    description: "PS5 в отличном состоянии. В комплекте: God of War Ragnarök, Horizon FW, Spider-Man 2. Оба геймпада работают. Продаю потому что переезжаю.",
    images: [
      "https://images.unsplash.com/photo-1607853202273-232359ef7e3a?w=600&q=80",
    ],
    sellerId: "u10",
    sellerName: "Роман Ф.",
    sellerRating: 4.4,
    sellerReviews: 42,
    createdAt: "2024-02-22",
    views: 1876,
    badge: null,
  },
  {
    id: "11",
    title: "Велосипед Trek FX 3 2022, рама M",
    price: 42000,
    currency: "₽",
    category: "Спорт",
    categoryId: "sport",
    city: "Москва",
    condition: "excellent",
    description: "Городской гибридный велосипед. Пробег около 1500 км. Хранился в квартире, обслуживался в веломастерской. Полная комплектация, в отличном состоянии.",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    ],
    sellerId: "u11",
    sellerName: "Кирилл П.",
    sellerRating: 5.0,
    sellerReviews: 7,
    createdAt: "2024-03-01",
    views: 678,
    badge: null,
  },
  {
    id: "12",
    title: "Коляска Bugaboo Fox 5, серая",
    price: 58000,
    currency: "₽",
    category: "Детские товары",
    categoryId: "kids",
    city: "Санкт-Петербург",
    condition: "excellent",
    description: "Продаём коляску в отличном состоянии. Использовали год. Полный комплект: прогулочный блок, люлька, дождевик, сумка. Цвет Forest Green.",
    images: [
      "https://images.unsplash.com/photo-1544777961-ca9a3f40e4b6?w=600&q=80",
    ],
    sellerId: "u12",
    sellerName: "Светлана О.",
    sellerRating: 4.9,
    sellerReviews: 5,
    createdAt: "2024-02-26",
    views: 934,
    badge: null,
  },
]

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU").format(price) + " ₽"
}

export function getConditionLabel(condition: Listing["condition"]): string {
  const map = { new: "Новое", excellent: "Отличное", used: "Б/у" }
  return map[condition]
}
