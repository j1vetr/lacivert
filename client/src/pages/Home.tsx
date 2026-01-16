import { Button } from "@/components/ui/button";
import { Shield, Server, Wifi, Cloud, ArrowRight, Anchor, Building2, Factory, Zap, Radio, Globe, Satellite, Cpu, Activity, CheckCircle2, ChevronRight, Signal } from "lucide-react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import shipHeroBg from "@assets/stock_images/container_ship_at_se_5e055e0a.jpg";
import heroVideoBg from "@assets/generated_videos/cinematic_container_ship_at_sunset_video.mp4";
import globalNetBg from "@assets/generated_images/abstract_dark_global_network_map_with_glowing_connections.webp";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

// Brand Logos (New) - Removed as we are switching to text marquee

// Service Card Component for Hero
const HeroServiceCard = ({ title, desc, link, delay }: { title: string, desc: string, link: string, delay: string }) => (
  <Link href={link} className={`block group relative bg-slate-950/40 dark:bg-slate-950/60 backdrop-blur-md border-l-2 border-white/20 hover:border-cyan-400 pl-3 md:pl-6 py-3 md:py-6 pr-3 md:pr-4 transition-all duration-300 hover:bg-slate-900/60 animate-in fade-in slide-in-from-bottom-8 fill-mode-forwards ${delay} cursor-pointer`}>
    <div className="flex justify-between items-start">
        <div>
            <h3 className="text-sm md:text-xl font-bold text-white mb-1 md:mb-2 tracking-wide uppercase group-hover:text-cyan-400 transition-colors">{title}</h3>
            <p className="text-[10px] md:text-sm text-slate-300 line-clamp-2 leading-relaxed max-w-[95%] md:max-w-[90%]">{desc}</p>
        </div>
        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white/50 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
    </div>
  </Link>
);

// Precision Grid Card Component
const PrecisionCard = ({ 
    title, 
    desc, 
    icon, 
    href, 
    items = []
}: { 
    title: string, 
    desc: string, 
    icon: React.ReactNode, 
    href: string, 
    items?: string[]
}) => {
    return (
        <Link href={href} className="group relative border-l border-white/10 pl-8 py-4 hover:border-cyan-500/50 transition-colors duration-500">
            <div className="mb-6 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300">
                {icon}
            </div>
            
            <h4 className="text-xl font-medium text-white mb-3 tracking-wide">{title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">{desc}</p>
            
            {items.length > 0 && (
                <ul className="space-y-2 mb-6">
                    {items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                            <div className="w-1 h-1 rounded-full bg-cyan-500/50"></div>
                            {item}
                        </li>
                    ))}
                </ul>
            )}

            <div className="flex items-center text-xs font-medium text-slate-500 group-hover:text-white transition-colors uppercase tracking-widest">
                <span>İncele</span>
                <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
        </Link>
    );
};

// Removed duplicate HeroServiceCard definition
export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="bg-background text-foreground font-sans selection:bg-cyan-500/30">
      <SEO 
        title={t('nav.home')} 
        description={t('home.hero_desc')} 
      />
      
      {/* NEW HERO SECTION: Clean, Maritime Focused, Service Forward */}
      <section className="relative h-screen flex flex-col justify-center overflow-hidden bg-slate-950 pt-[14rem] md:pt-20 pb-32 md:pb-24">
        
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            poster={shipHeroBg}
            className="absolute inset-0 w-full h-full object-cover scale-105"
          >
            <source src={heroVideoBg} type="video/mp4" />
          </video>
          {/* Gradients for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Text Content */}
                <div className="lg:col-span-7 space-y-6 md:space-y-8">
                    
                    <h1 className="text-3xl md:text-6xl font-heading font-bold text-white leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
                        {t('home.hero_title_prefix')} <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
                           {t('home.hero_title_main')}
                        </span>
                    </h1>
                    
                    <p className="text-lg md:text-2xl text-slate-300 font-light max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                        {t('home.hero_desc')}
                    </p>

                    <div className="flex flex-wrap gap-3 md:gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                        <Button asChild size="lg" className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg bg-cyan-600 hover:bg-cyan-500 text-white border-0 shadow-lg shadow-cyan-900/20 rounded-full w-full md:w-auto">
                            <Link href="/iletisim">{t('home.start_project')}</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full w-full md:w-auto">
                            <Link href="/it-hizmetleri">{t('home.discover_services')}</Link>
                        </Button>
                    </div>
                </div>

                {/* Hero Services Grid (The "Menu" the user requested) */}
                <div className="lg:col-span-5 relative mt-4 md:mt-0">
                   {/* Glass Panel Container */}
                   <div className="grid grid-cols-1 gap-3 md:gap-4">
                        <HeroServiceCard 
                            title="Starlink Maritime" 
                            desc={t('services_space.tab_starlink_desc')} 
                            link="/uzay-haberlesmesi"
                            delay="delay-500"
                        />
                         <HeroServiceCard 
                            title="Eutelsat OneWeb" 
                            desc={t('services_space.tab_oneweb_desc')} 
                            link="/uzay-haberlesmesi"
                            delay="delay-600"
                        />
                         <HeroServiceCard 
                            title="Iridium Certus" 
                            desc={t('services_space.tab_iridium_desc')} 
                            link="/uzay-haberlesmesi"
                            delay="delay-700"
                        />
                   </div>
                </div>

            </div>
        </div>

        {/* Brand Marquee - Replaces Logos */}
        <div className="absolute bottom-0 w-full border-t border-white/5 bg-slate-950/80 backdrop-blur-md py-6 overflow-hidden z-20">
            {/* Inline styles for marquee animation */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}} />
            
            <div className="flex animate-marquee w-max whitespace-nowrap">
                {/* First Set */}
                <div className="flex items-center gap-16 md:gap-24 px-8 md:px-12">
                    <span className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default font-heading">Starlink</span>
                    <span className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default font-heading">OneWeb</span>
                    <span className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default font-heading">Iridium</span>
                    <span className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default font-heading">Fortinet</span>
                    <span className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default font-heading">GMS</span>
                    <span className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default font-heading">Peplink</span>
                    <span className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default font-heading">Teltonika</span>
                </div>
                {/* Duplicated Set for Seamless Loop */}
                <div className="flex items-center gap-16 md:gap-24 px-8 md:px-12">
                    <span className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default font-heading">Starlink</span>
                    <span className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default font-heading">OneWeb</span>
                    <span className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default font-heading">Iridium</span>
                    <span className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default font-heading">Fortinet</span>
                    <span className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default font-heading">GMS</span>
                    <span className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default font-heading">Peplink</span>
                    <span className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default font-heading">Teltonika</span>
                </div>
                 {/* Triplicated Set for Wide Screens just in case */}
                 <div className="flex items-center gap-16 md:gap-24 px-8 md:px-12">
                    <span className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default font-heading">Starlink</span>
                    <span className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default font-heading">OneWeb</span>
                    <span className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default font-heading">Iridium</span>
                    <span className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default font-heading">Fortinet</span>
                    <span className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default font-heading">GMS</span>
                    <span className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default font-heading">Peplink</span>
                    <span className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors cursor-default font-heading">Teltonika</span>
                </div>
            </div>
        </div>

      </section>

      {/* NEW: Precision Services Grid (Compact & Minimal) */}
      <section className="py-24 bg-slate-950 border-t border-white/5">
        <div className="container mx-auto px-4">
            
            {/* Header: Left Aligned, Minimal */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/5 pb-8">
                <div>
                    <h3 className="text-3xl font-heading font-light text-white tracking-tight">
                        Kritik Operasyonel <br />
                        <span className="font-bold text-cyan-500">Yetkinlikler</span>
                    </h3>
                </div>
                <div className="md:max-w-md text-right md:text-left">
                    <p className="text-slate-500 text-sm leading-relaxed font-light">
                        Denizcilik, enerji ve endüstriyel sektörler için özelleştirilmiş, yüksek erişilebilirlikli dijital altyapı servisleri.
                    </p>
                </div>
            </div>

            {/* Grid: 4 Columns, Clean Lines */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
                <PrecisionCard 
                    title="Uzay Haberleşmesi"
                    desc="Gemiler ve uzak sahalar için Starlink, OneWeb ve Iridium tabanlı kesintisiz LEO/GEO uydu internet çözümleri."
                    icon={<Satellite className="w-6 h-6 stroke-1" />}
                    href="/uzay-haberlesmesi"
                    items={["Starlink Maritime", "OneWeb Enterprise", "Iridium Certus"]}
                />

                <PrecisionCard 
                    title="Siber Güvenlik"
                    desc="IMO 2021 regülasyonlarına tam uyumlu, 7/24 izlenen aktif siber savunma ve tehdit önleme sistemleri."
                    icon={<Shield className="w-6 h-6 stroke-1" />}
                    href="/siber-guvenlik"
                    items={["IMO Uyumluluk", "SOC Hizmeti", "Endpoint Koruma"]}
                />

                <PrecisionCard 
                    title="IT Yönetimi"
                    desc="Kurumsal sunucu, veri merkezi ve bulut altyapılarının profesyonel yönetimi ve teknik destek hizmetleri."
                    icon={<Server className="w-6 h-6 stroke-1" />}
                    href="/it-hizmetleri"
                    items={["Sunucu Bakım", "Veri Yedekleme", "Helpdesk"]}
                />

                <PrecisionCard 
                    title="Kara Haberleşmesi"
                    desc="Limanlar ve endüstriyel tesisler için yedekli, yüksek performanslı 4G/5G ve SD-WAN ağ altyapıları."
                    icon={<Radio className="w-6 h-6 stroke-1" />}
                    href="/kara-haberlesmesi"
                    items={["Endüstriyel Router", "SD-WAN", "Global SIM"]}
                />

            </div>
        </div>
      </section>

      {/* Global Connectivity / Why Us */}
      <section className="py-32 relative overflow-hidden bg-slate-950">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
             <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{ backgroundImage: `url(${globalNetBg})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div>
                    <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8 leading-tight">
                        {t('home.global_title_prefix')} <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">{t('home.global_title_suffix')}</span>
                    </h2>
                    <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                        {t('home.global_desc')}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">7/24</div>
                            <div className="text-cyan-500 font-medium text-sm uppercase tracking-wider">{t('home.technical_support')}</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">%99.9</div>
                            <div className="text-cyan-500 font-medium text-sm uppercase tracking-wider">{t('home.uptime_guarantee')}</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">IMO</div>
                            <div className="text-cyan-500 font-medium text-sm uppercase tracking-wider">{t('home.full_compliance')}</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">Global</div>
                            <div className="text-cyan-500 font-medium text-sm uppercase tracking-wider">{t('home.service_network')}</div>
                        </div>
                    </div>
                </div>

                {/* Sectors Grid */}
                <div className="grid grid-cols-2 gap-4">
                   <SectorCard icon={<Anchor className="w-8 h-8" />} title={t('home.sector_maritime')} desc={t('home.sector_maritime_desc')} />
                   <SectorCard icon={<Building2 className="w-8 h-8" />} title={t('home.sector_corporate')} desc={t('home.sector_corporate_desc')} />
                   <SectorCard icon={<Factory className="w-8 h-8" />} title={t('home.sector_industrial')} desc={t('home.sector_industrial_desc')} />
                   <SectorCard icon={<Zap className="w-8 h-8" />} title={t('home.sector_energy')} desc={t('home.sector_energy_desc')} />
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section - Premium Glow */}
      <section className="py-32 relative overflow-hidden bg-background transition-colors">
        <div className="absolute inset-0 bg-cyan-900/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-heading font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
                {t('home.cta_title_prefix')} <span className="text-cyan-600 dark:text-cyan-400">{t('home.cta_title_suffix')}</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                {t('home.cta_desc')}
            </p>
            <Button asChild size="lg" className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-cyan-600 dark:hover:bg-cyan-50 font-bold h-20 px-16 rounded-full text-xl shadow-2xl dark:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all hover:scale-105">
                <Link href="/iletisim">
                    {t('home.start_project')}
                </Link>
            </Button>
        </div>
      </section>

    </div>
  );
}

function Badge({ text }: { text: string }) {
    return (
        <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-xs font-medium">
            {text}
        </span>
    )
}

function FeatureItem({ text }: { text: string }) {
    return (
        <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
            <span>{text}</span>
        </li>
    )
}

function SectorCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="bg-slate-900/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/5 p-6 rounded-2xl hover:bg-slate-800 hover:border-cyan-500/30 transition-all duration-300 group">
            <div className="text-cyan-500 mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
            <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-snug">{desc}</p>
        </div>
    )
}