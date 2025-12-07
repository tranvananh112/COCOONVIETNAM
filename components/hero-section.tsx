import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Leaf, Heart, Sparkles, Shield, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-secondary to-background"
      aria-label="Giới thiệu Cocoon"
    >
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* Content */}
          <article className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
              <Leaf className="h-4 w-4" aria-hidden="true" />
              <span>100% Thuần chay Việt Nam</span>
            </div>

            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              Mỹ Phẩm Thuần Chay <span className="text-primary">Cocoon</span> - Sống Xanh Mỗi Ngày
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mx-auto md:mx-0 leading-relaxed">
              Khám phá bộ sưu tập mỹ phẩm thiên nhiên từ <strong>nguyên liệu Việt Nam</strong>: nước tẩy trang hoa hồng,
              serum bí đao, mặt nạ nghệ Hưng Yên.
              <em>An toàn, hiệu quả và không thử nghiệm trên động vật.</em>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/products" aria-label="Xem tất cả sản phẩm Cocoon">
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                  Khám phá sản phẩm
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/about" aria-label="Tìm hiểu về Cocoon Vietnam">
                <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                  Câu chuyện thương hiệu
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 justify-center md:justify-start pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>Cruelty-Free</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>100% Tự nhiên</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>An toàn cho da</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>Thương hiệu Việt</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50 mt-6">
              <div className="text-center md:text-left">
                <p className="text-2xl font-bold text-primary">50K+</p>
                <p className="text-xs text-muted-foreground">Khách hàng tin dùng</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-2xl font-bold text-primary">9+</p>
                <p className="text-xs text-muted-foreground">Sản phẩm chất lượng</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-2xl font-bold text-primary">4.9</p>
                <p className="text-xs text-muted-foreground">Đánh giá trung bình</p>
              </div>
            </div>
          </article>

          {/* Hero Image */}
          <figure className="relative">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted">
              <Image
                src="/images/design-mode/bcr.jpg"
                alt="Bộ sưu tập mỹ phẩm thuần chay Cocoon Vietnam - Nước tẩy trang, serum, mặt nạ từ nguyên liệu thiên nhiên Việt Nam"
                fill
                className="object-cover rounded-none"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Decorative elements */}
            <div
              className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-primary/20 blur-2xl"
              aria-hidden="true"
            />
            <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-accent/30 blur-2xl" aria-hidden="true" />
          </figure>
        </div>
      </div>
    </section>
  )
}
