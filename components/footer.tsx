"use client";

import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">
              Troupe DOUBLE JEU
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Mail className="h-4 w-4" />
              <a
                href="mailto:association.doublejeu@hec.edu"
                className="hover:text-brand-red"
              >
                association.doublejeu@hec.edu
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com/profile.php?id=100006847185958"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-brand-red"
            >
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/doublejeu_hec"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-brand-red"
            >
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/company/52164175"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-brand-red"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>

        <div className="flex justify-center pt-6 border-t border-border mt-6">
          <div className="text-muted-foreground text-sm">
            © {currentYear} Troupe de Théâtre DOUBLE JEU
            <span className="mx-2">•</span>
            <Link
              href="/sign-up"
              className="text-muted-foreground hover:text-brand-red text-xs"
            >
              Connexion
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
