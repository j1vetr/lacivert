import { Wifi, Zap, Globe, Shield, Check, ArrowRight, Ship, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import heroBg from "@assets/generated_images/starlink_maritime_flat_high_performance_dish_on_a_luxury_yacht_at_sunset.webp";

export default function StarlinkPage() {
  return (
    <div className="bg-background font-sans text-foreground selection:bg-cyan-500/30">
      <SEO 
        title="Starlink Maritime" 
        description="Starlink Maritime ile denizde fiber hızında internet. Yüksek hız, düşük gecikme." 
      />
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
             <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
                style={{ backgroundImage: `url(${heroBg})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl animate-in slide-in-from-bottom-10 duration-1000 fade-in">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 leading-tight">
              STARLINK <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">MARITIME</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-2xl font-light">
              Denizlerin ortasında fiber hızında internet. Düşük gecikme, yüksek bant genişliği ve 
              kesintisiz küresel kapsama alanı ile filonuzu dünyaya bağlayın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-slate-950 hover:bg-cyan-50 font-bold h-16 px-10 rounded-full text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all hover:scale-105">
                    <Link href="/iletisim">
                        Hemen Başvurun
                    </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 h-16 px-10 rounded-full text-lg backdrop-blur-sm">
                    <Link href="#packages">
                        Paketleri İncele
                    </Link>
                </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-white/5 transition-colors">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <FeatureCard 
                    icon={<Zap className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />}
                    title="Düşük Gecikme (Latency)"
                    desc="<20ms gecikme süresi ile gerçek zamanlı uygulamalar, video konferans ve oyun için ideal."
                />
                <FeatureCard 
                    icon={<Wifi className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />}
                    title="Yüksek Hız"
                    desc="220 Mbps'e varan indirme hızları ile denizde ofis konforunu yaşayın."
                />
                <FeatureCard 
                    icon={<Shield className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />}
                    title="Zorlu Koşullara Dayanıklı"
                    desc="IP56 sertifikalı Flat High Performance antenler ile fırtına, sıcak ve soğuğa karşı tam koruma."
                />
            </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-32 relative bg-background transition-colors">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6">
                    Size Uygun <span className="text-cyan-600 dark:text-cyan-500">Starlink Paketi</span>
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    İhtiyacınıza göre optimize edilmiş maritime veri paketlerimiz. 
                    Tüm paketlerde "Priority Data" ayrıcalığı.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <PackageCard 
                    size="50 GB" 
                    type="Priority"
                    features={["225 Mbps İndirme Hızı", "25 Mbps Yükleme Hızı"]}
                />
                <PackageCard 
                    size="100 GB" 
                    type="Priority"
                    features={["225 Mbps İndirme Hızı", "25 Mbps Yükleme Hızı"]}
                />
                <PackageCard 
                    size="150 GB" 
                    type="Priority"
                    features={["225 Mbps İndirme Hızı", "25 Mbps Yükleme Hızı"]}
                />
                <PackageCard 
                    size="250 GB" 
                    type="Priority"
                    features={["225 Mbps İndirme Hızı", "25 Mbps Yükleme Hızı"]}
                />
            </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Flat High Performance Kit</h3>
                    <div className="space-y-6">
                        <SpecRow label="Anten Tipi" value="Elektronik Faz Dizili (Electronic Phased Array)" />
                        <SpecRow label="Görüş Alanı" value="140°" />
                        <SpecRow label="Ağırlık" value="5.7 kg (13 lbs)" />
                        <SpecRow label="Çevre Sertifikası" value="IP56" />
                        <SpecRow label="Çalışma Sıcaklığı" value="-30°C to 50°C" />
                        <SpecRow label="Rüzgar Dayanımı" value="280 km/h+" />
                        <SpecRow label="Güç Tüketimi" value="110-150W Ort." />
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Kurulum ve Destek</h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                        Lacivert Teknoloji olarak, Starlink kitlerinin temini, gemiye kurulumu ve 
                        network entegrasyonu (Peplink/Firewall) konularında anahtar teslim hizmet sunuyoruz.
                    </p>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                            <Check className="w-5 h-5 text-cyan-600 dark:text-cyan-500" />
                            <span>Profesyonel Montaj</span>
                        </li>
                        <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                            <Check className="w-5 h-5 text-cyan-600 dark:text-cyan-500" />
                            <span>Network Entegrasyonu</span>
                        </li>
                        <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                            <Check className="w-5 h-5 text-cyan-600 dark:text-cyan-500" />
                            <span>7/24 Teknik Destek</span>
                        </li>
                    </ul>
                    <Button asChild className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold">
                        <Link href="/iletisim">Teknik Bilgi Al</Link>
                    </Button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none">
            <div className="mb-6 p-4 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-lg">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
        </div>
    )
}

function PackageCard({ size, type, features }: { size: string, type: string, features: string[] }) {
    return (
        <div className="relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 hover:border-cyan-500/30 shadow-lg dark:shadow-none">
            <div className="text-center mb-8">
                <div className="text-sm font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-widest mb-2">{type}</div>
                <div className="text-5xl font-bold text-slate-900 dark:text-white mb-4">{size}</div>
            </div>
            <div className="space-y-4 mb-8">
                {features.map((feat, idx) => (
                    <div key={idx} className="flex items-center justify-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <Check className="w-4 h-4 text-cyan-600 dark:text-cyan-500 flex-shrink-0" />
                        <span>{feat}</span>
                    </div>
                ))}
            </div>
            <Button asChild className="w-full font-bold bg-slate-900 dark:bg-white/10 hover:bg-slate-800 dark:hover:bg-white/20 text-white">
                <Link href="/iletisim">Teklif İste</Link>
            </Button>
        </div>
    )
}

function SpecRow({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-white/10">
            <span className="text-slate-600 dark:text-slate-400">{label}</span>
            <span className="text-slate-900 dark:text-white font-medium">{value}</span>
        </div>
    )
}