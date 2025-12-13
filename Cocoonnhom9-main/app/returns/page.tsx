import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ReturnsPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="font-serif text-3xl font-bold mb-8">Chính sách đổi trả</h1>
                    <div className="prose prose-green max-w-none">
                        <p>Chính sách đổi trả hoàn tiền của Cocoon Vietnam đang được cập nhật.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
