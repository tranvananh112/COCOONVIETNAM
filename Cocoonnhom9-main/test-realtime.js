/**
 * Script test Supabase Realtime
 * Chạy: node test-realtime.js
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Thiếu SUPABASE_URL hoặc SUPABASE_ANON_KEY trong .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

console.log('🔄 Đang kết nối Supabase Realtime...\n')

// Test 1: Kiểm tra kết nối
async function testConnection() {
    console.log('📡 Test 1: Kiểm tra kết nối database')
    const { data, error } = await supabase.from('orders').select('count')

    if (error) {
        console.error('❌ Lỗi kết nối:', error.message)
        return false
    }

    console.log('✅ Kết nối database thành công\n')
    return true
}

// Test 2: Subscribe to realtime changes
async function testRealtime() {
    console.log('📡 Test 2: Subscribe to Realtime changes')
    console.log('👉 Hãy thử cập nhật một đơn hàng trong Supabase Dashboard...\n')

    const channel = supabase
        .channel('test-orders')
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'orders'
            },
            (payload) => {
                console.log('🎉 Nhận được cập nhật real-time!')
                console.log('Event:', payload.eventType)
                console.log('Data:', JSON.stringify(payload.new || payload.old, null, 2))
                console.log('---')
            }
        )
        .subscribe((status) => {
            if (status === 'SUBSCRIBED') {
                console.log('✅ Đã subscribe thành công!')
                console.log('⏳ Đang lắng nghe thay đổi... (Ctrl+C để thoát)\n')
            } else if (status === 'CHANNEL_ERROR') {
                console.error('❌ Lỗi subscription!')
                console.log('\n💡 Hãy kiểm tra:')
                console.log('1. Realtime đã được bật cho bảng orders chưa?')
                console.log('2. Vào Supabase Dashboard → Database → Replication')
                console.log('3. Bật toggle "Enable Realtime" cho bảng orders')
                console.log('4. Hoặc chạy SQL: ALTER PUBLICATION supabase_realtime ADD TABLE orders;\n')
            } else {
                console.log('📡 Status:', status)
            }
        })
}

// Test 3: Tạo đơn hàng test
async function createTestOrder() {
    console.log('\n📦 Test 3: Tạo đơn hàng test')

    const testOrder = {
        order_code: `TEST-${Date.now()}`,
        customer_name: 'Test User',
        customer_phone: '0999999999',
        customer_address: 'Test Address',
        total_price: 100000,
        status: 'pending',
        payment_method: 'cod',
        is_paid: false
    }

    const { data, error } = await supabase
        .from('orders')
        .insert([testOrder])
        .select()

    if (error) {
        console.error('❌ Lỗi tạo đơn:', error.message)
        return null
    }

    console.log('✅ Đã tạo đơn test:', data[0].order_code)
    return data[0]
}

// Test 4: Cập nhật trạng thái
async function updateOrderStatus(orderId) {
    console.log('\n🔄 Test 4: Cập nhật trạng thái đơn hàng')

    const statuses = ['confirmed', 'shipping', 'delivered']

    for (const status of statuses) {
        await new Promise(resolve => setTimeout(resolve, 2000))

        const { error } = await supabase
            .from('orders')
            .update({ status, updated_at: new Date().toISOString() })
            .eq('id', orderId)

        if (error) {
            console.error('❌ Lỗi cập nhật:', error.message)
        } else {
            console.log(`✅ Đã cập nhật trạng thái: ${status}`)
        }
    }
}

// Main
async function main() {
    const connected = await testConnection()

    if (!connected) {
        console.log('❌ Không thể kết nối database. Kiểm tra lại .env.local')
        process.exit(1)
    }

    // Subscribe to realtime
    await testRealtime()

    // Tạo và cập nhật đơn test sau 3 giây
    setTimeout(async () => {
        const order = await createTestOrder()
        if (order) {
            await updateOrderStatus(order.id)

            console.log('\n✅ Test hoàn tất!')
            console.log('👉 Nếu bạn thấy các thông báo "Nhận được cập nhật real-time!" ở trên')
            console.log('   → Realtime đang hoạt động tốt! 🎉\n')
            console.log('⏳ Script sẽ tiếp tục lắng nghe... (Ctrl+C để thoát)')
        }
    }, 3000)
}

main().catch(console.error)
