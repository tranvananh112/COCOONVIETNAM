# 🗄️ Hướng dẫn Setup Supabase Database

## Bước 1: Truy cập Supabase Dashboard

1. Đăng nhập vào: https://supabase.com/dashboard
2. Chọn project: `yggcqzykpgxvuztdbsoz`
3. Vào **SQL Editor** (biểu tượng database bên trái)

## Bước 2: Tạo Tables (Chạy từng script theo thứ tự)

### Script 1: Tạo bảng Products
```sql
-- Bảng sản phẩm
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  stock INTEGER DEFAULT 100,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Cho phép đọc công khai
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update products" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete products" ON products FOR DELETE USING (true);
```

### Script 2: Tạo bảng Customers
```sql
-- Bảng khách hàng
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  email TEXT,
  address TEXT,
  total_orders INTEGER DEFAULT 0,
  total_spent INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read customers" ON customers FOR SELECT USING (true);
CREATE POLICY "Allow public insert customers" ON customers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update customers" ON customers FOR UPDATE USING (true);
```

### Script 3: Tạo bảng Orders & Order Items
```sql
-- Bảng đơn hàng
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_code TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES customers(id),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  total_price INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipping', 'delivered', 'cancelled')),
  payment_method TEXT DEFAULT 'cod' CHECK (payment_method IN ('cod', 'momo', 'bank')),
  is_paid BOOLEAN DEFAULT false,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Bảng chi tiết đơn hàng
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  product_price INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  subtotal INTEGER NOT NULL
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update orders" ON orders FOR UPDATE USING (true);

CREATE POLICY "Allow public read order_items" ON order_items FOR SELECT USING (true);
CREATE POLICY "Allow public insert order_items" ON order_items FOR INSERT WITH CHECK (true);
```

### Script 4: Tạo bảng Analytics (Visitors, Page Views, Events)
```sql
-- Bảng theo dõi khách truy cập
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Bảng thông tin thiết bị & vị trí
CREATE TABLE IF NOT EXISTS visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL UNIQUE,
  ip_address TEXT,
  country TEXT,
  city TEXT,
  region TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  screen_width INTEGER,
  screen_height INTEGER,
  language TEXT,
  timezone TEXT,
  first_visit TIMESTAMPTZ DEFAULT now(),
  last_visit TIMESTAMPTZ DEFAULT now(),
  total_page_views INTEGER DEFAULT 1
);

-- Bảng sự kiện
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert page_views" ON page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read page_views" ON page_views FOR SELECT USING (true);
CREATE POLICY "Allow public all visitors" ON visitors FOR ALL USING (true);
CREATE POLICY "Allow public insert events" ON events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read events" ON events FOR SELECT USING (true);
```

### Script 5: Thêm dữ liệu mẫu (Products)
```sql
-- Xóa dữ liệu cũ (nếu có)
TRUNCATE TABLE products CASCADE;

-- Thêm sản phẩm mẫu
INSERT INTO products (name, description, price, category, image) VALUES
('Nước Tẩy Trang Hoa Hồng', 'Nước tẩy trang chiết xuất từ hoa hồng Đà Lạt, làm sạch sâu và dịu nhẹ cho da', 165000, 'cleansing', '/rose-water-makeup-remover-vietnamese-cosmetics.jpg'),
('Serum Bí Đao', 'Serum dưỡng ẩm từ bí đao, giúp da mềm mại và căng mịn', 320000, 'serum', '/winter-melon-serum-vietnamese-skincare.jpg'),
('Mặt Nạ Nghệ', 'Mặt nạ nghệ tươi Việt Nam, làm sáng da và giảm mụn', 145000, 'mask', '/turmeric-face-mask-vietnamese-natural.jpg'),
('Sữa Rửa Mặt Thiên Nhiên', 'Sữa rửa mặt từ thảo dược thiên nhiên, làm sạch nhẹ nhàng', 125000, 'cleansing', '/vegan-face-cleanser-natural-skincare.jpg'),
('Kem Chống Nắng SPF50', 'Kem chống nắng thuần chay, bảo vệ da khỏi tia UV', 195000, 'sunscreen', '/vegan-sunscreen-spf-skincare-natural.jpg'),
('Toner Hoa Sen', 'Toner từ hoa sen Việt Nam, cân bằng độ pH cho da', 155000, 'toner', '/lotus-flower-toner-vietnamese-skincare.jpg'),
('Gel Dưỡng Ẩm Bí Đao', 'Gel dưỡng ẩm nhẹ từ bí đao, phù hợp da dầu', 185000, 'moisturizer', '/winter-melon-moisturizing-gel-skincare.jpg'),
('Xịt Khoáng Thiên Nhiên', 'Xịt khoáng từ nguồn nước thiên nhiên Việt Nam', 135000, 'mist', '/mineral-face-mist-spray-skincare.jpg'),
('Tẩy Tế Bào Chết Tự Nhiên', 'Tẩy da chết từ hạt cà phê và đường nâu', 115000, 'exfoliator', '/natural-face-exfoliator-scrub-skincare.jpg'),
('Mặt Nạ Đất Sét Nghệ', 'Mặt nạ đất sét kết hợp nghệ, làm sạch sâu lỗ chân lông', 165000, 'mask', '/natural-face-mask-turmeric.jpg');
```

## Bước 3: Bật Realtime cho bảng Orders (QUAN TRỌNG!)

**Để cập nhật trạng thái đơn hàng real-time, bạn PHẢI bật Realtime:**

1. Vào **Database** → **Replication** (bên trái)
2. Tìm bảng `orders` trong danh sách
3. Bật toggle **Enable Realtime** cho bảng `orders`
4. Click **Save** hoặc **Apply**

**Hoặc chạy SQL này:**
```sql
-- Bật Realtime cho bảng orders
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
```

## Bước 4: Kiểm tra Tables đã tạo

1. Vào **Table Editor** (biểu tượng bảng bên trái)
2. Kiểm tra các bảng:
   - ✅ `products` - Có 10 sản phẩm mẫu
   - ✅ `customers` - Trống (sẽ tự động thêm khi có đơn hàng)
   - ✅ `orders` - Trống (sẽ có khi khách đặt hàng) **[Realtime ENABLED]**
   - ✅ `order_items` - Trống
   - ✅ `visitors` - Trống (sẽ tự động track)
   - ✅ `page_views` - Trống (sẽ tự động track)
   - ✅ `events` - Trống (sẽ tự động track)

## Bước 5: Test kết nối

Sau khi deploy website lên Vercel với Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Website sẽ tự động:
1. ✅ Hiển thị 10 sản phẩm từ database
2. ✅ Lưu đơn hàng khi khách đặt hàng
3. ✅ Track khách truy cập real-time
4. ✅ Admin xem được đơn hàng và thống kê

## 🔍 Xem dữ liệu real-time

### Xem đơn hàng mới:
1. Vào **Table Editor** → `orders`
2. Click **Refresh** để xem đơn hàng mới
3. Hoặc vào trang Admin: `https://your-domain.vercel.app/admin`

### Xem khách truy cập:
1. Vào **Table Editor** → `visitors`
2. Xem thông tin thiết bị, vị trí, trình duyệt
3. Hoặc vào trang Admin → Tab "Phân tích"

## ✅ Hoàn thành!

Database đã sẵn sàng để:
- Lưu trữ sản phẩm
- Nhận đơn hàng từ khách
- Track analytics real-time
- Admin quản lý đơn hàng
