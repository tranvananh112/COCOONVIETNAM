"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import useSWR from "swr"
import {
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  Truck,
  PackageCheck,
  ArrowLeft,
  Leaf,
  Eye,
  Filter,
  Users,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Activity,
  BarChart3,
  MapPin,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import { formatPrice } from "@/lib/products"
import { toast, Toaster } from "sonner"

type OrderStatus = "pending" | "confirmed" | "shipping" | "delivered" | "cancelled"

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
    id: string
    product_name: string
    product_price: number
    quantity: number
    subtotal: number
  }>
}

interface AnalyticsData {
  visitors: { total: number; today: number; thisWeek: number }
  pageViews: { total: number; today: number }
  orders: { total: number; pending: number; delivered: number; revenue: number }
  devices: { mobile: number; desktop: number; tablet: number }
  browsers: Record<string, number>
  topPages: Array<{ path: string; views: number }>
  topCountries: Array<{ country: string; count: number }>
  recentVisitors: Array<{
    id: string
    session_id: string
    country: string
    city: string
    device_type: string
    browser: string
    os: string
    last_visit: string
  }>
}

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  confirmed: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-800", icon: CheckCircle2 },
  shipping: { label: "Đang giao", color: "bg-purple-100 text-purple-800", icon: Truck },
  delivered: { label: "Đã giao", color: "bg-green-100 text-green-800", icon: PackageCheck },
  cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-800", icon: Package },
}

// Fetcher functions for SWR
const fetchOrders = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("orders")
    .select(`*, order_items (*)`)
    .order("created_at", { ascending: false })
  if (error) throw error
  return data as Order[]
}

const fetchAnalytics = async (): Promise<AnalyticsData> => {
  const supabase = createClient()
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()

  // Parallel fetches
  const [
    visitorsRes,
    todayVisitorsRes,
    weekVisitorsRes,
    pageViewsRes,
    todayPageViewsRes,
    ordersRes,
    devicesRes,
    browsersRes,
    pagesRes,
    countriesRes,
    recentVisitorsRes,
  ] = await Promise.all([
    supabase.from("visitors").select("id", { count: "exact" }),
    supabase.from("visitors").select("id", { count: "exact" }).gte("first_visit", today),
    supabase.from("visitors").select("id", { count: "exact" }).gte("first_visit", weekAgo),
    supabase.from("page_views").select("id", { count: "exact" }),
    supabase.from("page_views").select("id", { count: "exact" }).gte("created_at", today),
    supabase.from("orders").select("*"),
    supabase.from("visitors").select("device_type"),
    supabase.from("visitors").select("browser"),
    supabase.from("page_views").select("page_path"),
    supabase.from("visitors").select("country"),
    supabase.from("visitors").select("*").order("last_visit", { ascending: false }).limit(20),
  ])

  const orders = ordersRes.data || []
  const devices = devicesRes.data || []
  const browsers = browsersRes.data || []
  const pages = pagesRes.data || []
  const countries = countriesRes.data || []

  // Process stats
  const deviceStats = {
    mobile: devices.filter((d) => d.device_type === "mobile").length,
    desktop: devices.filter((d) => d.device_type === "desktop").length,
    tablet: devices.filter((d) => d.device_type === "tablet").length,
  }

  const browserStats: Record<string, number> = {}
  browsers.forEach((b) => {
    if (b.browser) browserStats[b.browser] = (browserStats[b.browser] || 0) + 1
  })

  const pageStats: Record<string, number> = {}
  pages.forEach((p) => {
    pageStats[p.page_path] = (pageStats[p.page_path] || 0) + 1
  })
  const topPages = Object.entries(pageStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, views]) => ({ path, views }))

  const countryStats: Record<string, number> = {}
  countries.forEach((c) => {
    if (c.country) countryStats[c.country] = (countryStats[c.country] || 0) + 1
  })
  const topCountries = Object.entries(countryStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([country, count]) => ({ country, count }))

  return {
    visitors: {
      total: visitorsRes.data?.length || 0,
      today: todayVisitorsRes.data?.length || 0,
      thisWeek: weekVisitorsRes.data?.length || 0,
    },
    pageViews: {
      total: pageViewsRes.data?.length || 0,
      today: todayPageViewsRes.data?.length || 0,
    },
    orders: {
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      revenue: orders.filter((o) => o.status === "delivered").reduce((sum, o) => sum + o.total_price, 0),
    },
    devices: deviceStats,
    browsers: browserStats,
    topPages,
    topCountries,
    recentVisitors: recentVisitorsRes.data || [],
  }
}

export default function AdminPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [activeNow, setActiveNow] = useState(0)

  // SWR for real-time data
  const {
    data: orders = [],
    mutate: mutateOrders,
    isLoading: ordersLoading,
  } = useSWR("orders", fetchOrders, {
    refreshInterval: 10000, // Refresh every 10 seconds
  })

  const {
    data: analytics,
    mutate: mutateAnalytics,
    isLoading: analyticsLoading,
  } = useSWR("analytics", fetchAnalytics, {
    refreshInterval: 30000, // Refresh every 30 seconds
  })

  // Real-time active users (last 5 min)
  useEffect(() => {
    const fetchActiveNow = async () => {
      const supabase = createClient()
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
      const { data } = await supabase.from("page_views").select("session_id").gte("created_at", fiveMinutesAgo)
      const unique = new Set(data?.map((v) => v.session_id))
      setActiveNow(unique.size)
    }
    fetchActiveNow()
    const interval = setInterval(fetchActiveNow, 30000)
    return () => clearInterval(interval)
  }, [])

  // Filter orders
  const filteredOrders = statusFilter === "all" ? orders : orders.filter((order) => order.status === statusFilter)

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    const supabase = createClient()
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", orderId)

    if (error) {
      toast.error("Lỗi cập nhật trạng thái")
    } else {
      toast.success("Cập nhật trạng thái thành công")
      mutateOrders()
    }
  }

  const handleMarkAsPaid = async (orderId: string) => {
    const supabase = createClient()
    const { error } = await supabase
      .from("orders")
      .update({ is_paid: true, updated_at: new Date().toISOString() })
      .eq("id", orderId)

    if (error) {
      toast.error("Lỗi cập nhật thanh toán")
    } else {
      toast.success("Đã đánh dấu thanh toán")
      mutateOrders()
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, is_paid: true })
      }
    }
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

  const handleRefresh = () => {
    mutateOrders()
    mutateAnalytics()
    toast.success("Đã làm mới dữ liệu")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-semibold text-primary">Cocoon</span>
                <span className="text-[10px] text-muted-foreground">Admin Panel</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
              Làm mới
            </Button>
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                Về trang chủ
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground">Dashboard Admin</h1>
          <p className="text-muted-foreground">Quản lý đơn hàng và theo dõi thống kê thời gian thực</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-none lg:inline-flex">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Tổng quan
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <Package className="h-4 w-4" />
              Đơn hàng
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <Activity className="h-4 w-4" />
              Phân tích
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Live Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                      <Activity className="h-5 w-5 text-white" />
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white animate-pulse">
                        {activeNow}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-green-700">Đang online</p>
                      <p className="text-xl font-bold text-green-800">{activeNow}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Khách hôm nay</p>
                      <p className="text-xl font-bold">{analytics?.visitors.today || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <Globe className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Tổng khách</p>
                      <p className="text-xl font-bold">{analytics?.visitors.total || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                      <Clock className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Chờ xử lý</p>
                      <p className="text-xl font-bold">{analytics?.orders.pending || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <PackageCheck className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Đã giao</p>
                      <p className="text-xl font-bold">{analytics?.orders.delivered || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                      <TrendingUp className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Doanh thu</p>
                      <p className="text-lg font-bold">{formatPrice(analytics?.orders.revenue || 0)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Device & Browser Stats */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    Thiết bị truy cập
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4 text-muted-foreground" />
                        <span>Desktop</span>
                      </div>
                      <span className="font-semibold">{analytics?.devices.desktop || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                        <span>Mobile</span>
                      </div>
                      <span className="font-semibold">{analytics?.devices.mobile || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tablet className="h-4 w-4 text-muted-foreground" />
                        <span>Tablet</span>
                      </div>
                      <span className="font-semibold">{analytics?.devices.tablet || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Trình duyệt
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analytics?.browsers &&
                      Object.entries(analytics.browsers)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 5)
                        .map(([browser, count]) => (
                          <div key={browser} className="flex items-center justify-between">
                            <span className="text-sm">{browser}</span>
                            <span className="font-semibold">{count}</span>
                          </div>
                        ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Quốc gia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analytics?.topCountries.slice(0, 5).map((item) => (
                      <div key={item.country} className="flex items-center justify-between">
                        <span className="text-sm">{item.country}</span>
                        <span className="font-semibold">{item.count}</span>
                      </div>
                    ))}
                    {(!analytics?.topCountries || analytics.topCountries.length === 0) && (
                      <p className="text-sm text-muted-foreground">Chưa có dữ liệu</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Visitors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Khách truy cập gần đây
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analytics?.recentVisitors && analytics.recentVisitors.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Session</TableHead>
                          <TableHead>Thiết bị</TableHead>
                          <TableHead>Trình duyệt</TableHead>
                          <TableHead>Hệ điều hành</TableHead>
                          <TableHead>Vị trí</TableHead>
                          <TableHead>Thời gian</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {analytics.recentVisitors.map((visitor) => (
                          <TableRow key={visitor.id}>
                            <TableCell className="font-mono text-xs">{visitor.session_id.slice(0, 15)}...</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {visitor.device_type === "mobile" && <Smartphone className="h-3 w-3 mr-1" />}
                                {visitor.device_type === "desktop" && <Monitor className="h-3 w-3 mr-1" />}
                                {visitor.device_type === "tablet" && <Tablet className="h-3 w-3 mr-1" />}
                                {visitor.device_type}
                              </Badge>
                            </TableCell>
                            <TableCell>{visitor.browser}</TableCell>
                            <TableCell>{visitor.os}</TableCell>
                            <TableCell>
                              {visitor.city && visitor.country
                                ? `${visitor.city}, ${visitor.country}`
                                : visitor.country || "N/A"}
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {formatDate(visitor.last_visit)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">Chưa có dữ liệu khách truy cập</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Danh sách đơn hàng
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Lọc trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="pending">Chờ xử lý</SelectItem>
                      <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                      <SelectItem value="shipping">Đang giao</SelectItem>
                      <SelectItem value="delivered">Đã giao</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="text-center py-12">
                    <RefreshCw className="h-8 w-8 mx-auto animate-spin text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">Đang tải...</p>
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Chưa có đơn hàng nào</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mã đơn</TableHead>
                          <TableHead>Khách hàng</TableHead>
                          <TableHead>SĐT</TableHead>
                          <TableHead>Thời gian</TableHead>
                          <TableHead>Tổng tiền</TableHead>
                          <TableHead>Thanh toán</TableHead>
                          <TableHead>Trạng thái</TableHead>
                          <TableHead>Thao tác</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.map((order) => {
                          const StatusIcon = statusConfig[order.status]?.icon || Package
                          return (
                            <TableRow key={order.id}>
                              <TableCell className="font-mono text-sm">{order.order_code}</TableCell>
                              <TableCell className="font-medium">{order.customer_name}</TableCell>
                              <TableCell>{order.customer_phone}</TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {formatDate(order.created_at)}
                              </TableCell>
                              <TableCell className="font-medium text-primary">
                                {formatPrice(order.total_price)}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={order.is_paid ? "default" : "secondary"}
                                  className={order.is_paid ? "bg-green-100 text-green-800" : ""}
                                >
                                  {order.is_paid ? "Đã thanh toán" : order.payment_method === "cod" ? "COD" : "MoMo"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge className={statusConfig[order.status]?.color || ""}>
                                  <StatusIcon className="h-3 w-3 mr-1" />
                                  {statusConfig[order.status]?.label || order.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => setSelectedOrder(order)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Select
                                    value={order.status}
                                    onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                                  >
                                    <SelectTrigger className="w-[130px] h-8">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Chờ xử lý</SelectItem>
                                      <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                                      <SelectItem value="shipping">Đang giao</SelectItem>
                                      <SelectItem value="delivered">Đã giao</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Top Pages */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Trang được xem nhiều nhất</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics?.topPages.map((page, i) => (
                      <div key={page.path} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground text-sm w-4">{i + 1}.</span>
                          <span className="text-sm truncate max-w-[200px]">{page.path}</span>
                        </div>
                        <Badge variant="secondary">{page.views}</Badge>
                      </div>
                    ))}
                    {(!analytics?.topPages || analytics.topPages.length === 0) && (
                      <p className="text-sm text-muted-foreground text-center py-4">Chưa có dữ liệu</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Stats Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tổng hợp thống kê</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Tổng lượt xem trang</span>
                    <span className="font-bold text-lg">{analytics?.pageViews.total || 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Lượt xem hôm nay</span>
                    <span className="font-bold text-lg">{analytics?.pageViews.today || 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Khách tuần này</span>
                    <span className="font-bold text-lg">{analytics?.visitors.thisWeek || 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                    <span>Tổng đơn hàng</span>
                    <span className="font-bold text-lg text-primary">{analytics?.orders.total || 0}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Order Detail Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng #{selectedOrder?.order_code}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-3">Thông tin khách hàng</h3>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Họ tên:</span>
                    <span className="font-medium">{selectedOrder.customer_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SĐT:</span>
                    <span className="font-medium">{selectedOrder.customer_phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Địa chỉ:</span>
                    <span className="font-medium text-right max-w-[300px]">{selectedOrder.customer_address}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-3">Sản phẩm</h3>
                <div className="space-y-3">
                  {selectedOrder.order_items.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <div className="flex-1">
                        <p className="font-medium">{item.product_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(item.product_price)} x {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">{formatPrice(item.subtotal)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-lg">
                  <span>Tổng cộng:</span>
                  <span className="text-primary">{formatPrice(selectedOrder.total_price)}</span>
                </div>
              </div>

              {/* Payment & Status */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold mb-2">Thanh toán</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Phương thức: {selectedOrder.payment_method === "cod" ? "COD" : "MoMo"}
                  </p>
                  <Badge
                    variant={selectedOrder.is_paid ? "default" : "secondary"}
                    className={selectedOrder.is_paid ? "bg-green-100 text-green-800" : ""}
                  >
                    {selectedOrder.is_paid ? "Đã thanh toán" : "Chưa thanh toán"}
                  </Badge>
                  {!selectedOrder.is_paid && (
                    <Button size="sm" className="ml-2" onClick={() => handleMarkAsPaid(selectedOrder.id)}>
                      Đánh dấu đã thanh toán
                    </Button>
                  )}
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold mb-2">Trạng thái đơn hàng</h3>
                  <Select
                    value={selectedOrder.status}
                    onValueChange={(value) => {
                      handleStatusChange(selectedOrder.id, value as OrderStatus)
                      setSelectedOrder({ ...selectedOrder, status: value as OrderStatus })
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Chờ xử lý</SelectItem>
                      <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                      <SelectItem value="shipping">Đang giao</SelectItem>
                      <SelectItem value="delivered">Đã giao</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                Đơn hàng được đặt lúc: {formatDate(selectedOrder.created_at)}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Toaster position="top-center" richColors />
    </div>
  )
}
