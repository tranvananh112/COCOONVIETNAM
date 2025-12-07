export interface Product {
  id: string
  name: string
  description: string
  price: number
  priceRange?: string
  image: string
  category: string
  volume?: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Tẩy trang hoa hồng",
    description: "Nước tẩy trang dịu nhẹ chiết xuất từ hoa hồng Việt Nam, làm sạch sâu và dưỡng ẩm cho da.",
    price: 175000,
    priceRange: "135.000đ - 210.000đ",
    image: "https://image.cocoonvietnam.com/uploads/z4374728860573_f8ef100cf0353db83ee14abccdb73785_9a8d0470dd.jpg",
    category: "Làm sạch",
    volume: "150ml",
  },
  {
    id: "2",
    name: "Sữa rửa mặt Sen Hậu Giang",
    description: "Sữa rửa mặt thuần chay, làm sạch nhẹ nhàng mà không gây khô da.",
    price: 250000,
    priceRange: "163.000đ - 350.000đ",
    image: "https://image.cocoonvietnam.com/uploads/Avatar_2_b410879481.jpg",
    category: "Làm sạch",
    volume: "100ml",
  },
  {
    id: "3",
    name: "Tẩy tế bào chết mặt cà phê Đắk lắk",
    description: "Tẩy tế bào chết dịu nhẹ từ thiên nhiên, giúp da mịn màng và sáng khỏe.",
    price: 250000,
    priceRange: "150.000đ - 350.000đ",
    image: "https://image.cocoonvietnam.com/uploads/26fb6ffcb3c3709d29d2_436613e656.jpg",
    category: "Chăm sóc",
    volume: "100ml",
  },
  {
    id: "4",
    name: "Tinh chất bí đao (serum)",
    description: "Tinh chất cấp ẩm từ bí đao, giúp da căng mọng và tươi sáng tự nhiên.",
    price: 330000,
    priceRange: "249.000đ - 417.000đ",
    image: "https://image.cocoonvietnam.com/uploads/gz_Ge_T_Yg_A_3a56f5461a.jpeg",
    category: "Dưỡng da",
    volume: "30ml",
  },
  {
    id: "5",
    name: "Mặt nạ nghệ Hưng Yên",
    description: "Mặt nạ nghệ nguyên chất từ Hưng Yên, làm sáng da và ngừa mụn hiệu quả.",
    price: 250000,
    priceRange: "150.000đ - 350.000đ",
    image: "/nghehungyen.jpg",
    category: "Mặt nạ",
    volume: "100g",
  },
  {
    id: "6",
    name: "Nước sen Hậu Giang (Toner)",
    description: "Toner từ sen Hậu Giang, cân bằng độ pH và làm dịu da nhạy cảm.",
    price: 255000,
    priceRange: "150.000đ - 360.000đ",
    image: "https://image.cocoonvietnam.com/uploads/Web_Avatar_Nuoc_Sen_140ml_copy_100_14377247e3.jpg",
    category: "Dưỡng da",
    volume: "150ml",
  },
  {
    id: "7",
    name: "Thạch bí đao cấp ẩm và ngừa mụn",
    description: "Gel dưỡng ẩm từ bí đao, cấp nước và ngừa mụn, phù hợp mọi loại da.",
    price: 245000,
    priceRange: "168.000đ - 325.000đ",
    image: "https://image.cocoonvietnam.com/uploads/Artboard_41_d59cbd8b7e.jpg",
    category: "Dưỡng da",
    volume: "100ml",
  },
  {
    id: "8",
    name: "Kem chống nắng bí đao",
    description: "Kem chống nắng thuần chay, bảo vệ da khỏi tia UV và không gây bết dính.",
    price: 333000,
    image: "https://image.cocoonvietnam.com/uploads/z4389424980_1e574bdd58278206885aaafd9cf54665_f04a0b7f9b.jpg",
    category: "Bảo vệ",
    volume: "50ml",
  },
  {
    id: "9",
    name: "Xịt khoáng nghệ Hưng Yên",
    description: "Xịt khoáng làm tươi mát và cấp ẩm tức thì cho da suốt ngày dài.",
    price: 250000,
    priceRange: "150.000đ - 350.000đ",
    image: "https://image.cocoonvietnam.com/uploads/Artboard_16_2d4e366728.jpg",
    category: "Dưỡng da",
    volume: "100ml",
  },
]

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ"
}
