import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import { Toaster } from "sonner"

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Tất cả sản phẩm</h1>
              <p className="mt-2 text-muted-foreground">
                Khám phá bộ sưu tập mỹ phẩm thuần chay từ thiên nhiên Việt Nam
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  )
}
