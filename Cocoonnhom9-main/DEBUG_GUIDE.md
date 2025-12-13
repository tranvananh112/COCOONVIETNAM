# 🔍 Hướng dẫn Debug - Tại sao đơn hàng không lưu vào Supabase?

## Vấn đề: Khách đặt hàng nhưng Admin không thấy

Có 3 nguyên nhân chính:

### 1️⃣ Environment Variables chưa được thêm vào Vercel

**Triệu chứng:**
- Khách đặt hàng thành công
- Nhưng không thấy trong Supabase
- Admin page không hiển thị đơn hàng

**Giải pháp:**
1. Vào Vercel Dashboard: https://vercel.com
2. Chọn project: `nhom9cocoonvietnam`
3. Vào **Settings** → **Environment Variables**
4. Thêm 2 biến:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://yggcqzykpgxvuztdbsoz.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnZ2NxenlrcGd4dnV6dGRic296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MTU0NjAsImV4cCI6MjA4MDQ5MTQ2MH0.l7lzB6-y6cpgYcovDfRqamnQgUmKkJcoyA2-FBPbjBo
   ```
5. **Quan trọng**: Chọn **Production**, **Preview**, **Development**
6. Click **Save**
7. Vào **Deployments** → Click **Redeploy**

### 2️⃣ Supabase Tables chưa được tạo

**Triệu chứng:**
- Console log báo lỗi "relation does not exist"
- Hoặc "table not found"

**Giải pháp:**
1. Vào Supabase Dashboard: https://supabase.com/dashboard
2. Chọn project: `yggcqzykpgxvuztdbsoz`
3. Vào **SQL Editor**
4. Chạy các scripts trong file `SUPABASE_SETUP.md`
5. Kiểm tra trong **Table Editor** xem đã có tables chưa

### 3️⃣ Row Level Security (RLS) chặn insert

**Triệu chứng:**
- Console log báo "new row violates row-level security policy"

**Giải pháp:**
Chạy SQL này trong Supabase SQL Editor:
```sql
-- Allow public to insert orders
DROP POLICY IF EXISTS "Allow public insert orders" ON orders;
CREATE POLICY "Allow public insert orders" ON orders 
  FOR INSERT WITH CHECK (true);

-- Allow public to insert order_items
DROP POLICY IF EXISTS "Allow public insert order_items" ON order_items;
CREATE POLICY "Allow public insert order_items" ON order_items 
  FOR INSERT WITH CHECK (true);

-- Allow public to insert/update customers
DROP POLICY IF EXISTS "Allow public insert customers" ON customers;
CREATE POLICY "Allow public insert customers" ON customers 
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update customers" ON customers;
CREATE POLICY "Allow public update customers" ON customers 
  FOR UPDATE USING (true);
```

## 🧪 Cách kiểm tra

### Test 1: Kiểm tra Environment Variables

Truy cập: `https://your-domain.vercel.app/test-connection`

Trang này sẽ kiểm tra:
- ✅ Environment variables có được set chưa
- ✅ Kết nối Supabase có OK không
- ✅ Có thể tạo đơn hàng không

### Test 2: Kiểm tra Console Log

1. Mở website trên Vercel
2. Nhấn F12 để mở Developer Tools
3. Vào tab **Console**
4. Thử đặt hàng
5. Xem có lỗi gì không:
   - ❌ "Supabase chưa được cấu hình" → Thiếu env vars
   - ❌ "relation does not exist" → Thiếu tables
   - ❌ "row-level security" → Lỗi RLS policy
   - ✅ "Đơn hàng ORD-xxx đã được tạo" → Thành công!

### Test 3: Kiểm tra Supabase trực tiếp

1. Vào Supabase Dashboard
2. **Table Editor** → `orders`
3. Click **Refresh**
4. Xem có đơn hàng mới không

## 📊 Flow hoạt động đúng

```
Khách đặt hàng
    ↓
Checkout page gọi createOrder()
    ↓
Lưu vào Supabase orders table
    ↓
Lưu vào Supabase order_items table
    ↓
Trả về orderCode (ORD-xxx)
    ↓
Hiển thị "Đặt hàng thành công"
    ↓
Admin page tự động refresh (10s)
    ↓
Admin thấy đơn hàng mới
```

## ✅ Checklist

Trước khi deploy, đảm bảo:

- [ ] Đã thêm Environment Variables vào Vercel
- [ ] Đã chạy SQL scripts tạo tables trong Supabase
- [ ] Đã test trang `/test-connection` → Tất cả đều xanh
- [ ] Đã thử đặt hàng test → Thấy trong Supabase
- [ ] Admin page hiển thị đơn hàng

## 🆘 Vẫn không được?

Nếu đã làm tất cả mà vẫn không được:

1. **Check Vercel Logs:**
   - Vào Vercel Dashboard
   - Click vào Deployment
   - Xem **Function Logs**
   - Tìm lỗi khi đặt hàng

2. **Check Supabase Logs:**
   - Vào Supabase Dashboard
   - Vào **Logs** → **API**
   - Xem có request nào bị reject không

3. **Test local:**
   ```bash
   npm run dev
   # Thử đặt hàng
   # Xem console log
   ```

## 📞 Liên hệ

Nếu cần hỗ trợ, cung cấp:
- Screenshot trang `/test-connection`
- Console log khi đặt hàng
- Vercel deployment URL
