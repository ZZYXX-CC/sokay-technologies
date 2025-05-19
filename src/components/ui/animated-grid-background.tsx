"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimatedGridBackgroundProps {
  gridSize?: number;
  lineColor?: string;
  lineOpacity?: number;
  className?: string;
}

export function AnimatedGridBackground({
  gridSize = 40,
  lineColor = '#ffffff',
  lineOpacity = 0.15,
  className = ''
}: AnimatedGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    const drawGrid = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = lineColor;
      ctx.globalAlpha = lineOpacity;
      ctx.lineWidth = 1;

      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    resizeCanvas();
    drawGrid();

    const handleResize = () => {
      resizeCanvas();
      drawGrid();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [gridSize, lineColor, lineOpacity]);

  return (
    <motion.div
      className={`absolute inset-0 w-full h-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-100 mix-blend-soft-light"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </motion.div>
  );
}