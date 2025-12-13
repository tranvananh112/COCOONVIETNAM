-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(500),
  category VARCHAR(100),
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id BIGSERIAL PRIMARY KEY,
  phone VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  address VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order_status enum
CREATE TYPE order_status_enum AS ENUM ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled');

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  total_amount DECIMAL(10, 2) NOT NULL,
  status order_status_enum DEFAULT 'pending',
  payment_method VARCHAR(50), -- 'cod' or 'momo'
  payment_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'failed'
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES products(id),
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);

-- Insert sample products (9 product lines for Cocoon)
INSERT INTO products (name, description, price, category, stock, image_url) VALUES
('Sữa Rửa Mặt Thuần Chay', 'Sữa rửa mặt nhẹ nhàng, không chứa hóa chất độc hại', 189000, 'Cleansing', 50, '/placeholder.svg?height=300&width=300'),
('Toner Dưỡng Ẩm', 'Toner cấp ẩm sâu từ thành phần thiên nhiên', 249000, 'Toning', 40, '/placeholder.svg?height=300&width=300'),
('Serum Vitamin C', 'Serum sáng da với Vitamin C từ thiên nhiên', 399000, 'Serums', 30, '/placeholder.svg?height=300&width=300'),
('Kem Dưỡng Ban Ngày', 'Kem dưỡng nhẹ với SPF 30 bảo vệ da', 329000, 'Moisturizers', 45, '/placeholder.svg?height=300&width=300'),
('Kem Dưỡng Ban Đêm', 'Kem dưỡng sâu phục hồi da ban đêm', 349000, 'Moisturizers', 35, '/placeholder.svg?height=300&width=300'),
('Mặt Nạ Dưỡng Ẩm', 'Mặt nạ giấy cấp ẩm tức thì', 79000, 'Masks', 100, '/placeholder.svg?height=300&width=300'),
('Tinh Dầu Dưỡng Tóc', 'Tinh dầu nuôi dưỡng tóc khô xơ', 199000, 'Hair Care', 50, '/placeholder.svg?height=300&width=300'),
('Sữa Tắm Thảo Dược', 'Sữa tắm làm sạch và dưỡng da toàn thân', 159000, 'Body Care', 60, '/placeholder.svg?height=300&width=300'),
('Kem Chống Nắng SPF 50', 'Kem chống nắng toàn phổ bảo vệ tối đa', 279000, 'Sun Care', 40, '/placeholder.svg?height=300&width=300');

-- Enable RLS (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access to products
CREATE POLICY "Allow public read access to products" ON products
  FOR SELECT USING (true);

-- Create RLS policies for customers (allow insert and select own data)
CREATE POLICY "Allow customers to insert their own data" ON customers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow customers to read their own data" ON customers
  FOR SELECT USING (true);

-- Create RLS policies for orders
CREATE POLICY "Allow customers to insert orders" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow customers to read their own orders" ON orders
  FOR SELECT USING (true);

CREATE POLICY "Allow customers to update their own orders" ON orders
  FOR UPDATE USING (true);

-- Create RLS policies for order_items
CREATE POLICY "Allow read access to order items" ON order_items
  FOR SELECT USING (true);

CREATE POLICY "Allow insert order items" ON order_items
  FOR INSERT WITH CHECK (true);
