"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem } from "./cart-store"

export interface CustomerInfo {
  name: string
  phone: string
  address: string
}

export type OrderStatus = "pending" | "confirmed" | "shipping" | "delivered"
export type PaymentMethod = "cod" | "momo"

export interface Order {
  id: string
  items: CartItem[]
  customer: CustomerInfo
  totalPrice: number
  status: OrderStatus
  paymentMethod: PaymentMethod
  isPaid: boolean
  createdAt: string
}

interface OrderStore {
  orders: Order[]
  addOrder: (order: Omit<Order, "id" | "createdAt">) => Order
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
  markAsPaid: (orderId: string) => void
  getOrdersByPhone: (phone: string) => Order[]
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: `ORD-${Date.now()}`,
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ orders: [...state.orders, newOrder] }))
        return newOrder
      },
      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) => (order.id === orderId ? { ...order, status } : order)),
        }))
      },
      markAsPaid: (orderId) => {
        set((state) => ({
          orders: state.orders.map((order) => (order.id === orderId ? { ...order, isPaid: true } : order)),
        }))
      },
      getOrdersByPhone: (phone) => {
        return get().orders.filter((order) => order.customer.phone === phone)
      },
    }),
    {
      name: "cocoon-orders",
    },
  ),
)
