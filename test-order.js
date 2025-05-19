// Script to test order creation
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please check your .env.local file.');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function createOrder(order) {
  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single();

  if (error) {
    console.error('Error creating order:', error);
    return null;
  }

  return data;
}

async function createOrderItems(orderId, items) {
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
  return data;
}

async function testSupabaseConnection() {
  console.log('Testing Supabase connection...');

  try {
    // Test connection to Supabase API using the Supabase client
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Error connecting to Supabase API:', error);
      return false;
    }

    console.log('Successfully connected to Supabase API');
    console.log('Sample data:', data);
    return true;
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
    return false;
  }
}

async function testOrderCreation() {
  console.log('Testing order creation...');

  // First test the connection
  const connectionOk = await testSupabaseConnection();
  if (!connectionOk) {
    console.error('Skipping order creation test due to connection issues');
    return;
  }

  try {
    // Create a test order
    const testOrder = {
      user_id: null,
      product_ids: ['1'],
      total_amount: 100,
      payment_method: 'cod',
      status: 'pending',
      customer_info: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        address: 'Test Address'
      }
    };

    console.log('Creating order...');
    const order = await createOrder(testOrder);

    if (!order) {
      console.error('Failed to create order');
      return;
    }

    console.log('Order created successfully:', order);

    // Create order items
    const orderItems = [
      {
        product_id: '1',
        name: 'Test Product',
        price: 100,
        quantity: 1,
        image: 'test.jpg'
      }
    ];

    console.log('Creating order items...');
    const items = await createOrderItems(order.id, orderItems);

    if (!items) {
      console.error('Failed to create order items');
      return;
    }

    console.log('Order items created successfully:', items);

    // Clean up
    console.log('Cleaning up...');
    const { error: deleteError } = await supabase
      .from('orders')
      .delete()
      .eq('id', order.id);

    if (deleteError) {
      console.error('Error deleting test order:', deleteError);
    } else {
      console.log('Test order deleted successfully');
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testOrderCreation();
