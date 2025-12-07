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

-- Cho phép đọc công khai (không cần đăng nhập)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update products" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete products" ON products FOR DELETE USING (true);
