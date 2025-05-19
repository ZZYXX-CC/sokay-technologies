"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { Squares } from "@/components/ui/squares-background";
import { FlickeringBackground } from "@/components/ui/flickering-background";
import { ChevronLeft, ChevronRight } from "lucide-react";
// Real testimonials from Sokay Technologies
const testimonials = [
  {
    id: 1,
    testimonial: "Top-notch sound quality! The Sokay A1 microphone captures every nuance of my vocals with incredible clarity. It's become an essential part of my recording setup.",
    author: "David Chen - Studio Producer"
  },
  {
    id: 2,
    testimonial: "Great value! I've used microphones that cost three times as much but don't deliver the warm, natural sound that my Sokay A1 provides. Perfect for my podcast studio.",
    author: "Sarah Williams - Podcast Host"
  },
  {
    id: 3,
    testimonial: "Highly recommended! The Sokay CS-22 interface paired with the A1 microphone has completely transformed my home studio. Professional quality at an accessible price.",
    author: "Michael Okonkwo - Sound Engineer"
  },
  {
    id: 4,
    testimonial: "The Sokay M-424 headphones are a game-changer for mixing. The accurate frequency response and detailed soundstage let me hear every nuance in my mixes. Perfect for studio work and audiophile listening.",
    author: "Jennifer Lee - Mastering Engineer"
  }
];

// Export as both named and default export for compatibility with dynamic imports
export function ShuffleTestimonials() {
  const [positions, setPositions] = useState<Array<"front" | "middle" | "back">>(["front", "middle", "back"]);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle shuffle of testimonials
  const handleShuffle = () => {
    const newPositions = [...positions];
    const lastPosition = newPositions.pop();
    if (lastPosition) {
      newPositions.unshift(lastPosition);
      setPositions(newPositions as Array<"front" | "middle" | "back">);
      setCurrentIndex((currentIndex + 1) % testimonials.length);
    }
  };

  // Handle shuffle backward
  const handleShuffleBackward = () => {
    const newPositions = [...positions];
    const firstPosition = newPositions.shift();
    if (firstPosition) {
      newPositions.push(firstPosition);
      setPositions(newPositions as Array<"front" | "middle" | "back">);
      setCurrentIndex((currentIndex - 1 + testimonials.length) % testimonials.length);
    }
  };

  // Handle touch events for swiping on the whole container
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    
    if (distance > 70) {
      // Swipe left
      handleShuffle();
    } else if (distance < -70) {
      // Swipe right
      handleShuffleBackward();
    }
    
    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Auto shuffle timer for better UX
  useEffect(() => {
    // Auto shuffle every 8 seconds
    const timer = setInterval(() => {
      handleShuffle();
    }, 8000);
    
    return () => clearInterval(timer);
  }, [positions]); // Add dependencies so timer resets after manual shuffle

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-90">
        <Squares
          direction="diagonal"
          speed={0.3}
          squareSize={50}
          borderColor="#26527d"
          hoverFillColor="#93b7be"
          className="bg-background"
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
      <div className="container relative z-10 px-4 mx-auto">
        {/* Testimonials header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-prussian_blue dark:text-light_blue uppercase bg-gray-100/90 dark:bg-gray-900/90 rounded-full border border-light_blue/30 dark:border-light_blue/20 mb-4 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Latest Reviews
          </motion.span>
          <motion.h2
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-prussian_blue dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Your Sound <span className="text-light_blue dark:text-light_blue">Journey</span> Starts Here
          </motion.h2>
          <motion.p
            className="text-lg text-prussian_blue/80 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join the community of audio professionals who trust Sokay Technologies for their studio needs
          </motion.p>
        </div>

        {/* Interactive testimonial cards */}
        <div className="w-full mb-8 overflow-visible py-8">
          <div 
            className="max-w-[1000px] mx-auto relative px-4 md:px-8"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Navigation buttons */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-2 sm:px-4 z-10">
              <button 
                onClick={handleShuffleBackward}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-100/90 dark:bg-gray-900/90 rounded-full text-light_blue hover:text-white hover:bg-light_blue-500 transition-colors shadow-lg"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={handleShuffle}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-100/90 dark:bg-gray-900/90 rounded-full text-light_blue hover:text-white hover:bg-light_blue-500 transition-colors shadow-lg"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            <div className="relative h-[400px] w-full max-w-[320px] mx-auto overflow-visible">
              {testimonials.map((testimonial, index) => {
                // Ensure position is defined and is one of the allowed values
                const position = positions[index % 3] || "front";
                return (
                  <TestimonialCard
                    key={testimonial.id}
                    {...testimonial}
                    handleShuffle={handleShuffle}
                    position={position}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mb-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                // Calculate how many shuffles are needed to reach this testimonial
                const shufflesNeeded = (index - currentIndex + testimonials.length) % testimonials.length;
                // Apply shuffles
                for (let i = 0; i < shufflesNeeded; i++) {
                  handleShuffle();
                }
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex 
                  ? "bg-light_blue-500 w-6" 
                  : "bg-light_blue-300/40 hover:bg-light_blue-300/60"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Swipe instruction */}
        <motion.p
          className="text-center text-sm text-prussian_blue/60 dark:text-light_blue/70 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Swipe left or right to navigate testimonials
        </motion.p>
      </div>
    </section>
  );
}

// Add default export for dynamic import compatibility
export default ShuffleTestimonials;
