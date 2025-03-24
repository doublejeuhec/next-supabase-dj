"use client";

import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { PiFlowerLotusThin } from "react-icons/pi";

const TestimonialSection = () => {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const [decorations, setDecorations] = useState<
    Array<{
      id: number;
      left: string;
      top: string;
      delay: string;
      rotate: string;
      scale: string;
      isStar: boolean;
      size: number;
    }>
  >([]);

  // Generate decorative elements after mount to avoid hydration errors
  useEffect(() => {
    const newDecorations = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      rotate: `${Math.random() * 360}deg`,
      scale: `${0.5 + Math.random()}`,
      isStar: Math.random() > 0.5,
      size: Math.random() * 20 + 10,
    }));
    setDecorations(newDecorations);
  }, []);

  useEffect(() => {
    const topRow = topRowRef.current;
    const bottomRow = bottomRowRef.current;
    if (!topRow || !bottomRow) return;

    // Clone nodes for infinite scroll effect
    const cloneTopRowContent = () => {
      const items = Array.from(topRow.children);
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        topRow.appendChild(clone);
      });
    };

    const cloneBottomRowContent = () => {
      const items = Array.from(bottomRow.children);
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        bottomRow.appendChild(clone);
      });
    };

    cloneTopRowContent();
    cloneBottomRowContent();

    // Animation parameters
    let topPosition = 0;
    let bottomPosition = 0;
    let topLastTimestamp = 0;
    let bottomLastTimestamp = 0;
    const topSpeed = 0.05; // pixels per millisecond
    const bottomSpeed = 0.04; // pixels per millisecond

    // Separate animation functions for clearer logic
    const animateTopRow = (timestamp: number) => {
      if (!topLastTimestamp) {
        topLastTimestamp = timestamp;
      }

      const elapsed = timestamp - topLastTimestamp;
      topLastTimestamp = timestamp;

      // Top row moves right to left (standard direction)
      topPosition += topSpeed * elapsed;
      if (topPosition >= topRow.scrollWidth / 2) {
        topPosition = 0;
      }
      topRow.style.transform = `translateX(-${topPosition}px)`;

      requestAnimationFrame(animateTopRow);
    };

    const animateBottomRow = (timestamp: number) => {
      if (!bottomLastTimestamp) {
        bottomLastTimestamp = timestamp;
      }

      const elapsed = timestamp - bottomLastTimestamp;
      bottomLastTimestamp = timestamp;

      // Bottom row moves left to right (reverse direction)
      bottomPosition += bottomSpeed * elapsed;

      // Set initial position to negative scrollWidth/2 so items start off-screen to the left
      if (bottomPosition === 0) {
        bottomPosition = -bottomRow.scrollWidth / 2;
      }

      // Reset position when we've scrolled completely through
      if (bottomPosition >= 0) {
        bottomPosition = -bottomRow.scrollWidth / 2;
      }

      bottomRow.style.transform = `translateX(${bottomPosition}px)`;

      requestAnimationFrame(animateBottomRow);
    };

    // Start both animations
    const topAnimId = requestAnimationFrame(animateTopRow);
    const bottomAnimId = requestAnimationFrame(animateBottomRow);

    return () => {
      cancelAnimationFrame(topAnimId);
      cancelAnimationFrame(bottomAnimId);
    };
  }, []);

  // Split testimonials into two rows
  const firstHalf = testimonials.slice(0, testimonials.length / 2);
  const secondHalf = testimonials.slice(testimonials.length / 2).reverse(); // Reverse for better visual effect

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {decorations.map((item) => (
          <div
            key={item.id}
            className="absolute text-brand-red/20 animate-float"
            style={{
              left: item.left,
              top: item.top,
              animationDelay: item.delay,
              transform: `rotate(${item.rotate}) scale(${item.scale})`,
            }}
          >
            {item.isStar ? (
              <FaStar size={item.size} />
            ) : (
              <PiFlowerLotusThin size={item.size} />
            )}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Ce qu'ils disent de nous
          </h2>
        </div>

        {/* First row - moves right to left */}
        <div className="overflow-hidden pb-6 mx-auto">
          <div
            ref={topRowRef}
            className="flex space-x-6"
            style={{ willChange: "transform" }}
          >
            {firstHalf.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-border min-w-[280px] max-w-[280px] relative"
              >
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 text-brand-red">
                  <FaStar size={20} />
                </div>
                <div className="absolute -bottom-2 -left-2 text-brand-red">
                  <PiFlowerLotusThin size={24} />
                </div>

                <div className="flex items-center mb-3">
                  <div>
                    <h3 className="font-bold text-foreground text-sm">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.show}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground italic text-sm">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Second row - moves left to right */}
        <div className="overflow-hidden pb-8 mx-auto">
          <div
            ref={bottomRowRef}
            className="flex space-x-6"
            style={{ willChange: "transform" }}
          >
            {secondHalf.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-border min-w-[280px] max-w-[280px] relative"
              >
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 text-brand-red">
                  <FaStar size={20} />
                </div>
                <div className="absolute -bottom-2 -left-2 text-brand-red">
                  <PiFlowerLotusThin size={24} />
                </div>

                <div className="flex items-center mb-3">
                  <div>
                    <h3 className="font-bold text-foreground text-sm">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.show}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground italic text-sm">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const testimonials = [
  {
    name: "Alexis Maquet",
    show: "A vu Un fil à la patte",
    quote: "Un spectacle qui m'a tenu en haleine du début à la fin !",
  },
  {
    name: "Charles-Mathis Verbist",
    show: "A vu Le songe d'une nuit d'été",
    quote: "Impressionné par le talent de ces étudiants, à voir absolument.",
  },
  {
    name: "Emma Velé",
    show: "A vu Hortense a dit j'mens fous",
    quote: "Une mise en scène audacieuse qui fonctionne parfaitement.",
  },
  {
    name: "Lise Le Floch",
    show: "A vu Un fil à la patte",
    quote: "J'ai ri, j'ai pleuré, je reviendrai l'année prochaine !",
  },
  {
    name: "Gabriel Engel",
    show: "A vu Hortense a dit j'mens fous",
    quote: "Double Jeu nous offre encore une fois un moment de pur théâtre.",
  },
  {
    name: "Luce Faget",
    show: "A vu Le songe d'une nuit d'été",
    quote: "Quelle énergie sur scène ! Bravo à toute la troupe.",
  },
  {
    name: "Arnault Mirante",
    show: "A vu Un fil à la patte",
    quote: "Des textes intelligents servis par de jeunes talents prometteurs.",
  },
  {
    name: "Raoul Croonenberghs",
    show: "A vu Le songe d'une nuit d'été",
    quote:
      "Une pièce qui démontre tout le potentiel créatif des étudiants HEC.",
  },
  {
    name: "Marie Lambert",
    show: "A vu Hortense a dit j'mens fous",
    quote:
      "Un moment magique qui fait oublier qu'on est dans un théâtre étudiant.",
  },
  {
    name: "Thomas Renard",
    show: "A vu Un fil à la patte",
    quote: "Double Jeu continue de surprendre et d'émerveiller chaque année.",
  },
];

export default TestimonialSection;
