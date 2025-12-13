"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrderTrackingRealtime } from "@/components/order-tracking-realtime"
import { useOrderStore, type Order, type OrderStatus } from "@/lib/order-store"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/products"
import { Clock, CheckCircle2, Truck, PackageCheck, Package } from "lucide-react"
import Image from "next/image"
import { Toaster } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${isActive
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

function LocalOrderCard({ order }: { order: Order }) {
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

        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Địa chỉ giao hàng</h4>
          <p className="text-sm text-muted-foreground">
            {order.customer.name} - {order.customer.phone}
          </p>
          <p className="text-sm text-muted-foreground">{order.customer.address}</p>
        </div>

        <div className="border-t pt-4 flex justify-between items-center">
          <span className="font-semibold">Tổng cộng:</span>
          <span className="text-xl font-bold text-primary">{formatPrice(order.totalPrice)}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function OrdersPage() {
  const { orders } = useOrderStore()
  const displayOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Theo dõi đơn hàng</h1>
            <p className="text-muted-foreground mb-8">
              Xem đơn hàng đã lưu hoặc tra cứu theo số điện thoại
            </p>

            <Tabs defaultValue="supabase" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="supabase">Tra cứu theo SĐT</TabsTrigger>
                <TabsTrigger value="local">Đơn hàng đã lưu ({displayOrders.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="supabase" className="mt-6">
                <OrderTrackingRealtime />
              </TabsContent>

              <TabsContent value="local" className="mt-6">
                {displayOrders.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Chưa có đơn hàng nào được lưu</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {displayOrders.map((order) => (
                      <LocalOrderCard key={order.id} order={order} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  )
}
