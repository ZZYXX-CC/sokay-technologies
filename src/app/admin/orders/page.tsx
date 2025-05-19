'use client';

import React, { useState, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Eye,
  MoreHorizontal,
  Download,
  Filter,
  Loader2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AdminLayoutWrapper from '@/components/admin/AdminLayoutWrapper';
import { Order } from '@/lib/supabase/client';
import { toast } from 'sonner';

// Loading component
function OrdersLoading() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

// Main orders component
function OrdersContent() {
  // Sample orders - in a real application, these would be fetched from the database
  const sampleOrders: Order[] = [
    {
      id: 'ORD-001',
      user_id: null,
      product_ids: ['1', '3'],
      total_amount: 23000,
      payment_method: 'paystack',
      status: 'completed',
      created_at: '2025-04-28T10:30:00Z',
      customer_info: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+2341234567890',
        address: '123 Main Street, Lagos, Nigeria',
      },
    },
    {
      id: 'ORD-002',
      user_id: null,
      product_ids: ['2'],
      total_amount: 25000,
      payment_method: 'paystack',
      status: 'processing',
      created_at: '2025-04-27T14:20:00Z',
      customer_info: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+2349876543210',
        address: '456 Park Avenue, Abuja, Nigeria',
      },
    },
    {
      id: 'ORD-003',
      user_id: null,
      product_ids: ['4', '5'],
      total_amount: 21500,
      payment_method: 'cod',
      status: 'pending',
      created_at: '2025-04-26T09:15:00Z',
      customer_info: {
        name: 'Michael Johnson',
        email: 'michael@example.com',
        phone: '+2348765432109',
        address: '789 Oak Street, Port Harcourt, Nigeria',
      },
    },
    {
      id: 'ORD-004',
      user_id: null,
      product_ids: ['1'],
      total_amount: 15000,
      payment_method: 'cod',
      status: 'cancelled',
      created_at: '2025-04-25T16:45:00Z',
      customer_info: {
        name: 'Sarah Williams',
        email: 'sarah@example.com',
        phone: '+2347654321098',
        address: '321 Elm Street, Kano, Nigeria',
      },
    },
    {
      id: 'ORD-005',
      user_id: null,
      product_ids: ['2', '3'],
      total_amount: 33000,
      payment_method: 'paystack',
      status: 'completed',
      created_at: '2025-04-24T11:30:00Z',
      customer_info: {
        name: 'David Brown',
        email: 'david@example.com',
        phone: '+2346543210987',
        address: '654 Pine Street, Ibadan, Nigeria',
      },
    },
  ];

  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');

  const filteredOrders = orders.filter(order => {
    // Search filter
    const searchMatch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_info.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_info.email.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const statusMatch = statusFilter === 'all' || order.status === statusFilter;

    // Payment method filter
    const paymentMatch = paymentFilter === 'all' || order.payment_method === paymentFilter;

    return searchMatch && statusMatch && paymentMatch;
  });

  const handleUpdateStatus = (orderId: string, newStatus: 'pending' | 'processing' | 'completed' | 'cancelled') => {
    // In a real application, this would call an API to update the order status
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Order Management</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="w-full sm:w-auto">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-auto">
                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="paystack">Paystack</SelectItem>
                    <SelectItem value="cod">Cash on Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Order ID</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Customer</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Date</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Amount</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Payment</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Status</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="px-4 py-4 font-medium">{order.id}</td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium">{order.customer_info.name}</div>
                        <div className="text-sm text-gray-500">{order.customer_info.email}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">{formatDate(order.created_at)}</td>
                    <td className="px-4 py-4">₦{order.total_amount.toLocaleString()}</td>
                    <td className="px-4 py-4 capitalize">
                      {order.payment_method === 'paystack' ? 'Paystack' : 'Cash on Delivery'}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'processing'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <button className="w-full flex items-center">
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </button>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleUpdateStatus(order.id, 'pending')}
                            disabled={order.status === 'pending'}
                          >
                            Mark as Pending
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleUpdateStatus(order.id, 'processing')}
                            disabled={order.status === 'processing'}
                          >
                            Mark as Processing
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleUpdateStatus(order.id, 'completed')}
                            disabled={order.status === 'completed'}
                          >
                            Mark as Completed
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                            disabled={order.status === 'cancelled'}
                            className="text-red-600"
                          >
                            Cancel Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No orders found. Try adjusting your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Wrapper component for AdminLayout
function OrdersPageWrapper() {
  return (
    <AdminLayoutWrapper>
      <Suspense fallback={<OrdersLoading />}>
        <OrdersContent />
      </Suspense>
    </AdminLayoutWrapper>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<OrdersLoading />}>
      <OrdersPageWrapper />
    </Suspense>
  );
}
