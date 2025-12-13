"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

// Dữ liệu bài viết tĩnh
const articlesData = {
    1: {
        id: 1,
        title: "Cocoon x AAF: Ký kết hợp tác 'Chung tay cứu trợ chó mèo lang thang' lần II",
        image: "/baiviet1.jpg",
        date: "13.12.2024",
        author: "Cocoon",
        category: "Hoạt động xã hội",
        readTime: "8 phút đọc",
        views: "2,847",
        content: "Ngày 13 tháng 12 năm 2024, Cocoon Việt Nam đã chính thức ký kết hợp tác lần thứ hai với Quỹ Bảo vệ Động vật AAF..."
    },
    2: {
        id: 2,
        title: "Bí quyết chăm sóc da mùa đông với sản phẩm thuần chay",
        image: "/baiviet2.jpg",
        date: "10.12.2024",
        author: "Cocoon",
        category: "Làm đẹp",
        readTime: "12 phút đọc",
        views: "5,234",
        content: "Mùa đông đã đến, cùng với đó là những thách thức mới cho làn da của chúng ta..."
    },
    3: {
        id: 3,
        title: "Hành trình phát triển mỹ phẩm thuần chay tại Việt Nam",
        image: "/baiviet3.jpg",
        date: "08.12.2024",
        author: "Cocoon",
        category: "Câu chuyện thương hiệu",
        readTime: "15 phút đọc",
        views: "3,891",
        content: "Trong những năm gần đây, ngành mỹ phẩm thuần chay tại Việt Nam đã có những bước phát triển vượt bậc..."
    }
}

export default function DebugArticlesPage() {
    const [selectedArticle, setSelectedArticle] = useState<number | null>(null)

    const article = selectedArticle ? articlesData[selectedArticle as keyof typeof articlesData] : null

    if (article) {
        return (
            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="bg-green-600 text-white p-4">
                    <div className="container mx-auto">
                        <Button
                            onClick={() => setSelectedArticle(null)}
                            variant="outline"
                            className="mb-4 bg-white text-green-600 hover:bg-gray-100"
                        >
                            ← Quay lại danh sách
                        </Button>
                        <h1 className="text-3xl font-bold">{article.title}</h1>
                        <div className="flex gap-4 mt-2 text-green-100">
                            <span>{article.date}</span>
                            <span>{article.author}</span>
                            <span>{article.readTime}</span>
                            <span>{article.views} lượt xem</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="flex gap-8">
                        {/* Main Content */}
                        <div className="flex-1">
                            <Image
                                src={article.image}
                                alt={article.title}
                                width={800}
                                height={400}
                                className="w-full h-64 object-cover rounded-lg mb-6"
                            />

                            <Badge className="mb-4 bg-green-100 text-green-800">
                                {article.category}
                            </Badge>

                            <div className="prose max-w-none">
                                <p className="text-lg leading-relaxed">{article.content}</p>

                                <h2 className="text-2xl font-bold mt-8 mb-4">Nội dung chi tiết</h2>
                                <p>Đây là nội dung mở rộng của bài viết. Trong phiên bản đầy đủ, đây sẽ là nội dung HTML phong phú với nhiều thông tin hữu ích.</p>

                                <ul className="mt-4">
                                    <li>Thông tin chi tiết về chủ đề</li>
                                    <li>Hình ảnh minh họa</li>
                                    <li>Trích dẫn từ chuyên gia</li>
                                    <li>Lời khuyên thực tế</li>
                                </ul>

                                <blockquote className="border-l-4 border-green-500 pl-4 italic bg-green-50 p-4 rounded-r-lg mt-6">
                                    "Đây là một trích dẫn mẫu từ bài viết để thể hiện cách format nội dung."
                                </blockquote>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="w-80">
                            <Card>
                                <CardHeader>
                                    <h3 className="font-bold">Bài viết phổ biến</h3>
                                </CardHeader>
                                <CardContent>
                                    {Object.values(articlesData)
                                        .filter(a => a.id !== article.id)
                                        .map((popularArticle) => (
                                            <div
                                                key={popularArticle.id}
                                                className="flex gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                                onClick={() => setSelectedArticle(popularArticle.id)}
                                            >
                                                <Image
                                                    src={popularArticle.image}
                                                    alt={popularArticle.title}
                                                    width={60}
                                                    height={60}
                                                    className="w-15 h-15 object-cover rounded"
                                                />
                                                <div>
                                                    <h4 className="font-medium text-sm line-clamp-2">
                                                        {popularArticle.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500">{popularArticle.views} lượt xem</p>
                                                </div>
                                            </div>
                                        ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-green-600 text-white p-8">
                <div className="container mx-auto">
                    <h1 className="text-4xl font-bold mb-2">Debug: Bài viết Cocoon</h1>
                    <p className="text-green-100">Trang test không có lỗi Supabase</p>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.values(articlesData).map((article) => (
                        <Card
                            key={article.id}
                            className="cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => setSelectedArticle(article.id)}
                        >
                            <div className="relative">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    width={400}
                                    height={250}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <Badge className="absolute top-2 left-2 bg-white text-green-700">
                                    {article.category}
                                </Badge>
                            </div>

                            <CardContent className="p-4">
                                <h3 className="font-bold text-lg mb-2 line-clamp-2">
                                    {article.title}
                                </h3>
                                <div className="flex justify-between text-sm text-gray-500 mb-3">
                                    <span>{article.date}</span>
                                    <span>{article.views} lượt xem</span>
                                </div>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                    {article.content}
                                </p>
                                <Button
                                    className="w-full bg-green-600 hover:bg-green-700"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedArticle(article.id)
                                    }}
                                >
                                    Đọc thêm
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Navigation */}
                <div className="text-center mt-12 space-x-4">
                    <Link href="/">
                        <Button variant="outline">🏠 Trang chủ</Button>
                    </Link>
                    <Link href="/articles">
                        <Button className="bg-blue-600 hover:bg-blue-700">📝 Bài viết chính thức</Button>
                    </Link>
                    <Link href="/test-articles">
                        <Button variant="outline">🔧 Trang test</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}