import { Leaf, Recycle, FlaskRound, Truck, ShieldCheck, Heart } from "lucide-react"

const features = [
  {
    icon: Leaf,
    title: "100% Thuần Chay",
    description: "Tất cả sản phẩm đều được làm từ nguyên liệu thực vật, không có thành phần từ động vật.",
  },
  {
    icon: FlaskRound,
    title: "Không Hóa Chất Độc Hại",
    description: "Không paraben, không sulfate, không hương liệu nhân tạo. An toàn cho mọi loại da.",
  },
  {
    icon: Heart,
    title: "Cruelty-Free",
    description: "Cam kết không thử nghiệm trên động vật. Được chứng nhận bởi các tổ chức quốc tế.",
  },
  {
    icon: Recycle,
    title: "Bao Bì Thân Thiện",
    description: "Sử dụng bao bì có thể tái chế, giảm thiểu tác động đến môi trường.",
  },
  {
    icon: ShieldCheck,
    title: "Kiểm Định Chất Lượng",
    description: "Mỗi sản phẩm đều được kiểm nghiệm nghiêm ngặt trước khi đến tay khách hàng.",
  },
  {
    icon: Truck,
    title: "Giao Hàng Toàn Quốc",
    description: "Miễn phí giao hàng cho đơn từ 500.000đ. Giao nhanh trong 2-3 ngày.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30" aria-labelledby="why-choose-heading">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <span className="inline-block text-primary text-sm font-medium mb-2">Tại sao chọn Cocoon?</span>
          <h2
            id="why-choose-heading"
            className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance"
          >
            Cam Kết Của Chúng Tôi Với Bạn
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Cocoon không chỉ là mỹ phẩm, đó là lựa chọn sống xanh và có trách nhiệm với bản thân, cộng đồng và môi
            trường.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <article
              key={index}
              className="group p-6 bg-background rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
