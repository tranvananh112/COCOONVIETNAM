# Hướng dẫn Tính năng Bài viết - Cocoon Website

## 📝 Tổng quan
Tính năng bài viết đã được thêm vào website Cocoon với giao diện đẹp mắt và thân thiện với người dùng. Hệ thống bao gồm:

- **Trang danh sách bài viết** (`/articles`)
- **Trang chi tiết bài viết** (`/articles/[id]`)
- **Menu điều hướng** đã được cập nhật
- **Dữ liệu mẫu** và ý tưởng bài viết

## 🎨 Thiết kế & Giao diện

### Trang danh sách bài viết
- **Hero section** với tiêu đề và mô tả
- **Grid layout** responsive cho các bài viết
- **Card design** với hover effects
- **Badge** cho phân loại
- **Ý tưởng bài viết** sắp tới
- **Newsletter signup**
- **Categories section**

### Trang chi tiết bài viết
- **Hero image** với overlay
- **Metadata** (ngày, tác giả, thời gian đọc)
- **Content area** với typography đẹp
- **Related articles** ở cuối trang
- **Social sharing buttons**

## 📁 Cấu trúc File

```
app/
├── articles/
│   ├── page.tsx              # Trang danh sách bài viết
│   └── [id]/
│       └── page.tsx          # Trang chi tiết bài viết
├── globals.css               # CSS đã được cập nhật
└── layout.tsx               # Layout chính

components/
├── header.tsx               # Header đã thêm menu "Bài viết"
└── ui/
    ├── badge.tsx            # Component Badge
    └── card.tsx             # Component Card

lib/
└── articles-data.ts         # Dữ liệu bài viết và ý tưởng

public/
├── baiviet1.jpg            # Hình ảnh bài viết 1
├── baiviet2.jpg            # Hình ảnh bài viết 2
└── baiviet3.jpg            # Hình ảnh bài viết 3
```

## 📊 Dữ liệu Bài viết

### Bài viết hiện có (3 bài)
1. **Cocoon x AAF**: Hợp tác cứu trợ động vật
2. **Chăm sóc da mùa đông**: Tips với sản phẩm thuần chay
3. **Hành trình phát triển**: Mỹ phẩm thuần chay Việt Nam

### Ý tưởng bài viết (10 ý tưởng)
- Thành phần thiên nhiên Việt Nam
- Zero Waste journey
- Routine chăm sóc da 7 bước
- Câu chuyện người nông dân
- So sánh mỹ phẩm thuần chay vs truyền thống
- Tips chăm sóc da mùa Tết
- Bên trong phòng thí nghiệm
- Phụ nữ Việt và xu hướng xanh
- DIY mặt nạ tự nhiên
- Hợp tác với influencer

## 🎯 Cách sử dụng hình ảnh

### Hình ảnh hiện có
- `baiviet1.jpg` - Dành cho bài viết về hợp tác AAF
- `baiviet2.jpg` - Dành cho bài viết chăm sóc da
- `baiviet3.jpg` - Dành cho bài viết thương hiệu

### Thêm hình ảnh mới
1. Đặt file ảnh vào thư mục `public/`
2. Cập nhật đường dẫn trong `lib/articles-data.ts`
3. Kích thước khuyến nghị: 800x500px
4. Format: JPG hoặc WebP

## ✍️ Cách thêm bài viết mới

### Bước 1: Thêm dữ liệu
Cập nhật file `lib/articles-data.ts`:

```typescript
export const publishedArticles: Article[] = [
  // ... bài viết hiện có
  {
    id: 4, // ID mới
    title: "Tiêu đề bài viết mới",
    excerpt: "Mô tả ngắn...",
    image: "/hinh-anh-moi.jpg",
    date: "15.12.2024",
    author: "Cocoon",
    category: "Danh mục",
    readTime: "5 phút đọc",
    tags: ["tag1", "tag2"]
  }
]
```

### Bước 2: Thêm nội dung chi tiết
Cập nhật object `articlesData` trong `app/articles/[id]/page.tsx`:

```typescript
const articlesData = {
  // ... bài viết hiện có
  4: {
    id: 4,
    // ... metadata
    content: `
      <p>Nội dung bài viết với HTML...</p>
      <h2>Tiêu đề phụ</h2>
      <p>Đoạn văn tiếp theo...</p>
    `
  }
}
```

## 🎨 Tùy chỉnh giao diện

### Màu sắc chủ đạo
- **Primary**: Green (#2d5a3d)
- **Secondary**: Light green (#f5f0e8)
- **Accent**: Gold (#d4a574)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Be Vietnam Pro (sans-serif)

### CSS Classes quan trọng
- `.line-clamp-1/2/3` - Giới hạn số dòng hiển thị
- `.prose` - Styling cho nội dung bài viết
- `.article-content` - Styling đặc biệt cho content

## 🚀 Tính năng có thể mở rộng

### 1. Tìm kiếm bài viết
- Thêm search bar
- Filter theo category/tags
- Pagination

### 2. Comments system
- Tích hợp Disqus hoặc custom comments
- Moderation system

### 3. Social sharing
- Facebook, Twitter, LinkedIn
- Copy link functionality

### 4. Related articles
- Algorithm gợi ý bài viết liên quan
- Popular articles sidebar

### 5. Newsletter integration
- Mailchimp/ConvertKit integration
- Email templates

### 6. SEO optimization
- Meta tags động
- Structured data
- Sitemap generation

## 📱 Responsive Design

Giao diện đã được tối ưu cho:
- **Mobile**: 1 column layout
- **Tablet**: 2 columns layout  
- **Desktop**: 3-4 columns layout

## 🔧 Maintenance

### Cập nhật thường xuyên
1. Thêm bài viết mới từ ý tưởng có sẵn
2. Cập nhật hình ảnh chất lượng cao
3. Kiểm tra và sửa lỗi hiển thị
4. Tối ưu SEO cho từng bài viết

### Backup dữ liệu
- Export dữ liệu bài viết định kỳ
- Backup hình ảnh
- Version control cho content

## 💡 Tips viết bài hiệu quả

### Cấu trúc bài viết tốt
1. **Hook** - Câu mở đầu hấp dẫn
2. **Problem** - Vấn đề cần giải quyết
3. **Solution** - Giải pháp từ Cocoon
4. **Benefits** - Lợi ích cụ thể
5. **Call-to-action** - Hành động tiếp theo

### SEO-friendly content
- Sử dụng keywords tự nhiên
- Tiêu đề H2, H3 có cấu trúc
- Meta description hấp dẫn
- Alt text cho hình ảnh

### Engagement tips
- Câu hỏi tương tác với reader
- Storytelling về thương hiệu
- User-generated content
- Behind-the-scenes content

---

**Lưu ý**: Hệ thống bài viết hiện tại sử dụng static data. Để scale lên production, nên tích hợp với CMS như Strapi, Contentful hoặc database.