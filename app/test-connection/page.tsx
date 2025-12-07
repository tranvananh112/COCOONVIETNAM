"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

export default function TestConnectionPage() {
    const [testing, setTesting] = useState(false)
    const [results, setResults] = useState<any>(null)

    const runTests = async () => {
        setTesting(true)
        const testResults: any = {
            envVars: {},
            tables: {},
        }

        // Check environment variables
        testResults.envVars.url = !!process.env.NEXT_PUBLIC_SUPABASE_URL
        testResults.envVars.key = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (!testResults.envVars.url || !testResults.envVars.key) {
            setResults(testResults)
            setTesting(false)
            return
        }

        const supabase = createClient()

        // Test products table
        try {
            const { data, error } = await supabase.from("products").select("*").limit(1)
            testResults.tables.products = { success: !error, count: data?.length || 0, error: error?.message }
        } catch (e: any) {
            testResults.tables.products = { success: false, error: e.message }
        }

        // Test orders table
        try {
            const { data, error } = await supabase.from("orders").select("*").limit(1)
            testResults.tables.orders = { success: !error, count: data?.length || 0, error: error?.message }
        } catch (e: any) {
            testResults.tables.orders = { success: false, error: e.message }
        }

        // Test customers table
        try {
            const { data, error } = await supabase.from("customers").select("*").limit(1)
            testResults.tables.customers = { success: !error, count: data?.length || 0, error: error?.message }
        } catch (e: any) {
            testResults.tables.customers = { success: false, error: e.message }
        }

        // Test order_items table
        try {
            const { data, error } = await supabase.from("order_items").select("*").limit(1)
            testResults.tables.order_items = { success: !error, count: data?.length || 0, error: error?.message }
        } catch (e: any) {
            testResults.tables.order_items = { success: false, error: e.message }
        }

        // Test creating an order
        try {
            const testOrder = {
                order_code: `TEST-${Date.now()}`,
                customer_name: "Test User",
                customer_phone: "0000000000",
                customer_address: "Test Address",
                total_price: 100000,
                status: "pending",
                payment_method: "cod",
                is_paid: false,
            }
            const { data, error } = await supabase.from("orders").insert(testOrder).select().single()
            testResults.createOrder = { success: !error, orderId: data?.id, error: error?.message }

            // Delete test order
            if (data?.id) {
                await supabase.from("orders").delete().eq("id", data.id)
            }
        } catch (e: any) {
            testResults.createOrder = { success: false, error: e.message }
        }

        setResults(testResults)
        setTesting(false)
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold mb-8">Test Supabase Connection</h1>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Kiểm tra kết nối Supabase</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={runTests} disabled={testing} className="w-full">
                            {testing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Đang kiểm tra...
                                </>
                            ) : (
                                "Chạy test"
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {results && (
                    <div className="space-y-4">
                        {/* Environment Variables */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Environment Variables</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span>NEXT_PUBLIC_SUPABASE_URL</span>
                                    {results.envVars.url ? (
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-red-600" />
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
                                    {results.envVars.key ? (
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-red-600" />
                                    )}
                                </div>
                                {(!results.envVars.url || !results.envVars.key) && (
                                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-800 font-semibold">⚠️ Thiếu Environment Variables!</p>
                                        <p className="text-sm text-red-700 mt-2">
                                            Vui lòng thêm NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY vào Vercel
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Database Tables */}
                        {(results.envVars.url && results.envVars.key) && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Database Tables</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {Object.entries(results.tables).map(([table, result]: [string, any]) => (
                                        <div key={table} className="border-b pb-2">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">{table}</span>
                                                {result.success ? (
                                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                                ) : (
                                                    <XCircle className="h-5 w-5 text-red-600" />
                                                )}
                                            </div>
                                            {result.error && <p className="text-sm text-red-600 mt-1">Error: {result.error}</p>}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        {/* Create Order Test */}
                        {results.createOrder && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Test tạo đơn hàng</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <span>Tạo và xóa đơn hàng test</span>
                                        {results.createOrder.success ? (
                                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                                        ) : (
                                            <XCircle className="h-5 w-5 text-red-600" />
                                        )}
                                    </div>
                                    {results.createOrder.error && (
                                        <p className="text-sm text-red-600 mt-2">Error: {results.createOrder.error}</p>
                                    )}
                                    {results.createOrder.success && (
                                        <p className="text-sm text-green-600 mt-2">✅ Có thể tạo đơn hàng thành công!</p>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* Summary */}
                        <Card className="bg-primary/5">
                            <CardContent className="pt-6">
                                {results.envVars.url &&
                                    results.envVars.key &&
                                    results.tables.products?.success &&
                                    results.tables.orders?.success &&
                                    results.createOrder?.success ? (
                                    <div className="text-center">
                                        <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-green-800 mb-2">✅ Tất cả đều OK!</h3>
                                        <p className="text-green-700">Website có thể lưu đơn hàng vào Supabase</p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <XCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-red-800 mb-2">❌ Có lỗi!</h3>
                                        <p className="text-red-700">Vui lòng kiểm tra lại cấu hình</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}
