import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  in_stock: boolean;
  created_at: string;
  slug: string;
};

export type Order = {
  id: string;
  user_id: string | null;
  product_ids: string[];
  total_amount: number;
  payment_method: 'paystack' | 'cod';
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at: string;
  customer_info: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
};

export type Subscriber = {
  id: string;
  email: string;
  subscribed_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  created_at: string;
};

// Database functions
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  return data as Product[];
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }
  
  return data as Product;
}

export async function createOrder(order: Omit<Order, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating order:', error);
    return null;
  }
  
  return data as Order;
}

export async function addSubscriber(email: string) {
  const { data, error } = await supabase
    .from('subscribers')
    .insert({ email })
    .select()
    .single();
  
  if (error) {
    console.error('Error adding subscriber:', error);
    return null;
  }
  
  return data as Subscriber;
}

export async function createOrderItems(orderId: string, items: Omit<OrderItem, 'id' | 'order_id' | 'created_at'>[]) {
  // items: [{ product_id, name, price, quantity, image }]
  const insertItems = items.map(item => ({ ...item, order_id: orderId }));
  const { data, error } = await supabase
    .from('order_items')
    .insert(insertItems)
    .select();
  if (error) {
    console.error('Error creating order items:', error);
    return null;
  }
  return data as OrderItem[];
}

export async function getOrderItemsByOrderId(orderId: string) {
  const { data, error } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId);
  if (error) {
    console.error('Error fetching order items:', error);
    return [];
  }
  return data as OrderItem[];
}
