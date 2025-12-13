import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, Clock, Eye } from "lucide-react"

// Dữ liệu bài viết đơn giản
const articles = [
    {
        id: 1,
        title: "Cocoon x AAF: Ký kết hợp tác 'Chung tay cứu trợ chó mèo lang thang' lần II",
        image: "/baiviet1.jpg",
        date: "13.12.2024",
        author: "Cocoon",
        category: "Hoạt động xã hội",
        readTime: "8 phút đọc",
        views: "2,847",
        content: `
      <div class="prose max-w-none">
        <p>Ngày 13 tháng 12 năm 2024, Cocoon Việt Nam đã chính thức ký kết hợp tác lần thứ hai với Quỹ Bảo vệ Động vật AAF (Animal Aid & Rescue Foundation) trong chương trình "Chung tay cứu trợ chó mèo lang thang".</p>
        
        <h2>Lý do Cocoon chọn đồng hành cùng AAF</h2>
        <p>Với triết lý "Vẻ đẹp thuần chay, sống xanh mỗi ngày", Cocoon không chỉ cam kết không thử nghiệm trên động vật mà còn tích cực bảo vệ và cứu trợ những sinh vật bé nhỏ.</p>
        
        <h2>Những hoạt động cụ thể</h2>
        <ul>
          <li>Tài trợ 500 triệu đồng cho việc cứu chữa động vật bị thương</li>
          <li>Cung cấp thuốc men, vaccine cho hơn 1,000 chú chó mèo</li>
          <li>Hỗ trợ chi phí phẫu thuật triệt sản miễn phí</li>
          <li>Xây dựng 2 trạm cấp cứu động vật di động</li>
        </ul>
        
        <blockquote style="border-left: 4px solid #16a34a; padding-left: 1rem; margin: 2rem 0; font-style: italic; background: #f0fdf4; padding: 1rem; border-radius: 0.5rem;">
          "Hành trình này không chỉ là trách nhiệm xã hội mà còn là sứ mệnh của chúng tôi. Mỗi khách hàng chọn Cocoon đều đang góp phần cứu sống một sinh mạng nhỏ bé." - CEO Trần Minh Đức
        </blockquote>
      </div>
    `
    },
    {
        id: 2,
        title: "Bí quyết chăm sóc da mùa đông với sản phẩm thuần chay",
        image: "/baiviet2.jpg",
        date: "10.12.2024",
        author: "Cocoon",
        category: "Làm đẹp",
        readTime: "12 phút đọc",
        views: "5,234",
        content: `
      <div class="prose max-w-none">
        <p>Mùa đông đã đến, cùng với đó là những thách thức mới cho làn da của chúng ta. Thời tiết khô hanh, gió lạnh có thể khiến da trở nên khô ráp, mất độ ẩm.</p>
        
        <h2>Tại sao da cần chăm sóc đặc biệt trong mùa đông?</h2>
        <p>Trong mùa đông, độ ẩm trong không khí giảm xuống đáng kể, khiến da mất nước nhanh chóng.</p>
        
        <h2>Routine chăm sóc da mùa đông 5 bước</h2>
        <ol>
          <li><strong>Làm sạch nhẹ nhàng:</strong> Sử dụng sữa rửa mặt từ dầu dừa và mật ong</li>
          <li><strong>Toner cấp ẩm:</strong> Nước hoa hồng từ hoa sen và trà xanh</li>
          <li><strong>Serum dưỡng ẩm:</strong> Hyaluronic Acid từ thực vật</li>
          <li><strong>Kem dưỡng ẩm:</strong> Kem dưỡng với bơ hạt mỡ</li>
          <li><strong>Chống nắng:</strong> SPF 50 PA+++ ngay cả mùa đông</li>
        </ol>
        
        <blockquote style="border-left: 4px solid #16a34a; padding-left: 1rem; margin: 2rem 0; font-style: italic; background: #f0fdf4; padding: 1rem; border-radius: 0.5rem;">
          "Da đẹp không chỉ đến từ sản phẩm bên ngoài mà còn từ sự chăm sóc toàn diện từ bên trong." - Chuyên gia da liễu Cocoon
        </blockquote>
      </div>
    `
    },
    {
        id: 3,
        title: "Hành trình phát triển mỹ phẩm thuần chay tại Việt Nam",
        image: "/baiviet3.jpg",
        date: "08.12.2024",
        author: "Cocoon",
        category: "Câu chuyện thương hiệu",
        readTime: "15 phút đọc",
        views: "3,891",
        content: `
      <div class="prose max-w-none">
        <p>Trong những năm gần đây, ngành mỹ phẩm thuần chay tại Việt Nam đã có những bước phát triển vượt bậc, từ một thị trường ngách nhỏ bé đến một xu hướng được nhiều người tiêu dùng quan tâm.</p>
        
        <h2>Khởi đầu từ những giá trị truyền thống</h2>
        <p>Việt Nam từ lâu đã có truyền thống sử dụng các thành phần tự nhiên trong chăm sóc sắc đẹp. Từ nghệ, mật ong, dầu dừa đến các loại thảo dược quý hiếm.</p>
        
        <h2>Giai đoạn phát triển</h2>
        <ul>
          <li><strong>2010-2015:</strong> Giai đoạn thức tỉnh về tác hại của hóa chất</li>
          <li><strong>2016-2020:</strong> Bùng nổ thương hiệu nội địa</li>
          <li><strong>2021-2025:</strong> Trưởng thành và xuất khẩu</li>
        </ul>
        
        <h2>Tầm nhìn 2030</h2>
        <p>Việt Nam sẽ trở thành trung tâm mỹ phẩm thuần chay hàng đầu Đông Nam Á với mục tiêu:</p>
        <ul>
          <li>Doanh thu xuất khẩu: 1 tỷ USD</li>
          <li>Thị phần nội địa: 30%</li>
          <li>Tạo việc làm: 200,000 người</li>
        </ul>
        
        <blockquote style="border-left: 4px solid #16a34a; padding-left: 1rem; margin: 2rem 0; font-style: italic; background: #f0fdf4; padding: 1rem; border-radius: 0.5rem;">
          "Hành trình phát triển mỹ phẩm thuần chay tại Việt Nam không chỉ là câu chuyện kinh doanh, mà còn là câu chuyện về tình yêu thiên nhiên." - CEO Trần Minh Đức
        </blockquote>
      </div>
    `
    }
]

export default function SimpleArticlesPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-green-600 text-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">Bài viết Cocoon</h1>
                    <p className="text-green-100">Khám phá những câu chuyện về mỹ phẩm thuần chay</p>
                </div>
            </div>

            {/* Articles List */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-8">
                    {articles.map((article) => (
                        <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden border">
                            <div className="md:flex">
                                <div className="md:w-1/3">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        width={400}
                                        height={300}
                                        className="w-full h-64 md:h-full object-cover"
                                    />
                                </div>
                                <div className="md:w-2/3 p-6">
                                    <Badge className="mb-3 bg-green-100 text-green-800">
                                        {article.category}
                                    </Badge>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                        {article.title}
                                    </h2>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{article.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <User className="w-4 h-4" />
                                            <span>{article.author}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{article.readTime}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Eye className="w-4 h-4" />
                                            <span>{article.views}</span>
                                        </div>
                                    </div>

                                    {/* Article Content */}
                                    <div
                                        className="text-gray-700 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: article.content }}
                                    />

                                    <div className="mt-6 pt-4 border-t">
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="outline">Mỹ phẩm thuần chay</Badge>
                                            <Badge variant="outline">Cocoon</Badge>
                                            <Badge variant="outline">Việt Nam</Badge>
                                            <Badge variant="outline">{article.category}</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Back to main articles */}
                <div className="text-center mt-12">
                    <Link href="/articles">
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Quay lại trang bài viết chính
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}