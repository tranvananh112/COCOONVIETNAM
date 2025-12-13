# ✅ Kiểm tra dữ liệu Supabase

## Xác nhận: Supabase đang hoạt động!

Đã test và xác nhận:
- ✅ **Products table**: 5 sản phẩm
- ✅ **Orders table**: 2 đơn hàng
- ✅ **Customers table**: 1 khách hàng
- ✅ **Visitors table**: Sẵn sàng

## 📊 Cách xem dữ liệu trong Supabase

### Cách 1: Qua Supabase Dashboard (Dễ nhất)

1. Truy cập: https://supabase.com/dashboard
2. Chọn project: `yggcqzykpgxvuztdbsoz`
3. Click **Table Editor** (biểu tượng bảng bên trái)
4. Chọn table muốn xem:
   - **orders** - Xem tất cả đơn hàng
   - **customers** - Xem khách hàng
   - **products** - Xem sản phẩm
   - **visitors** - Xem khách truy cập

### Cách 2: Qua trang Admin của website

1. Truy cập: `https://your-domain.vercel.app/admin`
2. Tab **"Đơn hàng"** - Xem danh sách đơn hàng real-time
3. Tab **"Phân tích"** - Xem thống kê khách truy cập
4. Dữ liệu tự động refresh mỗi 10 giây

### Cách 3: Test local (Nếu đang dev)

Chạy lệnh:
```bash
node test-supabase.js
```

## 📝 Dữ liệu hiện có

### Đơn hàng (Orders)
```
Đơn 1:
- Mã: ORD-1765075480801
- Khách: demo1
- SĐT: 0342645707
- Địa chỉ: Đại Học Duy Tân
- Tổng tiền: 175,000đ
- Thanh toán: MoMo (Đã thanh toán)
- Trạng thái: Chờ xử lý

Đơn 2:
- Mã: ORD-1764937912577
- Khách: Trần Anh
- SĐT: 0342645707
- Địa chỉ: Huyện điện ban, Đội 6 thon cẩm đồng
- Tổng tiền: 175,000đ
- Thanh toán: MoMo (Đã thanh toán)
- Trạng thái: Chờ xử lý
```

## 🔄 Khi có đơn hàng mới

1. **Khách đặt hàng** trên website
2. **Tự động lưu** vào Supabase `orders` table
3. **Admin xem ngay** tại `/admin` (auto refresh 10s)
4. **Cập nhật trạng thái** từ admin → Lưu vào Supabase

## 🎯 Các chức năng đang hoạt động

✅ **Đặt hàng**: Khách đặt → Lưu Supabase
✅ **Xem đơn hàng**: Admin → Real-time từ Supabase  
✅ **Cập nhật trạng thái**: Admin → Lưu Supabase
✅ **Theo dõi đơn hàng**: Khách tra cứu bằng SĐT
✅ **Analytics**: Track khách truy cập real-time

## 🚀 Deploy lên Vercel

Khi deploy, đảm bảo thêm Environment Variables:
```
NEXT_PUBLIC_SUPABASE_URL = https://yggcqzykpgxvuztdbsoz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnZ2NxenlrcGd4dnV6dGRic296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MTU0NjAsImV4cCI6MjA4MDQ5MTQ2MH0.l7lzB6-y6cpgYcovDfRqamnQgUmKkJcoyA2-FBPbjBo
```

Sau đó website sẽ hoạt động y hệt như local!
