"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackVisitor, trackPageView } from "@/lib/analytics"

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Track visitor on first load
    trackVisitor()
  }, [])

  useEffect(() => {
    // Track page view on route change
    trackPageView(pathname)
  }, [pathname])

  return <>{children}</>
}
