import { Link, useLocation } from "wouter";
import { Menu, X, Shield, Server, Wifi, Radio, Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoWhite from "@assets/lacivert light logo_1763796346759.png";
import logoDark from "@assets/lacivert dark logo_1763796405911.png";

const navLinks = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "IT Hizmetleri", href: "/it-hizmetleri" },
  { name: "Siber Güvenlik", href: "/siber-guvenlik" },
  { name: "Starlink", href: "/starlink" },
  { name: "İletişim", href: "/iletisim" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      {/* Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-md shadow-md py-3 border-b border-border/10" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group relative">
            {/* 
              If scrolled (white bg), we ideally need the dark logo. 
              If not scrolled (dark bg), we use the white logo.
              Since we only have the white logo (logoWhite) for now, we use it when not scrolled.
              For scrolled state, we can fallback to text or use the white logo with filter (if needed) 
              but standard practice is waiting for the dark logo. 
              For now, I'll keep using the text/icon for scrolled state if logo is missing for that mode, 
              OR just use the white logo if the user accepts it (but white on white won't work).
              
              Let's use the Image when NOT scrolled.
              Let's use the Text/Icon when scrolled (until we get the dark logo).
            */}
            {!scrolled ? (
               <div className="relative px-4 py-2">
                  {/* Animated Border Container */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                    <rect 
                      x="0" y="0" width="100%" height="100%" 
                      rx="8" ry="8" 
                      fill="none" 
                      stroke="hsl(189, 94%, 43%)" /* Accent Cyan */
                      strokeWidth="2" 
                      className="animate-logo-border opacity-80 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                    />
                  </svg>
                  <img src={logoWhite} alt="Lacivert Teknoloji" className="h-16 object-contain relative z-10" />
               </div>
            ) : (
               <div className="relative px-4 py-2">
                 {/* Animated Border Container Dark */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                    <rect 
                      x="0" y="0" width="100%" height="100%" 
                      rx="8" ry="8" 
                      fill="none" 
                      stroke="hsl(222, 47%, 11%)" /* Primary Navy */
                      strokeWidth="2" 
                      className="animate-logo-border opacity-80"
                    />
                  </svg>
                 <img src={logoDark} alt="Lacivert Teknoloji" className="h-16 object-contain relative z-10" />
               </div>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-base font-medium transition-colors duration-200 hover:text-accent ${
                  location === link.href
                    ? "text-accent"
                    : scrolled
                    ? "text-foreground"
                    : "text-white/90"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button 
              asChild
              variant={scrolled ? "default" : "secondary"} 
              className={!scrolled ? "bg-white text-primary hover:bg-white/90" : ""}
            >
              <Link href="/iletisim">
                Teklif Al
              </Link>
            </Button>
          </nav>

          {/* Mobile Nav */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={scrolled ? "text-foreground" : "text-white"}>
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-8 mt-10">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      className={`text-xl font-medium transition-colors hover:text-accent ${
                        location === link.href ? "text-accent" : "text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Button asChild className="w-full mt-4">
                    <Link href="/iletisim">Teklif Al</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-white pt-20 pb-10 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="space-y-6">
              <Link href="/">
                <img src={logoWhite} alt="Lacivert Teknoloji" className="h-12 object-contain mb-4" />
              </Link>
              <p className="text-slate-400 leading-relaxed">
                İşletmenizin teknoloji altyapısını güvenli, hızlı ve sürdürülebilir hale getiriyoruz. 
                Denizcilikten kurumsal ofislere kadar geniş bir yelpazede profesyonel çözümler sunuyoruz.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-heading font-bold mb-6">Hızlı Bağlantılar</h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-slate-400 hover:text-accent transition-colors block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-heading font-bold mb-6">Hizmetlerimiz</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="hover:text-accent cursor-pointer transition-colors">IT Destek & Bakım</li>
                <li className="hover:text-accent cursor-pointer transition-colors">Siber Güvenlik</li>
                <li className="hover:text-accent cursor-pointer transition-colors">Starlink Kurulum</li>
                <li className="hover:text-accent cursor-pointer transition-colors">Network & Firewall</li>
                <li className="hover:text-accent cursor-pointer transition-colors">Bulut Çözümleri</li>
                <li className="hover:text-accent cursor-pointer transition-colors">Kamera Sistemleri</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-heading font-bold mb-6">İletişim</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-400">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-1" />
                  <span>Gürsel Mah. İmrahor Cad. Premier Kampüs Ofis No: 29/A Kat:6 Ofis:217<br />Kağıthane / İstanbul</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <Phone className="w-5 h-5 text-accent shrink-0" />
                  <span>0532 503 34 17</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <Mail className="w-5 h-5 text-accent shrink-0" />
                  <span>info@lacivertteknoloji.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Lacivert Teknoloji. Tüm hakları saklıdır.</p>
            <div className="flex gap-8">
              <Link href="/gizlilik-politikasi" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
              <Link href="/kullanim-sartlari" className="hover:text-white transition-colors">Kullanım Şartları</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
