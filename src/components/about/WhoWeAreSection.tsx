"use client";

import React from 'react';
import Image from 'next/image';
import { FlickeringBackground } from '@/components/ui/flickering-background';

interface WhoWeAreSectionProps {
  // Add any props you need
}

export default function WhoWeAreSection({}: WhoWeAreSectionProps) {
  return (
    <section className="w-full bg-isabelline py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-prussian_blue tracking-tighter font-geist-sans">
              who we <span className="relative">
                are
                <span className="absolute -right-4 -top-4 text-light_blue text-2xl">•</span>
              </span>
            </h2>
            <p className="mb-6 text-lg font-geist-sans">
              At Sokay Technologies, we are dedicated to delivering premium audio equipment that meets the highest standards of quality and performance. With a rich history in audio engineering, our team brings decades of experience to create products that redefine sound clarity and precision.
            </p>
            <p className="mb-6 text-lg font-geist-sans">
              Our commitment to innovation, combined with a deep appreciation for sound quality, has made us a trusted name among professionals and enthusiasts alike. From our top-of-the-line Sokay A1 microphones to the versatile Sokay CS-22 audio interfaces and our precision-engineered M-424 headphones, our products are designed to elevate your sound experience.
            </p>
            <p className="mb-6 text-lg font-geist-sans">
              Our team of expert engineers works tirelessly to develop innovations that deliver exceptional sound quality and reliability. Whether you're setting up a home studio, recording a podcast, or performing live, our technology provides the foundation for pristine audio reproduction and creative expression.
            </p>
            <p className="text-lg font-geist-sans">
              From our proprietary audio processing algorithms ensuring crystal-clear sound reproduction to our durable hardware designs, every Sokay product is engineered for excellence. Our M-424 headphones deliver accurate frequency response, detailed soundstage, and deep bass for producers, mixing engineers, and audiophiles alike.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="relative w-full max-w-md">
              <FlickeringBackground
                className="absolute inset-0 w-full h-full -m-8 mix-blend-screen opacity-80"
                squareSize={6}
                gridGap={8}
                flickerChance={0.15}
                color="#93b7be"
                maxOpacity={0.7}
              />
              <Image
                src="/images/products/SOKAY-CS-22-s-350x350.png"
                alt="Sokay CS-22 Audio Interface"
                width={350}
                height={350}
                className="object-contain mx-auto relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
