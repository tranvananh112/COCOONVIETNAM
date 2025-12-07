"use client"

import { createClient } from "@/lib/supabase/client"

// Generate unique session ID
export function getSessionId(): string {
  if (typeof window === "undefined") return ""

  let sessionId = sessionStorage.getItem("cocoon_session_id")
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
    sessionStorage.setItem("cocoon_session_id", sessionId)
  }
  return sessionId
}

// Get device info
export function getDeviceInfo() {
  if (typeof window === "undefined") return null

  const ua = navigator.userAgent
  let deviceType = "desktop"
  if (/Mobile|Android|iPhone|iPad/.test(ua)) {
    deviceType = /iPad|Tablet/.test(ua) ? "tablet" : "mobile"
  }

  let browser = "unknown"
  if (ua.includes("Chrome")) browser = "Chrome"
  else if (ua.includes("Firefox")) browser = "Firefox"
  else if (ua.includes("Safari")) browser = "Safari"
  else if (ua.includes("Edge")) browser = "Edge"

  let os = "unknown"
  if (ua.includes("Windows")) os = "Windows"
  else if (ua.includes("Mac")) os = "macOS"
  else if (ua.includes("Linux")) os = "Linux"
  else if (ua.includes("Android")) os = "Android"
  else if (ua.includes("iOS") || ua.includes("iPhone") || ua.includes("iPad")) os = "iOS"

  return {
    deviceType,
    browser,
    os,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }
}

// Track visitor
export async function trackVisitor() {
  const supabase = createClient()
  const sessionId = getSessionId()
  const deviceInfo = getDeviceInfo()

  if (!deviceInfo) return

  // Check if visitor exists
  const { data: existing } = await supabase
    .from("visitors")
    .select("id, total_page_views")
    .eq("session_id", sessionId)
    .single()

  if (existing) {
    // Update last visit
    await supabase
      .from("visitors")
      .update({
        last_visit: new Date().toISOString(),
        total_page_views: existing.total_page_views + 1,
      })
      .eq("session_id", sessionId)
  } else {
    // Get location from IP (using free API)
    let location = { country: null, city: null, region: null }
    try {
      const res = await fetch("https://ipapi.co/json/")
      if (res.ok) {
        const data = await res.json()
        location = {
          country: data.country_name,
          city: data.city,
          region: data.region,
        }
      }
    } catch (e) {
      // Ignore location errors
    }

    await supabase.from("visitors").insert({
      session_id: sessionId,
      ...deviceInfo,
      device_type: deviceInfo.deviceType,
      screen_width: deviceInfo.screenWidth,
      screen_height: deviceInfo.screenHeight,
      ...location,
    })
  }
}

// Track page view
export async function trackPageView(pagePath: string, pageTitle?: string) {
  const supabase = createClient()
  const sessionId = getSessionId()

  await supabase.from("page_views").insert({
    session_id: sessionId,
    page_path: pagePath,
    page_title: pageTitle || document.title,
    referrer: document.referrer || null,
  })
}

// Track event
export async function trackEvent(eventType: string, eventData?: Record<string, unknown>) {
  const supabase = createClient()
  const sessionId = getSessionId()

  await supabase.from("events").insert({
    session_id: sessionId,
    event_type: eventType,
    event_data: eventData || null,
  })
}
