"use client"

export function ChristmasBanner() {
    return (
        <div className="w-full py-3 overflow-hidden bg-background border-t">
            <div className="animate-marquee whitespace-nowrap">
                <span className="font-bold text-xl mx-8 bg-gradient-to-r from-red-600 via-green-600 to-red-600 bg-clip-text text-transparent">
                    Mừng Giáng Sinh 2025 - Giảm giá 90% cho tất cả sản phẩm!
                </span>
                <span className="font-bold text-xl mx-8 bg-gradient-to-r from-green-600 via-red-600 to-green-600 bg-clip-text text-transparent">
                    Mừng Giáng Sinh 2025 - Giảm giá 90% cho tất cả sản phẩm!
                </span>
                <span className="font-bold text-xl mx-8 bg-gradient-to-r from-red-600 via-green-600 to-red-600 bg-clip-text text-transparent">
                    Mừng Giáng Sinh 2025 - Giảm giá 90% cho tất cả sản phẩm!
                </span>
                <span className="font-bold text-xl mx-8 bg-gradient-to-r from-green-600 via-red-600 to-green-600 bg-clip-text text-transparent">
                    Mừng Giáng Sinh 2025 - Giảm giá 90% cho tất cả sản phẩm!
                </span>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .animate-marquee {
                    display: inline-block;
                    animation: marquee 25s linear infinite;
                }
            `}</style>
        </div>
    )
}
