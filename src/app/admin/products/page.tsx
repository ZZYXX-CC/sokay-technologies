'use client';

export const dynamic = "force-dynamic";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Loader2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AdminLayoutWrapper from '@/components/admin/AdminLayoutWrapper';
import { Product } from '@/lib/supabase/client';
import { toast } from 'sonner';

// Loading component
function ProductsLoading() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

// Main products component
function ProductsContent() {
  // Sample products - in a real application, these would be fetched from the database
  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'Sokay M-424 Headphones',
      description: 'Experience precise sound reproduction with the Sokay M-424 headphones. Designed for producers, mixing and mastering engineers, music listeners, and audiophiles alike, these headphones deliver accurate frequency response, detailed soundstage, and deep bass.',
      price: 15000,
      images: ['/images/products/headphones.jpg'],
      category: 'electronics',
      in_stock: true,
      created_at: '2025-04-15T10:30:00Z',
      slug: 'sokay-m424-headphones',
    },
    {
      id: '2',
      name: 'Smart Watch Series 5',
      description: 'Feature-rich smartwatch with health monitoring capabilities.',
      price: 25000,
      images: ['/images/products/smartwatch.jpg'],
      category: 'electronics',
      in_stock: true,
      created_at: '2025-04-10T14:20:00Z',
      slug: 'smart-watch-series-5',
    },
    {
      id: '3',
      name: 'Portable Power Bank 20000mAh',
      description: 'High-capacity power bank for charging multiple devices.',
      price: 8000,
      images: ['/images/products/powerbank.jpg'],
      category: 'accessories',
      in_stock: true,
      created_at: '2025-04-05T09:15:00Z',
      slug: 'portable-power-bank-20000mah',
    },
    {
      id: '4',
      name: 'Wireless Gaming Mouse',
      description: 'Ergonomic gaming mouse with customizable RGB lighting.',
      price: 12000,
      images: ['/images/products/mouse.jpg'],
      category: 'accessories',
      in_stock: false,
      created_at: '2025-03-28T16:45:00Z',
      slug: 'wireless-gaming-mouse',
    },
    {
      id: '5',
      name: 'Premium Laptop Backpack',
      description: 'Durable and water-resistant backpack for laptops up to 15.6 inches.',
      price: 9500,
      images: ['/images/products/backpack.jpg'],
      category: 'accessories',
      in_stock: true,
      created_at: '2025-03-20T11:30:00Z',
      slug: 'premium-laptop-backpack',
    },
  ];

  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProduct = () => {
    if (deleteProductId) {
      // In a real application, this would call an API to delete the product
      setProducts(products.filter(product => product.id !== deleteProductId));
      toast.success('Product deleted successfully');
      setIsDeleteDialogOpen(false);
      setDeleteProductId(null);
    }
  };

  const openDeleteDialog = (productId: string) => {
    setDeleteProductId(productId);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button asChild>
          <Link href="/admin/products/new" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Product Inventory</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Product</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Category</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Price</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Status</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded bg-gray-100 flex items-center justify-center">
                          {/* Placeholder for product image */}
                          <span className="text-gray-500 text-xs">{product.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-gray-500 text-sm truncate max-w-[200px]">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="capitalize">{product.category}</span>
                    </td>
                    <td className="px-4 py-4">₦{product.price.toLocaleString()}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.in_stock
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.in_stock ? 'In Stock' : 'Out of Stock'}
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
                            <Link href={`/product/${product.slug}`} className="flex items-center">
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/products/${product.id}/edit`} className="flex items-center">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => openDeleteDialog(product.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      No products found. Try adjusting your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Wrapper component for AdminLayout
function ProductsPageWrapper() {
  return (
    <AdminLayoutWrapper>
      <Suspense fallback={<ProductsLoading />}>
        <ProductsContent />
      </Suspense>
    </AdminLayoutWrapper>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsPageWrapper />
    </Suspense>
  );
}
