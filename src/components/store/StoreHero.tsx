"use client";

import React from 'react';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { motion } from 'framer-motion';

interface StoreHeroProps {
  children: React.ReactNode;
}

export default function StoreHero({ children }: StoreHeroProps) {
  return (
    <AuroraBackground
      className="w-full min-h-screen overflow-hidden text-foreground"
      blendMode="multiply"
      opacity={0.75}
      showRadialGradient={false}
      extendBehindHeader={true}
      backgroundImage="/images/hero/bg.jpg"
    >
      <div className="relative z-10 w-full">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl text-center font-geist-sans tracking-tight pt-24 pb-6 text-foreground text-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          Our Products
        </motion.h1>
        
        {children}
      </div>
    </AuroraBackground>
  );
}
