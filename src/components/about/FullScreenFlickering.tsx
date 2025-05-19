"use client";

import React, { useEffect, useState } from 'react';
import { FlickeringBackground } from '@/components/ui/flickering-background';

interface FullScreenFlickeringProps {
  color?: string;
  maxOpacity?: number;
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  className?: string;
}

export default function FullScreenFlickering({
  color = "#93b7be",
  maxOpacity = 0.9,
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.18,
  className = ""
}: FullScreenFlickeringProps) {
  const [responsiveValues, setResponsiveValues] = useState({
    squareSize: squareSize,
    gridGap: gridGap
  });

  useEffect(() => {
    const handleResize = () => {
      // Adjust values based on screen width
      if (window.innerWidth >= 1440) {
        // For large desktop screens, use larger dots with more spacing
        setResponsiveValues({
          squareSize: squareSize + 2, // Larger squares for desktop
          gridGap: gridGap + 3        // More spacing between squares
        });
      } else if (window.innerWidth >= 1024) {
        // For desktop screens
        setResponsiveValues({
          squareSize: squareSize + 1, // Slightly larger squares
          gridGap: gridGap + 2        // More spacing
        });
      } else if (window.innerWidth >= 768) {
        // For tablet screens
        setResponsiveValues({
          squareSize: squareSize,
          gridGap: gridGap + 1
        });
      } else {
        // For mobile screens
        setResponsiveValues({
          squareSize: squareSize - 1,
          gridGap: gridGap
        });
      }
    };

    // Initial call
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [squareSize, gridGap]);

  return (
    <div
      className={`absolute inset-0 w-full h-full z-0 mix-blend-screen ${className}`}
      style={{
        position: 'absolute',
        top: '-150px',
        left: '-150px',
        right: '-150px',
        bottom: '-150px',
        width: 'calc(100% + 300px)',
        height: 'calc(100% + 300px)',
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <div className="w-full h-full relative">
        {/* Gradient overlay for fade effect */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at bottom left, transparent 10%, rgba(0,0,0,0.9) 70%)',
            mixBlendMode: 'overlay'
          }}
        />
        <FlickeringBackground
          className="w-full h-full"
          squareSize={responsiveValues.squareSize}
          gridGap={responsiveValues.gridGap}
          flickerChance={flickerChance}
          color={color}
          maxOpacity={maxOpacity}
        />
      </div>
    </div>
  );
}
