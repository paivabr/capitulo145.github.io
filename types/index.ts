export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: 'chuteira' | 'camisa'
  brand: string
  images: string[]
  sizes: string[]
  stock: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: 'customer' | 'admin'
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  product_id: string
  user_id: string
  quantity: number
  size: string
  created_at: string
}

export interface Order {
  id: string
  user_id: string
  total: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  payment_method: 'pix' | 'credit_card'
  payment_id?: string
  shipping_address: Address
  items: OrderItem[]
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  size: string
  price: number
}

export interface Address {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zip_code: string
}

export interface MenuItem {
  id: string
  name: string
  url: string
  order: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface InstagramPost {
  id: string
  media_url: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  timestamp: string
  permalink: string
}
