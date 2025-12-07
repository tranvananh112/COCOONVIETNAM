import { products } from "@/lib/products"
import { ProductCard } from "./product-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function FeaturedProducts() {
  const featuredProducts = products.slice(0, 6)

  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sản phẩm nổi bật Cocoon",
    description: "Những sản phẩm chăm sóc da được yêu thích nhất từ Cocoon Vietnam",
    itemListElement: featuredProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.image,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "VND",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  }

  return (
    <section className="py-16 md:py-24" aria-labelledby="featured-products-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }} />

      <div className="container mx-auto px-4">
        <header className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="text-center md:text-left">
            <span className="inline-block text-primary text-sm font-medium mb-2">Bestseller</span>
            <h2 id="featured-products-heading" className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Sản Phẩm Nổi Bật
            </h2>
            <p className="mt-2 text-muted-foreground">
              Những sản phẩm chăm sóc da được yêu thích nhất từ nguyên liệu Việt Nam
            </p>
          </div>
          <Link href="/products" className="mt-4 md:mt-0" aria-label="Xem tất cả sản phẩm Cocoon">
            <Button variant="outline" className="gap-2 bg-transparent">
              Xem tất cả
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
