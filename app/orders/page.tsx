"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useOrderStore, type Order, type OrderStatus } from "@/lib/order-store"
import { formatPrice } from "@/lib/products"
import { Search, Package, Clock, CheckCircle2, Truck, PackageCheck, ShoppingBag, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Toaster, toast } from "sonner"

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ElementType; step: number }> = {
  pending: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-800", icon: Clock, step: 1 },
  confirmed: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-800", icon: CheckCircle2, step: 2 },
  shipping: { label: "Đang giao", color: "bg-purple-100 text-purple-800", icon: Truck, step: 3 },
  delivered: { label: "Đã giao", color: "bg-green-100 text-green-800", icon: PackageCheck, step: 4 },
}

function OrderTimeline({ status }: { status: OrderStatus }) {
  const currentStep = statusConfig[status].step
  const steps = [
    { status: "pending" as OrderStatus, label: "Chờ xử lý" },
    { status: "confirmed" as OrderStatus, label: "Xác nhận" },
    { status: "shipping" as OrderStatus, label: "Đang giao" },
    { status: "delivered" as OrderStatus, label: "Đã giao" },
  ]

  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => {
        const StepIcon = statusConfig[step.status].icon
        const isActive = statusConfig[step.status].step <= currentStep
        const isCompleted = statusConfig[step.status].step < currentStep

        return (
          <div key={step.status} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted bg-background text-muted-foreground"
                }`}
              >
                <StepIcon className="h-5 w-5" />
              </div>
              <span className={`mt-2 text-xs font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-2 rounded ${isCompleted ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function OrderCard({ order }: { order: Order }) {
  const StatusIcon = statusConfig[order.status].icon

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50 pb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Mã đơn hàng</p>
            <p className="font-mono font-semibold">{order.id}</p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-sm text-muted-foreground">Ngày đặt</p>
            <p className="font-medium">{formatDate(order.createdAt)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Status Badge & Timeline */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge className={statusConfig[order.status].color}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {statusConfig[order.status].label}
            </Badge>
            <Badge
              variant={order.isPaid ? "default" : "secondary"}
              className={order.isPaid ? "bg-green-100 text-green-800" : ""}
            >
              {order.isPaid ? "Đã thanh toán" : order.paymentMethod === "cod" ? "COD" : "Chờ thanh toán"}
            </Badge>
          </div>
          <OrderTimeline status={order.status} />
        </div>

        {/* Products */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Sản phẩm đã đặt</h4>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.product.id} className="flex gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-muted flex-shrink-0">
                  <Image
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(item.product.price)} x {item.quantity}
                  </p>
                </div>
                <p className="font-medium text-primary">{formatPrice(item.product.price * item.quantity)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Info */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Địa chỉ giao hàng</h4>
          <p className="text-sm text-muted-foreground">
            {order.customer.name} - {order.customer.phone}
          </p>
          <p className="text-sm text-muted-foreground">{order.customer.address}</p>
        </div>

        {/* Total */}
        <div className="border-t pt-4 flex justify-between items-center">
          <span className="font-semibold">Tổng cộng:</span>
          <span className="text-xl font-bold text-primary">{formatPrice(order.totalPrice)}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function OrdersPage() {
  const { orders, getOrdersByPhone } = useOrderStore()
  const [phone, setPhone] = useState("")
  const [searchedOrders, setSearchedOrders] = useState<Order[] | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) {
      toast.error("Vui lòng nhập số điện thoại")
      return
    }
    const results = getOrdersByPhone(phone.trim())
    setSearchedOrders(results)
    setHasSearched(true)
    if (results.length === 0) {
      toast.info("Không tìm thấy đơn hàng nào với số điện thoại này")
    }
  }

  // Sort by date (newest first)
  const displayOrders =
    searchedOrders !== null
      ? [...searchedOrders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      : [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Theo dõi đơn hàng</h1>
            <p className="text-muted-foreground mb-8">Nhập số điện thoại để tra cứu đơn hàng của bạn</p>

            {/* Search Form */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="phone" className="sr-only">
                      Số điện thoại
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Nhập số điện thoại đặt hàng"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="gap-2 bg-primary hover:bg-primary/90">
                    <Search className="h-4 w-4" />
                    Tra cứu
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Orders List */}
            {hasSearched && searchedOrders?.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                  <Package className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="font-semibold text-lg text-foreground mb-2">Không tìm thấy đơn hàng</h2>
                <p className="text-muted-foreground mb-4">Không có đơn hàng nào với số điện thoại này</p>
                <Link href="/products">
                  <Button className="bg-primary hover:bg-primary/90">Mua sắm ngay</Button>
                </Link>
              </div>
            ) : displayOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                  <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="font-semibold text-lg text-foreground mb-2">Chưa có đơn hàng nào</h2>
                <p className="text-muted-foreground mb-4">Hãy bắt đầu mua sắm và đặt hàng ngay</p>
                <Link href="/products">
                  <Button className="bg-primary hover:bg-primary/90">Khám phá sản phẩm</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg">{hasSearched ? `Đơn hàng của ${phone}` : "Tất cả đơn hàng"}</h2>
                  <span className="text-sm text-muted-foreground">{displayOrders.length} đơn hàng</span>
                </div>
                {displayOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  )
}
