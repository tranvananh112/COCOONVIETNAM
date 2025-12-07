"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle, Sparkles } from "lucide-react"
import { toast } from "sonner"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsSubscribed(true)
    toast.success("Đăng ký thành công! Cảm ơn bạn đã theo dõi Cocoon.")
    setEmail("")
  }

  return (
    <section className="py-16 md:py-24" aria-labelledby="newsletter-heading">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-12 lg:p-16">
          {/* Decorative elements */}
          <div
            className="absolute top-0 right-0 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-primary-foreground/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/20 px-4 py-2 text-sm text-primary-foreground mb-6">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>Ưu đãi độc quyền</span>
            </div>

            <h2
              id="newsletter-heading"
              className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl mb-4"
            >
              Đăng Ký Nhận Tin Từ Cocoon
            </h2>

            <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
              Nhận ngay <strong>giảm giá 10%</strong> cho đơn hàng đầu tiên và cập nhật các sản phẩm mới, tips chăm sóc
              da và ưu đãi đặc biệt.
            </p>

            {isSubscribed ? (
              <div className="flex items-center justify-center gap-2 text-primary-foreground">
                <CheckCircle className="h-6 w-6" aria-hidden="true" />
                <span className="text-lg font-medium">Cảm ơn bạn đã đăng ký!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    type="email"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-12 bg-background border-0"
                    aria-label="Địa chỉ email"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="h-12 bg-foreground text-background hover:bg-foreground/90"
                >
                  {isLoading ? "Đang xử lý..." : "Đăng ký ngay"}
                </Button>
              </form>
            )}

            <p className="text-xs text-primary-foreground/60 mt-4">
              Chúng tôi tôn trọng quyền riêng tư của bạn. Hủy đăng ký bất cứ lúc nào.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
