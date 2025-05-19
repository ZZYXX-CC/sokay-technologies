import { supabase } from './supabaseClient';
import { Product, Order, Subscriber, User } from './types/database.types';

// Product operations
export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }

  return data;
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error);
    return null;
  }

  return data;
};

export const updateProduct = async (id: string, updates: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating product with id ${id}:`, error);
    return null;
  }

  return data;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    return false;
  }

  return true;
};

// Order operations
export const getOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }

  return data || [];
};

export const getOrderById = async (id: string): Promise<Order | null> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching order with id ${id}:`, error);
    return null;
  }

  return data;
};

export const createOrder = async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<Order | null> => {
  const { data, error } = await supabase
    .from('orders')
    .insert([order])
    .select()
    .single();

  if (error) {
    console.error('Error creating order:', error);
    return null;
  }

  return data;
};

export const updateOrderStatus = async (id: string, status: Order['status']): Promise<Order | null> => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating order status for id ${id}:`, error);
    return null;
  }

  return data;
};

// Subscriber operations
export const addSubscriber = async (email: string): Promise<Subscriber | null> => {
  const { data, error } = await supabase
    .from('subscribers')
    .insert([{ email }])
    .select()
    .single();

  if (error) {
    console.error('Error adding subscriber:', error);
    return null;
  }

  return data;
};

export const getSubscribers = async (): Promise<Subscriber[]> => {
  const { data, error } = await supabase
    .from('subscribers')
    .select('*')
    .order('subscribed_at', { ascending: false });

  if (error) {
    console.error('Error fetching subscribers:', error);
    return [];
  }

  return data || [];
};

// User operations
export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();
    
  if (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
  
  return data;
};

export const isAdmin = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return user?.role === 'admin';
};
