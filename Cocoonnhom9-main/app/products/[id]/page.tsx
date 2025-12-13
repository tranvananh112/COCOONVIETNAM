"use client"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { products, formatPrice } from "@/lib/products"
import { useCartStore } from "@/lib/cart-store"
import { ShoppingCart, Heart, Share2, Minus, Plus, Star, Check, Truck, Shield, RotateCcw } from "lucide-react"
import { toast, Toaster } from "sonner"

export default function ProductDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [quantity, setQuantity] = useState(1)
    const [isFavorite, setIsFavorite] = useState(false)
    const addToCart = useCartStore((state) => state.addItem)

    const product = products.find((p) => p.id === params.id)

    if (!product) {
        return (
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
                        <Button onClick={() => router.push("/products")}>Quay lại danh sách</Button>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product)
        }
        toast.success(`Đã thêm ${quantity} ${product.name} vào giỏ hàng!`)
    }

    const handleBuyNow = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product)
        }
        router.push("/cart")
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text: product.description,
                    url: window.location.href,
                })
            } catch (err) {
                console.log("Share cancelled")
            }
        } else {
            navigator.clipboard.writeText(window.location.href)
            toast.success("Đã copy link sản phẩm!")
        }
    }

    const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 py-8">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <nav className="mb-6 text-sm text-muted-foreground">
                        <span className="cursor-pointer hover:text-primary" onClick={() => router.push("/")}>
                            Trang chủ
                        </span>
                        {" / "}
                        <span className="cursor-pointer hover:text-primary" onClick={() => router.push("/products")}>
                            Sản phẩm
                        </span>
                        {" / "}
                        <span className="text-foreground">{product.name}</span>
                    </nav>

                    {/* Product Detail */}
                    <div className="grid gap-8 md:grid-cols-2 mb-12">
                        {/* Image */}
                        <div className="space-y-4">
                            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                                <Image src={product.image} alt={product.name} fill className="object-cover" priority />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
                                    onClick={() => setIsFavorite(!isFavorite)}
                                >
                                    <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                                </Button>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="space-y-6">
                            <div>
                                <Badge className="mb-2">{product.category}</Badge>
                                <h1 className="font-serif text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground">(128 đánh giá)</span>
                                </div>
                                <p className="text-muted-foreground">{product.description}</p>
                            </div>

                            <Separator />

                            {/* Price */}
                            <div>
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                                    {product.priceRange && (
                                        <span className="text-sm text-muted-foreground line-through">{product.priceRange}</span>
                                    )}
                                </div>
                                {product.volume && (
                                    <p className="text-sm text-muted-foreground">Dung tích: {product.volume}</p>
                                )}
                            </div>

                            <Separator />

                            {/* Quantity */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <span className="font-medium">Số lượng:</span>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            disabled={quantity <= 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="w-12 text-center font-medium">{quantity}</span>
                                        <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <Button onClick={handleAddToCart} variant="outline" className="flex-1 gap-2">
                                        <ShoppingCart className="h-4 w-4" />
                                        Thêm vào giỏ
                                    </Button>
                                    <Button onClick={handleBuyNow} className="flex-1">
                                        Mua ngay
                                    </Button>
                                    <Button variant="outline" size="icon" onClick={handleShare}>
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Benefits */}
                            <Card>
                                <CardContent className="p-4 space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Truck className="h-5 w-5 text-primary" />
                                        <span>Miễn phí vận chuyển cho đơn từ 300.000đ</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Shield className="h-5 w-5 text-primary" />
                                        <span>Cam kết 100% thuần chay, không thử nghiệm động vật</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <RotateCcw className="h-5 w-5 text-primary" />
                                        <span>Đổi trả trong 7 ngày nếu có lỗi từ nhà sản xuất</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Product Details */}
                    <Card className="mb-12">
                        <CardContent className="p-6">
                            <h2 className="font-serif text-2xl font-bold mb-4">Thông tin chi tiết</h2>
                            <div className="space-y-4 text-muted-foreground">
                                <div className="flex items-start gap-2">
                                    <Check className="h-5 w-5 text-primary mt-0.5" />
                                    <p>Chiết xuất từ nguyên liệu thiên nhiên Việt Nam</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Check className="h-5 w-5 text-primary mt-0.5" />
                                    <p>Không chứa paraben, sulfate, hóa chất độc hại</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Check className="h-5 w-5 text-primary mt-0.5" />
                                    <p>Phù hợp cho mọi loại da, kể cả da nhạy cảm</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Check className="h-5 w-5 text-primary mt-0.5" />
                                    <p>Đạt chứng nhận thuần chay quốc tế</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Check className="h-5 w-5 text-primary mt-0.5" />
                                    <p>Bao bì thân thiện với môi trường, có thể tái chế</p>
                                </div>
                            </div>

                            <Separator className="my-6" />

                            <div>
                                <h3 className="font-semibold mb-2">Hướng dẫn sử dụng:</h3>
                                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                    <li>Làm sạch da mặt với nước ấm</li>
                                    <li>Lấy lượng sản phẩm vừa đủ</li>
                                    <li>Thoa đều lên da mặt và cổ</li>
                                    <li>Massage nhẹ nhàng theo chuyển động tròn</li>
                                    <li>Sử dụng 2 lần/ngày để đạt hiệu quả tốt nhất</li>
                                </ol>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div>
                            <h2 className="font-serif text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {relatedProducts.map((relatedProduct) => (
                                    <Card
                                        key={relatedProduct.id}
                                        className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                                        onClick={() => router.push(`/products/${relatedProduct.id}`)}
                                    >
                                        <div className="relative aspect-square">
                                            <Image
                                                src={relatedProduct.image}
                                                alt={relatedProduct.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <CardContent className="p-4">
                                            <Badge className="mb-2">{relatedProduct.category}</Badge>
                                            <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                                            <p className="text-lg font-bold text-primary">{formatPrice(relatedProduct.price)}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
            <Toaster position="top-center" richColors />
        </div>
    )
}
