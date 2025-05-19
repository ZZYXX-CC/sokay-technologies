import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Star, Truck, Shield, RotateCcw, Check, ArrowLeft } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { getProductBySlug } from '@/lib/supabase/client';
import AddToCartButtonWrapper from '@/components/store/AddToCartButtonWrapper';
import { productData, productFeatures, productSpecifications } from '@/lib/data/products';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProductPageProps {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;

  // Use our mock data instead of fetching from Supabase
  const product = productData.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Get features and specifications for this product
  const features = productFeatures[product.slug] || [];
  const specs = productSpecifications[product.slug] || {};

  // Get related products (products in the same category, excluding current product)
  const relatedProducts = productData
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3 mt-16">
        <div className="container px-4 mx-auto">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/store" className="hover:text-blue-600">Store</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link
              href={`/store?category=${product.category}`}
              className="hover:text-blue-600 capitalize"
            >
              {product.category.replace('-', ' ')}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden border">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}

              {/* Stock badge */}
              <div className="absolute top-4 right-4">
                <Badge className={`${product.in_stock ? 'bg-green-500' : 'bg-red-500'} hover:${product.in_stock ? 'bg-green-600' : 'bg-red-600'}`}>
                  {product.in_stock ? 'In Stock' : 'Out of Stock'}
                </Badge>
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square bg-white rounded-md overflow-hidden border cursor-pointer hover:border-blue-500"
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">5.0 (12 reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-3xl font-bold text-blue-600">₦{product.price.toLocaleString()}</p>
              {product.price > 10000 && (
                <p className="text-sm text-gray-600 mt-1">
                  Or pay in installments. Contact us for details.
                </p>
              )}
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Key Features</h2>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add to Cart */}
            <div className="mb-8">
              <AddToCartButtonWrapper product={product} />
              
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/store" className="flex items-center justify-center">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>

            {/* Shipping & Returns */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-medium">Free Shipping</h3>
                  <p className="text-sm text-gray-600">On orders over ₦50,000</p>
                </div>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-medium">1 Year Warranty</h3>
                  <p className="text-sm text-gray-600">On all Sokay products</p>
                </div>
              </div>
              <div className="flex items-center">
                <RotateCcw className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-medium">30-Day Returns</h3>
                  <p className="text-sm text-gray-600">Hassle-free return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="pt-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="pt-6">
              {Object.keys(specs).length > 0 ? (
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200">
                      {Object.entries(specs).map(([key, value]) => (
                        <tr key={key}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50 w-1/3">
                            {key}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No specifications available for this product.</p>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="pt-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
                <p className="text-gray-500 mb-4">Be the first to review this product</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Write a Review
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg border overflow-hidden transition-all group-hover:shadow-md">
                    <div className="aspect-square relative">
                      {relatedProduct.images && relatedProduct.images.length > 0 ? (
                        <Image
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.name}
                          fill
                          className="object-contain p-4"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-500">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium group-hover:text-blue-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-blue-600 font-bold mt-1">
                        ₦{relatedProduct.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}


