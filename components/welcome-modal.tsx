"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

export function WelcomeModal() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Kiểm tra xem đã hiển thị thông báo trong session này chưa
        const hasShownWelcome = sessionStorage.getItem("hasShownWelcome")

        if (!hasShownWelcome) {
            // Hiển thị sau 500ms để mượt mà hơn
            setTimeout(() => {
                setIsVisible(true)
            }, 500)
        }
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        // Lưu vào sessionStorage để không hiển thị lại trong session này
        sessionStorage.setItem("hasShownWelcome", "true")
    }

    if (!isVisible) return null

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-[100] animate-in fade-in duration-300"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-md">
                <div
                    className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl p-8 relative animate-in zoom-in duration-300"
                    onClick={handleClose}
                >
                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Đóng"
                    >
                        <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </button>

                    {/* Content */}
                    <div className="text-center space-y-4">
                        {/* Icon */}
                        <div className="flex justify-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center animate-bounce">
                                <span className="text-4xl">🎄</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
                            Kính chào quý khách!
                        </h2>

                        {/* Message */}
                        <p className="text-lg text-gray-700 dark:text-gray-300">
                            Chào mừng bạn đến với
                        </p>
                        <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
                            Nhom9CocoonVietnam
                        </p>

                        {/* Subtitle */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                            Mỹ phẩm thuần chay - Vẻ đẹp tự nhiên 🌿
                        </p>

                        {/* Christmas message */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-red-100 to-green-100 dark:from-red-900/30 dark:to-green-900/30 rounded-lg">
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                🎅 Giáng Sinh 2025 - Giảm giá 90% 🎁
                            </p>
                        </div>

                        {/* Close hint */}
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
                            Click vào bất kỳ đâu để đóng
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
