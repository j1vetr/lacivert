import { Shield, Lock, Eye, FileWarning, Server, Activity, CheckCircle, Globe, Cpu, Network, Zap, AlertTriangle, ArrowRight, Fingerprint, ScanLine, Signal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroBg from "@assets/generated_images/abstract_cybersecurity_digital_shield_concept.png";

export default function ServicesSecurity() {
  return (
    <div className="bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      {/* Hero Section - Dark & Cyber */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
             <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity transform scale-105"
                style={{ backgroundImage: `url(${heroBg})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15),transparent_70%)]"></div>
            
            {/* Animated Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center animate-in slide-in-from-bottom-10 duration-1000 fade-in">
            
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-cyan-950/50 border border-cyan-500/30 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                <Shield className="w-5 h-5 text-cyan-400 animate-pulse" />
                <span className="font-mono tracking-widest uppercase text-cyan-100 text-sm font-semibold">IMO Compliant Cyber Defense</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 leading-tight tracking-tighter">
              SİBER <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">GÜVENLİK</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Denizcilik ve kurumsal ağlarınız için ileri teknoloji, yapay zeka destekli
              ve IMO regülasyonlarına tam uyumlu yeni nesil siber savunma hattı.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button asChild size="lg" className="bg-cyan-600 text-white hover:bg-cyan-500 font-bold h-16 px-10 rounded-full text-lg shadow-[0_0_30px_rgba(8,145,178,0.5)] transition-all hover:scale-105 border-0">
                    <Link href="/iletisim">
                        Güvenlik Analizi Başlat
                    </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white font-medium h-16 px-10 rounded-full text-lg backdrop-blur-sm">
                    <Link href="#solutions">
                        Çözümleri Keşfet
                    </Link>
                </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust Bar */}
      <div className="border-y border-white/5 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
                <div>
                    <div className="text-3xl font-bold text-white mb-1">7/24</div>
                    <div className="text-sm text-slate-500 uppercase tracking-wider font-mono">SOC İzleme</div>
                </div>
                <div>
                    <div className="text-3xl font-bold text-white mb-1">IMO 2021</div>
                    <div className="text-sm text-slate-500 uppercase tracking-wider font-mono">Tam Uyum</div>
                </div>
                <div>
                    <div className="text-3xl font-bold text-white mb-1">%100</div>
                    <div className="text-sm text-slate-500 uppercase tracking-wider font-mono">Tehdit Algılama</div>
                </div>
                <div>
                    <div className="text-3xl font-bold text-white mb-1">NGAV</div>
                    <div className="text-sm text-slate-500 uppercase tracking-wider font-mono">Yapay Zeka</div>
                </div>
            </div>
        </div>
      </div>

      {/* Main Solutions Area */}
      <section id="solutions" className="py-32 relative">
        <div className="container mx-auto px-4">
            
            {/* Section Header */}
            <div className="mb-20 max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                    Çok Katmanlı <br/>
                    <span className="text-cyan-500">Savunma Mimarisi</span>
                </h2>
                <p className="text-xl text-slate-400 leading-relaxed">
                    Lacivert Teknoloji, sadece bir antivirüs değil, ağınızın her noktasına nüfuz eden 
                    bütünleşik bir güvenlik ekosistemi sunar. Gelişmiş altyapımız ile özellikle 
                    uydu iletişimi kullanan gemiler için optimize edilmiştir.
                </p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Card 1: High Bandwidth */}
                <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-10 border border-white/10 relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-500">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Cpu className="w-64 h-64" />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-8 text-cyan-400 border border-cyan-500/20">
                            <Activity className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">Yüksek Bant Genişliği (EDR)</h3>
                        <p className="text-slate-400 text-lg mb-8 max-w-xl leading-relaxed">
                            Gelişmiş yapay zeka teknolojisi ile güçlendirilmiş, imza tabanlı olmayan yeni nesil koruma. 
                            VSAT ve Starlink kullanan gemiler ve kurumsal ofisler için davranışsal analiz yapan yapay zeka motoru.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <PremiumListItem text="Next-Gen Antivirus (NGAV)" />
                            <PremiumListItem text="Endpoint Detection & Response" />
                            <PremiumListItem text="Tehdit Avcılığı (Threat Hunting)" />
                            <PremiumListItem text="USB Cihaz Kontrolü" />
                        </div>
                    </div>
                </div>

                {/* Card 2: Low Bandwidth */}
                <div className="bg-slate-900/50 rounded-[2rem] p-10 border border-white/10 relative overflow-hidden hover:bg-slate-800 transition-colors">
                    <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-8 text-indigo-400 border border-indigo-500/20">
                        <Signal className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Düşük Bant Genişliği</h3>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        L-Band (Iridium/Inmarsat) kullanan veya kotalı sistemler için kaynak optimizasyonlu, 
                        ultra düşük veri tüketen özel paketler.
                    </p>
                    <ul className="space-y-4">
                        <PremiumListItem text="Optimize Güncellemeler" small />
                        <PremiumListItem text="Micro-Definition Updates" small />
                        <PremiumListItem text="Central Management" small />
                    </ul>
                </div>

                {/* Card 3: SOC */}
                <div className="bg-slate-900/50 rounded-[2rem] p-10 border border-white/10 relative overflow-hidden hover:bg-slate-800 transition-colors">
                     <div className="w-16 h-16 bg-rose-500/20 rounded-2xl flex items-center justify-center mb-8 text-rose-400 border border-rose-500/20">
                        <Eye className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">7/24 SOC Hizmeti</h3>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        Sistemlerinizi 7 gün 24 saat izleyen uzman güvenlik analistleri. 
                        Alarm oluştuğunda anında müdahale.
                    </p>
                     <ul className="space-y-4">
                        <PremiumListItem text="Sürekli İzleme" small />
                        <PremiumListItem text="Olay Müdahalesi (IR)" small />
                        <PremiumListItem text="Detaylı Raporlama" small />
                    </ul>
                </div>

                {/* Card 4: Compliance */}
                <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-10 border border-white/10 relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-500">
                     <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <FileWarning className="w-64 h-64" />
                    </div>
                     <div className="relative z-10">
                        <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 text-emerald-400 border border-emerald-500/20">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">IMO & Regülasyon Uyumu</h3>
                        <p className="text-slate-400 text-lg mb-8 max-w-xl leading-relaxed">
                            Uluslararası Denizcilik Örgütü (IMO) 2021 siber güvenlik kararlarına tam uyumluluk sağlayın. 
                            Denetimler için gerekli tüm raporlama ve loglama altyapısını kuruyoruz.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <PremiumListItem text="Otomatik Uyumluluk Raporları" />
                            <PremiumListItem text="Gemi Güvenlik Planı (SSP) Desteği" />
                            <PremiumListItem text="Mürettebat Farkındalık Eğitimi" />
                            <PremiumListItem text="Risk Değerlendirmesi" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-cyan-950 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
         <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">Güvenliğinizi Şansa Bırakmayın</h2>
            <p className="text-cyan-200 text-xl mb-12 max-w-2xl mx-auto">
                Hemen bir güvenlik analizi talep edin, ağınızdaki zafiyetleri raporlayalım ve size özel koruma planını oluşturalım.
            </p>
            <Button asChild size="lg" className="bg-white text-cyan-950 hover:bg-cyan-50 font-bold h-16 px-12 rounded-full text-lg shadow-xl">
                <Link href="/iletisim">
                    Hemen İletişime Geçin
                </Link>
            </Button>
         </div>
      </section>
    </div>
  );
}

function PremiumListItem({ text, small = false }: { text: string, small?: boolean }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <span className={`${small ? 'text-base' : 'text-lg'} text-slate-300 font-medium`}>{text}</span>
        </div>
    )
}