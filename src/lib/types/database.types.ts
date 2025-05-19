export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  in_stock: boolean;
  created_at?: string;
  updated_at?: string;
};

export type Order = {
  id: string;
  user_id: string;
  product_ids: string[];
  total_amount: number;
  payment_method: 'paystack' | 'cod'; // Cash on Delivery
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at: string;
  updated_at?: string;
};

export type Subscriber = {
  id: string;
  email: string;
  subscribed_at: string;
};

export type User = {
  id: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at?: string;
};
