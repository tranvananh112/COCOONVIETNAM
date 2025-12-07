import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Sản phẩm Cocoon có phù hợp với da nhạy cảm không?",
    answer:
      "Có, tất cả sản phẩm Cocoon đều được làm từ nguyên liệu tự nhiên, không chứa paraben, sulfate hay hương liệu nhân tạo. Chúng tôi khuyến nghị thử test patch trên vùng da nhỏ trước khi sử dụng rộng rãi.",
  },
  {
    question: "Cocoon có thử nghiệm trên động vật không?",
    answer:
      "Không, Cocoon cam kết 100% Cruelty-Free. Chúng tôi không thử nghiệm sản phẩm trên động vật và không sử dụng nguyên liệu từ các nhà cung cấp có thử nghiệm trên động vật.",
  },
  {
    question: "Thời gian giao hàng mất bao lâu?",
    answer:
      "Đơn hàng tại TP.HCM và Hà Nội sẽ được giao trong 1-2 ngày làm việc. Các tỉnh thành khác từ 2-5 ngày làm việc. Miễn phí giao hàng cho đơn từ 500.000đ.",
  },
  {
    question: "Tôi có thể đổi trả sản phẩm không?",
    answer:
      "Có, bạn có thể đổi trả trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm còn nguyên seal và hóa đơn. Sản phẩm lỗi do nhà sản xuất sẽ được đổi mới hoàn toàn miễn phí.",
  },
  {
    question: "Làm sao để biết sản phẩm nào phù hợp với da tôi?",
    answer:
      "Bạn có thể tham khảo mô tả chi tiết của từng sản phẩm trên website hoặc liên hệ hotline 0123 456 789 để được tư vấn miễn phí từ chuyên gia chăm sóc da của Cocoon.",
  },
  {
    question: "Sản phẩm Cocoon có chứng nhận an toàn không?",
    answer:
      "Có, tất cả sản phẩm Cocoon đều được kiểm nghiệm và cấp phép bởi Cục Quản lý Dược - Bộ Y tế Việt Nam. Chúng tôi tuân thủ nghiêm ngặt các tiêu chuẩn về mỹ phẩm và an toàn cho người tiêu dùng.",
  },
]

export function FAQSection() {
  // JSON-LD FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <section className="py-16 md:py-24 bg-secondary/30" aria-labelledby="faq-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <span className="inline-block text-primary text-sm font-medium mb-2">Hỗ trợ khách hàng</span>
          <h2 id="faq-heading" className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Giải đáp những thắc mắc phổ biến về sản phẩm và dịch vụ của Cocoon.
          </p>
        </header>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
