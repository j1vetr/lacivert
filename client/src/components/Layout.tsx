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
          scrolled ? "bg-slate-950/95 backdrop-blur-md shadow-md py-3 border-b border-white/10" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
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
                            <div className="grid gap-3 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-[1fr_1fr] bg-slate-950 border border-slate-800 shadow-2xl">
                                <div className="row-span-3 flex flex-col justify-between rounded-xl bg-gradient-to-br from-blue-950 via-slate-900 to-slate-900 p-6 border border-blue-900/30 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-500"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 border border-blue-500/20 text-blue-400">
                                            <Server className="h-6 w-6" />
                                        </div>
                                        <div className="mb-2 text-xl font-bold text-white">
                                            IT Destek & Bakım
                                        </div>
                                        <p className="text-sm text-slate-400 leading-relaxed mb-4">
                                            Kurumsal sistem yönetimi, donanım tedariği ve 7/24 teknik destek çözümleri ile iş sürekliliğinizi garanti altına alın.
                                        </p>
                                    </div>
                                    
                                    <NavigationMenuLink asChild>
                                        <Link href="/it-hizmetleri" className="relative z-10 inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors mt-auto cursor-pointer group-hover:translate-x-1 duration-300">
                                            Detayları İncele <ChevronDown className="ml-1 h-4 w-4 -rotate-90" />
                                        </Link>
                                    </NavigationMenuLink>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <ListItem href="/uzay-haberlesmesi" title="Uzay Haberleşmesi" icon={<Satellite className="w-5 h-5 text-cyan-400" />}>
                                        Starlink, OneWeb ve VSAT sistemleri kurulum ve yönetimi.
                                    </ListItem>
                                    <ListItem href="/kara-haberlesmesi" title="Kara Haberleşmesi" icon={<Radio className="w-5 h-5 text-indigo-400" />}>
                                        Peplink & Teltonika ile kesintisiz mobil internet çözümleri.
                                    </ListItem>
                                     <ListItem href="/siber-guvenlik" title="Siber Güvenlik" icon={<Shield className="w-5 h-5 text-emerald-400" />}>
                                        IMO uyumlu ağ güvenliği, EDR ve SOC hizmetleri.
                                    </ListItem>
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
                className="bg-white text-slate-950 hover:bg-white/90 font-bold"
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