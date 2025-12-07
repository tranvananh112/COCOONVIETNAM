"use server"

import { createClient } from "@/lib/supabase/server"

export async function getAnalyticsSummary() {
  const supabase = await createClient()

  // Get date ranges
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()

  // Get visitors stats
  const { data: totalVisitors } = await supabase.from("visitors").select("id", { count: "exact" })
  const { data: todayVisitors } = await supabase
    .from("visitors")
    .select("id", { count: "exact" })
    .gte("first_visit", today)
  const { data: weekVisitors } = await supabase
    .from("visitors")
    .select("id", { count: "exact" })
    .gte("first_visit", weekAgo)

  // Get page views stats
  const { data: totalPageViews } = await supabase.from("page_views").select("id", { count: "exact" })
  const { data: todayPageViews } = await supabase
    .from("page_views")
    .select("id", { count: "exact" })
    .gte("created_at", today)

  // Get orders stats
  const { data: orders } = await supabase.from("orders").select("*")
  const totalOrders = orders?.length || 0
  const totalRevenue = orders?.reduce((sum, o) => sum + (o.status === "delivered" ? o.total_price : 0), 0) || 0
  const pendingOrders = orders?.filter((o) => o.status === "pending").length || 0
  const deliveredOrders = orders?.filter((o) => o.status === "delivered").length || 0

  // Get device breakdown
  const { data: devices } = await supabase.from("visitors").select("device_type")

  const deviceStats = {
    mobile: devices?.filter((d) => d.device_type === "mobile").length || 0,
    desktop: devices?.filter((d) => d.device_type === "desktop").length || 0,
    tablet: devices?.filter((d) => d.device_type === "tablet").length || 0,
  }

  // Get browser breakdown
  const { data: browsers } = await supabase.from("visitors").select("browser")
  const browserStats: Record<string, number> = {}
  browsers?.forEach((b) => {
    if (b.browser) {
      browserStats[b.browser] = (browserStats[b.browser] || 0) + 1
    }
  })

  // Get top pages
  const { data: pageViewsData } = await supabase.from("page_views").select("page_path")

  const pageStats: Record<string, number> = {}
  pageViewsData?.forEach((p) => {
    pageStats[p.page_path] = (pageStats[p.page_path] || 0) + 1
  })
  const topPages = Object.entries(pageStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, views]) => ({ path, views }))

  // Get country breakdown
  const { data: countries } = await supabase.from("visitors").select("country, city")
  const countryStats: Record<string, number> = {}
  countries?.forEach((c) => {
    if (c.country) {
      countryStats[c.country] = (countryStats[c.country] || 0) + 1
    }
  })
  const topCountries = Object.entries(countryStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([country, count]) => ({ country, count }))

  // Get recent visitors
  const { data: recentVisitors } = await supabase
    .from("visitors")
    .select("*")
    .order("last_visit", { ascending: false })
    .limit(20)

  return {
    visitors: {
      total: totalVisitors?.length || 0,
      today: todayVisitors?.length || 0,
      thisWeek: weekVisitors?.length || 0,
    },
    pageViews: {
      total: totalPageViews?.length || 0,
      today: todayPageViews?.length || 0,
    },
    orders: {
      total: totalOrders,
      pending: pendingOrders,
      delivered: deliveredOrders,
      revenue: totalRevenue,
    },
    devices: deviceStats,
    browsers: browserStats,
    topPages,
    topCountries,
    recentVisitors: recentVisitors || [],
  }
}

export async function getRealtimeStats() {
  const supabase = await createClient()

  // Last 5 minutes
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()

  const { data: activeVisitors } = await supabase
    .from("page_views")
    .select("session_id")
    .gte("created_at", fiveMinutesAgo)

  // Unique sessions
  const uniqueSessions = new Set(activeVisitors?.map((v) => v.session_id))

  return {
    activeNow: uniqueSessions.size,
  }
}
