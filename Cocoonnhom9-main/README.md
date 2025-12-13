# 🌿 Cocoon Vietnam - Website Mỹ Phẩm Thuần Chay

Website thương mại điện tử cho thương hiệu mỹ phẩm thuần chay Cocoon Vietnam với tích hợp Supabase real-time.

## 🚀 Công nghệ sử dụng

- **Next.js 16** - React Framework với App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Database & Real-time
- **Zustand** - State Management
- **Radix UI** - UI Components
- **SWR** - Data fetching & caching

## ✨ Tính năng chính

### Khách hàng
- ✅ Xem danh sách sản phẩm từ Supabase
- ✅ Thêm vào giỏ hàng
- ✅ Thanh toán (COD / MoMo QR)
- ✅ Theo dõi đơn hàng bằng SĐT
- ✅ Responsive design

### Admin
- ✅ Dashboard real-time (auto refresh 10s)
- ✅ Quản lý đơn hàng
- ✅ Cập nhật trạng thái đơn hàng
- ✅ Thống kê khách truy cập
- ✅ Analytics (devices, browsers, locations)
- ✅ Xem số người đang online

## 📦 Cài đặt Local

```bash
# Clone repository
git clone https://github.com/tranvananh112/nhom9cocoonvietnam.git
cd nhom9cocoonvietnam

# Cài đặt dependencies
npm install

# Tạo file .env.local
cp .env.example .env.local
# Thêm Supabase credentials vào .env.local

# Chạy development server
npm run dev
```

Truy cập: http://localhost:3000

## 🗄️ Setup Supabase

**Bước 1:** Tạo tables trong Supabase
- Xem hướng dẫn chi tiết: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- Chạy các SQL scripts để tạo tables

**Bước 2:** Lấy credentials
1. Vào Supabase Dashboard
2. Settings → API
3. Copy `URL` và `anon public key`

**Bước 3:** Thêm vào `.env.local`
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 🌐 Deploy lên Vercel

### Bước 1: Push code lên GitHub
```bash
git push origin main
```

### Bước 2: Import vào Vercel
1. Vào https://vercel.com/new
2. Import repository: `tranvananh112/nhom9cocoonvietnam`
3. Framework: Next.js (tự động phát hiện)

### Bước 3: Thêm Environment Variables
**QUAN TRỌNG!** Thêm 2 biến sau:
```
NEXT_PUBLIC_SUPABASE_URL = https://yggcqzykpgxvuztdbsoz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnZ2NxenlrcGd4dnV6dGRic296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MTU0NjAsImV4cCI6MjA4MDQ5MTQ2MH0.l7lzB6-y6cpgYcovDfRqamnQgUmKkJcoyA2-FBPbjBo
```

### Bước 4: Deploy
Click "Deploy" và đợi 2-3 phút

## 🧪 Test & Debug

### Test kết nối Supabase
Truy cập: `https://your-domain.vercel.app/test-connection`

Trang này sẽ kiểm tra:
- Environment variables
- Kết nối database
- Khả năng tạo đơn hàng

### Nếu có lỗi
Xem hướng dẫn debug chi tiết: [DEBUG_GUIDE.md](./DEBUG_GUIDE.md)

### Kiểm tra dữ liệu
Xem hướng dẫn: [CHECK_DATA.md](./CHECK_DATA.md)

## 📱 Scripts

```bash
npm run dev      # Development server (http://localhost:3000)
npm run build    # Build production
npm run start    # Production server
npm run lint     # Lint code
node test-supabase.js  # Test Supabase connection
```

## 📂 Cấu trúc Project

```
├── app/                    # Next.js App Router
│   ├── page.tsx           # Trang chủ
│   ├── products/          # Trang sản phẩm
│   ├── cart/              # Giỏ hàng
│   ├── checkout/          # Thanh toán
│   ├── orders/            # Theo dõi đơn hàng
│   ├── admin/             # Admin dashboard
│   └── test-connection/   # Test Supabase
├── components/            # React components
├── lib/                   # Utilities & stores
│   ├── supabase/         # Supabase clients
│   ├── supabase-orders.ts # Order functions
│   └── supabase-analytics.ts # Analytics
├── scripts/              # SQL scripts
└── public/               # Static files
```

## 🔗 Links

- **Production**: https://nhom9cocoonvietnam.vercel.app
- **GitHub**: https://github.com/tranvananh112/nhom9cocoonvietnam
- **Admin**: https://nhom9cocoonvietnam.vercel.app/admin
- **Test**: https://nhom9cocoonvietnam.vercel.app/test-connection

## 📚 Tài liệu

- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Hướng dẫn setup database
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Hướng dẫn deploy chi tiết
- [DEBUG_GUIDE.md](./DEBUG_GUIDE.md) - Hướng dẫn debug
- [CHECK_DATA.md](./CHECK_DATA.md) - Kiểm tra dữ liệu

## 🆘 Troubleshooting

**Đơn hàng không lưu vào Supabase?**
1. Kiểm tra Environment Variables trên Vercel
2. Chạy `/test-connection` để kiểm tra
3. Xem [DEBUG_GUIDE.md](./DEBUG_GUIDE.md)

**Admin không thấy đơn hàng?**
1. Kiểm tra Supabase có tables chưa
2. Xem Console log có lỗi không
3. Refresh trang admin (auto refresh 10s)

## 👥 Nhóm phát triển

Nhóm 9 - Cocoon Vietnam

---

Made with ❤️ using Next.js & Supabase

**Note**: Ensure Environment Variables are set in Vercel!
