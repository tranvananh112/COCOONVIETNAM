# ⚡ Quick Start: Real-time Order Tracking

## Bật Realtime trong 3 bước

### Bước 1: Bật Realtime trên Supabase (1 phút)

**Cách 1: Qua Dashboard**
1. Vào https://supabase.com/dashboard
2. Chọn project của bạn
3. Vào **Database** → **Replication** (menu bên trái)
4. Tìm bảng `orders`
5. Bật toggle **Enable Realtime**
6. Click **Save**

**Cách 2: Chạy SQL**
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
```

### Bước 2: Test Realtime (30 giây)

```bash
# Cài package nếu chưa có
npm install

# Chạy test
node test-realtime.js
```

Nếu thấy:
```
✅ Đã subscribe thành công!
⏳ Đang lắng nghe thay đổi...
```
→ Realtime đã hoạt động! 🎉

### Bước 3: Test trên website

**Mở 2 tab:**

**Tab 1 - User** (http://localhost:3000/orders)
- Nhập SĐT: `0999999999`
- Tra cứu đơn hàng

**Tab 2 - Admin** (http://localhost:3000/admin)
- Tìm đơn hàng của SĐT trên
- Đổi trạng thái: Pending → Confirmed → Shipping

**Kết quả:**
- Tab User tự động cập nhật ngay lập tức ⚡
- Hiện toast: "Đơn hàng đã được cập nhật!"
- Không cần refresh trang

## Cách hoạt động

```
Admin thay đổi trạng thái
    ↓
Supabase cập nhật database
    ↓
Realtime broadcast sự kiện
    ↓
User nhận thông báo ngay lập tức
    ↓
UI tự động refresh
```

## Troubleshooting

### ❌ Không nhận được cập nhật?

1. **Kiểm tra Realtime đã bật:**
   ```sql
   SELECT * FROM pg_publication_tables 
   WHERE pubname = 'supabase_realtime';
   ```
   Phải thấy `orders` trong kết quả

2. **Kiểm tra Console:**
   - F12 → Console
   - Phải thấy: "Real-time update: ..."

3. **Kiểm tra WebSocket:**
   - F12 → Network → WS
   - Phải có connection đến Supabase

### ❌ Lỗi "CHANNEL_ERROR"?

→ Realtime chưa được bật cho bảng orders
→ Làm lại Bước 1

## Xong! 🎉

Giờ khi admin cập nhật trạng thái, người dùng sẽ thấy ngay lập tức!

---

📖 Chi tiết: Xem file `REALTIME_GUIDE.md`
