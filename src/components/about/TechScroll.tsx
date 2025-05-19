"use client";

import { TiltedScroll } from "@/components/ui/tilted-scroll";

interface TechItem {
  id: string;
  text: string;
  description: string;
}

export function TechScroll() {
  const techItems: TechItem[] = [
    {
      id: "1",
      text: "Advanced DSP",
      description: "Our digital signal processing technology ensures pristine audio quality in any environment."
    },
    {
      id: "2",
      text: "Low Latency",
      description: "Experience real-time audio processing with industry-leading low latency performance."
    },
    {
      id: "3",
      text: "High Resolution",
      description: "Capture every detail with our high-resolution audio conversion technology."
    },
    {
      id: "4",
      text: "Precision Engineering",
      description: "Meticulously designed hardware for reliability and exceptional performance."
    },
    {
      id: "5",
      text: "Intuitive Controls",
      description: "User-friendly interfaces that put professional audio tools at your fingertips."
    },
    {
      id: "6",
      text: "Studio Quality",
      description: "Professional-grade components that meet the demands of recording studios worldwide."
    },
    {
      id: "7",
      text: "Noise Cancellation",
      description: "Advanced algorithms that eliminate unwanted background noise for crystal-clear recordings."
    },
    {
      id: "8",
      text: "Wireless Technology",
      description: "Seamless connectivity options that free you from the constraints of cables."
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <TiltedScroll
        items={techItems}
        className="w-full max-w-md mx-auto"
        showDescriptions={true}
      />
    </div>
  );
}
