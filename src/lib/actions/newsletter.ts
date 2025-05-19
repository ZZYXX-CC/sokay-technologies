'use server';

import { Resend } from 'resend';
import { addSubscriber } from '@/lib/supabase/client';

// Initialize Resend client (server-side only)
const resendApiKey = process.env.RESEND_API_KEY || '';
const resend = new Resend(resendApiKey);

export async function subscribeToNewsletter(email: string) {
  try {
    // Add subscriber to database
    const subscriber = await addSubscriber(email);
    
    if (!subscriber) {
      return { success: false, message: 'Failed to add subscriber to database' };
    }
    
    // Send confirmation email
    const { data, error } = await resend.emails.send({
      from: 'Sokay Technologies <newsletter@sokaytechnologies.com>',
      to: email,
      subject: 'Welcome to Sokay Technologies Newsletter',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Thank you for subscribing!</h1>
          <p>You've successfully subscribed to the Sokay Technologies newsletter.</p>
          <p>You'll now receive updates about our latest products, services, and promotions.</p>
          
          <p style="margin-top: 20px;">If you didn't subscribe to our newsletter, please ignore this email.</p>
          
          <p style="margin-top: 30px; color: #777; font-size: 12px;">© ${new Date().getFullYear()} Sokay Technologies. All rights reserved.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending newsletter confirmation email:', error);
      return { success: true, emailSent: false, message: 'Subscribed but failed to send confirmation email' };
    }

    return { success: true, emailSent: true, message: 'Successfully subscribed to the newsletter' };
  } catch (error) {
    console.error('Error in newsletter subscription:', error);
    return { success: false, message: 'An error occurred during subscription' };
  }
}

export async function sendOrderConfirmation(
  email: string,
  name: string,
  orderDetails: {
    orderId: string;
    products: { name: string; price: number; quantity: number }[];
    total: number;
    paymentMethod: 'paystack' | 'cod';
  }
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Sokay Technologies <orders@sokaytechnologies.com>',
      to: email,
      subject: `Order Confirmation #${orderDetails.orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Thank you for your order, ${name}!</h1>
          <p>We've received your order and are processing it now.</p>
          
          <h2 style="color: #333;">Order Details</h2>
          <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
          <p><strong>Payment Method:</strong> ${orderDetails.paymentMethod === 'paystack' ? 'Paystack' : 'Cash on Delivery'}</p>
          
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f2f2f2;">
                <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Product</th>
                <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Price</th>
                <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Quantity</th>
                <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${orderDetails.products.map(product => `
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd;">${product.name}</td>
                  <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">₦${product.price.toFixed(2)}</td>
                  <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">${product.quantity}</td>
                  <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">₦${(product.price * product.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="padding: 10px; text-align: right; border: 1px solid #ddd;"><strong>Total:</strong></td>
                <td style="padding: 10px; text-align: right; border: 1px solid #ddd;"><strong>₦${orderDetails.total.toFixed(2)}</strong></td>
              </tr>
            </tfoot>
          </table>
          
          <p style="margin-top: 20px;">If you have any questions about your order, please contact our customer service at <a href="mailto:support@sokaytechnologies.com">support@sokaytechnologies.com</a>.</p>
          
          <p style="margin-top: 30px; color: #777; font-size: 12px;">© ${new Date().getFullYear()} Sokay Technologies. All rights reserved.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending order confirmation email:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return false;
  }
}

export async function sendAdminNotification(
  orderDetails: {
    orderId: string;
    customerName: string;
    customerEmail: string;
    products: { name: string; price: number; quantity: number }[];
    total: number;
    paymentMethod: 'paystack' | 'cod';
  }
) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@sokaytechnologies.com';
    
    const { data, error } = await resend.emails.send({
      from: 'Sokay Technologies <orders@sokaytechnologies.com>',
      to: adminEmail,
      subject: `New Order #${orderDetails.orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">New Order Received</h1>
          <p>A new order has been placed on the Sokay Technologies website.</p>
          
          <h2 style="color: #333;">Order Details</h2>
          <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
          <p><strong>Customer:</strong> ${orderDetails.customerName} (${orderDetails.customerEmail})</p>
          <p><strong>Payment Method:</strong> ${orderDetails.paymentMethod === 'paystack' ? 'Paystack' : 'Cash on Delivery'}</p>
          
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f2f2f2;">
                <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Product</th>
                <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Price</th>
                <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Quantity</th>
                <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${orderDetails.products.map(product => `
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd;">${product.name}</td>
                  <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">₦${product.price.toFixed(2)}</td>
                  <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">${product.quantity}</td>
                  <td style="padding: 10px; text-align: right; border: 1px solid #ddd;">₦${(product.price * product.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="padding: 10px; text-align: right; border: 1px solid #ddd;"><strong>Total:</strong></td>
                <td style="padding: 10px; text-align: right; border: 1px solid #ddd;"><strong>₦${orderDetails.total.toFixed(2)}</strong></td>
              </tr>
            </tfoot>
          </table>
          
          <p style="margin-top: 20px;">Please log in to the admin panel to process this order.</p>
          
          <p style="margin-top: 30px; color: #777; font-size: 12px;">© ${new Date().getFullYear()} Sokay Technologies. All rights reserved.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending admin notification email:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return false;
  }
}
