"use client"

import { useState, useEffect } from "react"
import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock, CheckCircle2, Truck, PackageCheck, RefreshCw, Search, Wifi } from "lucide-react"
import { formatPrice } from "@/lib/products"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { RealtimeStatus } from "./realtime-status"

type OrderStatus = "pending" | "confirmed" | "shipping" | "delivered"

interface Order {
    id: string
    order_code: string
    customer_name: string
    customer_phone: string
    customer_address: string
    total_price: number
    status: OrderStatus
    payment_method: string
    is_paid: boolean
    created_at: string
    order_items: Array<{
        product_name: string
        product_price: number
        quantity: number
        subtotal: number
    }>
}

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
        <div className="flex items-center justify-between w-full my-4">
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
                            <span className={`mt-2 text-xs font-medium text-center ${isActive ? "text-primary" : "text-muted-foreground"}`}>
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

const fetchOrders = async (phone: string) => {
    if (!phone) return []
    try {
        const supabase = createClient()
        const { data, error } = await supabase
            .from("orders")
            .select("*, order_items(*)")
            .eq("customer_phone", phone)
            .order("created_at", { ascending: false })

        if (error) {
            console.error("Supabase error:", error)
            return []
        }
        return data as Order[]
    } catch (error) {
        console.error("Fetch orders error:", error)
        return []
    }
}

export function OrderTrackingRealtime() {
    const [phone, setPhone] = useState("")
    const [searchPhone, setSearchPhone] = useState("")

    const { data: orders = [], mutate, isLoading } = useSWR(
        searchPhone ? `orders-${searchPhone}` : null,
        () => fetchOrders(searchPhone),
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
        }
    )

    // Supabase Realtime subscription - cập nhật ngay lập tức
    useEffect(() => {
        if (!searchPhone) return

        const supabase = createClient()

        // Subscribe to changes on orders table for this phone number
        const channel = supabase
            .channel(`orders-${searchPhone}`)
            .on(
                'postgres_changes',
                {
                    event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
                    schema: 'public',
                    table: 'orders',
                    filter: `customer_phone=eq.${searchPhone}`
                },
                (payload) => {
                    console.log('Real-time update:', payload)
                    // Refresh data immediately when change detected
                    mutate()

                    // Show notification
                    if (payload.eventType === 'UPDATE') {
                        toast.success('Đơn hàng đã được cập nhật!')
                    }
                }
            )
            .subscribe()

        // Cleanup subscription on unmount
        return () => {
            supabase.removeChannel(channel)
        }
    }, [searchPhone, mutate])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setSearchPhone(phone)
    }

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
        <div className="space-y-6">
            {/* Search Form */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Search className="h-5 w-5" />
                            Tra cứu đơn hàng
                        </CardTitle>
                        <RealtimeStatus />
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <div className="flex-1">
                            <Label htmlFor="phone">Số điện thoại</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="Nhập số điện thoại đặt hàng"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex items-end">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Đang tìm..." : "Tra cứu"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Orders List */}
            {searchPhone && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                            Đơn hàng của {searchPhone} ({orders.length})
                        </h2>
                        <Button variant="outline" size="sm" onClick={() => mutate()} className="gap-2">
                            <RefreshCw className="h-4 w-4" />
                            Làm mới
                        </Button>
                    </div>

                    {orders.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center text-muted-foreground">
                                Không tìm thấy đơn hàng nào
                            </CardContent>
                        </Card>
                    ) : (
                        orders.map((order) => {
                            const StatusIcon = statusConfig[order.status].icon
                            return (
                                <Card key={order.id}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-mono text-sm text-muted-foreground">
                                                    Mã đơn: {order.order_code}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {formatDate(order.created_at)}
                                                </p>
                                            </div>
                                            <Badge className={statusConfig[order.status].color}>
                                                <StatusIcon className="h-3 w-3 mr-1" />
                                                {statusConfig[order.status].label}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {/* Order Items */}
                                        <div className="space-y-2">
                                            {order.order_items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between text-sm">
                                                    <span>
                                                        {item.product_name} x {item.quantity}
                                                    </span>
                                                    <span className="font-medium">{formatPrice(item.subtotal)}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Total */}
                                        <div className="border-t pt-4 flex justify-between font-semibold">
                                            <span>Tổng cộng</span>
                                            <span className="text-primary">{formatPrice(order.total_price)}</span>
                                        </div>

                                        {/* Payment Status */}
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Thanh toán</span>
                                            <Badge variant={order.is_paid ? "default" : "secondary"}>
                                                {order.is_paid ? "Đã thanh toán" : order.payment_method.toUpperCase()}
                                            </Badge>
                                        </div>

                                        {/* Delivery Address */}
                                        <div className="text-sm">
                                            <p className="text-muted-foreground">Địa chỉ giao hàng:</p>
                                            <p>{order.customer_address}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })
                    )}

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <Wifi className="h-3 w-3 text-green-600" />
                        <span>Cập nhật real-time ngay lập tức - Không cần refresh trang</span>
                    </div>
                </div>
            )}
        </div>
    )
}
