import { Link, useLocation } from "wouter";
import { Wifi, ShoppingCart } from "lucide-react";
import generatedLogo from "@assets/generated_images/fiberasinet_logo_modern_minimalist.png";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/">
            <a className="flex items-center gap-2 font-display font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
              <img src={generatedLogo} alt="Fiberasinet" className="h-8 w-8 rounded-lg" />
              <span>Fiberasinet</span>
            </a>
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link href="/checkout">
              <a className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                location === '/checkout' 
                  ? 'bg-primary/10 text-primary' 
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}>
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Beli Voucher</span>
              </a>
            </Link>
            <a 
              href="/hotspot/login.html" 
              className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <Wifi className="h-4 w-4" />
              <span className="hidden sm:inline">Login Hotspot</span>
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1 container px-4 py-8 md:py-12 mx-auto max-w-5xl">
        {children}
      </main>
      <footer className="border-t border-border/40 py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 text-sm text-muted-foreground">
          <p>© 2024 Fiberasinet. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
