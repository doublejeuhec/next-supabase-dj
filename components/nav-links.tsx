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
          // Add a delay for the router to complete navigation
          setTimeout(() => {
            // Get header height to offset scroll position
            const headerHeight =
              document.querySelector("nav")?.offsetHeight || 0;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.scrollY - headerHeight;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }, 100);
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
      return;
    }

    // If on homepage, scroll to section
    const element = document.getElementById(id);
    if (element) {
      // Get header height to offset scroll position
      const headerHeight = document.querySelector("nav")?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex gap-10 items-center">
      <a
        href="#about"
        className="text-primary-foreground dark:text-black hover:underline cursor-pointer text-base font-semibold"
        onClick={(e) => navigateToSection(e, "about")}
      >
        Qui sommes-nous
      </a>
      <a
        href="#previous-shows"
        className="text-primary-foreground dark:text-black hover:underline cursor-pointer text-base font-semibold"
        onClick={(e) => navigateToSection(e, "previous-shows")}
      >
        Nos spectacles
      </a>
      <Link
        href="/promos"
        className="text-primary-foreground dark:text-black hover:underline text-base font-semibold"
      >
        Découvrir la troupe
      </Link>
    </div>
  );
}
