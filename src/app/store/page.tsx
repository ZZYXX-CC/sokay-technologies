'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { productData } from '@/lib/data/products';
import { ShoppingCart, Heart, Filter, X, Plus, Minus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
// Commented out - using Zustand cart implementation instead
// import { useCart } from '@/context/CartContext';
import { useCartStore } from '@/lib/store/cart';
import StoreHero from '@/components/store/StoreHero';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const sokayLogo = '/Sokay-logo-light.svg';

// Types for state
interface ActiveImageState { [productId: string]: number }
interface ToggleTabState { [productId: string]: 'specs' | 'gallery' }

export default function StorePage() {
  const [search, setSearch] = useState('');
  const [openProduct, setOpenProduct] = useState<string | null>(null); // product id or null
  const [activeImage, setActiveImage] = useState<ActiveImageState>({});
  const [toggleTab, setToggleTab] = useState<ToggleTabState>({});
  // Using Zustand cart implementation instead of context
  // const { state: cartState, dispatch } = useCart();
  const items = useCartStore(state => state.items);
  const addItem = useCartStore(state => state.addItem);
  const updateQuantity = useCartStore(state => state.updateQuantity);

  const products = productData.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Helper function to get the current active image index or default to 0
  const getActiveImageIndex = (productId: string): number => {
    return activeImage[productId] || 0;
  };

  // Helper function to get the current tab or default to 'specs'
  const getActiveTab = (productId: string): 'specs' | 'gallery' => {
    return toggleTab[productId] || 'specs';
  };

  const handleAddToCart = (product: any) => {
    addItem(product, 1);
    toast.success(`Added ${product.name} to cart`);
  };

  // Function to handle modal close
  const handleCloseModal = (e: React.MouseEvent) => {
    // Ensure the event stops here and doesn't trigger parent click handlers
    e.stopPropagation();
    setOpenProduct(null);
  };

  return (
    <MainLayout>
      <StoreHero>
        {/* Search and Filter Bar */}
        <div className="w-full max-w-2xl mx-auto flex items-center gap-3 px-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl bg-card/80 backdrop-blur-sm border border-border py-2 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition-all"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="7"/><path d="m16 16-3.5-3.5"/></svg>
          </div>
          <button className="p-2 rounded-xl bg-card/80 backdrop-blur-sm border border-border text-foreground hover:bg-accent transition-colors">
            <Filter className="h-5 w-5" />
          </button>
        </div>

        {/* Product Grid */}
        <main className="w-full max-w-2xl mx-auto flex-1 pb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 px-2">
          {products.map(product => (
            <div key={product.id}>
              <div
                className="relative group bg-card/80 backdrop-blur-sm rounded-3xl shadow-glow p-4 flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up cursor-pointer"
                style={{ minHeight: 260 }}
                onClick={() => { setOpenProduct(product.id as string); setActiveImage((prev) => ({ ...prev, [product.id]: 0 })); setToggleTab((prev) => ({ ...prev, [product.id]: 'specs' })); }}
              >
                <button 
                  className="absolute top-4 right-4 p-1 rounded-full bg-background/80 hover:bg-primary transition-colors border border-border z-10" 
                  onClick={e => e.stopPropagation()}
                >
                  <Heart className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                </button>
                <div className="w-full aspect-square flex items-center justify-center mb-3 overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={product.images?.[0] || '/images/products/placeholder.svg'}
                    alt={product.name}
                    width={140}
                    height={140}
                    className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="w-full flex flex-col items-center mt-auto">
                  <span className="text-xs text-muted-foreground mb-1 line-clamp-1 text-center tracking-wide uppercase">{product.category.replace('-', ' ')}</span>
                  <h2 className="text-base font-semibold text-foreground text-center mb-1 line-clamp-2">{product.name}</h2>
                  <span className="text-lg font-bold text-primary-foreground mb-1">₦{product.price.toLocaleString()}</span>
                </div>
              </div>
              {/* Modal/Detail View */}
              {openProduct === product.id && (
                <div 
                  className="fixed inset-0 z-50 flex items-center justify-center" 
                  style={{backgroundImage: 'url(/images/hero/bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}
                  onClick={handleCloseModal} // Close when clicking outside the modal
                >
                  <div 
                    className="relative bg-background/90 backdrop-blur-md rounded-3xl shadow-2xl max-w-lg w-full mx-2 p-0 overflow-hidden animate-fade-in-up"
                    onClick={e => e.stopPropagation()} // Prevent clicks inside modal from closing it
                  >
                    {/* Close button */}
                    <button 
                      className="absolute top-4 right-4 z-10 bg-card rounded-full p-2 hover:bg-muted" 
                      onClick={handleCloseModal}
                      aria-label="Close product details"
                    >
                      <X className="h-6 w-6 text-foreground" />
                    </button>
                    {/* Product Image Carousel */}
                    <div className="relative w-full aspect-square bg-card/70 backdrop-blur-sm flex items-center justify-center">
                      <Image
                        src={product.images?.[getActiveImageIndex(product.id)] || '/images/products/placeholder.svg'}
                        alt={product.name}
                        width={600}
                        height={600}
                        className="object-contain w-full h-full"
                        priority
                      />
                      {/* Dot navigation */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        {product.images?.map((_, idx) => (
                          <button
                            key={idx}
                            className={`w-2.5 h-2.5 rounded-full ${getActiveImageIndex(product.id) === idx ? 'bg-primary' : 'bg-muted'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImage((prev) => ({ ...prev, [product.id]: idx }));
                            }}
                            aria-label={`Show image ${idx + 1}`}
                          />
                        ))}
                      </div>
                      {/* Vertical color label */}
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <span className="bg-black/80 text-white text-xs px-2 py-1 rounded-full rotate-90 tracking-widest shadow">
                          {('color' in product && product.color) ? String(product.color).toUpperCase() : 'BLACK'}
                        </span>
                      </div>
                    </div>
                    {/* Product Info & Toggle */}
                    <div className="px-6 py-6">
                      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                      <div className="text-lg font-semibold mb-2">₦{product.price.toLocaleString()}</div>
                      {/* Toggle Tabs */}
                      <div className="flex gap-4 mb-4">
                        <button
                          className={`pb-1 border-b-2 transition-all ${getActiveTab(product.id) === 'specs' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setToggleTab((prev) => ({ ...prev, [product.id]: 'specs' }));
                          }}
                        >Specs</button>
                        <button
                          className={`pb-1 border-b-2 transition-all ${getActiveTab(product.id) === 'gallery' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setToggleTab((prev) => ({ ...prev, [product.id]: 'gallery' }));
                          }}
                        >Gallery</button>
                      </div>
                      {/* Tab Content */}
                      {getActiveTab(product.id) === 'specs' ? (
                        <div className="text-sm text-muted-foreground mb-6 whitespace-pre-line">{product.description || 'No specs available.'}</div>
                      ) : (
                        <div className="flex gap-2 overflow-x-auto mb-6">
                          {product.images?.map((img, idx) => (
                            <Image
                              key={idx}
                              src={img}
                              alt={product.name + ' gallery'}
                              width={80}
                              height={80}
                              className="rounded-xl object-contain border border-border bg-card cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveImage((prev) => ({ ...prev, [product.id]: idx }));
                              }}
                            />
                          ))}
                        </div>
                      )}
                      
                      {/* Cart Actions */}
                      {items.find(i => i.id === product.id) ? (
                        // Product is in cart - show cart management options
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <Button
                              variant="destructive"
                              className="flex-none"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(product.id, 0); // Remove item completely
                                toast.success(`Removed ${product.name} from cart`);
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>

                            <div className="flex-1 flex items-center justify-end gap-1">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-9 w-9 p-0"
                                disabled={items.find(i => i.id === product.id)?.quantity <= 1}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const currentQty = items.find(i => i.id === product.id)?.quantity || 0;
                                  if (currentQty > 1) {
                                    updateQuantity(product.id, currentQty - 1);
                                  }
                                }}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>

                              <span className="w-8 text-center text-sm font-medium">
                                {items.find(i => i.id === product.id)?.quantity}
                              </span>

                              <Button
                                variant="outline"
                                size="icon"
                                className="h-9 w-9 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const currentQty = items.find(i => i.id === product.id)?.quantity || 0;
                                  updateQuantity(product.id, currentQty + 1);
                                  toast.success(`Added another ${product.name} to cart`);
                                }}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <Link 
                            href="/cart"
                            className="block w-full bg-light_blue-500 hover:bg-light_blue-400 text-prussian_blue font-semibold rounded-full px-8 py-3 shadow-lg transition text-lg text-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Cart
                          </Link>
                        </div>
                      ) : (
                        // Product is not in cart - show Add to Cart button
                        <div className="space-y-3">
                          <button
                            className="w-full bg-primary text-background font-semibold rounded-full px-8 py-3 shadow-lg hover:bg-primary/90 transition text-lg flex items-center justify-center gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                          >
                            <ShoppingCart className="h-5 w-5" /> Add to Cart
                          </button>
                          
                          <Link 
                            href="/cart"
                            className="block w-full bg-light_blue-500 hover:bg-light_blue-400 text-prussian_blue font-semibold rounded-full px-8 py-3 shadow-lg transition text-lg text-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Cart
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          </div>
        </main>
      </StoreHero>
    </MainLayout>
  );
}