"use client"

import Image from "next/image"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCartStore } from "@/lib/cart-store"
import { formatPrice, type Product } from "@/lib/products"
import { toast } from "sonner"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem(product)
    toast.success("Đã thêm vào giỏ hàng", {
      description: product.name,
    })
  }

  return (
    <Card className="group overflow-hidden border-0 bg-card shadow-sm transition-all duration-300 hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="mb-2">
          <span className="text-xs font-medium text-primary">{product.category}</span>
        </div>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold text-foreground">{formatPrice(product.price)}</span>
            {product.volume && <span className="text-xs text-muted-foreground ml-1">/ {product.volume}</span>}
          </div>
          <Button size="sm" onClick={handleAddToCart} className="gap-1 bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Thêm
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
