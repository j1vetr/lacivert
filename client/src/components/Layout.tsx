import { Link, useLocation } from "wouter";
import { Menu, X, Shield, Server, Wifi, Radio, Mail, Phone, MapPin, Linkedin, Instagram, Facebook, ChevronDown, Globe, Satellite, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/components/theme-provider";
import { useTranslation } from "react-i18next";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logoWhite from "@assets/lacivert light logo_1763796346759.png";
import logoDark from "@assets/lacivert dark logo_1763796405911.png";

import { ThemeToggle } from "@/components/ThemeToggle";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

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
                    <a href="tel:05325033417" className="hidden md:flex items-center gap-2 hover:text-cyan-400 transition-colors">
                        <Phone className="w-3 h-3" /> 0532 503 34 17
                    </a>
                </div>
                <div className="flex items-center gap-4">
                     <ThemeToggle />
                     <button 
                        onClick={() => changeLanguage('tr')} 
                        className={`transition-colors ${i18n.language === 'tr' ? 'text-white font-bold' : 'hover:text-white'}`}
                     >
                        TR
                     </button>
                     <span className="w-px h-3 bg-white/20"></span>
                     <button 
                        onClick={() => changeLanguage('en')} 
                        className={`transition-colors ${i18n.language === 'en' ? 'text-white font-bold' : 'hover:text-white'}`}
                     >
                        EN
                     </button>
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
                                {t('nav.home')}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[state=open]:bg-white/10">{t('nav.services')}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className="flex flex-row p-6 w-[900px] bg-slate-950 border border-slate-800 shadow-2xl gap-8">
                                
                                {/* Col 1: Main Services */}
                                <div className="flex flex-col gap-2 w-1/3">
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-4 mb-2">{t('nav.main_services')}</div>
                                    <Link href="/it-hizmetleri" className="group block select-none rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-slate-900 hover:text-accent-foreground focus:bg-slate-900 focus:text-accent-foreground">
                                        <div className="text-base font-bold text-white group-hover:text-blue-400 mb-1">{t('nav.it_support')}</div>
                                        <p className="line-clamp-2 text-sm leading-snug text-slate-400 group-hover:text-slate-300">
                                            {t('home.card_it_desc')}
                                        </p>
                                    </Link>
                                    <Link href="/siber-guvenlik" className="group block select-none rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-slate-900 hover:text-accent-foreground focus:bg-slate-900 focus:text-accent-foreground">
                                        <div className="text-base font-bold text-white group-hover:text-emerald-400 mb-1">{t('nav.cyber_security')}</div>
                                        <p className="line-clamp-2 text-sm leading-snug text-slate-400 group-hover:text-slate-300">
                                            {t('home.card_cyber_desc')}
                                        </p>
                                    </Link>
                                </div>

                                {/* Col 2: Space Communication */}
                                <div className="flex flex-col gap-2 w-1/3">
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-4 mb-2">{t('nav.space_comm')}</div>
                                    <Link href="/uzay-haberlesmesi" className="group block select-none rounded-md px-4 py-3 leading-none no-underline outline-none hover:bg-slate-900 transition-colors">
                                        <div className="text-sm font-bold text-white group-hover:text-cyan-400">{t('nav.overview')}</div>
                                    </Link>
                                    <div className="h-px bg-slate-800 mx-4 my-1"></div>
                                    <Link href="/uzay-haberlesmesi/starlink" className="group block select-none rounded-md px-4 py-2 leading-none no-underline outline-none hover:bg-slate-900 transition-colors">
                                        <div className="text-sm font-medium text-slate-300 group-hover:text-white">{t('nav.starlink')}</div>
                                    </Link>
                                    <Link href="/uzay-haberlesmesi/oneweb" className="group block select-none rounded-md px-4 py-2 leading-none no-underline outline-none hover:bg-slate-900 transition-colors">
                                        <div className="text-sm font-medium text-slate-300 group-hover:text-white">{t('nav.oneweb')}</div>
                                    </Link>
                                    <Link href="/uzay-haberlesmesi/iridium" className="group block select-none rounded-md px-4 py-2 leading-none no-underline outline-none hover:bg-slate-900 transition-colors">
                                        <div className="text-sm font-medium text-slate-300 group-hover:text-white">{t('nav.iridium')}</div>
                                    </Link>
                                </div>

                                {/* Col 3: Land Communication */}
                                <div className="flex flex-col gap-2 w-1/3">
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-4 mb-2">{t('nav.land_comm')}</div>
                                    <Link href="/kara-haberlesmesi" className="group block select-none rounded-md px-4 py-3 leading-none no-underline outline-none hover:bg-slate-900 transition-colors">
                                        <div className="text-sm font-bold text-white group-hover:text-emerald-400">{t('nav.overview')}</div>
                                    </Link>
                                    <div className="h-px bg-slate-800 mx-4 my-1"></div>
                                    <Link href="/kara-haberlesmesi/peplink" className="group block select-none rounded-md px-4 py-2 leading-none no-underline outline-none hover:bg-slate-900 transition-colors">
                                        <div className="text-sm font-medium text-slate-300 group-hover:text-white">{t('nav.peplink')}</div>
                                    </Link>
                                    <Link href="/kara-haberlesmesi/teltonika" className="group block select-none rounded-md px-4 py-2 leading-none no-underline outline-none hover:bg-slate-900 transition-colors">
                                        <div className="text-sm font-medium text-slate-300 group-hover:text-white">{t('nav.teltonika')}</div>
                                    </Link>
                                </div>

                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/hakkimizda" className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white cursor-pointer`}>
                                {t('nav.about')}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/iletisim" className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white cursor-pointer`}>
                                {t('nav.contact')}
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
                    {t('nav.get_quote')}
                </Link>
                </Button>
           </div>

          {/* Mobile Nav */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-slate-950 border-slate-800 text-white overflow-y-auto">
                <div className="flex flex-col gap-6 mt-10">
                    <Link href="/" onClick={closeMobileMenu} className="text-xl font-medium hover:text-blue-400">{t('nav.home')}</Link>
                    
                    <div className="space-y-4">
                        <div className="text-xl font-medium text-slate-400">{t('nav.services')}</div>
                        
                        <Accordion type="single" collapsible className="w-full border-none">
                            <AccordionItem value="it" className="border-none">
                                <AccordionTrigger className="py-2 text-lg hover:text-blue-400 hover:no-underline">
                                    {t('nav.it_support')}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col gap-3 pl-4 border-l border-slate-800 ml-1">
                                        <Link href="/it-hizmetleri" onClick={closeMobileMenu} className="text-slate-300 hover:text-white py-1">{t('nav.overview')}</Link>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="cyber" className="border-none">
                                <AccordionTrigger className="py-2 text-lg hover:text-blue-400 hover:no-underline">
                                    {t('nav.cyber_security')}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col gap-3 pl-4 border-l border-slate-800 ml-1">
                                        <Link href="/siber-guvenlik" onClick={closeMobileMenu} className="text-slate-300 hover:text-white py-1">{t('nav.overview')}</Link>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="space" className="border-none">
                                <AccordionTrigger className="py-2 text-lg hover:text-blue-400 hover:no-underline">
                                    {t('nav.space_comm')}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col gap-3 pl-4 border-l border-slate-800 ml-1">
                                        <Link href="/uzay-haberlesmesi" onClick={closeMobileMenu} className="text-slate-300 hover:text-white py-1">{t('nav.overview')}</Link>
                                        <Link href="/uzay-haberlesmesi/starlink" onClick={closeMobileMenu} className="text-slate-300 hover:text-white py-1">{t('nav.starlink')}</Link>
                                        <Link href="/uzay-haberlesmesi/oneweb" onClick={closeMobileMenu} className="text-slate-300 hover:text-white py-1">{t('nav.oneweb')}</Link>
                                        <Link href="/uzay-haberlesmesi/iridium" onClick={closeMobileMenu} className="text-slate-300 hover:text-white py-1">{t('nav.iridium')}</Link>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="land" className="border-none">
                                <AccordionTrigger className="py-2 text-lg hover:text-blue-400 hover:no-underline">
                                    {t('nav.land_comm')}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col gap-3 pl-4 border-l border-slate-800 ml-1">
                                        <Link href="/kara-haberlesmesi" onClick={closeMobileMenu} className="text-slate-300 hover:text-white py-1">{t('nav.overview')}</Link>
                                        <Link href="/kara-haberlesmesi/peplink" onClick={closeMobileMenu} className="text-slate-300 hover:text-white py-1">{t('nav.peplink')}</Link>
                                        <Link href="/kara-haberlesmesi/teltonika" onClick={closeMobileMenu} className="text-slate-300 hover:text-white py-1">{t('nav.teltonika')}</Link>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    <Link href="/hakkimizda" onClick={closeMobileMenu} className="text-xl font-medium hover:text-blue-400">{t('nav.about')}</Link>
                    <Link href="/iletisim" onClick={closeMobileMenu} className="text-xl font-medium hover:text-blue-400">{t('nav.contact')}</Link>
                    
                  <Button asChild className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white">
                    <Link href="/iletisim" onClick={closeMobileMenu}>{t('nav.get_quote')}</Link>
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

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/905325033417"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3 md:p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all hover:scale-110 flex items-center justify-center animate-in fade-in zoom-in duration-500"
        title="WhatsApp ile İletişime Geçin"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

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
                {t('nav.footer_desc')}
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
              <h4 className="text-lg font-heading font-bold mb-6">{t('nav.quick_links')}</h4>
              <ul className="space-y-4">
                  <li><Link href="/" className="text-slate-400 hover:text-blue-400 transition-colors block">{t('nav.home')}</Link></li>
                  <li><Link href="/hakkimizda" className="text-slate-400 hover:text-blue-400 transition-colors block">{t('nav.about')}</Link></li>
                  <li><Link href="/iletisim" className="text-slate-400 hover:text-blue-400 transition-colors block">{t('nav.contact')}</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-heading font-bold mb-6">{t('nav.services')}</h4>
              <ul className="space-y-4 text-slate-400">
                <li><Link href="/it-hizmetleri" className="hover:text-blue-400 transition-colors block">{t('nav.it_support')}</Link></li>
                <li><Link href="/uzay-haberlesmesi" className="hover:text-blue-400 transition-colors block">{t('nav.space_comm')}</Link></li>
                <li><Link href="/kara-haberlesmesi" className="hover:text-blue-400 transition-colors block">{t('nav.land_comm')}</Link></li>
                <li><Link href="/siber-guvenlik" className="hover:text-blue-400 transition-colors block">{t('nav.cyber_security')}</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-heading font-bold mb-6">{t('nav.contact_info')}</h4>
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
            <div className="flex flex-col md:flex-row items-center gap-4">
                <p>&copy; {new Date().getFullYear()} Lacivert Teknoloji. {t('nav.rights_reserved')}</p>
                <a href="https://toov.com.tr" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-cyan-400 transition-colors flex items-center gap-1">
                    {t('nav.designed_by')} <span className="text-red-500/80">♥</span>
                </a>
            </div>
            <div className="flex gap-8">
              <Link href="/gizlilik-politikasi" className="hover:text-white transition-colors">{t('nav.privacy')}</Link>
              <Link href="/kullanim-sartlari" className="hover:text-white transition-colors">{t('nav.terms')}</Link>
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