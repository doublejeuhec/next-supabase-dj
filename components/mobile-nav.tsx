"use client";

import { createClient } from "@/utils/supabase/client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from "./theme-switcher";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function MobileNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Handle section scrolling when hash changes
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
    setOpen(false);

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

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5 text-primary-foreground dark:text-black" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem asChild>
          <a
            href="#about"
            className="cursor-pointer"
            onClick={(e) => navigateToSection(e, "about")}
          >
            Qui sommes-nous
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href="#previous-shows"
            className="cursor-pointer"
            onClick={(e) => navigateToSection(e, "previous-shows")}
          >
            Nos spectacles
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/promos">Découvrir la troupe</Link>
        </DropdownMenuItem>

        {isLoggedIn && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/promos">Voir les cocos</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/protected/profile">Mon profil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              Se déconnecter
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />
        <div className="flex justify-center py-2">
          <ThemeSwitcher />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
