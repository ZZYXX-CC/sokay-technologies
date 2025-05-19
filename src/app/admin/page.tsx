'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminDashboard() {
  // In a real application, these would be fetched from the database
  const stats = [
    {
      title: 'Total Products',
      value: '24',
      icon: Package,
      color: 'bg-blue-100 text-blue-600',
      link: '/admin/products',
    },
    {
      title: 'Total Orders',
      value: '12',
      icon: ShoppingBag,
      color: 'bg-green-100 text-green-600',
      link: '/admin/orders',
    },
    {
      title: 'Customers',
      value: '8',
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
      link: '/admin/customers',
    },
    {
      title: 'Revenue',
      value: '₦120,000',
      icon: TrendingUp,
      color: 'bg-amber-100 text-amber-600',
      link: '/admin/orders',
    },
  ];

  // Recent orders - in a real application, these would be fetched from the database
  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      date: '2025-04-28',
      amount: '₦25,000',
      status: 'completed',
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      date: '2025-04-27',
      amount: '₦18,500',
      status: 'processing',
    },
    {
      id: 'ORD-003',
      customer: 'Michael Johnson',
      date: '2025-04-26',
      amount: '₦32,000',
      status: 'pending',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <Link
                  href={stat.link}
                  className="text-sm text-gray-500 flex items-center mt-1 hover:text-primary"
                >
                  View Details
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Orders</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/orders">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left font-medium text-gray-500">Order ID</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-500">Customer</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-500">Date</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-500">Amount</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="px-4 py-3 text-sm">{order.id}</td>
                      <td className="px-4 py-3 text-sm">{order.customer}</td>
                      <td className="px-4 py-3 text-sm">{order.date}</td>
                      <td className="px-4 py-3 text-sm">{order.amount}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'processing'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button asChild>
                <Link href="/admin/products/new" className="flex items-center justify-center">
                  <Package className="mr-2 h-4 w-4" />
                  Add New Product
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/orders" className="flex items-center justify-center">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Manage Orders
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/settings" className="flex items-center justify-center">
                  <Users className="mr-2 h-4 w-4" />
                  View Customers
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
