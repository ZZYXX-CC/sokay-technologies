"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode, memo } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  blendMode?: string;
  opacity?: number;
  extendBehindHeader?: boolean;
  backgroundImage?: string;
}

// Memoize the component to prevent unnecessary re-renders
export const AuroraBackground = memo(function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  blendMode = "multiply",
  opacity = 0.85,
  extendBehindHeader = false,
  backgroundImage,
  ...props
}: AuroraBackgroundProps) {
  // Precompute the class names to avoid recalculation on re-renders
  const sectionClassName = cn(
    "w-full relative",
    extendBehindHeader && "mt-[-8rem] pt-[6rem] md:mt-[-9rem] md:pt-[7rem] lg:pt-[8rem]"
  );

  const containerClassName = cn(
    "relative flex flex-col w-full items-center justify-center",
    className
  );

  const auroraClassName = cn(
    `
    [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
    [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
    [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
    [background-image:var(--white-gradient),var(--aurora)]
    dark:[background-image:var(--dark-gradient),var(--aurora)]
    [background-size:300%,_200%]
    [background-position:50%_50%,50%_50%]
    filter blur-[10px] invert dark:invert-0
    after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)]
    after:dark:[background-image:var(--dark-gradient),var(--aurora)]
    after:[background-size:200%,_100%]
    after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
    pointer-events-none
    absolute inset-0 w-full h-full will-change-transform`,
    showRadialGradient &&
      `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
  );

  return (
    <section className={sectionClassName}>
      <div className={containerClassName} {...props}>
        {backgroundImage && (
          <div
            className="absolute inset-0 w-full h-full overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              zIndex: 0
            }}
          />
        )}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ mixBlendMode: blendMode }}
        >
          <div
            className={auroraClassName}
            style={{ opacity }}
          ></div>
        </div>
        <div className="relative z-10 w-full">
          {children}
        </div>
      </div>
    </section>
  );
});
