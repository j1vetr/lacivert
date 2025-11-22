import { Check, Server, Network, Cloud, Monitor, HardDrive, ShieldCheck, Cpu, ShoppingCart, Wrench, Headphones, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import imgServer from "@assets/generated_images/modern_clean_server_room_with_blue_lighting.webp";
import imgHardware from "@assets/generated_images/enterprise_it_hardware_and_server_equipment_with_blue_lighting.webp";
import { useTranslation } from "react-i18next";

export default function ServicesIT() {
  const { t } = useTranslation();

  return (
    <div className="bg-background font-sans text-foreground selection:bg-blue-500/30">
      <SEO 
        title={t('services_it.title')} 
        description={t('services_it.desc')} 
      />
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-slate-950">
         <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity transform scale-105"
          style={{ backgroundImage: `url(${imgServer})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10 pt-48 md:pt-40">
          <div className="max-w-4xl animate-in slide-in-from-bottom-8 duration-700 fade-in">
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight text-white tracking-tight">
              {t('services_it.hero_title_prefix')} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400">{t('services_it.hero_title_main')}</span> {t('services_it.hero_title_suffix')}
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl font-light border-l-4 border-blue-500 pl-6">
              {t('services_it.hero_desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-0">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-500 text-white h-14 px-10 text-lg font-bold rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:scale-105">
                    <Link href="/iletisim">
                    {t('services_it.btn_quote')}
                    </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white h-14 px-10 text-lg font-medium rounded-full backdrop-blur-sm">
                    <Link href="#services">
                    {t('services_it.btn_details')}
                    </Link>
                </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Dark Premium Layout */}
      <section id="services" className="py-32 relative overflow-hidden bg-slate-50 dark:bg-transparent transition-colors">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-24">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6">
                    {t('services_it.section_360_title')}
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t('services_it.section_360_desc')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1: IT Support */}
                <ServiceCard 
                    icon={<Headphones className="w-8 h-8 text-blue-400" />}
                    title={t('services_it.card_support_title')}
                    desc={t('services_it.card_support_desc')}
                    features={["7/24 Helpdesk", "SLA", "Inventory", "Emergency"]}
                />

                {/* Card 2: Network */}
                <ServiceCard 
                    icon={<Network className="w-8 h-8 text-sky-400" />}
                    title={t('services_it.card_network_title')}
                    desc={t('services_it.card_network_desc')}
                    features={["Switch & Router", "Firewall & VPN", "Wi-Fi", "Cabling"]}
                />

                {/* Card 3: Server & Cloud */}
                <ServiceCard 
                    icon={<Server className="w-8 h-8 text-cyan-400" />}
                    title={t('services_it.card_server_title')}
                    desc={t('services_it.card_server_desc')}
                    features={["Windows/Linux", "VMware/Hyper-V", "Backup & DR", "Active Directory"]}
                />
            </div>
        </div>
      </section>

      {/* Hardware Sales Section - NEW */}
      <section className="py-32 bg-slate-900 relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-semibold mb-6">
                        <ShoppingCart className="w-4 h-4" />
                        {t('services_it.hardware_badge')}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                        {t('services_it.hardware_title_prefix')} <br/>
                        <span className="text-emerald-400">{t('services_it.hardware_title_suffix')}</span>
                    </h2>
                    <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                        {t('services_it.hardware_desc')}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6 mb-10">
                        <HardwareItem icon={<Laptop className="w-5 h-5" />} title={t('services_it.hardware_pc')} desc={t('services_it.hardware_pc_desc')} />
                        <HardwareItem icon={<Server className="w-5 h-5" />} title={t('services_it.hardware_server')} desc={t('services_it.hardware_server_desc')} />
                        <HardwareItem icon={<Network className="w-5 h-5" />} title={t('services_it.hardware_network')} desc={t('services_it.hardware_network_desc')} />
                        <HardwareItem icon={<Monitor className="w-5 h-5" />} title={t('services_it.hardware_monitor')} desc={t('services_it.hardware_monitor_desc')} />
                    </div>

                    <Button asChild className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-14 px-8 rounded-full">
                        <Link href="/iletisim">
                            {t('services_it.btn_hardware_quote')}
                        </Link>
                    </Button>
                </div>
                
                <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 rounded-[2.5rem] blur-2xl"></div>
                    <div className="relative rounded-[2rem] overflow-hidden border border-slate-700 shadow-2xl group">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 z-10"></div>
                        <img 
                            src={imgHardware} 
                            alt="Enterprise Hardware" 
                            className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                                    <Cpu className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <div className="text-white font-bold text-lg">{t('services_it.guarantee_title')}</div>
                                    <div className="text-slate-300 text-sm">{t('services_it.guarantee_desc')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-blue-950/30 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-8">{t('services_it.cta_title')}</h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
                {t('services_it.cta_desc')}
            </p>
            <Button asChild size="lg" className="bg-white text-slate-950 hover:bg-blue-50 font-bold h-16 px-12 rounded-full text-lg shadow-xl">
                <Link href="/iletisim">
                    {t('services_it.btn_discovery')}
                </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, desc, features }: { icon: React.ReactNode, title: string, desc: string, features: string[] }) {
    return (
        <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-blue-500/30 transition-all group shadow-sm dark:shadow-none">
            <div className="mb-6 bg-slate-100 dark:bg-slate-950 w-16 h-16 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800 group-hover:border-blue-500/20 transition-colors">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{title}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">{desc}</p>
            <ul className="space-y-3">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        {feature}
                    </li>
                ))}
            </ul>
        </div>
    )
}

function HardwareItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex gap-4">
            <div className="mt-1 w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400 border border-slate-700 shrink-0">
                {icon}
            </div>
            <div>
                <h4 className="text-white font-bold mb-1">{title}</h4>
                <p className="text-slate-400 text-sm leading-snug">{desc}</p>
            </div>
        </div>
    )
}