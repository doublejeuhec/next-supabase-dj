"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CarouselProps {
  images: string[];
  interval?: number;
  className?: string;
  imageClassName?: string;
}

export function Carousel({
  images,
  interval = 3000,
  className,
  imageClassName,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      next();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, interval, isAutoPlaying, images.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Prevent the click from reaching the card and triggering a flip
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!images.length) return null;

  return (
    <div
      className={cn("relative w-full h-full group", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleContainerClick}
    >
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        {images.map((src, index) => (
          <div
            key={src}
            className={cn(
              "absolute inset-0 w-full h-full transition-opacity duration-500",
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <Image
              src={src}
              alt={`Carousel image ${index + 1}`}
              fill
              className={cn("object-cover", imageClassName)}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation controls - only shown on hover */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Previous image"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Next image"
      >
        <ChevronRight size={20} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex
                ? "bg-white w-4"
                : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
