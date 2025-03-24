"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface FlippingCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  frontClassName?: string;
  backClassName?: string;
  height?: string;
}

export function FlippingCard({
  front,
  back,
  className,
  frontClassName,
  backClassName,
  height = "h-full",
}: FlippingCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={cn(
        "perspective-1000 w-full cursor-pointer relative",
        height,
        className
      )}
      onClick={toggleFlip}
    >
      <div
        className={cn(
          "relative w-full h-full transition-all duration-500 transform-style-3d",
          isFlipped ? "rotate-y-180" : ""
        )}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front side */}
        <div
          className={cn(
            "absolute w-full h-full backface-hidden",
            frontClassName
          )}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            MozBackfaceVisibility: "hidden",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          {front}
        </div>

        {/* Back side */}
        <div
          className={cn(
            "absolute w-full h-full backface-hidden rotate-y-180",
            backClassName
          )}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            MozBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
