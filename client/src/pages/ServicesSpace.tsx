import { Radio, Globe, Rocket, ArrowRight, Satellite, Signal, Zap, ShieldCheck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEO } from "@/components/SEO";
import imgSpace from "@assets/generated_images/starlink_satellite_dish_on_a_modern_commercial_ship.webp";
import { useTranslation } from "react-i18next";

export default function ServicesSpace() {
  const { t } = useTranslation();

  return (
    <div className="bg-background font-sans text-foreground">
      <SEO 
        title={t('services_space.title')} 
        description={t('services_space.desc')} 
      />
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center overflow-hidden bg-slate-950">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imgSpace})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-48 md:pt-40">
          <div className="max-w-3xl animate-in slide-in-from-left duration-700">
            <div className="flex items-center gap-2 text-accent mb-6">
                <Satellite className="w-6 h-6 animate-pulse" />
                <span className="font-mono tracking-widest uppercase">{t('services_space.hero_badge')}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-8 leading-none">
              {t('services_space.hero_title_prefix')} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 text-4xl md:text-6xl font-light">
                {t('services_space.hero_title_main')}
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-xl mb-10 leading-relaxed">
              {t('services_space.hero_desc')}
            </p>
            <Button asChild size="lg" className="bg-white text-slate-950 hover:bg-slate-200 font-bold h-14 px-8">
                <Link href="/iletisim">
                {t('common.get_quote')}
                </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Providers Tabs */}
      <section className="py-24 bg-background" id="providers">
        <div className="container mx-auto px-4">
            <Tabs defaultValue="starlink" className="w-full">
                <div className="flex justify-center mb-12">
                    <TabsList className="flex flex-col md:grid md:w-full md:max-w-3xl md:grid-cols-3 h-auto md:h-16 p-1 bg-slate-100 dark:bg-slate-800 rounded-3xl md:rounded-full gap-2 md:gap-0">
                        <TabsTrigger value="starlink" className="w-full rounded-full text-lg font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md transition-all text-slate-600 dark:text-slate-300 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white py-3 md:py-0">{t('services_space.tab_starlink_title')}</TabsTrigger>
                        <TabsTrigger value="eutelsat" className="w-full rounded-full text-lg font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md transition-all text-slate-600 dark:text-slate-300 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white py-3 md:py-0">{t('services_space.tab_oneweb_title')}</TabsTrigger>
                        <TabsTrigger value="iridium" className="w-full rounded-full text-lg font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-md transition-all text-slate-600 dark:text-slate-300 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white py-3 md:py-0">{t('services_space.tab_iridium_title')}</TabsTrigger>
                    </TabsList>
                </div>

                {/* STARLINK CONTENT */}
                <TabsContent value="starlink" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold mb-6">
                                <Rocket className="w-4 h-4 text-accent" /> LEO Constellation
                            </div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                                {t('services_space.tab_starlink_title')}
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                {t('services_space.tab_starlink_desc')}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                <FeatureItem icon={<Signal />} title="Yüksek Hız (350 Mbps+)" />
                                <FeatureItem icon={<Zap />} title="Düşük Gecikme (<99ms)" />
                                <FeatureItem icon={<Globe />} title="Global Kapsama" />
                                <FeatureItem icon={<ShieldCheck />} title="Kolay Kurulum" />
                            </div>
                            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-slate-900">
                                <Link href="/uzay-haberlesmesi/starlink">{t('common.examine_packages')}</Link>
                            </Button>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                            <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">{t('common.features')}</h3>
                            <ul className="space-y-4">
                                <ListItem title="Denizcilik İçin Optimize" desc="Zorlu deniz koşullarına dayanıklı donanım." />
                                <ListItem title="Esnek Paketler" desc="50GB, 1TB, 5TB ve sınırsız veri seçenekleri." />
                                <ListItem title="Flat High Performance" desc="Hareket halindeyken kesintisiz bağlantı için özel anten." />
                                <ListItem title="Kolay Entegrasyon" desc="Mevcut ağ altyapınıza (SD-WAN, Peplink) tam uyum." />
                            </ul>
                        </div>
                    </div>
                </TabsContent>

                {/* EUTELSAT CONTENT */}
                <TabsContent value="eutelsat" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900 text-white text-sm font-bold mb-6">
                                <Globe className="w-4 h-4 text-cyan-400" /> GEO-LEO Integrated
                            </div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                                {t('services_space.tab_oneweb_title')}
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                {t('services_space.tab_oneweb_desc')}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                <FeatureItem icon={<Signal />} title="Garantili Hız (CIR)" />
                                <FeatureItem icon={<Zap />} title="Kurumsal SLA" />
                                <FeatureItem icon={<Globe />} title="Kutup Kapsaması" />
                                <FeatureItem icon={<ShieldCheck />} title="Yüksek Güvenlik" />
                            </div>
                            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-slate-900">
                                <Link href="/uzay-haberlesmesi/oneweb">{t('common.examine')}</Link>
                            </Button>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                            <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Neden Eutelsat OneWeb?</h3>
                            <ul className="space-y-4">
                                <ListItem title="Entegre Teknoloji" desc="GEO ve LEO uydularının gücünü birleştirir." />
                                <ListItem title="Intellian Terminalleri" desc="OW11FM, OW10HM gibi gelişmiş denizcilik antenleri." />
                                <ListItem title="Gerçek Global Kapsama" desc="Kutuplar dahil tüm dünyada erişim." />
                                <ListItem title="İş Kritik Bağlantı" desc="Kurumsal seviyede güvenilirlik ve destek." />
                            </ul>
                        </div>
                    </div>
                </TabsContent>

                {/* IRIDIUM CONTENT */}
                <TabsContent value="iridium" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-white text-sm font-bold mb-6">
                                <Satellite className="w-4 h-4 text-red-500" /> L-Band LEO
                            </div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                                {t('services_space.tab_iridium_title')}
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                {t('services_space.tab_iridium_desc')}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                <FeatureItem icon={<Signal />} title="%100 Global Kapsama" />
                                <FeatureItem icon={<ShieldCheck />} title="GMDSS Sertifikalı" />
                                <FeatureItem icon={<Zap />} title="Hava Koşullarına Dirençli" />
                                <FeatureItem icon={<Radio />} title="L-Band Güvenilirliği" />
                            </div>
                            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-slate-900">
                                <Link href="/uzay-haberlesmesi/iridium">{t('common.examine')}</Link>
                            </Button>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                            <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Iridium Çözümleri</h3>
                            <ul className="space-y-4">
                                <ListItem title="Iridium Certus 700" desc="704 Kbps indirme hızı ile en hızlı L-band hizmeti." />
                                <ListItem title="GMDSS Sistemleri" desc="Acil durum ve güvenlik haberleşmesi için standart." />
                                <ListItem title="Kutup İletişimi" desc="Diğer uyduların ulaşamadığı kutup noktalarında tek çözüm." />
                                <ListItem title="Yedeklilik" desc="VSAT sistemleri için mükemmel ve güvenilir yedek hat." />
                            </ul>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-950 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            {t('services_space.cta_title')}
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            {t('services_space.cta_desc')}
          </p>
          <Button asChild size="lg" className="text-lg px-10 h-14 bg-accent text-primary hover:bg-accent/90 font-bold">
            <Link href="/iletisim">
              {t('services_space.btn_expert')}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function FeatureItem({ icon, title }: { icon: React.ReactNode, title: string }) {
    return (
        <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="text-accent">{icon}</div>
            <span className="font-bold text-slate-900 dark:text-white text-sm">{title}</span>
        </div>
    )
}

function ListItem({ title, desc }: { title: string, desc: string }) {
    return (
        <li className="flex items-start gap-3">
            <div className="mt-1 min-w-[20px]">
                <CheckCircle className="w-5 h-5 text-accent" />
            </div>
            <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{title}</h4>
                <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
        </li>
    )
}