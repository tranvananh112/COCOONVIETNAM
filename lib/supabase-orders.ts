"use server"

import { createClient } from "@/lib/supabase/server"

export interface OrderData {
  customerName: string
  customerPhone: string
  customerAddress: string
  items: Array<{
    productId: string
    productName: string
    productPrice: number
    quantity: number
  }>
  totalPrice: number
  paymentMethod: "cod" | "momo" | "bank"
  isPaid: boolean
}

export async function createOrder(orderData: OrderData) {
  const supabase = await createClient()

  // Generate order code
  const orderCode = `ORD-${Date.now()}`

  // Check if customer exists, if not create
  const { data: existingCustomer } = await supabase
    .from("customers")
    .select("id")
    .eq("phone", orderData.customerPhone)
    .single()

  let customerId: string

  if (existingCustomer) {
    customerId = existingCustomer.id
    // Update customer info
    await supabase
      .from("customers")
      .update({
        name: orderData.customerName,
        address: orderData.customerAddress,
        total_orders: existingCustomer.id ? 1 : 0, // Will be updated by trigger later
        updated_at: new Date().toISOString(),
      })
      .eq("id", customerId)
  } else {
    // Create new customer
    const { data: newCustomer, error: customerError } = await supabase
      .from("customers")
      .insert({
        name: orderData.customerName,
        phone: orderData.customerPhone,
        address: orderData.customerAddress,
      })
      .select("id")
      .single()

    if (customerError) throw customerError
    customerId = newCustomer.id
  }

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_code: orderCode,
      customer_id: customerId,
      customer_name: orderData.customerName,
      customer_phone: orderData.customerPhone,
      customer_address: orderData.customerAddress,
      total_price: orderData.totalPrice,
      payment_method: orderData.paymentMethod,
      is_paid: orderData.isPaid,
    })
    .select()
    .single()

  if (orderError) throw orderError

  // Create order items
  const orderItems = orderData.items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    product_name: item.productName,
    product_price: item.productPrice,
    quantity: item.quantity,
    subtotal: item.productPrice * item.quantity,
  }))

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

  if (itemsError) throw itemsError

  return { orderId: order.id, orderCode }
}

export async function getOrdersByPhone(phone: string) {
  const supabase = await createClient()

  const { data: orders, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (*)
    `)
    .eq("customer_phone", phone)
    .order("created_at", { ascending: false })

  if (error) throw error
  return orders
}

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", orderId)

  if (error) throw error
}

export async function markOrderAsPaid(orderId: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("orders")
    .update({ is_paid: true, updated_at: new Date().toISOString() })
    .eq("id", orderId)

  if (error) throw error
}

export async function getAllOrders() {
  const supabase = await createClient()

  const { data: orders, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (*)
    `)
    .order("created_at", { ascending: false })

  if (error) throw error
  return orders
}
