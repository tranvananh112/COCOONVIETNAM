import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BrandValues } from "@/components/brand-values"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div className="space-y-6">
                <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">Về Cocoon Vietnam</h1>
                <p className="text-lg text-muted-foreground">
                  Cocoon là thương hiệu mỹ phẩm thuần chay đầu tiên tại Việt Nam, mang đến các sản phẩm chăm sóc da từ
                  nguyên liệu thiên nhiên bản địa như hoa hồng, sen Hậu Giang, nghệ Hưng Yên và bí đao.
                </p>
                <p className="text-muted-foreground">
                  Chúng tôi tin rằng vẻ đẹp thực sự đến từ sự hài hòa với thiên nhiên. Mỗi sản phẩm Cocoon đều được
                  nghiên cứu và phát triển với tiêu chí an toàn, hiệu quả và thân thiện với môi trường.
                </p>
              </div>
              <div className="relative aspect-square rounded-3xl overflow-hidden">
                <Image
                  src="/natural-cosmetics-laboratory-vietnam.jpg"
                  alt="Cocoon laboratory"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <BrandValues />

        {/* Story */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl mb-6">
                Câu chuyện của chúng tôi
              </h2>
              <p className="text-muted-foreground mb-4">
                Cocoon ra đời từ niềm đam mê với vẻ đẹp tự nhiên và mong muốn mang đến cho người Việt những sản phẩm
                chăm sóc da an toàn, hiệu quả mà không gây hại đến động vật hay môi trường.
              </p>
              <p className="text-muted-foreground">
                Chúng tôi tự hào sử dụng nguyên liệu từ các vùng nông nghiệp trên khắp Việt Nam, hỗ trợ nông dân địa
                phương và bảo tồn các giống cây truyền thống quý báu của đất nước.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
