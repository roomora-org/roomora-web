"use client";

import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/ui/Logo";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // "#features" only exists on the home page; elsewhere point to "/#features"
  const resolveHref = (href: string) => (href.startsWith("#") && !isHome ? `/${href}` : href);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHome && href.startsWith("#")) {
      e.preventDefault();
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  const renderLink = (link: (typeof navLinks)[number], mobile = false) => {
    const isActive = !link.href.startsWith("#") && location.pathname === link.href;
    const className = mobile
      ? `text-base font-medium py-2 border-b border-line transition-colors hover:text-brand ${
          isActive ? "text-brand" : "text-fg"
        }`
      : `text-sm font-medium transition-colors relative group hover:text-brand ${
          isActive ? "text-brand" : "text-fg-muted"
        }`;

    const content = (
      <>
        {link.name}
        {!mobile && (
          <span
            className={`absolute -bottom-1.5 left-0 h-0.5 bg-accent-500 transition-all duration-300 ${
              isActive ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        )}
      </>
    );

    if (!link.href.startsWith("#")) {
      return (
        <Link key={link.name} to={link.href} className={className} aria-current={isActive ? "page" : undefined}>
          {content}
        </Link>
      );
    }
    return (
      <a
        key={link.name}
        href={resolveHref(link.href)}
        onClick={(e) => handleLinkClick(e, link.href)}
        className={className}
      >
        {content}
      </a>
    );
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-surface-glass backdrop-blur-lg border-b border-line shadow-sm py-3"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group z-50" aria-label="Roomora home">
          <Logo className="h-10" />
          <span className="text-2xl font-bold text-fg-strong tracking-tight">Roomora</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main">
          {navLinks.map((link) => renderLink(link))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="accent" size="sm" className="hover:-translate-y-0.5">Get Started</Button>
          </Link>
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          className="md:hidden z-50 p-2 -mr-2 text-fg-muted hover:text-brand transition-colors"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full max-h-[calc(100vh-4rem)] overflow-y-auto bg-surface border-b border-line shadow-xl md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => renderLink(link, true))}
              <div className="flex items-center justify-between mt-4">
                <ThemeToggle />
                <div className="flex gap-3">
                  <Link to="/login">
                    <Button variant="outline" size="sm">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="accent" size="sm">Get Started</Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
