import { Brain, Lightbulb, Rocket, Code, Cpu, Globe, ChevronRight, Zap, Microscope, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroBg from "@assets/generated_images/abstract_artificial_intelligence_neural_network.png";
import labBg from "@assets/generated_images/futuristic_innovation_lab_with_holographic_displays.png";

export default function InnovationPage() {
  return (
    <div className="bg-slate-950 font-sans text-slate-200 selection:bg-purple-500/30">
      {/* Hero Section */}
      <section className="relative h-[75vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
             <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
                style={{ backgroundImage: `url(${heroBg})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/60 to-slate-950"></div>
            
            {/* Animated Particles/Grid Effect */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl animate-in slide-in-from-bottom-10 duration-1000 fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-medium text-sm mb-8 backdrop-blur-md">
                <Brain className="w-4 h-4" />
                Geleceği Şekillendiriyoruz
            </div>
            <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-8 leading-tight">
              İNOVASYON <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">LABORATUVARI</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-2xl font-light">
              Lacivert Teknoloji AR-GE merkezinde, yarının teknolojilerini bugünden tasarlıyoruz. 
              Yapay zeka, nesnelerin interneti ve ileri uydu teknolojileri ile sınırları zorluyoruz.
            </p>
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-500 text-white font-bold h-16 px-10 rounded-full text-lg shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all hover:scale-105">
                <Link href="/iletisim">
                    Projelerimiz
                </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lab Vision Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="relative rounded-3xl overflow-hidden border border-white/10 group">
                    <div className="absolute inset-0 bg-purple-600/20 group-hover:bg-purple-600/10 transition-colors duration-500 z-10"></div>
                    <img src={labBg} alt="Innovation Lab" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950 to-transparent z-20">
                        <h3 className="text-2xl font-bold text-white mb-2">Lacivert AR-GE Merkezi</h3>
                        <p className="text-slate-300">Teknopark İstanbul</p>
                    </div>
                </div>
                
                <div>
                    <h2 className="text-4xl font-heading font-bold text-white mb-8">Teknoloji Vizyonumuz</h2>
                    <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                        Sadece var olan teknolojileri entegre etmekle kalmıyor, kendi çözümlerimizi geliştiriyoruz. 
                        Mühendislerimiz, denizcilik ve savunma sanayi ihtiyaçlarına yönelik özel donanım ve yazılım 
                        projeleri üzerinde çalışmaktadır.
                    </p>
                    
                    <div className="space-y-6">
                        <VisionItem 
                            icon={<Cpu className="w-6 h-6 text-purple-400" />} 
                            title="Gömülü Sistemler" 
                            desc="Özel amaçlı IoT sensörleri ve gateway cihazları tasarımı."
                        />
                        <VisionItem 
                            icon={<Code className="w-6 h-6 text-pink-400" />} 
                            title="Yapay Zeka & Veri Analitiği" 
                            desc="Büyük veri işleme ve kestirimci bakım algoritmaları."
                        />
                         <VisionItem 
                            icon={<Globe className="w-6 h-6 text-cyan-400" />} 
                            title="Uydu Haberleşme Protokolleri" 
                            desc="Düşük bant genişliğinde yüksek verimlilik sağlayan özel protokoller."
                        />
                    </div>
                </div>
             </div>
        </div>
      </section>

      {/* Innovation Focus Areas */}
      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Odak Alanlarımız</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Geleceği inşa ettiğimiz temel teknoloji dikeyleri.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FocusCard 
                    icon={<Lightbulb className="w-10 h-10 text-yellow-400" />}
                    title="Smart Maritime"
                    desc="Gemilerin otonomlaşması ve uzaktan yönetimi için akıllı sistemler."
                />
                <FocusCard 
                    icon={<Rocket className="w-10 h-10 text-red-400" />}
                    title="Derin Uzay"
                    desc="Gelecek nesil uydu teknolojileri ve yer istasyonu yazılımları."
                />
                <FocusCard 
                    icon={<Microscope className="w-10 h-10 text-emerald-400" />}
                    title="Sürdürülebilir Tech"
                    desc="Enerji verimliliği sağlayan yeşil teknoloji çözümleri."
                />
            </div>
        </div>
      </section>
      
      {/* Stats / Achievements */}
      <section className="py-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-purple-900/10"></div>
         <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                    <div className="text-5xl font-bold text-white mb-2">15+</div>
                    <div className="text-purple-400 font-medium">AR-GE Projesi</div>
                </div>
                <div>
                    <div className="text-5xl font-bold text-white mb-2">8</div>
                    <div className="text-purple-400 font-medium">Patent Başvurusu</div>
                </div>
                <div>
                    <div className="text-5xl font-bold text-white mb-2">24</div>
                    <div className="text-purple-400 font-medium">Uzman Mühendis</div>
                </div>
                <div>
                    <div className="text-5xl font-bold text-white mb-2">3</div>
                    <div className="text-purple-400 font-medium">Üniversite İşbirliği</div>
                </div>
            </div>
         </div>
      </section>

    </div>
  );
}

function VisionItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex gap-4">
            <div className="mt-1 p-2 bg-white/5 rounded-lg border border-white/5 h-fit">
                {icon}
            </div>
            <div>
                <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}

function FocusCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="bg-slate-950 p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all duration-300 group hover:-translate-y-1">
            <div className="mb-6 p-4 rounded-full bg-slate-900 w-fit group-hover:bg-white/5 transition-colors">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">{title}</h3>
            <p className="text-slate-400 leading-relaxed">{desc}</p>
            <div className="mt-6 flex items-center text-purple-500 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                İncele <ChevronRight className="w-4 h-4 ml-1" />
            </div>
        </div>
    )
}