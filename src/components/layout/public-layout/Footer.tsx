import { Link } from "react-router-dom";
import { FaFacebookF, FaXTwitter, FaWhatsapp, FaInstagram } from "react-icons/fa6";
import { Logo } from "@/components/ui/Logo";

const socials = [
  { label: "Facebook", Icon: FaFacebookF },
  { label: "X (Twitter)", Icon: FaXTwitter },
  { label: "WhatsApp", Icon: FaWhatsapp },
  { label: "Instagram", Icon: FaInstagram },
];

const footLink = "text-fg-muted hover:text-brand font-medium transition-colors";

export function Footer() {
  return (
    <footer className="bg-surface-card border-t border-line pt-12 pb-8 sm:pt-16 sm:pb-12 text-fg-muted transition-colors duration-300">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 sm:mb-16">
          <div className="sm:col-span-2 space-y-4 max-w-md">
            <Link to="/" className="inline-flex items-center gap-3 group" aria-label="Roomora home">
              <Logo className="h-14 transition-transform duration-300 group-hover:scale-105" />
              <span className="text-2xl sm:text-3xl font-bold text-fg-strong tracking-tight">Roomora</span>
            </Link>
            <p className="text-sm leading-relaxed text-fg-muted">
              Smart Hotel Operations & Management System. Streamline your operations and elevate guest experience from one unified platform.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socials.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="h-10 w-10 rounded-full bg-chip flex items-center justify-center text-fg-muted hover:text-primary-950 hover:bg-accent-500 transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-fg-strong font-semibold text-base mb-4 sm:mb-5">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/#features" className={footLink}>Features</Link></li>
              <li><Link to="/#how-it-works" className={footLink}>How It Works</Link></li>
              <li><Link to="/#pricing" className={footLink}>Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-fg-strong font-semibold text-base mb-4 sm:mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className={footLink}>About Us</Link></li>
              <li><Link to="/contact" className={footLink}>Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-line flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-fg-muted">
          <p>© 2026 Roomora. All rights reserved.</p>
          <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2" aria-label="Legal">
            <Link to="/privacy" className="hover:text-brand transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand transition-colors">Terms of Service</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
