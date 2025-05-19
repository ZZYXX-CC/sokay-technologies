"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AuroraBackground } from '@/components/ui/aurora-background';
import ModelViewer from '@/components/ui/model-viewer';
import FullScreenFlickering from './FullScreenFlickering';

interface HeroSectionProps {
  // Add any props you need
}

export default function HeroSection({}: HeroSectionProps) {
  return (
    <AuroraBackground
      className="w-full bg-prussian_blue text-isabelline pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden relative"
      blendMode="multiply"
      opacity={0.85}
      showRadialGradient={false}
      extendBehindHeader={true}
      backgroundImage="/images/gradient-bg.jpg"
    >
      {/* Flickering Background covering the entire hero section */}
      <FullScreenFlickering
        squareSize={4}
        gridGap={6}
        flickerChance={0.15}
        color="#93b7be"
        maxOpacity={0.3}
      />
      <div className="container mx-auto px-4 pt-8 md:pt-12 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter font-geist-sans text-white"
        >
          pure audio
        </motion.h1>
        {/* Mobile layout - Text over image */}
        <div className="relative md:hidden z-10">
          <div className="relative w-full h-[600px] flex flex-col">
            {/* Text at the top */}
            <div className="pt-4 pb-2 px-6 z-10 bg-prussian_blue/40 backdrop-blur-sm rounded-xl border border-[#93b7be]/30">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-xl mb-4 font-geist-sans text-white font-medium">
                  Elevate your listening experience, <br />
                  online & beyond
                </p>
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <motion.span
                      key={star}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                      className="text-yellow-400"
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Image positioned lower */}
            <div className="flex-grow relative mt-4">
              <motion.div 
                className="relative h-[400px] flex items-center justify-center overflow-visible"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <ModelViewer
                  modelPath="/images/products/headset.glb"
                  scale={1.8}
                  position={[0, -0.3, 0]}
                  autoRotate={true}
                  backgroundColor="transparent"
                  className="w-full h-full scale-110"
                />
              </motion.div>

              {/* Quote overlay at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-prussian_blue/95 via-prussian_blue/80 to-transparent">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mb-6 font-geist-sans text-white font-medium text-shadow-sm"
                >
                  "Hear Better, Mix Clearly, Master Your Sound with the Sokay M-424 headphones."
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop layout - Side by side */}
        <div className="hidden md:flex flex-row gap-8 items-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-1/2 p-6 lg:p-8 bg-prussian_blue/40 backdrop-blur-sm rounded-2xl border border-[#93b7be]/30"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-[#93b7be]/20 blur-lg"
            />
            <p className="text-2xl mb-4 font-geist-sans text-white font-medium">
              Elevate your listening experience, <br />
              online & beyond
            </p>
            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star, index) => (
                <motion.span
                  key={star}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                  className="text-yellow-400"
                >
                  ★
                </motion.span>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mb-6 font-geist-sans text-white text-shadow-sm"
            >
              "Hear Better, Mix Clearly, Master Your Sound with the Sokay M-424 headphones."
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex gap-4 items-center mt-6"
            >
              <span className="text-[#93b7be] font-bold">STUDIO-GRADE</span>
              <div className="w-px h-6 bg-[#93b7be]/40"></div>
              <span className="text-[#93b7be] font-bold">PROFESSIONAL</span>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-1/2 flex justify-center relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
              className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-[#93b7be]/10 blur-xl"
            />
            <div className="relative w-full max-w-md h-[450px] overflow-visible">
              <ModelViewer
                modelPath="/images/products/headset.glb"
                scale={1.8}
                position={[0, -0.5, 0]}
                autoRotate={true}
                backgroundColor="transparent"
                className="w-full h-full scale-125"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
              className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-[#93b7be]/10 blur-xl"
            />
          </motion.div>
        </div>
      </div>
    </AuroraBackground>
  );
}
