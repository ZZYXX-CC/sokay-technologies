// Script to check if the required tables exist in the Supabase database
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please check your .env.local file.');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  console.log('Checking Supabase tables...');

  try {
    // Check if the orders table exists
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .limit(1);

    if (ordersError) {
      console.error('Error checking orders table:', ordersError);
      if (ordersError.code === '42P01') {
        console.log('The orders table does not exist. You need to apply the schema.');
      }
    } else {
      console.log('✅ Orders table exists');
    }

    // Check if the order_items table exists
    const { data: orderItemsData, error: orderItemsError } = await supabase
      .from('order_items')
      .select('*')
      .limit(1);

    if (orderItemsError) {
      console.error('Error checking order_items table:', orderItemsError);
      if (orderItemsError.code === '42P01') {
        console.log('The order_items table does not exist. You need to apply the schema.');
      }
    } else {
      console.log('✅ Order_items table exists');
    }

    // Check if the products table exists
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(1);

    if (productsError) {
      console.error('Error checking products table:', productsError);
      if (productsError.code === '42P01') {
        console.log('The products table does not exist. You need to apply the schema.');
      }
    } else {
      console.log('✅ Products table exists');
      console.log('Sample product:', productsData[0]);
    }

    console.log('\nChecking RLS policies...');
    
    // Test inserting an order as an anonymous user
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

    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert(testOrder)
      .select();

    if (orderError) {
      console.error('Error inserting test order:', orderError);
      console.log('This might be a permissions issue with Row Level Security (RLS).');
    } else {
      console.log('✅ Successfully inserted test order');
      console.log('Order ID:', orderData[0].id);
      
      // Clean up the test order
      const { error: deleteError } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderData[0].id);
        
      if (deleteError) {
        console.error('Error deleting test order:', deleteError);
      } else {
        console.log('✅ Successfully cleaned up test order');
      }
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkTables();
