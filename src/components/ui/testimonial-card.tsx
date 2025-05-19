"use client";

import * as React from 'react';
import { motion } from 'framer-motion';

export function TestimonialCard({
  handleShuffle,
  testimonial,
  position,
  id,
  author
}: {
  handleShuffle: () => void;
  testimonial: string;
  position: "front" | "middle" | "back";
  id: number;
  author: string;
}) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? "2" : position === "middle" ? "1" : "0"
      }}
      animate={{
        rotate: position === "front" ? "-3deg" : position === "middle" ? "0deg" : "3deg",
        x: position === "front" ? "0%" : position === "middle" ? "12%" : "24%",
        scale: position === "front" ? 1 : position === "middle" ? 0.95 : 0.9,
        opacity: position === "front" ? 1 : position === "middle" ? 0.8 : 0.6
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      onDragStart={(e, info) => {
        // Store the initial position for both mouse and touch events
        dragRef.current = info.point.x;
      }}
      onDragEnd={(e, info) => {
        // Calculate the drag distance and trigger shuffle if swiped left
        const dragDistance = dragRef.current - info.point.x;
        if (dragDistance > 100) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 grid h-[400px] w-[320px] select-none place-content-center space-y-6 rounded-2xl border border-light_blue/30 dark:border-light_blue/20 bg-gray-100/90 dark:bg-slate-800/90 p-6 shadow-xl backdrop-blur-md ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <span className="text-center text-xl italic text-prussian_blue dark:text-slate-300">"{testimonial}"</span>
      <span className="text-center text-sm font-medium text-light_blue dark:text-light_blue">{author}</span>
    </motion.div>
  );
}
