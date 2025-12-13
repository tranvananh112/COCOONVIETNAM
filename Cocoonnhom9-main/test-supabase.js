// Test Supabase connection
// Run: node test-supabase.js

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://yggcqzykpgxvuztdbsoz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnZ2NxenlrcGd4dnV6dGRic296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MTU0NjAsImV4cCI6MjA4MDQ5MTQ2MH0.l7lzB6-y6cpgYcovDfRqamnQgUmKkJcoyA2-FBPbjBo'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
    console.log('🔍 Testing Supabase connection...\n')

    try {
        // Test 1: Check products table
        console.log('1️⃣ Checking products table...')
        const { data: products, error: productsError } = await supabase
            .from('products')
            .select('*')
            .limit(5)

        if (productsError) {
            console.log('❌ Products table error:', productsError.message)
            console.log('   → Bạn cần tạo bảng products trong Supabase')
        } else {
            console.log(`✅ Products table OK - Found ${products.length} products`)
            if (products.length > 0) {
                console.log('   Sample:', products[0].name)
            }
        }

        // Test 2: Check orders table
        console.log('\n2️⃣ Checking orders table...')
        const { data: orders, error: ordersError } = await supabase
            .from('orders')
            .select('*')
            .limit(5)

        if (ordersError) {
            console.log('❌ Orders table error:', ordersError.message)
            console.log('   → Bạn cần tạo bảng orders trong Supabase')
        } else {
            console.log(`✅ Orders table OK - Found ${orders.length} orders`)
        }

        // Test 3: Check customers table
        console.log('\n3️⃣ Checking customers table...')
        const { data: customers, error: customersError } = await supabase
            .from('customers')
            .select('*')
            .limit(5)

        if (customersError) {
            console.log('❌ Customers table error:', customersError.message)
            console.log('   → Bạn cần tạo bảng customers trong Supabase')
        } else {
            console.log(`✅ Customers table OK - Found ${customers.length} customers`)
        }

        // Test 4: Check visitors table
        console.log('\n4️⃣ Checking visitors table...')
        const { data: visitors, error: visitorsError } = await supabase
            .from('visitors')
            .select('*')
            .limit(5)

        if (visitorsError) {
            console.log('❌ Visitors table error:', visitorsError.message)
            console.log('   → Bạn cần tạo bảng visitors trong Supabase')
        } else {
            console.log(`✅ Visitors table OK - Found ${visitors.length} visitors`)
        }

        console.log('\n' + '='.repeat(50))
        console.log('📋 SUMMARY:')
        console.log('='.repeat(50))

        if (productsError || ordersError || customersError || visitorsError) {
            console.log('\n⚠️  CẦN LÀM:')
            console.log('1. Vào Supabase Dashboard: https://supabase.com/dashboard')
            console.log('2. Chọn project: yggcqzykpgxvuztdbsoz')
            console.log('3. Vào SQL Editor')
            console.log('4. Chạy các scripts trong file SUPABASE_SETUP.md')
            console.log('5. Chạy lại test này: node test-supabase.js')
        } else {
            console.log('\n✅ Tất cả tables đã sẵn sàng!')
            console.log('   Website có thể lưu đơn hàng vào Supabase')
        }

    } catch (error) {
        console.error('❌ Connection error:', error.message)
    }
}

testConnection()
