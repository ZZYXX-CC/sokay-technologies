import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if required environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    // Only log in browser, not during SSR
    console.warn('Missing Supabase environment variables. Some functionality may be limited.');
  }
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Mock functions for when Supabase is not properly configured
const isMockMode = !supabaseUrl || !supabaseAnonKey;

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

// Mock data for when Supabase is not available
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Sokay A1 Microphone',
    description: 'Professional grade microphone with crystal clear audio.',
    price: 19999,
    images: ['/images/products/sokay-A1-microphone-product-350x350.png'],
    category: 'microphones',
    in_stock: true,
    created_at: new Date().toISOString(),
    slug: 'sokay-a1-microphone'
  },
  {
    id: '2',
    name: 'Sokay H200 Headphones',
    description: 'Premium over-ear headphones with noise cancellation.',
    price: 24999,
    images: ['/images/products/sokay-headphones-studio-350x350.png'],
    category: 'headphones',
    in_stock: true,
    created_at: new Date().toISOString(),
    slug: 'sokay-h200-headphones'
  }
];

// Database functions
export async function getProducts() {
  if (isMockMode) {
    return mockProducts;
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching products:', error);
    return mockProducts;
  }
  
  return data as Product[];
}

export async function getProductBySlug(slug: string) {
  if (isMockMode) {
    return mockProducts.find(p => p.slug === slug) || null;
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching product:', error);
    return mockProducts.find(p => p.slug === slug) || null;
  }
  
  return data as Product;
}

export async function createOrder(order: Omit<Order, 'id' | 'created_at'>) {
  if (isMockMode) {
    return {
      id: `mock-${Date.now()}`,
      created_at: new Date().toISOString(),
      ...order
    } as Order;
  }

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
  if (isMockMode) {
    return {
      id: `mock-${Date.now()}`,
      email,
      subscribed_at: new Date().toISOString()
    } as Subscriber;
  }
  
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
  if (isMockMode) {
    return items.map((item, index) => ({
      id: `mock-item-${index}-${Date.now()}`,
      order_id: orderId,
      created_at: new Date().toISOString(),
      ...item
    })) as OrderItem[];
  }
  
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
  if (isMockMode) {
    return [];
  }
  
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
