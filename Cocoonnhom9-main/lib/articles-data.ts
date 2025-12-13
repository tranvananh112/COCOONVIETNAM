// Dữ liệu bài viết và ý tưởng cho website Cocoon

export interface Article {
    id: number
    title: string
    excerpt: string
    image: string
    date: string
    author: string
    category: string
    readTime: string
    content?: string
    tags?: string[]
}

// Bài viết hiện có
export const publishedArticles: Article[] = [
    {
        id: 1,
        title: "Cocoon x AAF: Ký kết hợp tác 'Chung tay cứu trợ chó mèo lang thang' lần II",
        excerpt: "Cocoon Việt Nam tiếp tục đồng hành cùng Quỹ Bảo vệ Động vật AAF trong chương trình cứu trợ động vật lang thang, thể hiện cam kết bảo vệ môi trường và động vật.",
        image: "/baiviet1.jpg",
        date: "13.12.2024",
        author: "Cocoon",
        category: "Hoạt động xã hội",
        readTime: "3 phút đọc",
        tags: ["Bảo vệ động vật", "Trách nhiệm xã hội", "AAF", "Cocoon"]
    },
    {
        id: 2,
        title: "Bí quyết chăm sóc da mùa đông với sản phẩm thuần chay",
        excerpt: "Khám phá những tips chăm sóc da hiệu quả trong mùa đông khô hanh với các sản phẩm thuần chay từ thiên nhiên Việt Nam.",
        image: "/baiviet2.jpg",
        date: "10.12.2024",
        author: "Cocoon",
        category: "Làm đẹp",
        readTime: "5 phút đọc",
        tags: ["Chăm sóc da", "Mùa đông", "Thuần chay", "Skincare"]
    },
    {
        id: 3,
        title: "Hành trình phát triển mỹ phẩm thuần chay tại Việt Nam",
        excerpt: "Câu chuyện về sự phát triển của ngành mỹ phẩm thuần chay Việt Nam và những thách thức, cơ hội trong tương lai.",
        image: "/baiviet3.jpg",
        date: "08.12.2024",
        author: "Cocoon",
        category: "Câu chuyện thương hiệu",
        readTime: "7 phút đọc",
        tags: ["Thương hiệu", "Việt Nam", "Phát triển", "Mỹ phẩm thuần chay"]
    }
]

// Ý tưởng bài viết mới (để bạn phát triển)
export const articleIdeas: Omit<Article, 'id' | 'content'>[] = [
    {
        title: "5 thành phần thiên nhiên Việt Nam 'vàng' cho làn da khỏe mạnh",
        excerpt: "Khám phá sức mạnh của nghệ, mật ong rừng, dầu dừa, lô hội và trà xanh trong việc chăm sóc da tự nhiên.",
        image: "/natural-ingredients.jpg",
        date: "15.12.2024",
        author: "Cocoon",
        category: "Thành phần tự nhiên",
        readTime: "6 phút đọc",
        tags: ["Thành phần tự nhiên", "Nghệ", "Mật ong", "Dầu dừa", "Việt Nam"]
    },
    {
        title: "Cocoon và hành trình Zero Waste: Từ bao bì đến sản xuất",
        excerpt: "Tìm hiểu cách Cocoon áp dụng triết lý Zero Waste trong toàn bộ quy trình từ nghiên cứu, sản xuất đến đóng gói sản phẩm.",
        image: "/vegan-beauty.jpg",
        date: "18.12.2024",
        author: "Cocoon",
        category: "Môi trường",
        readTime: "8 phút đọc",
        tags: ["Zero Waste", "Bền vững", "Môi trường", "Bao bì xanh"]
    },
    {
        title: "Routine chăm sóc da 7 bước với sản phẩm Cocoon",
        excerpt: "Hướng dẫn chi tiết routine chăm sóc da hoàn chỉnh từ sáng đến tối với các sản phẩm thuần chay của Cocoon.",
        image: "/skincare-serum-toner-moisturizer.jpg",
        date: "20.12.2024",
        author: "Cocoon",
        category: "Hướng dẫn sử dụng",
        readTime: "10 phút đọc",
        tags: ["Routine", "Chăm sóc da", "Hướng dẫn", "Skincare"]
    },
    {
        title: "Câu chuyện về người nông dân trồng sen cho Cocoon",
        excerpt: "Gặp gỡ những người nông dân tận tâm trồng sen sạch, cung cấp nguyên liệu quý giá cho các sản phẩm Cocoon.",
        image: "/lotus-flower-toner-vietnamese-skincare.jpg",
        date: "22.12.2024",
        author: "Cocoon",
        category: "Câu chuyện con người",
        readTime: "5 phút đọc",
        tags: ["Nông dân", "Sen", "Nguyên liệu", "Câu chuyện"]
    },
    {
        title: "Mỹ phẩm thuần chay vs. Mỹ phẩm truyền thống: So sánh chi tiết",
        excerpt: "Phân tích ưu nhược điểm của mỹ phẩm thuần chay so với mỹ phẩm truyền thống về hiệu quả, an toàn và tác động môi trường.",
        image: "/vegan-skincare-products-natural-cosmetics-green-le.jpg",
        date: "25.12.2024",
        author: "Cocoon",
        category: "Giáo dục",
        readTime: "12 phút đọc",
        tags: ["So sánh", "Thuần chay", "Giáo dục", "Hiệu quả"]
    },
    {
        title: "Lễ hội Tết và làn da: Cách giữ da đẹp trong mùa ăn uống",
        excerpt: "Tips chăm sóc da đặc biệt trong dịp Tết Nguyên Đán, khi chế độ ăn uống thay đổi và thời tiết chuyển mùa.",
        image: "/winter-melon-serum-vietnamese-skincare.jpg",
        date: "28.12.2024",
        author: "Cocoon",
        category: "Mùa lễ hội",
        readTime: "4 phút đọc",
        tags: ["Tết", "Chăm sóc da", "Mùa lễ hội", "Skincare tips"]
    },
    {
        title: "Cocoon Lab: Bên trong phòng thí nghiệm mỹ phẩm thuần chay",
        excerpt: "Khám phá quy trình nghiên cứu và phát triển sản phẩm tại phòng thí nghiệm Cocoon, nơi khoa học gặp gỡ thiên nhiên.",
        image: "/natural-cosmetics-laboratory-vietnam.jpg",
        date: "30.12.2024",
        author: "Cocoon",
        category: "Khoa học",
        readTime: "9 phút đọc",
        tags: ["Nghiên cứu", "Phòng thí nghiệm", "Khoa học", "R&D"]
    },
    {
        title: "Phụ nữ Việt và xu hướng làm đẹp xanh",
        excerpt: "Tìm hiểu thái độ và hành vi của phụ nữ Việt Nam đối với mỹ phẩm thuần chay và xu hướng làm đẹp bền vững.",
        image: "/vietnamese-woman-portrait-professional.jpg",
        date: "02.01.2025",
        author: "Cocoon",
        category: "Xu hướng",
        readTime: "7 phút đọc",
        tags: ["Phụ nữ Việt", "Xu hướng", "Làm đẹp xanh", "Khảo sát"]
    },
    {
        title: "DIY: Tự làm mặt nạ từ nguyên liệu thiên nhiên tại nhà",
        excerpt: "Hướng dẫn chi tiết cách tự làm các loại mặt nạ dưỡng da từ nguyên liệu thiên nhiên dễ tìm tại Việt Nam.",
        image: "/natural-face-mask-turmeric.jpg",
        date: "05.01.2025",
        author: "Cocoon",
        category: "DIY",
        readTime: "8 phút đọc",
        tags: ["DIY", "Mặt nạ", "Tự làm", "Nguyên liệu tự nhiên"]
    },
    {
        title: "Cocoon x Influencer: Hành trình lan tỏa thông điệp xanh",
        excerpt: "Câu chuyện hợp tác với các beauty influencer Việt Nam để lan tỏa thông điệp làm đẹp bền vững và thuần chay.",
        image: "/vietnamese-young-man-portrait-student.jpg",
        date: "08.01.2025",
        author: "Cocoon",
        category: "Hợp tác",
        readTime: "6 phút đọc",
        tags: ["Influencer", "Hợp tác", "Marketing", "Thông điệp xanh"]
    }
]

// Categories cho bài viết
export const articleCategories = [
    "Hoạt động xã hội",
    "Làm đẹp",
    "Câu chuyện thương hiệu",
    "Thành phần tự nhiên",
    "Môi trường",
    "Hướng dẫn sử dụng",
    "Câu chuyện con người",
    "Giáo dục",
    "Mùa lễ hội",
    "Khoa học",
    "Xu hướng",
    "DIY",
    "Hợp tác"
]

// Tags phổ biến
export const popularTags = [
    "Thuần chay",
    "Chăm sóc da",
    "Thiên nhiên",
    "Việt Nam",
    "Bền vững",
    "Môi trường",
    "Skincare",
    "Làm đẹp",
    "Organic",
    "Zero Waste",
    "Thương hiệu",
    "Nghiên cứu",
    "DIY",
    "Tips"
]