-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  images TEXT[] NOT NULL,
  category TEXT NOT NULL,
  in_stock BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  product_ids UUID[] NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('paystack', 'cod')),
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a view for users with roles
CREATE OR REPLACE VIEW user_roles AS
SELECT
  id,
  email,
  raw_user_meta_data->>'role' as role,
  created_at,
  updated_at
FROM auth.users;

-- Create RLS (Row Level Security) policies

-- Products: Anyone can read, only authenticated admins can modify
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert products"
  ON products FOR INSERT
  TO authenticated
  USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);

CREATE POLICY "Only admins can update products"
  ON products FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);

CREATE POLICY "Only admins can delete products"
  ON products FOR DELETE
  TO authenticated
  USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);

-- Orders: Users can read their own orders, admins can read all
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR (auth.jwt() ->> 'role'::text) = 'admin'::text);

CREATE POLICY "Users can create their own orders"
  ON orders FOR INSERT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Only admins can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);

-- Subscribers: Anyone can subscribe, only admins can view
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON subscribers FOR INSERT
  USING (true);

CREATE POLICY "Only admins can view subscribers"
  ON subscribers FOR SELECT
  TO authenticated
  USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);

-- Create functions for admin operations

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (auth.jwt() ->> 'role'::text) = 'admin'::text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to set user as admin (to be used via Supabase dashboard or API)
CREATE OR REPLACE FUNCTION set_user_admin(user_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE auth.users
  SET raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{role}',
    '"admin"'::jsonb
  )
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
