import { Link, useLocation } from "wouter";
import { Menu, X, Shield, Server, Wifi, Radio, Mail, Phone, MapPin, Linkedin, Instagram, Facebook, ChevronDown, Globe, Satellite } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import logoWhite from "@assets/lacivert light logo_1763796346759.png";
import logoDark from "@assets/lacivert dark logo_1763796405911.png";

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
          scrolled ? "bg-slate-950/95 backdrop-blur-md shadow-md border-b border-white/10" : "bg-transparent"
        }`}
      >
        {/* Info Box (Top Bar) */}
        <div className={`w-full border-b border-white/10 bg-slate-950/50 backdrop-blur-sm transition-all duration-300 ${scrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-10'}`}>
            <div className="container mx-auto px-4 h-full flex justify-between items-center text-xs text-slate-400">
                <div className="flex items-center gap-6">
                    <a href="mailto:info@lacivertteknoloji.com" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                        <Mail className="w-3 h-3" /> info@lacivertteknoloji.com
                    </a>
                    <a href="tel:05325033417" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                        <Phone className="w-3 h-3" /> 0532 503 34 17
                    </a>
                </div>
                <div className="flex items-center gap-4">
                     <a href="#" className="hover:text-white transition-colors">TR</a>
                     <span className="w-px h-3 bg-white/20"></span>
                     <a href="#" className="hover:text-white transition-colors">EN</a>
                </div>
            </div>
        </div>

        <div className={`container mx-auto px-4 flex justify-between items-center transition-all duration-300 ${scrolled ? 'py-3' : 'py-4'}`}>
          <Link href="/" className="flex items-center gap-2 group relative">
            <div className="relative px-4 py-2">
              {/* Animated Border Container */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <rect 
                  x="0" y="0" width="100%" height="100%" 
                  rx="8" ry="8" 
                  fill="none" 
                  stroke={scrolled ? "hsl(222, 47%, 41%)" : "hsl(189, 94%, 43%)"} 
                  strokeWidth="2" 
                  className="animate-logo-border opacity-80"
                />
              </svg>
              <img src={logoWhite} alt="Lacivert Teknoloji" className="h-16 object-contain relative z-10" />
            </div>
          </Link>

          {/* Desktop Nav - Mega Menu */}
          <div className="hidden lg:block">
            <NavigationMenu delayDuration={0}>
                <NavigationMenuList className="gap-2">
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/" className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[active]:bg-white/10 cursor-pointer`}>
                                Ana Sayfa
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[state=open]:bg-white/10">Hizmetlerimiz</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className="flex flex-row p-6 w-[900px] bg-slate-950 border border-slate-800 shadow-2xl gap-8">
                                
                                {/* Col 1: Main Services */}
                                <div className="flex flex-col gap-2 w-1/3">
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-4 mb-2">Ana Hizmetler</div>
                                    <Link href="/it-hizmetleri" className="group block select-none rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-slate-900 hover:text-accent-foreground focus:bg-slate-900 focus:text-accent-foreground">
                                        <div className="text-base font-bold text-white group-hover:text-blue-400 mb-1">IT Destek & Bakım</div>
                                        <p className="line-clamp-2 text-sm leading-snug text-slate-400 group-hover:text-slate-300">
                                            Kurumsal sistem yönetimi ve 7/24 teknik destek.
                                        </p>
                                    </Link>
                                    <Link href="/siber-guvenlik" className="group block select-none rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-slate-900 hover:text-accent-foreground focus:bg-slate-900 focus:text-accent-foreground">
                                        <div className="text-base font-bold text-white group-hover:text-emerald-400 mb-1">Siber Güvenlik</div>
                                        <p className="line-clamp-2 text-sm leading-snug text-slate-400 group-hover:text-slate-300">
                                            IMO uyumlu ağ güvenliği ve SOC hizmetleri.
                                        </p>
                                    </Link>
                                </div>

                                {/* Col 2: Space Communication */}
                                <div className="flex flex-col gap-2 w-1/3">
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-4 mb-2">Uzay Haberleşmesi</div>
                                    <Link href="/uzay-haberlesmesi" className="group block select-none rounded-md px-4 py-3 leading-none no-underline outline-none hover:bg-slate-900 transition-colors">
                                        <div className="text-sm font-bold text-white group-hover:text-cyan-400">Genel Bakış</div>
                                    </Link>
                                    <div className="h-px bg-slate-800 mx-4 my-1"></div>
                                    <Link href="/uzay-haberlesmesi/starlink" className="group block select-none rounded-md px-4 py-2 leading-none no-underline outline-none hover:bg-slate-900 transition-colors">
                                        <div className="text-sm font-medium text-slate-300 group-hover:text-white">Starlink Maritime</div>
                                    </Link>
                                    <Link href="/uzay-haberlesmesi/oneweb" className="group block select-none rounded-md px-4 py-2 leading-none no-underline outline-none hover:bg-slate-900 transition-colors">
                                        <div className="text-sm font-medium text-slate-300 group-hover:text-white">Eutelsat OneWeb</div>
                                    </Link>
                                    <Link href="/uzay-haberlesmesi/iridium" className="group block select-none rounded-md px-4 py-2 leading-none no-underline outline-none hover:bg-slate-900 transition-colors">
                                        <div className="text-sm font-medium text-slate-300 group-hover:text-white">Iridium Certus</div>
                                    </Link>
                                </div>

                                {/* Col 3: Land Communication */}
                                <div className="flex flex-col gap-2 w-1/3">
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-4 mb-2">Kara Haberleşmesi</div>
                                    <Link href="/kara-haberlesmesi" className="group block select-none rounded-md px-4 py-3 leading-none no-underline outline-none hover:bg-slate-900 transition-colors">
                                        <div className="text-sm font-bold text-white group-hover:text-indigo-400">Genel Bakış</div>
                                    </Link>
                                    <div className="h-px bg-slate-800 mx-4 my-1"></div>
                                    <Link href="/kara-haberlesmesi/peplink" className="group block select-none rounded-md px-4 py-2 leading-none no-underline outline-none hover:bg-slate-900 transition-colors">
                                        <div className="text-sm font-medium text-slate-300 group-hover:text-white">Peplink SD-WAN</div>
                                    </Link>
                                    <Link href="/kara-haberlesmesi/teltonika" className="group block select-none rounded-md px-4 py-2 leading-none no-underline outline-none hover:bg-slate-900 transition-colors">
                                        <div className="text-sm font-medium text-slate-300 group-hover:text-white">Teltonika Networks</div>
                                    </Link>
                                </div>

                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/hakkimizda" className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white cursor-pointer`}>
                                Hakkımızda
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/inovasyon" className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white cursor-pointer`}>
                                İnovasyon
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/iletisim" className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white cursor-pointer`}>
                                İletişim
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
          </div>

           <div className="hidden lg:block">
                <Button 
                asChild
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-8 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 border-0"
                >
                <Link href="/iletisim">
                    Teklif Al
                </Link>
                </Button>
           </div>

          {/* Mobile Nav */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-slate-950 border-slate-800 text-white">
                <div className="flex flex-col gap-8 mt-10">
                    <Link href="/" className="text-xl font-medium hover:text-blue-400">Ana Sayfa</Link>
                    
                    <div className="space-y-4">
                        <div className="text-xl font-medium text-slate-400">Hizmetlerimiz</div>
                        <div className="pl-4 flex flex-col gap-4 border-l border-slate-800">
                            <Link href="/it-hizmetleri" className="text-lg hover:text-blue-400">IT Destek</Link>
                            <Link href="/uzay-haberlesmesi" className="text-lg hover:text-blue-400">Uzay Haberleşmesi</Link>
                            <Link href="/kara-haberlesmesi" className="text-lg hover:text-blue-400">Kara Haberleşmesi</Link>
                            <Link href="/siber-guvenlik" className="text-lg hover:text-blue-400">Siber Güvenlik</Link>
                        </div>
                    </div>

                    <Link href="/hakkimizda" className="text-xl font-medium hover:text-blue-400">Hakkımızda</Link>
                    <Link href="/iletisim" className="text-xl font-medium hover:text-blue-400">İletişim</Link>
                    
                  <Button asChild className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white">
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
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-heading font-bold mb-6">Hızlı Bağlantılar</h4>
              <ul className="space-y-4">
                  <li><Link href="/" className="text-slate-400 hover:text-blue-400 transition-colors block">Ana Sayfa</Link></li>
                  <li><Link href="/hakkimizda" className="text-slate-400 hover:text-blue-400 transition-colors block">Hakkımızda</Link></li>
                  <li><Link href="/iletisim" className="text-slate-400 hover:text-blue-400 transition-colors block">İletişim</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-heading font-bold mb-6">Hizmetlerimiz</h4>
              <ul className="space-y-4 text-slate-400">
                <li><Link href="/it-hizmetleri" className="hover:text-blue-400 transition-colors block">IT Destek & Bakım</Link></li>
                <li><Link href="/uzay-haberlesmesi" className="hover:text-blue-400 transition-colors block">Uzay Haberleşmesi</Link></li>
                <li><Link href="/kara-haberlesmesi" className="hover:text-blue-400 transition-colors block">Kara Haberleşmesi</Link></li>
                <li><Link href="/siber-guvenlik" className="hover:text-blue-400 transition-colors block">Siber Güvenlik</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-heading font-bold mb-6">İletişim</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-400">
                  <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                  <span>Gürsel Mah. İmrahor Cad. Premier Kampüs Ofis No: 29/A Kat:6 Ofis:217<br />Kağıthane / İstanbul</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                  <span>0532 503 34 17</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <Mail className="w-5 h-5 text-blue-500 shrink-0" />
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

const ListItem = ({ className, title, children, href, icon, ...props }: any) => {
  return (
    <NavigationMenuLink asChild>
        <Link href={href} className={`block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-slate-800/80 hover:text-accent-foreground focus:bg-slate-800 focus:text-accent-foreground cursor-pointer border border-transparent hover:border-slate-700 group ${className}`} {...props}>
            <div className="flex items-center gap-3 text-base font-bold leading-none text-slate-200 group-hover:text-white transition-colors">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-slate-700 group-hover:bg-slate-800 transition-colors">
                    {icon}
                </div>
                {title}
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-slate-500 mt-2 pl-[3.25rem] group-hover:text-slate-400 transition-colors">
            {children}
            </p>
        </Link>
    </NavigationMenuLink>
  )
}