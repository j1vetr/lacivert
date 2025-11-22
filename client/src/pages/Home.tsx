import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Server, Wifi, Cloud, Video, Settings, CheckCircle, ArrowRight, Anchor, Building2, Factory, Zap, Radio } from "lucide-react";
import { Link } from "wouter";
import heroBg from "@assets/generated_images/futuristic_navy_blue_technology_network_background.png";
import heroVideo from "@assets/generated_videos/abstract_navy_blue_cyber_security_network_background.mp4";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
            poster={heroBg}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-3xl animate-in slide-in-from-bottom-10 fade-in duration-1000">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 text-sm font-medium mb-6 backdrop-blur-sm">
              Profesyonel Teknoloji Çözümleri
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight">
              Teknolojiyi <span className="text-accent">Güvenle</span> Yönetin
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              Lacivert Teknoloji; IT hizmetleri, siber güvenlik, Starlink uydu interneti ve bulut çözümleri ile işletmenizi geleceğe taşıyor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg h-14 px-8 bg-accent hover:bg-accent/90 text-primary font-semibold">
                <Link href="/it-hizmetleri">
                  Hizmetlerimizi Keşfedin
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-14 px-8 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                <Link href="/iletisim">
                  Bizimle İletişime Geçin
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Services Grid */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Hizmetlerimiz
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Uçtan uca teknoloji çözümleriyle iş süreçlerinizi optimize ediyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ServiceCard 
              icon={<Settings className="w-12 h-12 text-accent" />}
              title="IT Destek"
              description="Sunucu, bilgisayar, yazılım ve donanım altyapınız için profesyonel bakım ve yönetim hizmetleri."
              href="/it-hizmetleri"
            />
            <ServiceCard 
              icon={<Shield className="w-12 h-12 text-accent" />}
              title="Siber Güvenlik"
              description="GTMaritime ortaklığı ile gemi ve ofisleriniz için IMO uyumlu, uçtan uca siber güvenlik."
              href="/siber-guvenlik"
            />
            <ServiceCard 
              icon={<Radio className="w-12 h-12 text-accent" />}
              title="Uzay Haberleşmesi"
              description="Starlink, Eutelsat OneWeb ve Iridium ile dünyanın her yerinde kesintisiz uydu iletişimi."
              href="/uzay-haberlesmesi"
            />
             <ServiceCard 
              icon={<Wifi className="w-12 h-12 text-accent" />}
              title="Kara Haberleşmesi"
              description="E-Sim, Peplink SD-WAN ve Teltonika çözümleri ile karada ve hareket halinde güvenli bağlantı."
              href="/kara-haberlesmesi"
            />
          </div>
        </div>
      </section>

      {/* Why Us / Advantages */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.15),transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">
                Neden Lacivert Teknoloji?
              </h2>
              <div className="space-y-6">
                <AdvantageItem title="7/24 Teknik Destek" description="Kesintisiz operasyonlarınız için her an yanınızdayız." />
                <AdvantageItem title="Deneyimli Teknik Ekip" description="Alanında uzman sertifikalı mühendis kadrosu." />
                <AdvantageItem title="Kurumsal SLA Yaklaşımı" description="Garanti edilen hizmet seviyeleri ve şeffaf raporlama." />
                <AdvantageItem title="Uzak ve Yerinde Destek" description="Sorunlara en hızlı şekilde müdahale ediyoruz." />
                <AdvantageItem title="Ölçeklenebilir Çözümler" description="Filo ve şube yapılarına uygun merkezi yönetim." />
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center hover:bg-white/20 transition-colors duration-300">
                  <Anchor className="w-12 h-12 text-accent mb-4" />
                  <h3 className="font-bold text-lg">Denizcilik</h3>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center hover:bg-white/20 transition-colors duration-300 mt-8">
                  <Building2 className="w-12 h-12 text-accent mb-4" />
                  <h3 className="font-bold text-lg">Kurumsal</h3>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center hover:bg-white/20 transition-colors duration-300">
                  <Factory className="w-12 h-12 text-accent mb-4" />
                  <h3 className="font-bold text-lg">Endüstriyel</h3>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center hover:bg-white/20 transition-colors duration-300 mt-8">
                  <Zap className="w-12 h-12 text-accent mb-4" />
                  <h3 className="font-bold text-lg">Enerji</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
            Teknolojinizi Geleceğe Hazırlayın
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            İhtiyaçlarınıza özel çözümler için uzman ekibimizle görüşün.
          </p>
          <Button asChild size="lg" className="text-lg px-10 h-14 shadow-xl shadow-primary/20">
            <Link href="/iletisim">
              Hemen Teklif Alın
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, description, href }: { icon: React.ReactNode, title: string, description: string, href: string }) {
  return (
    <Link href={href}>
      <div className="group bg-white p-8 rounded-xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col">
        <div className="mb-6 p-4 bg-slate-50 rounded-lg w-fit group-hover:bg-accent/10 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">{title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{description}</p>
        <div className="flex items-center text-accent font-medium text-sm group-hover:translate-x-2 transition-transform">
          Detaylı Bilgi <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </div>
    </Link>
  );
}

function AdvantageItem({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 bg-accent/20 p-1 rounded-full">
        <CheckCircle className="w-5 h-5 text-accent" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-slate-300">{description}</p>
      </div>
    </div>
  );
}
