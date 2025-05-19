import { Product } from '@/lib/supabase/client';

// Product data based on sokaytechnologies.com
export const productData: Product[] = [
  {
    id: '1',
    name: 'Sokay A1 Studio Microphone',
    description: 'Capture crystal-clear audio with the Sokay A1, a high-quality condenser microphone designed for studio recording, live performances, and content creation. With its sensitive condenser capsule and wide frequency response, this microphone delivers accurate and detailed sound reproduction. Its durable design and included accessories make it a reliable choice for musicians, podcasters, and producers seeking professional-grade audio.',
    price: 103000,
    images: [
      '/images/products/sokay-A1-microphone-product-350x350.png',
      '/images/products/sokay-A1-microphone-buy-350x350.png'
    ],
    category: 'microphones',
    in_stock: true,
    created_at: new Date().toISOString(),
    slug: 'sokay-a1-studio-microphone',
  },
  {
    id: '2',
    name: 'Sokay CS-22',
    description: 'CS-22: Record vocals, guitar, synths, and more simultaneously. Unleash your creativity with analog purity and clarity. Plug and play for maximum potential. Two Midas mic preamps, high-headroom, low-noise, low-distortion. Analog Hi-z, lowcut, impedance switching, and relay control for precise vocal and acoustic capture.',
    price: 110000,
    images: [
      '/images/products/SOKAY-CS-22-s-350x350.png'
    ],
    category: 'audio-interfaces',
    in_stock: false,
    created_at: new Date().toISOString(),
    slug: 'sokay-cs-22',
  },
  {
    id: '3',
    name: 'Sokay CS-22A',
    description: 'CS-22A: Record vocals, guitar, synths, and more simultaneously. Unleash your creativity with analog purity and clarity. Plug and play for maximum potential. Two Midas mic preamps, high-headroom, low-noise, low-distortion. Analog Hi-z, lowcut, impedance switching, and relay control for precise vocal and acoustic capture.',
    price: 180000,
    images: [
      '/images/products/CS-22A-RIGHT-featured-350x350.png',
      '/images/products/CS-22A-FRONT-350x350.jpg'
    ],
    category: 'audio-interfaces',
    in_stock: true,
    created_at: new Date().toISOString(),
    slug: 'sokay-cs-22a',
  },
  {
    id: '4',
    name: 'Sokay M-424 Headphones',
    description: 'Experience precise sound reproduction with the Sokay M-424 headphones. Designed for producers, mixing and mastering engineers, music listeners, and audiophiles alike, these headphones deliver accurate frequency response, detailed soundstage, and deep bass. Hear Better, Mix Clearly, Master Your Sound.',
    price: 15000,
    images: [
      '/images/products/headset.png',
      '/images/products/headset-full.png'
    ],
    category: 'headphones',
    in_stock: true,
    created_at: new Date().toISOString(),
    slug: 'sokay-m424-headphones',
  },
  {
    id: '5',
    name: 'Sokay Premium Audio Cables',
    description: 'Premium XLR and instrument cables with gold-plated connectors for superior signal transfer. Designed for professional audio applications, these cables ensure minimal signal loss and maximum durability.',
    price: 8500,
    images: [
      '/images/products/premium-audio-cables-350x350.jpg'
    ],
    category: 'accessories',
    in_stock: true,
    created_at: new Date().toISOString(),
    slug: 'sokay-premium-audio-cables',
  }
];

// Product features for display on cards
export const productFeatures: Record<string, string[]> = {
  'sokay-a1-studio-microphone': [
    'Noise Cancellation',
    'Studio Grade',
    'Quality Tone'
  ],
  'sokay-cs-22': [
    'Plug and Play',
    'Quality Sound',
    'Easy to use'
  ],
  'sokay-cs-22a': [
    'Plug and Play',
    'Quality Sound',
    'Easy to use'
  ],
  'sokay-m424-headphones': [
    'Precise Sound',
    'Detailed Soundstage',
    'Deep Bass'
  ],
  'sokay-premium-audio-cables': [
    'Gold-Plated Connectors',
    'Premium Quality',
    'Durable Design'
  ]
};

// Product specifications
export const productSpecifications: Record<string, Record<string, string>> = {
  'sokay-a1-studio-microphone': {
    'Microphone Type': 'Heart-shaped Unidirectional Capacitive',
    'Frequency response': '20Hz-18KH',
    'Maximum output level': '6.37dBv@THD+N=1%',
    'Dynamic range': '105dB',
    'Signal-to-noise ratio': '100dB@THD+N=1%',
    'Phantom Power': '48V',
    'Power consumption': '3mA',
    'Output interface': 'Built-in 3-pin XLR'
  },
  'sokay-cs-22': {
    'Voltage': '4.8-5.2V',
    'Supported Sampling Rates': '192kHz',
    'Bit-Rate': '24-Bit',
    'Channels': '2',
    'Current': '3A or More',
    'Phantom Power': '48V D.C',
    'Supports': 'USB, XLR/Type C'
  },
  'sokay-cs-22a': {
    'Voltage': '4.8-5.2V',
    'Supported Sampling Rates': '192kHz',
    'Bit-Rate': '24-Bit',
    'Channels': '2',
    'Current': '3A or More',
    'Phantom Power': '48V D.C',
    'Supports': 'USB, XLR/Type C'
  }
};

// Function to get products
export function getMockProducts(): Promise<Product[]> {
  return Promise.resolve(productData);
}

// Function to get product by slug
export function getMockProductBySlug(slug: string): Promise<Product | null> {
  const product = productData.find(p => p.slug === slug);
  return Promise.resolve(product || null);
}
