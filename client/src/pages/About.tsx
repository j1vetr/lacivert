import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Target, Lightbulb, Globe, Users, Building2, Ship, Factory, Zap } from "lucide-react";
import imgCloud from "@assets/generated_images/abstract_cloud_computing_network_visualization.png";

export default function About() {
  return (
    <div>
      {/* Header */}
      <section className="bg-slate-900 text-white pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 animate-in fade-in slide-in-from-bottom-4">Hakkımızda</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Teknoloji dünyasında güvenilir, yenilikçi ve çözüm odaklı partneriniz.
          </p>
        </div>
      </section>

      {/* Mission/Vision */}
      <section className="py-20 bg-background transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Target className="w-8 h-8 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Misyonumuz</h2>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  İşletmelerin teknoloji altyapılarını güvenli, hızlı ve sürdürülebilir hale getirmek. 
                  Karmaşık IT süreçlerini basitleştirerek, müşterilerimizin kendi işlerine odaklanmalarını sağlamak.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-slate-900/10 dark:bg-white/10 p-3 rounded-lg">
                    <Lightbulb className="w-8 h-8 text-slate-900 dark:text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Vizyonumuz</h2>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Tüm işletmelerin kesintisiz bağlantı ve güvenli teknoloji deneyimi yaşaması. 
                  Teknolojiyi bir engel değil, büyüme aracı olarak konumlandırmak.
                </p>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
               <img 
                 src={imgCloud} 
                 alt="Cloud Technology" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-primary/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Çalışma Yaklaşımımız</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Sadece bir hizmet sağlayıcı değil, uzun vadeli teknoloji ortağınızız.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 text-slate-900">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Çözüm Odaklı</h3>
              <p className="text-slate-400">Sorunlara değil, kalıcı çözümlere odaklanıyoruz. Proaktif yaklaşımımızla sorunları oluşmadan önlüyoruz.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-slate-900">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Şeffaf İletişim</h3>
              <p className="text-slate-400">Her adımda sizi bilgilendiriyor, anlaşılır raporlar sunuyor ve güvene dayalı bir ilişki kuruyoruz.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 text-slate-900">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Teknik Partnerlik</h3>
              <p className="text-slate-400">Tek seferlik projeler değil, sürdürülebilir ve gelişen bir teknoloji ortaklığı hedefliyoruz.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-4">Hizmet Verdiğimiz Sektörler</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
             <SectorCard icon={<Ship className="w-8 h-8" />} title="Denizcilik" />
             <SectorCard icon={<Zap className="w-8 h-8" />} title="Enerji" />
             <SectorCard icon={<Factory className="w-8 h-8" />} title="Üretim" />
             <SectorCard icon={<Building2 className="w-8 h-8" />} title="Kurumsal Ofisler" />
             <SectorCard icon={<Users className="w-8 h-8" />} title="KOBİ'ler" />
          </div>
        </div>
      </section>
    </div>
  );
}

function SectorCard({ icon, title }: { icon: React.ReactNode, title: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-accent/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg transition-all duration-300 group">
      <div className="text-slate-900 dark:text-white group-hover:text-accent transition-colors mb-3">
        {icon}
      </div>
      <span className="font-medium text-center text-slate-900 dark:text-white">{title}</span>
    </div>
  );
}
