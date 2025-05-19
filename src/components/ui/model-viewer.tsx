"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ModelViewerProps {
  modelPath: string;
  className?: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
  backgroundColor?: string;
}

// This is a simplified version that uses an image as a fallback
// until we can properly set up the 3D model rendering
export default function ModelViewer({
  modelPath,
  className = "",
  backgroundColor = "transparent"
}: ModelViewerProps) {
  // For now, we'll use a static image as a fallback
  // In a real implementation, we would use the 3D model
  return (
    <motion.div
      className={`w-full h-full flex items-center justify-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor }}
    >
      <Image
        src="/images/products/headset.png"
        alt="Sokay Headset"
        width={600}
        height={600}
        className="object-contain mx-auto w-auto h-auto max-w-[120%] max-h-[120%]"
        priority
      />
    </motion.div>
  );
}
