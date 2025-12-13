# 🚀 Hướng dẫn Deploy lên Vercel

## Bước 1: Chuẩn bị

Repository đã sẵn sàng tại: https://github.com/tranvananh112/nhom9cocoonvietnam

## Bước 2: Import vào Vercel

1. Truy cập: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Chọn repository: `tranvananh112/nhom9cocoonvietnam`
4. Click **"Import"**

## Bước 3: Cấu hình Project

Vercel sẽ tự động phát hiện Next.js. Giữ nguyên các cài đặt mặc định:

- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `next build`
- **Output Directory**: `.next`

## Bước 4: Thêm Environment Variables (QUAN TRỌNG!)

Trong phần **Environment Variables**, thêm 2 biến sau:

### Variable 1:
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://yggcqzykpgxvuztdbsoz.supabase.co
```

### Variable 2:
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnZ2NxenlrcGd4dnV6dGRic296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MTU0NjAsImV4cCI6MjA4MDQ5MTQ2MH0.l7lzB6-y6cpgYcovDfRqamnQgUmKkJcoyA2-FBPbjBo
```

**Lưu ý**: Chọn **"Production"**, **"Preview"**, và **"Development"** cho cả 2 biến.

## Bước 5: Deploy

1. Click **"Deploy"**
2. Đợi 2-3 phút để Vercel build và deploy
3. Sau khi hoàn thành, bạn sẽ nhận được URL: `https://nhom9cocoonvietnam.vercel.app`

## Bước 6: Kiểm tra

Truy cập URL và kiểm tra:
- ✅ Trang chủ hiển thị đầy đủ
- ✅ Danh sách sản phẩm
- ✅ Giỏ hàng hoạt động
- ✅ Trang thanh toán
- ✅ Trang quản trị

## 🔧 Troubleshooting

### Nếu website không hiển thị đầy đủ:

1. Vào **Settings** → **Environment Variables**
2. Kiểm tra 2 biến `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY` đã được thêm chưa
3. Vào **Deployments** → Click **"Redeploy"** (menu 3 chấm)

### Nếu có lỗi build:

1. Vào **Deployments** → Click vào deployment bị lỗi
2. Xem **Build Logs** để tìm lỗi
3. Sửa lỗi và push code mới lên GitHub
4. Vercel sẽ tự động deploy lại

## 📱 Custom Domain (Tùy chọn)

Nếu muốn dùng domain riêng:

1. Vào **Settings** → **Domains**
2. Thêm domain của bạn
3. Cấu hình DNS theo hướng dẫn của Vercel

## ✅ Hoàn thành!

Website của bạn đã sẵn sàng tại: https://nhom9cocoonvietnam.vercel.app
