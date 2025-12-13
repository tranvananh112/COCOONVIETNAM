# ✅ Checklist Test Real-time Order Tracking

## Bước 1: Bật Realtime trên Supabase ⚠️ QUAN TRỌNG

### Cách 1: Qua Dashboard (Khuyến nghị)
1. ✅ Đăng nhập: https://supabase.com/dashboard
2. ✅ Chọn project: `yggcqzykpgxvuztdbsoz`
3. ✅ Vào **Database** → **Replication** (menu bên trái)
4. ✅ Tìm bảng `orders` trong danh sách
5. ✅ **BẬT** toggle "Enable Realtime" cho bảng `orders`
6. ✅ Click **Save** hoặc **Apply**

### Cách 2: Chạy SQL
1. ✅ Vào **SQL Editor**
2. ✅ Chạy lệnh:
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
```
3. ✅ Click **Run**

### Kiểm tra đã bật chưa:
```sql
SELECT * FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime' 
AND tablename = 'orders';
```
**Kết quả mong đợi:** Phải có 1 dòng với `tablename = orders`

---

## Bước 2: Test bằng Script

```bash
# Chạy script test
node test-realtime.js
```

### Kết quả mong đợi:
```
✅ Kết nối database thành công
✅ Đã subscribe thành công!
⏳ Đang lắng nghe thay đổi...
📦 Đã tạo đơn test: TEST-xxxxx
✅ Đã cập nhật trạng thái: confirmed
🎉 Nhận được cập nhật real-time!
✅ Đã cập nhật trạng thái: shipping
🎉 Nhận được cập nhật real-time!
✅ Đã cập nhật trạng thái: delivered
🎉 Nhận được cập nhật real-time!
```

### Nếu thấy lỗi:
❌ **"CHANNEL_ERROR"** → Realtime chưa được bật, làm lại Bước 1

---

## Bước 3: Test trên Website

### 3.1. Tạo đơn hàng test
1. ✅ Vào: http://localhost:3000
2. ✅ Thêm sản phẩm vào giỏ
3. ✅ Checkout với SĐT: **0999999999**
4. ✅ Hoàn tất đơn hàng

### 3.2. Mở 2 tab trình duyệt

**Tab 1 - Người dùng (User):**
1. ✅ Vào: http://localhost:3000/orders
2. ✅ Nhập SĐT: `0999999999`
3. ✅ Click "Tra cứu"
4. ✅ Thấy đơn hàng vừa tạo
5. ✅ Kiểm tra badge "Real-time" màu xanh ở góc phải
6. ✅ **ĐỂ TAB NÀY MỞ** - Không refresh

**Tab 2 - Admin:**
1. ✅ Vào: http://localhost:3000/admin
2. ✅ Vào tab "Đơn hàng"
3. ✅ Tìm đơn hàng SĐT `0999999999`
4. ✅ Đổi trạng thái: **Pending** → **Confirmed**

### 3.3. Quan sát Tab User

**Kết quả mong đợi:**
- ✅ Trạng thái tự động đổi thành "Đã xác nhận" (màu xanh dương)
- ✅ Hiện toast notification: "Đơn hàng đã được cập nhật!"
- ✅ Timeline cập nhật ngay lập tức
- ✅ **KHÔNG CẦN** refresh trang

### 3.4. Tiếp tục test các trạng thái khác

**Trong Tab Admin:**
1. ✅ Đổi: **Confirmed** → **Shipping** (Đang giao)
2. ✅ Chờ 1-2 giây
3. ✅ Đổi: **Shipping** → **Delivered** (Đã giao)

**Trong Tab User:**
- ✅ Mỗi lần admin đổi → User thấy ngay lập tức
- ✅ Toast notification hiện mỗi lần
- ✅ Timeline animation mượt mà

---

## Bước 4: Kiểm tra Console (DevTools)

### Mở Console trong Tab User:
1. ✅ Nhấn F12 → Tab Console
2. ✅ Khi admin đổi trạng thái, phải thấy:
```
Real-time update: {eventType: "UPDATE", new: {...}, old: {...}}
```

### Kiểm tra WebSocket:
1. ✅ F12 → Tab Network → Filter "WS" (WebSocket)
2. ✅ Phải thấy connection đến: `wss://yggcqzykpgxvuztdbsoz.supabase.co/realtime/v1/websocket`
3. ✅ Status: **101 Switching Protocols** (màu xanh)

---

## Bước 5: Test với nhiều người dùng

### Mở 3 tab cùng lúc:
- **Tab 1:** User A - SĐT `0999999999`
- **Tab 2:** User B - SĐT `0888888888` (đơn khác)
- **Tab 3:** Admin

### Test:
1. ✅ Admin đổi trạng thái đơn của User A
2. ✅ **Chỉ Tab 1** nhận update (User A)
3. ✅ **Tab 2 KHÔNG** nhận update (User B)
4. ✅ Đúng! Filter theo SĐT hoạt động

---

## Troubleshooting

### ❌ Không nhận được update real-time?

**Kiểm tra 1: Realtime đã bật?**
```sql
SELECT * FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime';
```
→ Phải thấy bảng `orders`

**Kiểm tra 2: Console có lỗi?**
- F12 → Console
- Tìm lỗi màu đỏ
- Nếu thấy "CHANNEL_ERROR" → Realtime chưa bật

**Kiểm tra 3: WebSocket connected?**
- F12 → Network → WS
- Phải có connection màu xanh
- Nếu màu đỏ → Kiểm tra firewall/network

**Kiểm tra 4: RLS Policy?**
```sql
-- Kiểm tra policy cho bảng orders
SELECT * FROM pg_policies WHERE tablename = 'orders';
```
→ Phải có policy cho SELECT

**Kiểm tra 5: Environment variables?**
```bash
# Kiểm tra .env.local
cat .env.local | grep SUPABASE
```
→ Phải có NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY

---

## Kết quả mong đợi

### ✅ Thành công khi:
- [ ] Script test hiện "Nhận được cập nhật real-time!"
- [ ] Badge "Real-time" màu xanh
- [ ] Admin đổi → User thấy ngay (< 1 giây)
- [ ] Toast notification hiện
- [ ] Console log "Real-time update: ..."
- [ ] WebSocket status 101
- [ ] Không cần refresh trang

### ❌ Thất bại khi:
- [ ] Phải refresh trang mới thấy update
- [ ] Badge "Real-time" màu đỏ hoặc xám
- [ ] Console có lỗi "CHANNEL_ERROR"
- [ ] WebSocket không connect
- [ ] Không thấy toast notification

---

## Performance Check

### Kiểm tra Network:
1. ✅ F12 → Network → Clear
2. ✅ Admin đổi trạng thái 3 lần
3. ✅ Kiểm tra số request:
   - **Trước (Polling):** 3+ requests mỗi 3 giây = 60+ requests/phút
   - **Sau (Realtime):** 0 requests (chỉ WebSocket messages)

### Kiểm tra Memory:
1. ✅ F12 → Performance → Memory
2. ✅ Để tab mở 5 phút
3. ✅ Memory không tăng liên tục (no memory leak)

---

## Lưu ý quan trọng

⚠️ **PHẢI bật Realtime trước khi test**
- Nếu không bật → Sẽ không nhận được update
- Chỉ cần bật 1 lần duy nhất

⚠️ **Cleanup subscription**
- Code đã có cleanup trong useEffect
- Không lo memory leak

⚠️ **Filter theo SĐT**
- Mỗi user chỉ nhận update của đơn hàng mình
- Bảo mật thông tin

⚠️ **Lỗi analytics (406, 429, 400)**
- Không ảnh hưởng Real-time tracking
- Chỉ ảnh hưởng analytics dashboard
- Có thể bỏ qua khi test Real-time

---

## Hoàn thành! 🎉

Nếu tất cả checklist đều ✅ → Real-time đã hoạt động hoàn hảo!

**Kết quả:** Admin ấn "Đang giao" → User thấy ngay lập tức! ⚡
