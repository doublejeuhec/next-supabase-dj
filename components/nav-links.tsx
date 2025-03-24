"use client";

import Link from "next/link";

export function NavLinks() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <a
        href="#about"
        className="text-primary-foreground hover:opacity-80 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("about");
        }}
      >
        Qui sommes-nous
      </a>
      <a
        href="#previous-shows"
        className="text-primary-foreground hover:opacity-80 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("previous-shows");
        }}
      >
        Nos spectacles
      </a>
      <Link href="/promos" className="text-primary-foreground hover:opacity-80">
        Découvrir la troupe
      </Link>
    </div>
  );
}
