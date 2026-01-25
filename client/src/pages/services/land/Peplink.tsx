import { Network, Zap, Lock, Activity, Check, ArrowRight, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import heroBg from "@assets/generated_images/peplink_5g_maritime_router_device.webp";
import { useTranslation } from "react-i18next";

export default function PeplinkPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-950 font-sans text-slate-200 selection:bg-indigo-500/30">
      <SEO 
        title={t('sub_peplink.title')} 
        description={t('sub_peplink.desc')} 
      />
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
             <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                style={{ backgroundImage: `url(${heroBg})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/60 to-slate-950"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-44 sm:pt-48 md:pt-52 lg:pt-44">
          <div className="max-w-3xl animate-in slide-in-from-bottom-10 duration-1000 fade-in">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
              {t('sub_peplink.hero_title_prefix')} <span className="text-indigo-500">{t('sub_peplink.hero_title_main')}</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              {t('sub_peplink.hero_desc')}
            </p>
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-14 px-8 rounded-full">
                <Link href="/iletisim">{t('common.start_project')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-6">{t('sub_peplink.section_tech_title')}</h2>
                    <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                        {t('sub_peplink.section_tech_desc')}
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                         <TechCard title={t('sub_peplink.tech_hotfailover')} desc={t('sub_peplink.tech_hotfailover_desc')} />
                         <TechCard title={t('sub_peplink.tech_wansmoothing')} desc={t('sub_peplink.tech_wansmoothing_desc')} />
                         <TechCard title={t('sub_peplink.tech_bonding')} desc={t('sub_peplink.tech_bonding_desc')} />
                    </div>
                </div>
                <div className="bg-slate-900 p-8 rounded-2xl border border-white/10">
                     <div className="flex items-center gap-4 mb-8">
                        <Server className="w-10 h-10 text-indigo-500" />
                        <h3 className="text-2xl font-bold text-white">{t('sub_peplink.router_series_title')}</h3>
                    </div>
                    <ul className="space-y-4 mb-8">
                        <FeatureItem text="Balance 20X / 310X / SDX" />
                        <FeatureItem text="MAX BR1 / BR2 Pro 5G" />
                        <FeatureItem text="InControl2 Bulut Yönetimi" />
                        <FeatureItem text="Rugged Metal Kasa" />
                    </ul>
                     <Button asChild variant="outline" className="w-full border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10">
                        <Link href="/iletisim">{t('sub_peplink.btn_list')}</Link>
                    </Button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
    return (
        <li className="flex items-center gap-3 text-slate-300">
            <Check className="w-5 h-5 text-indigo-500" />
            <span>{text}</span>
        </li>
    )
}

function TechCard({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <h4 className="text-indigo-400 font-bold mb-1">{title}</h4>
            <p className="text-sm text-slate-400">{desc}</p>
        </div>
    )
}