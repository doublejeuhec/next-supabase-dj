import { EnvVarWarning } from "@/components/env-var-warning";
import Footer from "@/components/footer";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { ThemeProvider } from "next-themes";
import { Geist, Oswald } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Double Jeu",
  description: "La troupe de théâtre d'HEC Paris",
  viewport: "width=device-width, initial-scale=1",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

const oswald = Oswald({
  display: "swap",
  subsets: ["latin"],
  weight: ["700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col">
            <div className="flex-1 w-full flex flex-col">
              <nav className="w-full border-b border-border h-16 dark:bg-white bg-brand-red">
                <div className="w-full mx-auto flex justify-between items-center p-3 text-sm">
                  <div className="flex gap-5 items-end font-semibold">
                    <Link
                      href={"/"}
                      className="flex items-end gap-4 hover:opacity-80"
                    >
                      <span
                        className={`${oswald.className} text-4xl tracking-wide dark:text-black text-primary-foreground`}
                      >
                        DOUBLE JEU
                      </span>
                    </Link>
                  </div>
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>
              <div className="w-full">{children}</div>

              <Footer />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
