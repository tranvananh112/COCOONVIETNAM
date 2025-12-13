"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, Sparkles, Lightbulb, ArrowLeft, Share2, Heart, TrendingUp, Eye, Clock } from "lucide-react"

// Dữ liệu bài viết đầy đủ
const articlesData = [
    {
        id: 1,
        title: "Cocoon x AAF: Ký kết hợp tác 'Chung tay cứu trợ chó mèo lang thang' lần II",
        excerpt: "Cocoon Việt Nam tiếp tục đồng hành cùng Quỹ Bảo vệ Động vật AAF trong chương trình cứu trợ động vật lang thang, thể hiện cam kết bảo vệ môi trường và động vật.",
        image: "/baiviet1.jpg",
        date: "13.12.2024",
        author: "Cocoon",
        category: "Hoạt động xã hội",
        readTime: "8 phút đọc",
        views: "2,847",
        content: `
      <p>Ngày 13 tháng 12 năm 2024, Cocoon Việt Nam đã chính thức ký kết hợp tác lần thứ hai với Quỹ Bảo vệ Động vật AAF (Animal Aid & Rescue Foundation) trong chương trình "Chung tay cứu trợ chó mèo lang thang". Đây là minh chứng rõ nét cho cam kết bền vững của thương hiệu mỹ phẩm thuần chay hàng đầu Việt Nam.</p>

      <h2>Lý do Cocoon chọn đồng hành cùng AAF</h2>
      <p>Với triết lý "Vẻ đẹp thuần chay, sống xanh mỗi ngày", Cocoon không chỉ cam kết không thử nghiệm trên động vật mà còn tích cực bảo vệ và cứu trợ những sinh vật bé nhỏ. AAF - một trong những tổ chức bảo vệ động vật uy tín nhất Việt Nam, đã cứu sống hàng nghìn chú chó mèo lang thang trong suốt 10 năm qua.</p>

      <h2>Những hoạt động cụ thể trong chương trình</h2>
      <h3>1. Hỗ trợ tài chính và y tế</h3>
      <ul>
        <li>Tài trợ 500 triệu đồng cho việc cứu chữa động vật bị thương</li>
        <li>Cung cấp thuốc men, vaccine cho hơn 1,000 chú chó mèo</li>
        <li>Hỗ trợ chi phí phẫu thuật triệt sản miễn phí</li>
        <li>Xây dựng 2 trạm cấp cứu động vật di động</li>
      </ul>

      <h3>2. Chương trình nhận nuôi</h3>
      <ul>
        <li>Tổ chức 12 sự kiện "Tìm gia đình mới" trong năm 2025</li>
        <li>Hỗ trợ 100% chi phí y tế cho động vật được nhận nuôi trong 6 tháng đầu</li>
        <li>Tặng bộ sản phẩm chăm sóc thú cưng từ thành phần tự nhiên</li>
      </ul>

      <h3>3. Giáo dục cộng đồng</h3>
      <ul>
        <li>Tổ chức workshop "Yêu thương động vật - Bảo vệ môi trường" tại 20 trường đại học</li>
        <li>Sản xuất series video giáo dục về quyền động vật</li>
        <li>Phát triển ứng dụng mobile "Pet Rescue" để báo cáo động vật cần cứu trợ</li>
      </ul>

      <h2>Câu chuyện cảm động từ chương trình lần I</h2>
      <p>Trong chương trình hợp tác lần đầu (2023), Cocoon và AAF đã cứu sống 847 chú chó mèo, trong đó có câu chuyện cảm động về chú chó Golden Retriever tên "Hope". Hope bị tai nạn giao thông nghiêm trọng, mất một chân sau. Nhờ sự hỗ trợ kịp thời, Hope đã được phẫu thuật thành công và tìm được gia đình mới yêu thương.</p>

      <blockquote>
        "Hope giờ đây đã trở thành 'đại sứ' của chương trình, thường xuyên tham gia các hoạt động tuyên truyền. Nụ cười hạnh phúc của Hope chính là động lực lớn nhất cho chúng tôi tiếp tục hành trình này." - Chị Nguyễn Thị Lan, Giám đốc AAF
      </blockquote>

      <h2>Tầm nhìn dài hạn</h2>
      <p>Chương trình hợp tác lần II không chỉ mở rộng quy mô mà còn hướng tới sự bền vững. Cocoon cam kết đồng hành cùng AAF trong 5 năm tới với mục tiêu:</p>
      <ul>
        <li>Giảm 50% số lượng chó mèo lang thang tại TP.HCM và Hà Nội</li>
        <li>Xây dựng 10 trung tâm cứu trợ động vật tại các tỉnh thành</li>
        <li>Đào tạo 500 tình nguyện viên chuyên nghiệp</li>
        <li>Tạo ra 200 việc làm bền vững trong lĩnh vực bảo vệ động vật</li>
      </ul>

      <blockquote>
        "Hành trình này không chỉ là trách nhiệm xã hội mà còn là sứ mệnh của chúng tôi. Mỗi khách hàng chọn Cocoon đều đang góp phần cứu sống một sinh mạng nhỏ bé." - CEO Trần Minh Đức
      </blockquote>
    `
    },
    {
        id: 2,
        title: "Bí quyết chăm sóc da mùa đông với sản phẩm thuần chay",
        excerpt: "Khám phá những tips chăm sóc da hiệu quả trong mùa đông khô hanh với các sản phẩm thuần chay từ thiên nhiên Việt Nam.",
        image: "/baiviet2.jpg",
        date: "10.12.2024",
        author: "Cocoon",
        category: "Làm đẹp",
        readTime: "12 phút đọc",
        views: "5,234",
        content: `
      <p>Mùa đông đã đến, cùng với đó là những thách thức mới cho làn da của chúng ta. Thời tiết khô hanh, gió lạnh có thể khiến da trở nên khô ráp, mất độ ẩm và xuất hiện các dấu hiệu lão hóa sớm. Đặc biệt tại Việt Nam, sự chuyển đổi từ mùa mưa sang mùa khô tạo ra những biến động lớn về độ ẩm không khí.</p>

      <h2>Tại sao da cần chăm sóc đặc biệt trong mùa đông?</h2>
      <p>Trong mùa đông, độ ẩm trong không khí giảm xuống đáng kể (từ 80% xuống còn 40-50%), khiến da mất nước nhanh chóng. Đồng thời, việc sử dụng máy sưởi, điều hòa cũng làm cho không khí trong nhà trở nên khô hơn. Nghiên cứu từ Viện Da liễu Việt Nam cho thấy, 78% phụ nữ Việt gặp vấn đề về da khô, nứt nẻ trong mùa đông.</p>

      <h3>Những dấu hiệu da thiếu ẩm:</h3>
      <ul>
        <li>Da căng rít, khô ráp sau khi rửa mặt</li>
        <li>Xuất hiện vảy nhỏ, bong tróc</li>
        <li>Cảm giác ngứa, khó chịu</li>
        <li>Nếp nhăn tạm thời xuất hiện nhiều hơn</li>
        <li>Da mất độ đàn hồi, không mịn màng</li>
      </ul>

      <h2>Routine chăm sóc da mùa đông 7 bước với Cocoon</h2>
      
      <h3>Bước 1: Làm sạch nhẹ nhàng (Sáng & Tối)</h3>
      <p><strong>Sản phẩm gợi ý:</strong> Sữa rửa mặt Cocoon từ dầu dừa và mật ong</p>
      <p>Tránh sử dụng sữa rửa mặt có tính tẩy rửa mạnh. Thay vào đó, chọn loại có pH cân bằng (5.5-6.5), chứa các thành phần dưỡng ẩm tự nhiên như:</p>
      <ul>
        <li><strong>Dầu dừa:</strong> Tạo lớp bảo vệ tự nhiên, không làm khô da</li>
        <li><strong>Mật ong:</strong> Kháng khuẩn, dưỡng ẩm sâu</li>
        <li><strong>Lô hội:</strong> Làm dịu, giảm kích ứng</li>
      </ul>

      <h3>Bước 2: Toner cấp ẩm tức thì (Sáng & Tối)</h3>
      <p><strong>Sản phẩm gợi ý:</strong> Nước hoa hồng Cocoon từ hoa sen và trà xanh</p>
      <p>Sử dụng toner không chứa cồn, giàu các chiết xuất thực vật. Áp dụng phương pháp "7 skin method" - thoa 3-4 lớp toner mỏng để cấp ẩm tối đa.</p>

      <h3>Bước 3: Essence/Serum dưỡng ẩm sâu (Sáng & Tối)</h3>
      <p><strong>Sản phẩm gợi ý:</strong> Serum Cocoon Hyaluronic Acid từ thực vật</p>
      <p>Chọn serum chứa:</p>
      <ul>
        <li><strong>Hyaluronic Acid tự nhiên:</strong> Giữ ẩm gấp 1000 lần trọng lượng</li>
        <li><strong>Vitamin E từ dầu argan:</strong> Chống oxy hóa, phục hồi da</li>
        <li><strong>Chiết xuất bí đao:</strong> Làm sáng, cấp ẩm từ sâu bên trong</li>
      </ul>

      <h3>Bước 4: Kem dưỡng ẩm đậm đặc (Sáng & Tối)</h3>
      <p><strong>Sản phẩm gợi ý:</strong> Kem dưỡng Cocoon Winter Care với bơ hạt mỡ</p>
      <p>Trong mùa đông, chuyển từ lotion sang cream có kết cấu đậm đặc hơn. Massage nhẹ nhàng theo chuyển động tròn từ trong ra ngoài, từ dưới lên trên.</p>

      <blockquote>
        "Da đẹp không chỉ đến từ sản phẩm bên ngoài mà còn từ sự chăm sóc toàn diện từ bên trong. Hãy yêu thương bản thân và da sẽ đáp lại bạn bằng vẻ đẹp rạng rỡ." - Chuyên gia da liễu Cocoon
      </blockquote>

      <h2>Tips bổ sung cho da khỏe mạnh mùa đông</h2>
      <h3>1. Chế độ ăn uống</h3>
      <ul>
        <li>Uống đủ 2-2.5L nước/ngày</li>
        <li>Tăng cường omega-3 từ hạt chia, hạt lanh</li>
        <li>Ăn nhiều trái cây giàu vitamin C: cam, bưởi, kiwi</li>
        <li>Bổ sung collagen từ thực vật</li>
      </ul>

      <h3>2. Môi trường sống</h3>
      <ul>
        <li>Sử dụng máy tạo ẩm trong phòng (độ ẩm lý tưởng 40-60%)</li>
        <li>Tránh tắm nước quá nóng</li>
        <li>Sử dụng khăn cotton mềm</li>
        <li>Thay ga gối thường xuyên</li>
      </ul>
    `
    },
    {
        id: 3,
        title: "Hành trình phát triển mỹ phẩm thuần chay tại Việt Nam",
        excerpt: "Câu chuyện về sự phát triển của ngành mỹ phẩm thuần chay Việt Nam và những thách thức, cơ hội trong tương lai.",
        image: "/baiviet3.jpg",
        date: "08.12.2024",
        author: "Cocoon",
        category: "Câu chuyện thương hiệu",
        readTime: "15 phút đọc",
        views: "3,891",
        content: `
      <p>Trong những năm gần đây, ngành mỹ phẩm thuần chay tại Việt Nam đã có những bước phát triển vượt bậc, từ một thị trường ngách nhỏ bé đến một xu hướng được nhiều người tiêu dùng quan tâm và lựa chọn. Đây không chỉ là câu chuyện về kinh doanh mà còn là hành trình thay đổi nhận thức về vẻ đẹp bền vững.</p>

      <h2>Khởi đầu từ những giá trị truyền thống</h2>
      <p>Việt Nam từ lâu đã có truyền thống sử dụng các thành phần tự nhiên trong chăm sóc sắc đẹp. Từ nghệ, mật ong, dầu dừa đến các loại thảo dược quý hiếm như sâm Ngọc Linh, trà xanh Thái Nguyên, tất cả đều được cha ông ta sử dụng để duy trì vẻ đẹp tự nhiên qua nhiều thế hệ.</p>

      <h3>Di sản làm đẹp của người Việt</h3>
      <ul>
        <li><strong>Miền Bắc:</strong> Sử dụng trà xanh, bùn ao tù, nước vo gạo</li>
        <li><strong>Miền Trung:</strong> Nghệ Hưng Yên, muối biển, lá neem</li>
        <li><strong>Miền Nam:</strong> Dầu dừa, mật ong rừng, bí đao</li>
      </ul>

      <h2>Giai đoạn thức tỉnh (2010-2015)</h2>
      <p>Những năm 2010-2015 đánh dấu sự thức tỉnh của người tiêu dùng Việt Nam về tác hại của các hóa chất trong mỹ phẩm. Cùng với đó, ý thức bảo vệ môi trường và động vật cũng ngày càng được nâng cao, đặc biệt trong thế hệ millennials và Gen Z.</p>

      <h2>Giai đoạn bùng nổ (2016-2020)</h2>
      <p>Từ 2016, thị trường mỹ phẩm thuần chay Việt Nam bắt đầu bùng nổ với sự xuất hiện của nhiều thương hiệu nội địa. Theo báo cáo của Euromonitor, thị trường mỹ phẩm organic và natural tại Việt Nam tăng trưởng 25% mỗi năm.</p>

      <h3>Những cột mốc quan trọng:</h3>
      <ul>
        <li><strong>2016:</strong> Ra đời thương hiệu Cocoon với sản phẩm đầu tiên từ dầu dừa</li>
        <li><strong>2017:</strong> Thành lập Hiệp hội Mỹ phẩm Thuần chay Việt Nam</li>
        <li><strong>2018:</strong> Triển lãm Beauty Expo đầu tiên dành riêng cho mỹ phẩm tự nhiên</li>
        <li><strong>2019:</strong> Chính phủ ban hành tiêu chuẩn chứng nhận organic cho mỹ phẩm</li>
        <li><strong>2020:</strong> Xuất khẩu mỹ phẩm thuần chay Việt Nam đạt 50 triệu USD</li>
      </ul>

      <h2>Tầm nhìn 2030: Việt Nam - Trung tâm mỹ phẩm thuần chay Đông Nam Á</h2>
      <p>Với những nền tảng vững chắc đã xây dựng, ngành mỹ phẩm thuần chay Việt Nam đặt mục tiêu trở thành trung tâm sản xuất và xuất khẩu mỹ phẩm thuần chay hàng đầu Đông Nam Á vào năm 2030.</p>

      <h3>Các mục tiêu cụ thể:</h3>
      <ul>
        <li><strong>Doanh thu:</strong> Đạt 1 tỷ USD kim ngạch xuất khẩu</li>
        <li><strong>Thị phần:</strong> Chiếm 30% thị trường nội địa</li>
        <li><strong>Việc làm:</strong> Tạo ra 200,000 việc làm</li>
        <li><strong>Môi trường:</strong> Giảm 50% lượng khí thải carbon trong sản xuất</li>
        <li><strong>Nghiên cứu:</strong> Đầu tư 2% GDP vào R&D</li>
      </ul>

      <blockquote>
        "Hành trình phát triển mỹ phẩm thuần chay tại Việt Nam không chỉ là câu chuyện kinh doanh, mà còn là câu chuyện về tình yêu thiên nhiên, về trách nhiệm với môi trường và về niềm tự hào dân tộc." - CEO Trần Minh Đức, Cocoon Việt Nam
      </blockquote>

      <h2>Câu chuyện thành công của Cocoon</h2>
      <p>Là một trong những thương hiệu tiên phong, Cocoon đã trải qua hành trình từ startup nhỏ bé đến thương hiệu mỹ phẩm thuần chay hàng đầu Việt Nam. Với hơn 100 sản phẩm, hiện diện tại 2,000 điểm bán và xuất khẩu đến 15 quốc gia.</p>

      <h3>Những cột mốc quan trọng của Cocoon:</h3>
      <ul>
        <li><strong>2016:</strong> Thành lập với 3 sản phẩm đầu tiên</li>
        <li><strong>2018:</strong> Nhận chứng nhận Leaping Bunny (không thử nghiệm trên động vật)</li>
        <li><strong>2020:</strong> Mở rộng ra thị trường quốc tế</li>
        <li><strong>2022:</strong> Đạt doanh thu 500 tỷ đồng</li>
        <li><strong>2024:</strong> Trở thành B-Corp đầu tiên trong ngành mỹ phẩm Việt Nam</li>
      </ul>
    `
    }
]

const articleIdeas = [
    {
        title: "5 thành phần thiên nhiên Việt Nam 'vàng' cho làn da khỏe mạnh",
        excerpt: "Khám phá sức mạnh của nghệ, mật ong rừng, dầu dừa, lô hội và trà xanh trong việc chăm sóc da tự nhiên.",
        image: "/natural-ingredients.jpg",
        date: "15.12.2024",
        author: "Cocoon",
        category: "Thành phần tự nhiên",
        readTime: "6 phút đọc"
    },
    {
        title: "Cocoon và hành trình Zero Waste: Từ bao bì đến sản xuất",
        excerpt: "Tìm hiểu cách Cocoon áp dụng triết lý Zero Waste trong toàn bộ quy trình từ nghiên cứu, sản xuất đến đóng gói sản phẩm.",
        image: "/vegan-beauty.jpg",
        date: "18.12.2024",
        author: "Cocoon",
        category: "Môi trường",
        readTime: "8 phút đọc"
    },
    {
        title: "Routine chăm sóc da 7 bước với sản phẩm Cocoon",
        excerpt: "Hướng dẫn chi tiết routine chăm sóc da hoàn chỉnh từ sáng đến tối với các sản phẩm thuần chay của Cocoon.",
        image: "/skincare-serum-toner-moisturizer.jpg",
        date: "20.12.2024",
        author: "Cocoon",
        category: "Hướng dẫn sử dụng",
        readTime: "10 phút đọc"
    },
    {
        title: "Câu chuyện về người nông dân trồng sen cho Cocoon",
        excerpt: "Gặp gỡ những người nông dân tận tâm trồng sen sạch, cung cấp nguyên liệu quý giá cho các sản phẩm Cocoon.",
        image: "/lotus-flower-toner-vietnamese-skincare.jpg",
        date: "22.12.2024",
        author: "Cocoon",
        category: "Câu chuyện con người",
        readTime: "5 phút đọc"
    }
]

export default function ArticlesPage() {
    const [selectedArticle, setSelectedArticle] = useState<number | null>(null)
    const [showAllContent, setShowAllContent] = useState<{ [key: number]: boolean }>({})

    const article = selectedArticle ? articlesData.find(a => a.id === selectedArticle) : null

    const toggleContent = (articleId: number) => {
        setShowAllContent(prev => ({
            ...prev,
            [articleId]: !prev[articleId]
        }))
    }

    // Nếu đang xem chi tiết bài viết
    if (article) {
        return (
            <div className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative">
                    <div className="relative h-96 md:h-[500px] overflow-hidden">
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40" />

                        <div className="absolute inset-0 flex items-end">
                            <div className="container mx-auto px-4 pb-12">
                                <div className="max-w-4xl">
                                    <Badge variant="secondary" className="mb-4 bg-white/90 text-green-700 font-medium">
                                        {article.category}
                                    </Badge>
                                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                                        {article.title}
                                    </h1>
                                    <div className="flex items-center gap-6 text-white/90">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-5 h-5" />
                                            <span>{article.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User className="w-5 h-5" />
                                            <span>{article.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-5 h-5" />
                                            <span>{article.readTime}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Eye className="w-5 h-5" />
                                            <span>{article.views} lượt xem</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Article Content */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Main Content */}
                            <div className="lg:w-2/3">
                                {/* Navigation & Actions */}
                                <div className="flex items-center justify-between mb-8 pb-6 border-b">
                                    <Button
                                        variant="outline"
                                        className="gap-2"
                                        onClick={() => setSelectedArticle(null)}
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Quay lại danh sách
                                    </Button>

                                    <div className="flex items-center gap-3">
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <Heart className="w-4 h-4" />
                                            Yêu thích
                                        </Button>
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <Share2 className="w-4 h-4" />
                                            Chia sẻ
                                        </Button>
                                    </div>
                                </div>

                                {/* Article Body */}
                                <div className="prose prose-lg max-w-none">
                                    <div
                                        className="article-content"
                                        dangerouslySetInnerHTML={{ __html: article.content }}
                                    />
                                </div>

                                {/* Tags */}
                                <div className="mt-12 pt-8 border-t">
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="outline">Mỹ phẩm thuần chay</Badge>
                                        <Badge variant="outline">Cocoon</Badge>
                                        <Badge variant="outline">Việt Nam</Badge>
                                        <Badge variant="outline">Thiên nhiên</Badge>
                                        <Badge variant="outline">{article.category}</Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:w-1/3">
                                <div className="sticky top-24 space-y-8">
                                    {/* Popular Articles */}
                                    <Card className="shadow-lg">
                                        <CardHeader className="pb-4">
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="w-5 h-5 text-green-600" />
                                                <h3 className="text-xl font-bold text-gray-900">Bài viết phổ biến</h3>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {articlesData
                                                .filter(a => a.id !== article.id)
                                                .sort((a, b) => parseInt(b.views.replace(',', '')) - parseInt(a.views.replace(',', '')))
                                                .map((popularArticle, index) => (
                                                    <div
                                                        key={popularArticle.id}
                                                        className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
                                                        onClick={() => setSelectedArticle(popularArticle.id)}
                                                    >
                                                        <div className="relative w-16 h-16 flex-shrink-0">
                                                            <Image
                                                                src={popularArticle.image}
                                                                alt={popularArticle.title}
                                                                fill
                                                                className="object-cover rounded-md"
                                                            />
                                                            <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                                                {index + 1}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-medium text-sm text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors">
                                                                {popularArticle.title}
                                                            </h4>
                                                            <div className="flex items-center justify-between mt-2">
                                                                <Badge variant="outline" className="text-xs">
                                                                    {popularArticle.category}
                                                                </Badge>
                                                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                                                    <Eye className="w-3 h-3" />
                                                                    <span>{popularArticle.views}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </CardContent>
                                    </Card>

                                    {/* Newsletter Signup */}
                                    <Card className="shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                                        <CardContent className="p-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                                                Đăng ký nhận bài viết mới
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-4">
                                                Nhận những bài viết mới nhất về mỹ phẩm thuần chay và lối sống xanh
                                            </p>
                                            <div className="space-y-3">
                                                <input
                                                    type="email"
                                                    placeholder="Email của bạn"
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                                />
                                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                                                    Đăng ký ngay
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    // Trang danh sách bài viết
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-white">
            {/* Hero Section */}
            <section className="relative py-16 bg-gradient-to-r from-green-100 to-emerald-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Sparkles className="w-8 h-8 text-green-600" />
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                                Bài viết
                            </h1>
                            <Sparkles className="w-8 h-8 text-green-600" />
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Khám phá những câu chuyện, kiến thức và cập nhật mới nhất về mỹ phẩm thuần chay,
                            bảo vệ môi trường và lối sống xanh từ Cocoon Việt Nam.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Articles */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1 h-8 bg-green-600 rounded-full"></div>
                        <h2 className="text-2xl font-bold text-gray-900">Bài viết nổi bật</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articlesData.map((article) => (
                            <Card key={article.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg">
                                <div className="relative overflow-hidden">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        width={400}
                                        height={250}
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <Badge variant="secondary" className="bg-white/90 text-green-700 font-medium">
                                            {article.category}
                                        </Badge>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                <CardHeader className="pb-3">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{article.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <User className="w-4 h-4" />
                                            <span>{article.author}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors">
                                        {article.title}
                                    </h3>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                                        {article.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                            <span>{article.readTime}</span>
                                            <div className="flex items-center gap-1">
                                                <Eye className="w-4 h-4" />
                                                <span>{article.views}</span>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() => setSelectedArticle(article.id)}
                                            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors group bg-transparent hover:bg-green-50 border-0 p-0"
                                        >
                                            Đọc thêm
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Articles Ideas */}
            <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Lightbulb className="w-8 h-8 text-blue-600" />
                            <h2 className="text-3xl font-bold text-gray-900">Ý tưởng bài viết sắp tới</h2>
                        </div>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Những chủ đề thú vị mà chúng tôi đang chuẩn bị để chia sẻ với bạn trong thời gian tới
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {articleIdeas.slice(0, 4).map((idea, index) => (
                            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
                                <Badge variant="outline" className="mb-3 text-blue-600 border-blue-200">
                                    {idea.category}
                                </Badge>
                                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm">
                                    {idea.title}
                                </h3>
                                <p className="text-gray-600 text-xs line-clamp-3 mb-3">
                                    {idea.excerpt}
                                </p>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>{idea.date}</span>
                                    <span>{idea.readTime}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-gray-600 mb-4">
                            Bạn có ý tưởng bài viết nào muốn chúng tôi viết không?
                        </p>
                        <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                            Gửi ý tưởng của bạn
                        </button>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Đăng ký nhận bài viết mới
                        </h2>
                        <p className="text-green-100 mb-8">
                            Nhận những bài viết mới nhất về mỹ phẩm thuần chay và lối sống xanh
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Nhập email của bạn"
                                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50 outline-none"
                            />
                            <button className="px-6 py-3 bg-white text-green-600 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                                Đăng ký
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}