import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function TestArticlesPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold text-center mb-8">Test Tính năng Bài viết</h1>

                <div className="grid gap-6">
                    {/* Test Links */}
                    <Card>
                        <CardHeader>
                            <h2 className="text-2xl font-bold">🔗 Links Test</h2>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Link href="/articles">
                                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                                    📝 Trang danh sách bài viết (/articles)
                                </Button>
                            </Link>

                            <Link href="/articles/1">
                                <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                                    📖 Bài viết 1: Cocoon x AAF (/articles/1)
                                </Button>
                            </Link>

                            <Link href="/articles/2">
                                <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700">
                                    📖 Bài viết 2: Chăm sóc da mùa đông (/articles/2)
                                </Button>
                            </Link>

                            <Link href="/articles/3">
                                <Button className="w-full justify-start bg-orange-600 hover:bg-orange-700">
                                    📖 Bài viết 3: Hành trình phát triển (/articles/3)
                                </Button>
                            </Link>

                            <Link href="/articles/simple">
                                <Button className="w-full justify-start bg-gray-600 hover:bg-gray-700">
                                    🔧 Trang bài viết đơn giản (backup) (/articles/simple)
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Status Check */}
                    <Card>
                        <CardHeader>
                            <h2 className="text-2xl font-bold">✅ Tính năng đã hoàn thành</h2>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-500">✅</span>
                                        <span>Menu "Bài viết" trong header</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-500">✅</span>
                                        <span>Trang danh sách bài viết</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-500">✅</span>
                                        <span>3 bài viết chi tiết</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-500">✅</span>
                                        <span>Sidebar bài viết phổ biến</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-500">✅</span>
                                        <span>Newsletter signup</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-500">✅</span>
                                        <span>Categories filter</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-500">✅</span>
                                        <span>Related articles</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-500">✅</span>
                                        <span>Responsive design</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Articles Info */}
                    <Card>
                        <CardHeader>
                            <h2 className="text-2xl font-bold">📊 Thông tin bài viết</h2>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <h3 className="font-bold text-blue-800">Bài viết 1: Cocoon x AAF</h3>
                                    <p className="text-blue-600">8 phút đọc • 2,847 lượt xem • Hoạt động xã hội</p>
                                    <p className="text-sm text-blue-500 mt-2">Câu chuyện hợp tác cứu trợ động vật với nội dung cảm động</p>
                                </div>

                                <div className="p-4 bg-green-50 rounded-lg">
                                    <h3 className="font-bold text-green-800">Bài viết 2: Chăm sóc da mùa đông</h3>
                                    <p className="text-green-600">12 phút đọc • 5,234 lượt xem • Làm đẹp</p>
                                    <p className="text-sm text-green-500 mt-2">Hướng dẫn chi tiết routine chăm sóc da với sản phẩm thuần chay</p>
                                </div>

                                <div className="p-4 bg-purple-50 rounded-lg">
                                    <h3 className="font-bold text-purple-800">Bài viết 3: Hành trình phát triển</h3>
                                    <p className="text-purple-600">15 phút đọc • 3,891 lượt xem • Câu chuyện thương hiệu</p>
                                    <p className="text-sm text-purple-500 mt-2">Lịch sử phát triển mỹ phẩm thuần chay tại Việt Nam</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Error Info */}
                    <Card className="border-yellow-200 bg-yellow-50">
                        <CardHeader>
                            <h2 className="text-2xl font-bold text-yellow-800">⚠️ Lưu ý về lỗi</h2>
                        </CardHeader>
                        <CardContent>
                            <div className="text-yellow-700 space-y-2">
                                <p><strong>Lỗi Supabase:</strong> Không ảnh hưởng đến tính năng bài viết</p>
                                <p><strong>Source map errors:</strong> Chỉ xuất hiện trong development mode</p>
                                <p><strong>Giải pháp:</strong> Sử dụng trang /articles/simple nếu gặp vấn đề</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Back to Home */}
                    <div className="text-center">
                        <Link href="/">
                            <Button variant="outline" className="mr-4">
                                🏠 Về trang chủ
                            </Button>
                        </Link>
                        <Link href="/articles">
                            <Button className="bg-green-600 hover:bg-green-700">
                                📝 Đi đến bài viết
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}