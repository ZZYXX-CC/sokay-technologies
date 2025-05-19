"use client"

import { forwardRef, useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { TextRotateRef } from "./text-rotate"
import { cn } from "@/lib/utils"

interface TextRotateWithEmojiProps {
  texts: string[]
  rotationInterval?: number
  mainClassName?: string
  elementLevelClassName?: string
  staggerDuration?: number
  staggerFrom?: "first" | "last" | "center" | number | "random"
}

const TextRotateWithEmoji = forwardRef<TextRotateRef, TextRotateWithEmojiProps>(
  (
    {
      texts,
      rotationInterval = 3000,
      mainClassName,
      elementLevelClassName,
      staggerDuration = 0.03,
      staggerFrom = "last",
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Function to split text and emoji
    const splitTextAndEmoji = (text: string) => {
      // Match any emoji at the end of the string
      const match = text.match(/^(.*?)(\s*[\p{Emoji}\u{FE0F}\u{1F3FB}-\u{1F3FF}]+\s*)$/u);
      if (match) {
        return {
          text: match[1].trim(),
          emoji: match[2].trim()
        };
      }
      return { text, emoji: "" };
    };

    // Process all texts to separate text and emoji
    const processedTexts = texts.map(splitTextAndEmoji);

    // Rotation effect
    useEffect(() => {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % texts.length);
          setIsAnimating(false);
        }, 300); // Match this with animation duration
      }, rotationInterval);

      return () => clearInterval(interval);
    }, [rotationInterval, texts.length]);

    // Split the current text into characters for animation
    const currentItem = processedTexts[currentIndex];
    const characters = Array.from(currentItem.text);

    return (
      <div className={cn("flex items-center whitespace-nowrap", mainClassName)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {characters.map((char, i) => (
              <motion.span
                key={`${currentIndex}-${i}`}
                className={cn("inline-block", elementLevelClassName)}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                  delay: staggerFrom === "first"
                    ? i * staggerDuration
                    : (characters.length - 1 - i) * staggerDuration
                }}
              >
                {char}
              </motion.span>
            ))}

            {/* Emoji part */}
            {currentItem.emoji && (
              <motion.span
                className={cn("inline-block ml-1", elementLevelClassName)}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
              >
                {currentItem.emoji}
              </motion.span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
);

TextRotateWithEmoji.displayName = "TextRotateWithEmoji";

export { TextRotateWithEmoji };
