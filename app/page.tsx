import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CategoriesSection } from "@/components/categories-section"
import { BrandValues } from "@/components/brand-values"
import { Toaster } from "sonner"
import { TestimonialsSection } from "@/components/testimonials-section"
import { WhyChooseUs } from "@/components/why-choose-us"
import { FAQSection } from "@/components/faq-section"
import { NewsletterSection } from "@/components/newsletter-section"

export const metadata: Metadata = {
  title: "Cocoon Vietnam - Mỹ Phẩm Thuần Chay Việt Nam | Skincare Tự Nhiên",
  description:
    "Cocoon - Thương hiệu mỹ phẩm thuần chay hàng đầu Việt Nam. Sản phẩm chăm sóc da từ nguyên liệu thiên nhiên: nước tẩy trang hoa hồng, serum bí đao, mặt nạ nghệ. 100% không thử nghiệm trên động vật.",
  keywords: [
    "mỹ phẩm thuần chay",
    "cocoon vietnam",
    "skincare tự nhiên",
    "chăm sóc da thiên nhiên",
    "mỹ phẩm organic",
    "nước tẩy trang hoa hồng",
    "serum bí đao",
    "mặt nạ nghệ",
    "mỹ phẩm không thử nghiệm động vật",
    "vegan cosmetics vietnam",
  ],
  authors: [{ name: "Cocoon Vietnam" }],
  creator: "Cocoon Vietnam",
  publisher: "Cocoon Vietnam",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://cocoon.vn",
    siteName: "Cocoon Vietnam",
    title: "Cocoon Vietnam - Mỹ Phẩm Thuần Chay Việt Nam",
    description:
      "Khám phá các sản phẩm chăm sóc da từ thiên nhiên Việt Nam. An toàn, hiệu quả và thân thiện với môi trường.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cocoon Vietnam - Mỹ phẩm thuần chay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cocoon Vietnam - Mỹ Phẩm Thuần Chay Việt Nam",
    description: "Sản phẩm chăm sóc da từ thiên nhiên Việt Nam. 100% thuần chay.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://cocoon.vn",
    languages: {
      "vi-VN": "https://cocoon.vn",
      "en-US": "https://cocoon.vn/en",
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
}

function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cocoon Vietnam",
    alternateName: "Cocoon Mỹ Phẩm Thuần Chay",
    url: "https://cocoon.vn",
    logo: "https://cocoon.vn/logo.png",
    description: "Thương hiệu mỹ phẩm thuần chay hàng đầu Việt Nam với các sản phẩm từ nguyên liệu thiên nhiên.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hồ Chí Minh",
      addressCountry: "VN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+84-123-456-789",
      contactType: "customer service",
      availableLanguage: ["Vietnamese", "English"],
    },
    sameAs: [
      "https://facebook.com/cocoonvietnam",
      "https://instagram.com/cocoonvietnam",
      "https://tiktok.com/@cocoonvietnam",
    ],
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Cocoon Vietnam",
    url: "https://cocoon.vn",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://cocoon.vn/products?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Cocoon Vietnam",
    image: "https://cocoon.vn/store-image.jpg",
    "@id": "https://cocoon.vn",
    url: "https://cocoon.vn",
    telephone: "+84-123-456-789",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Nguyễn Huệ",
      addressLocality: "Quận 1",
      addressRegion: "Hồ Chí Minh",
      postalCode: "700000",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 10.7769,
      longitude: 106.7009,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "22:00",
    },
    priceRange: "$$",
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
    </>
  )
}

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <FeaturedProducts />
          <WhyChooseUs />
          <CategoriesSection />
          <TestimonialsSection />
          <BrandValues />
          <FAQSection />
          <NewsletterSection />
        </main>
        <Footer />
        <Toaster position="top-center" richColors />
      </div>
    </>
  )
}
