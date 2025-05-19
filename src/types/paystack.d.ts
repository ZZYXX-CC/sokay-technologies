declare module '@paystack/inline-js' {
  export interface PaystackProps {
    key: string;
    email: string;
    amount: number;
    ref?: string;
    currency?: string;
    channels?: string[];
    metadata?: Record<string, any>;
    label?: string;
    onClose?: () => void;
    callback?: (response: any) => void;
    [key: string]: any;
  }

  export default class PaystackPop {
    newTransaction(options: PaystackProps): void;
  }
} 