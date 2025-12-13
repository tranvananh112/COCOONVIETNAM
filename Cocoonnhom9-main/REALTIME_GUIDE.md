# 🔄 Hướng dẫn Real-time Order Tracking

## Cách hoạt động

Khi admin cập nhật trạng thái đơn hàng, người dùng sẽ thấy cập nhật **NGAY LẬP TỨC** không cần refresh trang.

## Luồng hoạt động

```
1. Admin vào /admin → Chọn đơn hàng → Đổi trạng thái "Đang giao"
   ↓
2. Supabase cập nhật database (bảng orders)
   ↓
3. Supabase Realtime phát sóng sự kiện UPDATE
   ↓
4. Người dùng đang xem trang /orders nhận được thông báo
   ↓
5. Component tự động refresh data và hiển thị trạng thái mới
   ↓
6. Toast notification: "Đơn hàng đã được cập nhật!"
```

## Cấu hình đã thực hiện

### 1. Bật Realtime trên Supabase
- Vào Database → Replication
- Bật Realtime cho bảng `orders`
- Hoặc chạy: `ALTER PUBLICATION supabase_realtime ADD TABLE orders;`

### 2. Component tracking (components/order-tracking-realtime.tsx)

```typescript
// Subscribe to real-time changes
useEffect(() => {
    if (!searchPhone) return

    const supabase = createClient()
    
    const channel = supabase
        .channel(`orders-${searchPhone}`)
        .on(
            'postgres_changes',
            {
                event: '*', // Lắng nghe tất cả sự kiện
                schema: 'public',
                table: 'orders',
                filter: `customer_phone=eq.${searchPhone}` // Chỉ đơn hàng của SĐT này
            },
            (payload) => {
                // Khi có thay đổi → refresh data ngay
                mutate()
                toast.success('Đơn hàng đã được cập nhật!')
            }
        )
        .subscribe()

    return () => {
        supabase.removeChannel(channel)
    }
}, [searchPhone, mutate])
```

### 3. Admin page (app/admin/page.tsx)

```typescript
// Khi admin thay đổi trạng thái
const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    const supabase = createClient()
    
    // Cập nhật database
    const { error } = await supabase
        .from("orders")
        .update({ 
            status: newStatus, 
            updated_at: new Date().toISOString() 
        })
        .eq("id", orderId)

    if (!error) {
        toast.success("Cập nhật trạng thái thành công")
        mutateOrders() // Refresh admin view
        // → Supabase Realtime tự động thông báo cho user
    }
}
```

## Test Real-time

### Bước 1: Mở 2 tab trình duyệt

**Tab 1 - Người dùng:**
- Vào: `http://localhost:3000/orders`
- Nhập số điện thoại có đơn hàng
- Để tab này mở

**Tab 2 - Admin:**
- Vào: `http://localhost:3000/admin`
- Tìm đơn hàng của số điện thoại trên
- Thay đổi trạng thái: Pending → Confirmed → Shipping → Delivered

### Bước 2: Quan sát

- Tab người dùng sẽ **TỰ ĐỘNG** cập nhật trạng thái
- Không cần refresh trang
- Hiển thị toast notification
- Timeline cập nhật ngay lập tức

## Lợi ích

✅ **Trải nghiệm người dùng tốt hơn**
- Không cần F5 liên tục
- Thông tin luôn chính xác
- Cảm giác "live" như app mobile

✅ **Giảm tải server**
- Không cần polling liên tục
- Chỉ cập nhật khi có thay đổi thực sự
- Tiết kiệm bandwidth

✅ **Dễ mở rộng**
- Có thể thêm notification push
- Có thể thêm chat support real-time
- Có thể track vị trí shipper real-time

## Troubleshooting

### Không nhận được cập nhật real-time?

1. **Kiểm tra Realtime đã bật chưa:**
   ```sql
   -- Chạy trong Supabase SQL Editor
   SELECT * FROM pg_publication_tables 
   WHERE pubname = 'supabase_realtime';
   ```
   Phải thấy bảng `orders` trong kết quả

2. **Kiểm tra RLS Policy:**
   - Bảng orders phải có policy cho SELECT
   - User phải có quyền đọc dữ liệu

3. **Kiểm tra Console:**
   - Mở DevTools → Console
   - Xem có lỗi subscription không
   - Xem log: "Real-time update: ..."

4. **Kiểm tra Network:**
   - Mở DevTools → Network → WS (WebSocket)
   - Phải thấy connection đến Supabase Realtime

### Subscription không hoạt động?

```typescript
// Thêm error handling
const channel = supabase
    .channel(`orders-${searchPhone}`)
    .on('postgres_changes', {...}, (payload) => {
        console.log('✅ Received:', payload)
        mutate()
    })
    .subscribe((status) => {
        console.log('📡 Subscription status:', status)
        if (status === 'SUBSCRIBED') {
            console.log('✅ Real-time connected!')
        }
    })
```

## Mở rộng

### Thêm notification cho admin khi có đơn mới:

```typescript
// Trong admin page
useEffect(() => {
    const supabase = createClient()
    
    const channel = supabase
        .channel('new-orders')
        .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'orders'
        }, (payload) => {
            toast.success('🎉 Có đơn hàng mới!')
            mutateOrders()
        })
        .subscribe()
    
    return () => supabase.removeChannel(channel)
}, [])
```

### Thêm typing indicator (đang cập nhật):

```typescript
const [isUpdating, setIsUpdating] = useState(false)

// Trong subscription
.on('postgres_changes', {...}, (payload) => {
    setIsUpdating(true)
    mutate()
    setTimeout(() => setIsUpdating(false), 1000)
})
```

## Kết luận

Real-time tracking giúp:
- Admin cập nhật → User thấy ngay
- Không cần polling/refresh
- Trải nghiệm mượt mà như app native
- Dễ dàng mở rộng thêm tính năng

🎯 **Kết quả:** Khi admin ấn "Đang giao" → Người dùng thấy ngay lập tức!
