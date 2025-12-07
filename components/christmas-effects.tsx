"use client"

import { useEffect, useState } from "react"

export function ChristmasEffects() {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([])

  useEffect(() => {
    // Tạo 50 bông tuyết với vị trí và thời gian ngẫu nhiên
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
    }))
    setSnowflakes(flakes)
  }, [])

  return (
    <>
      {/* Tuyết rơi */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute text-white opacity-80 animate-fall"
            style={{
              left: `${flake.left}%`,
              animationDelay: `${flake.delay}s`,
              animationDuration: `${flake.duration}s`,
              fontSize: `${Math.random() * 10 + 10}px`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Viền trang trí Noel bên trái */}
      <div className="fixed left-0 top-0 bottom-0 w-16 bg-gradient-to-b from-red-600 via-green-600 to-red-600 z-30 pointer-events-none hidden lg:block">
        <div className="flex flex-col items-center justify-around h-full py-4">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="text-2xl animate-bounce" style={{ animationDelay: `${i * 0.3}s` }}>
              {["🎄", "⭐", "🎁", "🔔", "🎅"][i % 5]}
            </div>
          ))}
        </div>
      </div>

      {/* Viền trang trí Noel bên phải */}
      <div className="fixed right-0 top-0 bottom-0 w-16 bg-gradient-to-b from-green-600 via-red-600 to-green-600 z-30 pointer-events-none hidden lg:block">
        <div className="flex flex-col items-center justify-around h-full py-4">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="text-2xl animate-bounce" style={{ animationDelay: `${i * 0.3}s` }}>
              {["🎁", "🔔", "⭐", "🎄", "🎅"][i % 5]}
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0.3;
          }
        }

        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </>
  )
}
