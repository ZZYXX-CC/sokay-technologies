import { PaystackProps } from '@paystack/inline-js';

// Paystack configuration
export const initializePaystack = (config: PaystackProps) => {
  // This function will be called from the client-side component
  // that handles the payment
  if (typeof window !== 'undefined') {
    try {
      const PaystackPop = require('@paystack/inline-js');
      
      if (!config.key || config.key === '') {
        console.error('Paystack public key is missing!');
        if (config.callback) {
          config.callback({
            status: 'error',
            message: 'Paystack configuration error'
          });
        }
        return;
      }
      
      const paystack = new PaystackPop();
      paystack.newTransaction(config);
    } catch (error) {
      console.error('Error initializing Paystack:', error);
      if (config.callback) {
        config.callback({
          status: 'error',
          message: 'Failed to initialize payment'
        });
      }
    }
  }
};

// Helper function to generate a unique reference
export const generateReference = () => {
  const date = new Date();
  return `sokay-${date.getTime()}`;
};

// Types for Paystack transaction
export type PaystackTransaction = {
  reference: string;
  amount: number;
  email: string;
  metadata: {
    custom_fields: {
      display_name: string;
      value: string;
    }[];
  };
};

// Function to verify transaction status (to be called from server)
export const verifyTransaction = async (reference: string) => {
  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      console.error('Missing Paystack secret key');
      return null;
    }
    
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Paystack API returned ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error verifying transaction:', error);
    return null;
  }
};
