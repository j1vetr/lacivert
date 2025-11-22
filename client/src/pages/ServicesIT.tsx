import { Check, Server, Network, Cloud, Camera, Headset, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import imgServer from "@assets/generated_images/modern_clean_server_room_with_blue_lighting.png";

export default function ServicesIT() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imgServer})` }}
        >
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-[2px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 animate-in slide-in-from-bottom-4">IT Hizmetleri</h1>
          <p className="text-xl text-slate-200 max-w-2xl mb-8 animate-in slide-in-from-bottom-6 delay-100">
            İşletmenizin teknolojik omurgasını güçlendiriyoruz. Bakım, destek ve altyapı çözümleriyle kesintisiz operasyon.
          </p>
          <Button asChild size="lg" className="bg-accent text-primary hover:bg-accent/90 animate-in slide-in-from-bottom-8 delay-200">
            <Link href="/iletisim">
              Teklif İste
            </Link>
          </Button>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 space-y-24">
          
          {/* IT Support */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-accent/10 p-3 rounded-lg w-fit mb-4">
                <Server className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-3xl font-bold text-primary mb-4">IT Destek & Bakım</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Sunucu, bilgisayar, yazılım, ağ, güvenlik ve yedekleme sistemlerinizin periyodik bakımı ve yönetimi. 
                Sistemlerinizin her zaman güncel ve çalışır durumda olmasını sağlıyoruz.
              </p>
              <ul className="space-y-3">
                <ListItem>Sunucu Yönetimi ve Güncelleme</ListItem>
                <ListItem>Son Kullanıcı Desteği</ListItem>
                <ListItem>Yazılım Lisanslama ve Takibi</ListItem>
                <ListItem>Düzenli Yedekleme Kontrolleri</ListItem>
              </ul>
            </div>
            <div className="order-1 lg:order-2 bg-slate-100 rounded-2xl h-80 w-full flex items-center justify-center border border-slate-200">
               {/* Placeholder for visual if needed, or keep abstract */}
               <Server className="w-32 h-32 text-slate-300" />
            </div>
          </div>

          {/* Network */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-100 rounded-2xl h-80 w-full flex items-center justify-center border border-slate-200">
               <Network className="w-32 h-32 text-slate-300" />
            </div>
            <div>
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                <Network className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-primary mb-4">Network Hizmetleri</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Güçlü ve güvenli ağ altyapısı kurulumu. Switch, router ve firewall yapılandırmaları ile 
                veri akışınızı hızlandırıyor ve güven altına alıyoruz.
              </p>
              <ul className="space-y-3">
                <ListItem>Ağ Mimarisi Planlama</ListItem>
                <ListItem>Kablolama ve Altyapı</ListItem>
                <ListItem>Switch ve Router Kurulumu</ListItem>
                <ListItem>Firewall Yapılandırması</ListItem>
              </ul>
            </div>
          </div>

          {/* Cloud */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-accent/10 p-3 rounded-lg w-fit mb-4">
                <Cloud className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-3xl font-bold text-primary mb-4">Bulut Çözümleri</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Verilerinize her yerden güvenle erişin. Bulut tabanlı depolama, yedekleme ve veri taşıma 
                hizmetleri ile iş sürekliliğinizi garanti altına alın.
              </p>
              <ul className="space-y-3">
                <ListItem>Bulut Depolama ve Yedekleme</ListItem>
                <ListItem>Office 365 / Google Workspace Yönetimi</ListItem>
                <ListItem>Veri Taşıma (Migration)</ListItem>
                <ListItem>Hibrit Bulut Yapıları</ListItem>
              </ul>
            </div>
            <div className="order-1 lg:order-2 bg-slate-100 rounded-2xl h-80 w-full flex items-center justify-center border border-slate-200">
               <Cloud className="w-32 h-32 text-slate-300" />
            </div>
          </div>

           {/* CCTV */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-100 rounded-2xl h-80 w-full flex items-center justify-center border border-slate-200">
               <Camera className="w-32 h-32 text-slate-300" />
            </div>
            <div>
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-primary mb-4">IP Kamera & Güvenlik</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Tesisleriniz 7/24 gözlem altında. Yüksek çözünürlüklü IP kamera sistemleri, kayıt 
                sunucuları ve uzaktan izleme çözümleri.
              </p>
              <ul className="space-y-3">
                <ListItem>Proje ve Keşif</ListItem>
                <ListItem>IP Kamera Kurulumu</ListItem>
                <ListItem>NVR/DVR Kayıt Sistemleri</ListItem>
                <ListItem>Mobil İzleme Entegrasyonu</ListItem>
              </ul>
            </div>
          </div>

          {/* Tech Support */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-accent/10 p-3 rounded-lg w-fit mb-4">
                <Headset className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-3xl font-bold text-primary mb-4">Teknik Destek</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Sorunlarınıza anında çözüm. İster uzaktan bağlantı ile ister yerinde müdahale ile 
                iş süreçlerinizin aksamasını engelliyoruz.
              </p>
              <ul className="space-y-3">
                <ListItem>Yerinde Teknik Servis</ListItem>
                <ListItem>Uzaktan Bağlantı Desteği</ListItem>
                <ListItem>Telefon ve E-posta Desteği</ListItem>
                <ListItem>Periyodik Bakım Anlaşmaları</ListItem>
              </ul>
            </div>
            <div className="order-1 lg:order-2 bg-slate-100 rounded-2xl h-80 w-full flex items-center justify-center border border-slate-200">
               <Headset className="w-32 h-32 text-slate-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Banner */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6 border border-white/10 rounded-xl bg-white/5">
              <h3 className="text-4xl font-bold text-accent mb-2">7/24</h3>
              <p className="text-slate-300">Kesintisiz Destek Ekibi</p>
            </div>
            <div className="p-6 border border-white/10 rounded-xl bg-white/5">
              <h3 className="text-4xl font-bold text-accent mb-2">%99.9</h3>
              <p className="text-slate-300">Uptime Garantisi</p>
            </div>
            <div className="p-6 border border-white/10 rounded-xl bg-white/5">
              <h3 className="text-4xl font-bold text-accent mb-2">10+</h3>
              <p className="text-slate-300">Yıllık Sektör Deneyimi</p>
            </div>
            <div className="p-6 border border-white/10 rounded-xl bg-white/5">
              <h3 className="text-4xl font-bold text-accent mb-2">SLA</h3>
              <p className="text-slate-300">Kurumsal Hizmet Seviyesi</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3">
      <div className="bg-accent/20 p-1 rounded-full shrink-0">
        <Check className="w-4 h-4 text-accent" />
      </div>
      <span className="font-medium">{children}</span>
    </li>
  );
}
