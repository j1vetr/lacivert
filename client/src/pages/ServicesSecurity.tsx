import { Shield, Lock, Eye, FileWarning, Server, Activity, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroBg from "@assets/generated_images/futuristic_digital_cyber_security_shield_concept.png";

export default function ServicesSecurity() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-in slide-in-from-left duration-700">
            <div className="flex items-center gap-2 text-accent mb-6">
                <Shield className="w-6 h-6 animate-pulse" />
                <span className="font-mono tracking-widest uppercase">Cyber Security</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 leading-none">
              SİBER <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 text-4xl md:text-6xl font-light">
                GÜVENLİK
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-xl mb-10 leading-relaxed">
              Denizcilik ve kurumsal ağlarınız için GTMaritime ortaklığı ile IMO uyumlu, 
              düşük ve yüksek bant genişliğine uygun uçtan uca siber güvenlik çözümleri.
            </p>
            <Button asChild size="lg" className="bg-accent text-primary hover:bg-accent/90 font-bold h-14 px-8">
                <Link href="/iletisim">
                Güvenlik Analizi Talep Edin
                </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                        Uçtan Uca Koruma
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                        Lacivert Teknoloji, GTMaritime ile birlikte gemileriniz ve ofisleriniz için 
                        kapsamlı siber güvenlik paketleri sunar. İster yüksek bant genişliğine sahip VSAT/Starlink kullanın, 
                        ister düşük bant genişliğine sahip L-Band sistemleri; her senaryo için optimize edilmiş çözümlerimiz mevcuttur.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <FeatureItem 
                            icon={<FileWarning />} 
                            title="IMO Uyumluluğu" 
                            desc="Uluslararası denizcilik siber güvenlik regülasyonlarına tam uyum." 
                        />
                        <FeatureItem 
                            icon={<Activity />} 
                            title="7/24 SOC Desteği" 
                            desc="ITIL sertifikalı mühendislerle sürekli izleme ve tehdit müdahalesi." 
                        />
                        <FeatureItem 
                            icon={<Server />} 
                            title="Merkezi Yönetim" 
                            desc="Tüm filonuzu tek bir dashboard üzerinden yönetin ve raporlayın." 
                        />
                         <FeatureItem 
                            icon={<Lock />} 
                            title="Offline Koruma" 
                            desc="İnternet bağlantısı olmasa bile tehditlere karşı tam koruma." 
                        />
                    </div>
                </div>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                    <h3 className="text-2xl font-bold mb-8 text-primary">Çözüm Paketlerimiz</h3>
                    
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <h4 className="text-lg font-bold">Yüksek Bant Genişliği (EDR)</h4>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                                CrowdStrike ortaklığı ile sunulan yeni nesil EDR çözümü. 
                                İmza tabanlı olmayan, yapay zeka destekli (NGAV) koruma.
                            </p>
                            <ul className="space-y-2">
                                <ListItem text="Yapay Zeka Destekli Antivirüs" />
                                <ListItem text="Anlık Tehdit Tespiti ve Yanıtı" />
                                <ListItem text="Offline Çalışabilme" />
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                                    <Lock className="w-6 h-6" />
                                </div>
                                <h4 className="text-lg font-bold">Düşük Bant Genişliği</h4>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                                ESET ile güçlendirilmiş, veri tüketimini minimize eden özel paketler. 
                                L-Band ve kısıtlı bağlantılar için idealdir.
                            </p>
                            <ul className="space-y-2">
                                <ListItem text="Optimize Edilmiş Güncellemeler" />
                                <ListItem text="Düşük Veri Tüketimi" />
                                <ListItem text="Merkezi Kontrol" />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex flex-col gap-2">
            <div className="text-accent mb-1">{icon}</div>
            <h3 className="font-bold text-primary">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
    )
}

function ListItem({ text }: { text: string }) {
    return (
        <li className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle className="w-4 h-4 text-accent" />
            {text}
        </li>
    )
}