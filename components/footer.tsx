import Link from "next/link"
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-secondary" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2" aria-label="Cocoon Vietnam - Trang chủ">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
              </div>
              <span className="font-serif text-xl font-semibold text-primary">Cocoon</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Thương hiệu mỹ phẩm thuần chay Việt Nam. Vẻ đẹp thuần chay, sống xanh mỗi ngày.
            </p>
            {/* Social Links */}
            <nav aria-label="Mạng xã hội" className="flex gap-4">
              <a
                href="https://facebook.com/cocoonvietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook Cocoon Vietnam"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com/cocoonvietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram Cocoon Vietnam"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://youtube.com/cocoonvietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Youtube Cocoon Vietnam"
              >
                <Youtube className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>

          {/* Quick Links */}
          <nav aria-label="Liên kết nhanh">
            <h3 className="mb-4 font-semibold text-foreground">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/products" className="hover:text-primary transition-colors">
                  Tất cả sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  Về Cocoon
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-primary transition-colors">
                  Theo dõi đơn hàng
                </Link>
              </li>
              <li>
                <Link href="/products#skincare" className="hover:text-primary transition-colors">
                  Chăm sóc da mặt
                </Link>
              </li>
            </ul>
          </nav>

          {/* Policies */}
          <nav aria-label="Chính sách">
            <h3 className="mb-4 font-semibold text-foreground">Chính sách</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/shipping" className="hover:text-primary transition-colors">
                  Chính sách vận chuyển
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-primary transition-colors">
                  Đổi trả hoàn tiền
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Bảo mật thông tin
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <address className="not-italic">
            <h3 className="mb-4 font-semibold text-foreground">Liên hệ</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                <a href="tel:0123456789" className="hover:text-primary transition-colors">
                  0123 456 789
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                <a href="mailto:hello@cocoon.vn" className="hover:text-primary transition-colors">
                  hello@cocoon.vn
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" aria-hidden="true" />
                <span>123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</span>
              </li>
            </ul>
          </address>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Cocoon Vietnam. Tất cả quyền được bảo lưu.
          </p>
          <p className="text-xs text-muted-foreground">GPKD số: 0123456789 do Sở KH&ĐT TP.HCM cấp ngày 01/01/2020</p>
        </div>
      </div>
    </footer>
  )
}
