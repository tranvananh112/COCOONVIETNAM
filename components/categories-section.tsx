import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    name: "Làm sạch",
    description: "Tẩy trang & Sữa rửa mặt",
    image: "/skincare-cleansing-products.jpg",
    count: 3,
  },
  {
    name: "Dưỡng da",
    description: "Tinh chất & Toner & Gel",
    image: "/skincare-serum-toner-moisturizer.jpg",
    count: 4,
  },
  {
    name: "Mặt nạ",
    description: "Mặt nạ thiên nhiên",
    image: "/natural-face-mask-turmeric.jpg",
    count: 1,
  },
  {
    name: "Bảo vệ",
    description: "Kem chống nắng",
    image: "/sunscreen-protection-skincare.jpg",
    count: 1,
  },
]

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Danh mục sản phẩm</h2>
          <p className="mt-2 text-muted-foreground">Khám phá các dòng sản phẩm chăm sóc da của chúng tôi</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-card">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.description}</p>
                  <p className="text-xs text-white/60 mt-1">{category.count} sản phẩm</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
