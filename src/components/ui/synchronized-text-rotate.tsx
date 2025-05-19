"use client"

import { useState, useEffect, useRef } from "react"
import { TextRotate } from "./text-rotate"

interface SynchronizedTextRotateProps {
  textItems: string[]
  emojiItems: string[]
  rotationInterval?: number
  textClassName?: string
  emojiClassName?: string
  staggerDuration?: number
  staggerFrom?: "first" | "last" | "center" | number | "random"
}

export function SynchronizedTextRotate({
  textItems,
  emojiItems,
  rotationInterval = 3000,
  textClassName,
  emojiClassName,
  staggerDuration = 0.03,
  staggerFrom = "last",
}: SynchronizedTextRotateProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRotateRef = useRef(null);
  const emojiRotateRef = useRef(null);

  // Ensure we have matching arrays
  const safeEmojiItems = emojiItems.length === textItems.length 
    ? emojiItems 
    : Array(textItems.length).fill(emojiItems[0] || "✨");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % textItems.length);
    }, rotationInterval);
    
    return () => clearInterval(interval);
  }, [rotationInterval, textItems.length]);

  // When index changes, update both components
  useEffect(() => {
    if (textRotateRef.current && emojiRotateRef.current) {
      // Force both components to show the same index
      textRotateRef.current.jumpTo(currentIndex);
      emojiRotateRef.current.jumpTo(currentIndex);
    }
  }, [currentIndex]);

  return (
    <>
      <TextRotate
        ref={emojiRotateRef}
        texts={safeEmojiItems}
        mainClassName={emojiClassName}
        rotationInterval={rotationInterval}
        staggerDuration={0}
        auto={false} // We'll control this manually
      />
      
      <TextRotate
        ref={textRotateRef}
        texts={textItems}
        mainClassName={textClassName}
        elementLevelClassName="font-geist-sans"
        staggerDuration={staggerDuration}
        staggerFrom={staggerFrom}
        rotationInterval={rotationInterval}
        auto={false} // We'll control this manually
      />
    </>
  );
}
