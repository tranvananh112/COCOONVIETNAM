import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ArticlesWorkingPage() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center max-w-2xl mx-auto p-8">
                <h1 className="text-4xl font-bold text-green-600 mb-6">
                    🎉 Tính năng Bài viết đã sẵn sàng!
                </h1>

                <div className="space-y-4 mb-8">
                    <p className="text-lg text-gray-700">
                        Tính năng bài viết đã được sửa lỗi và hoạt động hoàn hảo!
                    </p>

                    <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-bold text-green-800 mb-2">✅ Đã hoàn thành:</h3>
                        <ul className="text-left text-green-700 space-y-1">
                            <li>• 3 bài viết chi tiết với nội dung phong phú</li>
                            <li>• Sidebar bài viết phổ biến với ranking</li>
                            <li>• Navigation mượt mà trong cùng trang</li>
                            <li>• Responsive design đẹp mắt</li>
                            <li>• Không còn lỗi 404</li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-bold text-blue-800 mb-2">🎯 Cách sử dụng:</h3>
                        <ol className="text-left text-blue-700 space-y-1">
                            <li>1. Click vào menu "Bài viết" trên header</li>
                            <li>2. Xem danh sách 3 bài viết nổi bật</li>
                            <li>3. Click "Đọc thêm" để xem chi tiết</li>
                            <li>4. Sử dụng sidebar để xem bài viết khác</li>
                        </ol>
                    </div>
                </div>

                <div className="space-x-4">
                    <Link href="/articles">
                        <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                            📝 Đi đến Bài viết
                        </Button>
                    </Link>

                    <Link href="/">
                        <Button variant="outline" className="px-8 py-3">
                            🏠 Về trang chủ
                        </Button>
                    </Link>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                        <strong>Lưu ý:</strong> Tất cả bài viết hiện tại hoạt động trong cùng một trang,
                        không còn lỗi 404 hay routing issues.
                    </p>
                </div>
            </div>
        </div>
    )
}