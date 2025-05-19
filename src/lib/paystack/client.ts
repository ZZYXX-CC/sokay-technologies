import { PaystackProps } from '@paystack/inline-js';

// Paystack configuration
export const initializePaystack = (config: PaystackProps) => {
  // This function will be called from the client-side component
  // that handles the payment
  if (typeof window !== 'undefined') {
    const PaystackPop = require('@paystack/inline-js');
    const paystack = new PaystackPop();
    paystack.newTransaction(config);
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
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error verifying transaction:', error);
    return null;
  }
};
