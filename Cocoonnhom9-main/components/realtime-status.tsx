"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function RealtimeStatus() {
    const [isConnected, setIsConnected] = useState(false)
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        const supabase = createClient()

        // Test connection với một channel đơn giản
        const channel = supabase
            .channel('connection-test')
            .subscribe((status) => {
                setIsChecking(false)
                if (status === 'SUBSCRIBED') {
                    setIsConnected(true)
                } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
                    setIsConnected(false)
                }
            })

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    if (isChecking) {
        return (
            <Badge variant="outline" className="gap-1.5">
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse" />
                <span className="text-xs">Đang kết nối...</span>
            </Badge>
        )
    }

    return (
        <Badge
            variant={isConnected ? "default" : "destructive"}
            className={`gap-1.5 ${isConnected ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}`}
        >
            {isConnected ? (
                <>
                    <Wifi className="h-3 w-3" />
                    <span className="text-xs">Real-time</span>
                </>
            ) : (
                <>
                    <WifiOff className="h-3 w-3" />
                    <span className="text-xs">Offline</span>
                </>
            )}
        </Badge>
    )
}
