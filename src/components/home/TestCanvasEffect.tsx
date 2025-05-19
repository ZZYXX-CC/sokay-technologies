"use client";

import React, { useState, useEffect } from 'react';
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export default function TestCanvasEffect() {
  // Use state to force re-render after component mounts
  const [mounted, setMounted] = useState(false);

  // Force a re-render after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative min-h-[600px] py-16 bg-black overflow-hidden"
      id="test"
      style={{
        position: 'relative',
        border: '4px solid red', // Add a visible border for debugging
        margin: '20px 0'
      }}
    >
      {/* Use a div with absolute position to ensure the canvas is visible */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      >
        {mounted && (
          <CanvasRevealEffect
            animationSpeed={1.0}
            containerClassName="bg-black"
            colors={[
              [255, 0, 0], // Red (bright color for testing)
              [0, 255, 0]  // Green (bright color for testing)
            ]}
            opacities={[0.5, 0.5, 0.5, 0.7, 0.7, 0.7, 0.9, 0.9, 0.9, 1.0]}
            dotSize={15} // Even larger dots for better visibility
            showGradient={false}
          />
        )}
      </div>

      {/* Content with higher z-index */}
      <div
        className="container relative mx-auto px-4"
        style={{ position: 'relative', zIndex: 10 }}
      >
        <h2 className="text-3xl font-bold text-white text-center mb-8 pt-8">
          Canvas Reveal Effect Test
        </h2>
        <p className="text-white text-center max-w-2xl mx-auto mb-4">
          This is a test component to verify that the CanvasRevealEffect is working properly.
          You should see a dot matrix animation with red and green dots.
        </p>
        <p className="text-white text-center max-w-2xl mx-auto">
          Status: {mounted ? 'Canvas Mounted ✅' : 'Canvas Loading...'}
        </p>
      </div>
    </section>
  );
}
