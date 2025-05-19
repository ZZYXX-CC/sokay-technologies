'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Minus, Plus, Trash2, WifiOff, AlertTriangle } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useCartStore } from '@/lib/store/cart';
import { initializePaystack, generateReference } from '@/lib/paystack/client';
import { createOrder, createOrderItems, connectionStatus, lastConnectionError } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// Form schema
const checkoutFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  address: z.string().min(5, { message: 'Please enter your full address' }),
  paymentMethod: z.enum(['paystack', 'cod'], {
    required_error: 'Please select a payment method',
  }),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

// Custom redirect function to use instead of router.push
function redirectToPage(path: string) {
  // Use window.location for full page navigation rather than client-side routing
  window.location.href = path;
}

export default function CheckoutForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const items = useCartStore(state => state.items);
  const totalPrice = useCartStore(state => state.totalPrice);
  const clearCart = useCartStore(state => state.clearCart);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const removeItem = useCartStore(state => state.removeItem);

  // Track local quantity input values
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  // Check if we're in offline/mock mode
  useEffect(() => {
    const checkSupabaseConnection = async () => {
      // Check environment variables
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        setIsOfflineMode(true);
        setConnectionError('Missing Supabase configuration. Running in offline mode.');
        return;
      }
      
      // Check connection status from supabase client
      if (connectionStatus === 'offline' || connectionStatus === 'error') {
        setIsOfflineMode(true);
        if (lastConnectionError) {
          setConnectionError(`Database connection error: ${lastConnectionError.message}`);
        } else {
          setConnectionError('Unable to connect to the database. Running in offline mode.');
        }
      }
    };
    
    checkSupabaseConnection();
    
    // Re-check connection every 30 seconds if we're in offline mode
    let interval: NodeJS.Timeout | null = null;
    if (isOfflineMode) {
      interval = setInterval(checkSupabaseConnection, 30000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOfflineMode]);

  // Handle manual quantity input
  const handleQuantityChange = (id: string, value: string) => {
    setInputValues({ ...inputValues, [id]: value });

    // Only update the cart if the value is a valid number
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      updateQuantity(id, numValue);
    }
  };

  // Handle blur to correct invalid inputs
  const handleBlur = (id: string, currentQuantity: number) => {
    const value = inputValues[id];
    const numValue = parseInt(value);

    // Reset to current quantity if invalid
    if (isNaN(numValue) || numValue <= 0) {
      setInputValues({ ...inputValues, [id]: currentQuantity.toString() });
    }
  };

  // Initialize form
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      paymentMethod: 'paystack',
    },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isOfflineMode) {
        toast.info('Running in demo mode. Your order will be processed locally.', {
          duration: 5000,
        });
      }
      
      if (values.paymentMethod === 'paystack') {
        // Handle Paystack payment
        const reference = generateReference();
        const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

        if (!paystackKey) {
          toast.error('Payment configuration error. Please try again later or use Cash on Delivery.');
          setIsSubmitting(false);
          return;
        }

        // Initialize Paystack checkout
        initializePaystack({
          key: paystackKey,
          email: values.email,
          amount: totalPrice() * 100, // Paystack amount is in kobo (100 kobo = 1 Naira)
          ref: reference,
          currency: 'NGN',
          onClose: () => {
            setIsSubmitting(false);
            toast.info('Payment cancelled');
          },
          callback: async (response: any) => {
            if (response.status === 'success') {
              try {
                // Create order in database
                console.log('Creating Paystack order with data:', {
                  user_id: null,
                  product_ids: items.map(item => item.id),
                  total_amount: totalPrice(),
                  payment_method: 'paystack',
                  status: 'processing',
                  customer_info: {
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    address: values.address,
                  },
                });

                let order;
                try {
                  order = await createOrder({
                    user_id: null, // Guest checkout
                    product_ids: items.map(item => item.id),
                    total_amount: totalPrice(),
                    payment_method: 'paystack',
                    status: 'processing',
                    customer_info: {
                      name: values.name,
                      email: values.email,
                      phone: values.phone,
                      address: values.address,
                    },
                  });

                  if (!order) {
                    console.error('Order creation returned null for Paystack payment');
                    toast.error('Failed to create order. Please contact support with reference: ' + reference);
                    setIsSubmitting(false);
                    return;
                  }

                  // Check if the order was created in mock/fallback mode
                  if (order.id.includes('mock')) {
                    toast.info('Order processed in demo mode due to database connectivity issues.', {
                      duration: 5000,
                    });
                  }
                  
                  console.log('Paystack order created successfully:', order);
                } catch (orderError) {
                  console.error('Error in Paystack createOrder function:', orderError);
                  toast.error('Payment successful, but order processing failed. Please contact support with reference: ' + reference);
                  setIsSubmitting(false);
                  return;
                }

                // Insert order_items
                const orderItems = items.map(item => ({
                  product_id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  image: item.image || '',
                }));

                try {
                  const itemsResult = await createOrderItems(order.id, orderItems);
                  if (!itemsResult) {
                    toast.error('Order created, but failed to save order items. Please contact support with reference: ' + reference);
                    setIsSubmitting(false);
                    return;
                  }
                } catch (orderItemsError) {
                  console.error('Error saving order items:', orderItemsError);
                  toast.error('Order created, but failed to save order details. Your order will still be processed. Reference: ' + reference);
                  // Continue to success page despite the error
                }

                // Success case
                clearCart();
                // Use the custom redirect function instead of router.push
                redirectToPage('/success?ref=' + reference);
              } catch (error) {
                console.error('Order creation error:', error);
                toast.error('Payment successful, but order processing failed. Please contact support with reference: ' + reference);
                setIsSubmitting(false);
              }
            } else {
              toast.error('Payment failed. Please try again.');
              setIsSubmitting(false);
            }
          },
        });
      } else {
        // Handle Cash on Delivery
        try {
          const codReference = 'COD-' + generateReference();

          console.log('Creating COD order with data:', {
            user_id: null,
            product_ids: items.map(item => item.id),
            total_amount: totalPrice(),
            payment_method: 'cod',
            status: 'pending',
            customer_info: {
              name: values.name,
              email: values.email,
              phone: values.phone,
              address: values.address,
            },
          });

          let order;
          try {
            order = await createOrder({
              user_id: null, // Guest checkout
              product_ids: items.map(item => item.id),
              total_amount: totalPrice(),
              payment_method: 'cod',
              status: 'pending',
              customer_info: {
                name: values.name,
                email: values.email,
                phone: values.phone,
                address: values.address,
              },
            });

            if (!order) {
              console.error('Order creation returned null');
              toast.error('Failed to create order. Please try again.');
              setIsSubmitting(false);
              return;
            }

            // Check if the order was created in mock/fallback mode
            if (order.id.includes('mock')) {
              toast.info('Order processed in demo mode due to database connectivity issues.', {
                duration: 5000,
              });
            }

            console.log('Order created successfully:', order);
          } catch (orderError) {
            console.error('Error in createOrder function:', orderError);
            toast.error('Failed to create order. Please try again.');
            setIsSubmitting(false);
            return;
          }

          // Insert order_items
          try {
            const orderItems = items.map(item => ({
              product_id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image || '',
            }));

            const itemsResult = await createOrderItems(order.id, orderItems);
            if (!itemsResult) {
              toast.error('Order created, but failed to save order items. Please contact support.');
              setIsSubmitting(false);
              return;
            }
          } catch (orderItemsError) {
            console.error('Error saving order items:', orderItemsError);
            toast.error('Order created, but failed to save order details. Your order will still be processed.');
            // Continue to success page despite the error
          }

          // Success case
          clearCart();
          // Use the custom redirect function instead of router.push
          redirectToPage('/success?ref=' + codReference);
        } catch (error) {
          console.error('COD order error:', error);
          toast.error('An error occurred while processing your order. Please try again.');
          setIsSubmitting(false);
        }
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('An error occurred during checkout. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      {isOfflineMode && (
        <Alert variant="warning" className="mb-6 border border-yellow-400/50 bg-yellow-600/20">
          <AlertTriangle className="h-4 w-4 text-yellow-300" />
          <AlertTitle className="text-white">Offline Mode</AlertTitle>
          <AlertDescription className="text-yellow-200 text-sm">
            {connectionError || 'Running in demo mode. Orders will be processed locally and not saved to the database.'}
          </AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Contact Information</h3>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" className="bg-light_blue-900/40 backdrop-blur-sm text-white border-light_blue-300/40 focus:border-light_blue-300/60 font-medium placeholder:text-white/60" {...field} />
                </FormControl>
                <FormMessage className="text-red-300 font-medium" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" className="bg-light_blue-900/40 backdrop-blur-sm text-white border-light_blue-300/40 focus:border-light_blue-300/60 font-medium placeholder:text-white/60" {...field} />
                </FormControl>
                <FormMessage className="text-red-300 font-medium" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+234..." className="bg-light_blue-900/40 backdrop-blur-sm text-white border-light_blue-300/40 focus:border-light_blue-300/60 font-medium placeholder:text-white/60" {...field} />
                </FormControl>
                <FormMessage className="text-red-300 font-medium" />
              </FormItem>
            )}
          />
        </div>

        {/* Shipping Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Shipping Information</h3>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">Delivery Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your full address including street, city, state, and ZIP code"
                    className="bg-light_blue-900/40 backdrop-blur-sm text-white border-light_blue-300/40 focus:border-light_blue-300/60 font-medium resize-none min-h-32 placeholder:text-white/60"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-300 font-medium" />
              </FormItem>
            )}
          />
        </div>

        {/* Payment Method */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Payment Method</h3>

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2 border border-light_blue-300/40 p-3 rounded-md bg-light_blue-900/40 backdrop-blur-sm">
                      <RadioGroupItem value="paystack" id="paystack" className="text-white" />
                      <Label htmlFor="paystack" className="text-white font-medium">Pay with Card (Paystack)</Label>
                    </div>
                    <div className="flex items-center space-x-2 border border-light_blue-300/40 p-3 rounded-md bg-light_blue-900/40 backdrop-blur-sm">
                      <RadioGroupItem value="cod" id="cod" className="text-white" />
                      <Label htmlFor="cod" className="text-white font-medium">Cash on Delivery</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-red-300 font-medium" />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 bg-light_blue-500 hover:bg-light_blue-400 text-prussian_blue font-semibold border border-light_blue-200/30 text-lg"
        >
          {isSubmitting ? 'Processing...' : 'Place Order'}
        </Button>
      </form>
    </Form>
  );
}
