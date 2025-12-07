import { Leaf, Heart, Recycle, Shield } from "lucide-react"

const values = [
  {
    icon: Leaf,
    title: "100% Thuần chay",
    description: "Tất cả sản phẩm đều không chứa thành phần từ động vật",
  },
  {
    icon: Heart,
    title: "Cruelty-free",
    description: "Không thử nghiệm trên động vật, cam kết nhân đạo",
  },
  {
    icon: Recycle,
    title: "Thân thiện môi trường",
    description: "Bao bì tái chế, quy trình sản xuất xanh",
  },
  {
    icon: Shield,
    title: "An toàn cho da",
    description: "Nguyên liệu tự nhiên, không hóa chất độc hại",
  },
]

export function BrandValues() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Cam kết của chúng tôi</h2>
          <p className="mt-2 text-muted-foreground">Vì một vẻ đẹp bền vững và có trách nhiệm</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="text-center p-6 rounded-2xl bg-card border transition-all hover:shadow-lg"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                <value.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
