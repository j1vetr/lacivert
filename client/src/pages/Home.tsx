import { Button } from "@/components/ui/button";
import { Shield, Server, Wifi, Cloud, ArrowRight, Anchor, Building2, Factory, Zap, Radio, Globe, Satellite, Cpu, Activity, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import heroBg from "@assets/generated_images/futuristic_navy_blue_technology_network_background.webp";
import heroVideo from "@assets/generated_videos/abstract_navy_blue_cyber_security_network_background.mp4";
import globalNetBg from "@assets/generated_images/abstract_dark_global_network_map_with_glowing_connections.webp";
import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";

function TypewriterText({ text, delay = 500 }: { text: string, delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const { t } = useTranslation();

  // If text is a key, translate it. If not, keep it.
  // Ideally we pass the key to this component.
  // But for now let's assume text is passed as is.
  // Wait, "GÜVENLE YÖNETİN" is passed.
  
  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            setDisplayedText(text.substring(0, i + 1));
            i++;
        } else {
            clearInterval(interval);
        }
    }, 100); // Typing speed

    return () => clearInterval(interval);
  }, [text, started]);

  // Custom rendering for the specific hero text to handle mixed colors
  // We check if the text matches the translated version of "GÜVENLE YÖNETİN"
  // Or we can check if it contains specific words.
  // Let's simplify: just render the text. The color split logic was specific to Turkish words.
  // "MANAGE TECH" -> "WITH CONFIDENCE"
  // If we want to preserve the split coloring, we need to know where to split.
  
  if (text.includes(" ")) {
      const spaceIndex = displayedText.indexOf(' ');
      const hasSpace = spaceIndex !== -1;
      
      const firstPart = hasSpace ? displayedText.substring(0, spaceIndex) : displayedText;
      const secondPart = hasSpace ? displayedText.substring(spaceIndex) : "";

      return (
        <span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 drop-shadow-2xl">
            {firstPart}
          </span>
          <span className="text-white drop-shadow-2xl">
            {secondPart}
          </span>
          <span className="animate-pulse text-cyan-400">|</span>
        </span>
      );
  }

  return (
    <span>
      {displayedText}
      <span className="animate-pulse text-cyan-400">|</span>
    </span>
  );
}

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="bg-background text-foreground font-sans selection:bg-cyan-500/30">
      <SEO 
        title={t('nav.home')} 
        description={t('home.hero_desc')} 
      />
      {/* Hero Section - KEPT AS IS */}
      <section className="relative h-screen flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
            poster={heroBg}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-4xl animate-in slide-in-from-bottom-10 fade-in duration-1000">
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-heading font-bold text-white mb-8 leading-[1.1] tracking-tight">
              <span className="block text-slate-400 text-4xl sm:text-5xl md:text-6xl font-light tracking-normal mb-2">{t('home.hero_title_prefix')}</span>
              {t('home.hero_title_main')} <br/>
              <span>
                <TypewriterText text={t('home.hero_typewriter')} delay={1000} />
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-2xl font-light border-l-4 border-cyan-500 pl-6">
              {t('home.hero_desc')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button asChild size="lg" className="text-lg h-16 px-10 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full shadow-[0_0_30px_rgba(8,145,178,0.4)] transition-all hover:scale-105 border-0 ring-1 ring-white/20">
                <Link href="/it-hizmetleri">
                  {t('home.discover_services')}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-16 px-10 border-white/20 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm rounded-full transition-all hover:scale-105">
                <Link href="/iletisim">
                  {t('home.contact_us')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services Grid (Bento Style) */}
      <section className="py-32 relative bg-slate-50 dark:bg-transparent transition-colors">
        <div className="container mx-auto px-4">
            <div className="text-center mb-20">
                <h2 className="text-sm font-bold tracking-widest text-cyan-600 dark:text-cyan-500 uppercase mb-4">{t('home.section_360_badge')}</h2>
                <h3 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white">{t('home.section_360_title')}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                
                {/* Card 1: IT Support (Large) */}
                <div className="md:col-span-2 bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 rounded-[2rem] p-10 border border-slate-200 dark:border-white/5 relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500 shadow-lg dark:shadow-none">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-8 border border-blue-200 dark:border-blue-500/20">
                            <Server className="w-7 h-7" />
                        </div>
                        <h4 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('home.card_it_title')}</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-lg leading-relaxed">
                            {t('home.card_it_desc')}
                        </p>
                        <div className="flex flex-wrap gap-3 mb-8">
                            <Badge text={t('home.badges.server_mgmt')} />
                            <Badge text={t('home.badges.cloud_backup')} />
                            <Badge text={t('home.badges.helpdesk')} />
                            <Badge text={t('home.badges.hardware_supply')} />
                        </div>
                        <Link href="/it-hizmetleri" className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
                            {t('home.btn_examine')} <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* Card 2: Cyber Security (Tall) */}
                <div className="md:row-span-2 bg-white dark:bg-slate-900 rounded-[2rem] p-10 border border-slate-200 dark:border-white/5 relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500 flex flex-col shadow-lg dark:shadow-none">
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.1),transparent_60%)]"></div>
                     <div className="relative z-10 flex-grow">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-8 border border-emerald-200 dark:border-emerald-500/20">
                            <Shield className="w-7 h-7" />
                        </div>
                        <h4 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('home.card_cyber_title')}</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
                            {t('home.card_cyber_desc')}
                        </p>
                        <ul className="space-y-4 mb-8">
                            <FeatureItem text={t('home.features.edr')} />
                            <FeatureItem text={t('home.features.soc')} />
                            <FeatureItem text={t('home.features.pentest')} />
                            <FeatureItem text={t('home.features.ir')} />
                        </ul>
                     </div>
                     <Link href="/siber-guvenlik" className="w-full py-4 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-center text-slate-900 dark:text-white font-medium transition-all flex items-center justify-center gap-2 mt-auto relative z-20 cursor-pointer hover:scale-[1.02]">
                        {t('home.card_cyber_btn')} <Shield className="w-4 h-4" />
                    </Link>
                </div>

                {/* Card 3: Space Comm */}
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-10 border border-slate-200 dark:border-white/5 relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500 shadow-lg dark:shadow-none">
                    <div className="w-14 h-14 rounded-2xl bg-sky-100 dark:bg-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-6 border border-sky-200 dark:border-sky-500/20">
                        <Satellite className="w-7 h-7" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{t('home.card_space_title')}</h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        {t('home.card_space_desc')}
                    </p>
                    <Link href="/uzay-haberlesmesi" className="inline-flex items-center text-sky-600 dark:text-sky-400 font-semibold hover:text-sky-500 dark:hover:text-sky-300 transition-colors">
                        {t('home.btn_discover')} <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>

                {/* Card 4: Land Comm */}
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-10 border border-slate-200 dark:border-white/5 relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500 shadow-lg dark:shadow-none">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-700/30 flex items-center justify-center text-slate-600 dark:text-slate-300 mb-6 border border-slate-200 dark:border-slate-600/30">
                        <Radio className="w-7 h-7" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{t('home.card_land_title')}</h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        {t('home.card_land_desc')}
                    </p>
                    <Link href="/kara-haberlesmesi" className="inline-flex items-center text-slate-600 dark:text-slate-400 font-semibold hover:text-slate-500 dark:hover:text-slate-300 transition-colors">
                        {t('home.btn_discover')} <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>

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