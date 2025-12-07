import Image from "next/image"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Thị Minh Anh",
    role: "Nhân viên văn phòng",
    avatar: "/vietnamese-woman-portrait-professional.jpg",
    content:
      "Mình đã dùng nước tẩy trang hoa hồng được 3 tháng rồi. Da mình sạch hơn, mịn màng hơn mà không bị khô căng. Rất thích mùi hương tự nhiên!",
    rating: 5,
    product: "Nước tẩy trang hoa hồng",
  },
  {
    id: 2,
    name: "Trần Văn Hoàng",
    role: "Sinh viên",
    avatar: "/vietnamese-young-man-portrait-student.jpg",
    content:
      "Serum bí đao thật sự hiệu quả! Mình bị mụn nhiều mà sau 1 tháng sử dụng đã giảm đáng kể. Giá cả cũng rất hợp lý.",
    rating: 5,
    product: "Serum bí đao",
  },
  {
    id: 3,
    name: "Lê Thị Hương",
    role: "Bà nội trợ",
    avatar: "/vietnamese-middle-aged-woman-portrait-friendly.jpg",
    content:
      "Mặt nạ nghệ Hưng Yên làm da mình sáng lên rõ rệt. Cả gia đình mình giờ đều dùng sản phẩm Cocoon vì rất an toàn và lành tính.",
    rating: 5,
    product: "Mặt nạ nghệ Hưng Yên",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <span className="inline-block text-primary text-sm font-medium mb-2">Đánh giá từ khách hàng</span>
          <h2 id="testimonials-heading" className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Khách Hàng Nói Gì Về Cocoon?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Hơn 50,000 khách hàng đã tin tưởng và yêu thích các sản phẩm của chúng tôi.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="relative p-6 bg-secondary/30 rounded-2xl border border-border/50"
              itemScope
              itemType="https://schema.org/Review"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" aria-hidden="true" />

              {/* Rating */}
              <div className="flex gap-1 mb-4" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                <meta itemProp="ratingValue" content={String(testimonial.rating)} />
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-foreground mb-4 leading-relaxed" itemProp="reviewBody">
                "{testimonial.content}"
              </blockquote>

              {/* Product */}
              <p className="text-sm text-primary mb-4" itemProp="itemReviewed">
                Sản phẩm: {testimonial.product}
              </p>

              {/* Author */}
              <footer
                className="flex items-center gap-3"
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
              >
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={`Ảnh đại diện của ${testimonial.name}`}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-foreground" itemProp="name">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>

        {/* Aggregate Rating for SEO */}
        <div className="sr-only" itemScope itemType="https://schema.org/AggregateRating">
          <span itemProp="ratingValue">4.9</span>
          <span itemProp="reviewCount">50000</span>
          <span itemProp="bestRating">5</span>
        </div>
      </div>
    </section>
  )
}
