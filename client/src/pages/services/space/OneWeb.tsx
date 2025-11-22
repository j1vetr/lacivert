import { Globe, Satellite, Zap, Shield, Check, ArrowRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import heroBg from "@assets/generated_images/eutelsat_oneweb_satellite_constellation_in_space.webp";

export default function OneWebPage() {
  return (
    <div className="bg-slate-950 font-sans text-slate-200 selection:bg-blue-500/30">
      <SEO 
        title="Eutelsat OneWeb" 
        description="Kurumsal sınıf LEO uydu interneti. Garantili bant genişliği (CIR) ve SLA." 
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

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-in slide-in-from-bottom-10 duration-1000 fade-in">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
              EUTELSAT <span className="text-blue-500">ONEWEB</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              Kurumsal sınıf LEO (Low Earth Orbit) uydu interneti. İşletmeniz için garantili bant genişliği (CIR) ve SLA destekli kesintisiz bağlantı.
            </p>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-bold h-14 px-8 rounded-full">
                <Link href="/iletisim">Bilgi Alın</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-6">Kurumsal Öncelikli Bağlantı</h2>
                    <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                        Eutelsat OneWeb, özellikle kritik iş uygulamaları için tasarlanmış bir LEO takımyıldızıdır. 
                        Diğer uydu sistemlerinin aksine, "Committed Information Rate" (CIR) sunarak, 
                        satın aldığınız hızın her zaman garanti altında olmasını sağlar.
                    </p>
                    <ul className="space-y-4">
                        <FeatureItem text="Garantili Bant Genişliği (CIR)" />
                        <FeatureItem text="Kurumsal SLA Desteği" />
                        <FeatureItem text="Global Kapsama Alanı" />
                        <FeatureItem text="Düşük Gecikme (<50ms)" />
                    </ul>
                </div>
                <div className="bg-slate-900 p-8 rounded-2xl border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6">Kullanım Alanları</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <UseCaseCard title="Ticari Denizcilik" desc="Kargo gemileri ve tankerler için güvenilir ana hat." />
                        <UseCaseCard title="Enerji & Petrol" desc="Offshore platformlar ve uzak sahalar." />
                        <UseCaseCard title="Devlet & Savunma" desc="Kritik ve güvenli haberleşme ihtiyaçları." />
                    </div>
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
            <Check className="w-5 h-5 text-blue-500" />
            <span>{text}</span>
        </li>
    )
}

function UseCaseCard({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <h4 className="text-blue-400 font-bold mb-1">{title}</h4>
            <p className="text-sm text-slate-400">{desc}</p>
        </div>
    )
}