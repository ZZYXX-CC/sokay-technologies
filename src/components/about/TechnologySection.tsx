"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Squares } from '@/components/ui/squares-background';
import { FlickeringBackground } from '@/components/ui/flickering-background';
import { TechScroll } from '@/components/about/TechScroll';

interface TechnologySectionProps {
  // Add any props you need
}

export default function TechnologySection({}: TechnologySectionProps) {
  return (
    <section className="w-full py-16 bg-isabelline relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-90">
        <Squares
          direction="diagonal"
          speed={0.3}
          squareSize={50}
          borderColor="#26527d"
          hoverFillColor="#93b7be"
          className="bg-isabelline"
        />
      </div>
      <div className="absolute inset-0 z-0 mix-blend-overlay">
        <FlickeringBackground
          className="w-full h-full"
          squareSize={8}
          gridGap={10}
          flickerChance={0.08}
          color="#26527d"
          maxOpacity={0.4}
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-prussian_blue tracking-tighter">
            our <span className="relative">
              technology
              <span className="absolute -right-4 -top-4 text-light_blue text-2xl">•</span>
            </span>
          </h2>
          <p className="mt-4 text-xl text-prussian_blue max-w-2xl mx-auto">
            Innovative solutions designed for exceptional audio experiences
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl mx-auto"
        >
          <TechScroll />
        </motion.div>
      </div>
    </section>
  );
}
