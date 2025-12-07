-- Thêm sản phẩm mẫu
INSERT INTO products (name, description, price, category, image) VALUES
('Nước tẩy trang hoa hồng', 'Nước tẩy trang dịu nhẹ chiết xuất hoa hồng Đà Lạt, làm sạch sâu và dưỡng ẩm da', 185000, 'Làm sạch', '/placeholder.svg?height=300&width=300'),
('Sữa rửa mặt bí đao', 'Sữa rửa mặt dịu nhẹ chiết xuất bí đao, kiểm soát dầu và làm sáng da', 135000, 'Làm sạch', '/placeholder.svg?height=300&width=300'),
('Tẩy da chết cà phê Đắk Lắk', 'Tẩy da chết body từ cà phê Đắk Lắk, loại bỏ tế bào chết và làm mịn da', 165000, 'Tẩy tế bào chết', '/placeholder.svg?height=300&width=300'),
('Serum bí đao', 'Serum dưỡng ẩm chuyên sâu chiết xuất bí đao, giúp da căng mọng và tươi sáng', 295000, 'Serum', '/placeholder.svg?height=300&width=300'),
('Mặt nạ nghệ Hưng Yên', 'Mặt nạ dưỡng da từ nghệ Hưng Yên, làm sáng và đều màu da', 45000, 'Mặt nạ', '/placeholder.svg?height=300&width=300'),
('Nước hoa hồng sen', 'Toner cân bằng da chiết xuất hoa sen, làm dịu và se khít lỗ chân lông', 195000, 'Toner', '/placeholder.svg?height=300&width=300'),
('Gel dưỡng ẩm rau má', 'Gel dưỡng ẩm nhẹ chiết xuất rau má, phục hồi và làm dịu da', 175000, 'Dưỡng ẩm', '/placeholder.svg?height=300&width=300'),
('Kem chống nắng sáng da', 'Kem chống nắng SPF50+ chiết xuất thiên nhiên, bảo vệ da khỏi tia UV', 285000, 'Chống nắng', '/placeholder.svg?height=300&width=300'),
('Xịt khoáng dưỡng ẩm', 'Xịt khoáng dưỡng ẩm từ nước khoáng thiên nhiên, làm tươi mát da suốt ngày', 155000, 'Xịt khoáng', '/placeholder.svg?height=300&width=300')
ON CONFLICT DO NOTHING;
