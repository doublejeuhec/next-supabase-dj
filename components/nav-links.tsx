"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function NavLinks() {
  const pathname = usePathname();
  const router = useRouter();

  // Handle navigating to section when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 0);
        }
      }
    };

    // Run on initial load if there's a hash in URL
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();

    // If not on homepage, navigate to homepage with hash
    if (pathname !== "/") {
      router.push(`/#${id}`);
    } else {
      // If already on homepage, scroll to section
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <a
        href="#about"
        className="text-primary-foreground hover:opacity-80 cursor-pointer"
        onClick={(e) => navigateToSection(e, "about")}
      >
        Qui sommes-nous
      </a>
      <a
        href="#previous-shows"
        className="text-primary-foreground hover:opacity-80 cursor-pointer"
        onClick={(e) => navigateToSection(e, "previous-shows")}
      >
        Nos spectacles
      </a>
      <Link href="/promos" className="text-primary-foreground hover:opacity-80">
        Découvrir la troupe
      </Link>
    </div>
  );
}
