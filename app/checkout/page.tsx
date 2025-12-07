"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCartStore } from "@/lib/cart-store"
import { useOrderStore, type PaymentMethod } from "@/lib/order-store"
import { createOrder } from "@/lib/supabase-orders"
import { trackEvent } from "@/lib/analytics"
import { formatPrice } from "@/lib/products"
import { CreditCard, Truck, CheckCircle2, ShoppingBag, ArrowLeft, QrCode } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast, Toaster } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { addOrder } = useOrderStore()

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  })
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod")
  const [showQRModal, setShowQRModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderCode, setOrderCode] = useState("")

  const totalPrice = getTotalPrice()

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-foreground">Giỏ hàng trống</h1>
            <p className="text-muted-foreground">Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán</p>
            <Link href="/products">
              <Button className="gap-2 bg-primary hover:bg-primary/90">Khám phá sản phẩm</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast.error("Vui lòng điền đầy đủ thông tin")
      return
    }

    if (paymentMethod === "momo") {
      setShowQRModal(true)
    } else {
      processOrder(false)
    }
  }

  const processOrder = async (isPaid: boolean) => {
    setIsProcessing(true)

    try {
      const result = await createOrder({
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        customerAddress: customerInfo.address,
        items: items.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          productPrice: item.product.price,
          quantity: item.quantity,
        })),
        totalPrice,
        paymentMethod,
        isPaid,
      })

      setOrderCode(result.orderCode)

      // Track purchase event
      trackEvent("purchase", {
        orderId: result.orderId,
        orderCode: result.orderCode,
        totalPrice,
        itemCount: items.length,
        paymentMethod,
      })

      // Also save to local storage as backup
      addOrder({
        items: [...items],
        customer: customerInfo,
        totalPrice,
        status: "pending",
        paymentMethod,
        isPaid,
      })

      setShowQRModal(false)
      setShowSuccessModal(true)
      clearCart()
    } catch (error) {
      console.error("Order error:", error)
      // Fallback to local storage only
      addOrder({
        items: [...items],
        customer: customerInfo,
        totalPrice,
        status: "pending",
        paymentMethod,
        isPaid,
      })
      setShowQRModal(false)
      setShowSuccessModal(true)
      clearCart()
    } finally {
      setIsProcessing(false)
    }
  }

  const handleMomoPaymentConfirm = () => {
    processOrder(true)
  }

  const momoQRUrl = `https://img.vietqr.io/image/MOMO-0342645707-compact.png?amount=${totalPrice}&addInfo=Thanh%20toan%20Cocoon`

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại giỏ hàng
          </Link>

          <h1 className="font-serif text-3xl font-bold text-foreground mb-8">Thanh toán</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Customer Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-primary" />
                      Thông tin giao hàng
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Họ và tên người nhận *</Label>
                      <Input
                        id="name"
                        placeholder="Nguyễn Văn A"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="0912 345 678"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Địa chỉ giao hàng *</Label>
                      <Input
                        id="address"
                        placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      Phương thức thanh toán
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <Truck className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Thanh toán khi nhận hàng (COD)</p>
                              <p className="text-sm text-muted-foreground">
                                Thanh toán bằng tiền mặt khi nhận được hàng
                              </p>
                            </div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="momo" id="momo" />
                        <Label htmlFor="momo" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <QrCode className="h-5 w-5 text-[#ae2070]" />
                            <div>
                              <p className="font-medium">Thanh toán MoMo</p>
                              <p className="text-sm text-muted-foreground">Quét mã QR để thanh toán qua ví MoMo</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Đơn hàng của bạn</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {items.map((item) => (
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
                          <p className="text-sm font-medium truncate">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">SL: {item.quantity}</p>
                          <p className="text-sm font-medium text-primary">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tạm tính</span>
                        <span>{formatPrice(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Phí vận chuyển</span>
                        <span className="text-primary">Miễn phí</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                        <span>Tổng cộng</span>
                        <span className="text-primary">{formatPrice(totalPrice)}</span>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isProcessing}>
                      {isProcessing ? "Đang xử lý..." : "Đặt hàng"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />

      {/* MoMo QR Modal */}
      <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Thanh toán MoMo</DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">Quét mã QR bên dưới để thanh toán</p>
            <div className="flex justify-center">
              <div className="relative w-64 h-64 bg-white rounded-lg p-4">
                <Image src={momoQRUrl || "/placeholder.svg"} alt="MoMo QR Code" fill className="object-contain" />
              </div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Số tiền cần thanh toán</p>
              <p className="text-2xl font-bold text-primary">{formatPrice(totalPrice)}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowQRModal(false)}>
                Hủy
              </Button>
              <Button
                className="flex-1 bg-[#ae2070] hover:bg-[#ae2070]/90"
                onClick={handleMomoPaymentConfirm}
                disabled={isProcessing}
              >
                {isProcessing ? "Đang xử lý..." : "Đã thanh toán"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal - CHANGE: Show order code */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-md">
          <div className="text-center space-y-4 py-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground">Đặt hàng thành công!</h2>
            {orderCode && (
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Mã đơn hàng của bạn</p>
                <p className="text-xl font-mono font-bold text-primary">{orderCode}</p>
              </div>
            )}
            <p className="text-muted-foreground">
              Đơn hàng của bạn đang được xử lý. Chúng tôi sẽ liên hệ sớm nhất có thể.
            </p>
            <div className="flex flex-col gap-2 pt-4">
              <Button className="bg-primary hover:bg-primary/90" onClick={() => router.push("/orders")}>
                Theo dõi đơn hàng
              </Button>
              <Button variant="outline" onClick={() => router.push("/products")}>
                Tiếp tục mua sắm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Toaster position="top-center" richColors />
    </div>
  )
}
