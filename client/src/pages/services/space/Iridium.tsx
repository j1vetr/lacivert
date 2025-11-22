import { Phone, Shield, Globe, Anchor, Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroBg from "@assets/generated_images/iridium_certus_maritime_satellite_terminal_on_a_ship.png";

export default function IridiumPage() {
  return (
    <div className="bg-slate-950 font-sans text-slate-200 selection:bg-gray-500/30">
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
              IRIDIUM <span className="text-gray-400">CERTUS</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              Kutup noktaları dahil %100 küresel kapsama. L-Band teknolojisi ile en zorlu hava koşullarında bile 
              kesintisiz iletişim ve GMDSS güvenlik standartları.
            </p>
            <Button asChild size="lg" className="bg-white text-slate-950 hover:bg-gray-200 font-bold h-14 px-8 rounded-full">
                <Link href="/iletisim">Bilgi Alın</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-6">En Güvenilir Yedek Hat</h2>
                    <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                        Yağmur, kar veya fırtınadan etkilenmeyen L-Band frekansı sayesinde Iridium, 
                        denizcilik sektörünün en güvenilir iletişim standardıdır. Starlink veya VSAT sistemlerinizin 
                        yanında "Companion" (Yedek) olarak kullanıldığında kesintisiz operasyon sağlar.
                    </p>
                    <ul className="space-y-4">
                        <FeatureItem text="GMDSS (Global Maritime Distress and Safety System)" />
                        <FeatureItem text="%100 Global Kapsama (Kutuplar Dahil)" />
                        <FeatureItem text="Hava Koşullarından Etkilenmez" />
                        <FeatureItem text="Iridium Certus 700/200 Desteği" />
                    </ul>
                </div>
                <div className="bg-slate-900 p-8 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-red-500/20 rounded-lg text-red-500">
                            <AlertTriangle className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Acil Durum İletişimi</h3>
                            <p className="text-sm text-slate-400">Safety of Life at Sea (SOLAS)</p>
                        </div>
                    </div>
                    <p className="text-slate-400 mb-6 text-sm">
                        Geminizdeki ana iletişim sistemleri çökse bile Iridium çalışmaya devam eder. 
                        Güvenlik ve acil durumlar için vazgeçilmezdir.
                    </p>
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
            <Check className="w-5 h-5 text-gray-400" />
            <span>{text}</span>
        </li>
    )
}