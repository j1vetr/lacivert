import { Wifi, Router, Globe, Share2, Shield, Smartphone, CheckCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import imgLand from "@assets/generated_images/futuristic_navy_blue_technology_network_background.png"; // Placeholder, using generic tech bg

export default function ServicesLand() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imgLand})` }}
        >
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-in slide-in-from-left duration-700">
            <div className="flex items-center gap-2 text-accent mb-6">
                <Wifi className="w-6 h-6 animate-pulse" />
                <span className="font-mono tracking-widest uppercase">Connectivity Everywhere</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 leading-none">
              KARA <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 text-4xl md:text-6xl font-light">
                HABERLEŞMESİ
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-xl mb-10 leading-relaxed">
              E-Sim teknolojisi, Peplink SD-WAN çözümleri ve Teltonika endüstriyel routerlar ile 
              karada, hareket halinde ve uzak sahalarda kesintisiz bağlantı.
            </p>
            <Button asChild size="lg" className="bg-white text-slate-950 hover:bg-slate-200 font-bold h-14 px-8">
                <Link href="/iletisim">
                Çözüm Ortağımız Olun
                </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Solutions Tabs */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
            <Tabs defaultValue="esim" className="w-full">
                <div className="flex justify-center mb-12">
                    <TabsList className="grid w-full max-w-3xl grid-cols-3 h-16 p-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                        <TabsTrigger value="esim" className="rounded-full text-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">E-Sim</TabsTrigger>
                        <TabsTrigger value="peplink" className="rounded-full text-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">Peplink</TabsTrigger>
                        <TabsTrigger value="teltonika" className="rounded-full text-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">Teltonika</TabsTrigger>
                    </TabsList>
                </div>

                {/* E-SIM CONTENT */}
                <TabsContent value="esim" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-bold mb-6">
                                <Smartphone className="w-4 h-4" /> Global Roaming
                            </div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                                Kurumsal E-Sim Çözümleri
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                Fiziksel SIM kartlara ihtiyaç duymadan, dünya genelinde yüzlerce operatör ağına 
                                anında erişim sağlayın. Kurumsal filolar, seyahat eden personeller ve 
                                IoT cihazları için esnek, yönetilebilir ve maliyet etkin global bağlantı.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                <FeatureItem icon={<Globe />} title="200+ Ülke Kapsaması" />
                                <FeatureItem icon={<Share2 />} title="Multi-Network Geçişi" />
                                <FeatureItem icon={<Shield />} title="Merkezi Yönetim" />
                                <FeatureItem icon={<Zap />} title="Anında Aktivasyon" />
                            </div>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                            <h3 className="text-xl font-bold mb-6">E-Sim Avantajları</h3>
                            <ul className="space-y-4">
                                <ListItem title="Lojistik Kolaylığı" desc="SIM kart kargolama ve değiştirme derdine son." />
                                <ListItem title="Maliyet Kontrolü" desc="Sabit fiyatlı global paketlerle fatura sürprizleri yok." />
                                <ListItem title="Yedeklilik" desc="Ana bağlantı koptuğunda anında devreye giren hücresel yedek." />
                            </ul>
                        </div>
                    </div>
                </TabsContent>

                {/* PEPLINK CONTENT */}
                <TabsContent value="peplink" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-bold mb-6">
                                <Router className="w-4 h-4" /> SD-WAN & Bonding
                            </div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                                Peplink SD-WAN
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                SpeedFusion teknolojisi ile birden fazla bağlantıyı (4G/5G, Starlink, VSAT, ADSL) 
                                tek bir süper hızlı tünelde birleştirin. Kesintisiz (Unbreakable) internet bağlantısı 
                                ile iş sürekliliğinizi garanti altına alın.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                <FeatureItem icon={<Share2 />} title="Bandwidth Bonding" />
                                <FeatureItem icon={<Shield />} title="Hot Failover" />
                                <FeatureItem icon={<Router />} title="WAN Smoothing" />
                                <FeatureItem icon={<Globe />} title="InControl2 Yönetim" />
                            </div>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                            <h3 className="text-xl font-bold mb-6">Neden Peplink?</h3>
                            <ul className="space-y-4">
                                <ListItem title="Kesintisiz Bağlantı" desc="Bir hat kopsa bile oturumlarınız (VoIP, Video) düşmez." />
                                <ListItem title="Starlink Entegrasyonu" desc="Starlink ve 4G/5G'yi birleştirerek hibrit ağlar oluşturun." />
                                <ListItem title="Merkezi Filo Yönetimi" desc="Tüm routerlarınızı tek ekrandan izleyin ve yönetin." />
                            </ul>
                        </div>
                    </div>
                </TabsContent>

                {/* TELTONIKA CONTENT */}
                <TabsContent value="teltonika" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-white text-sm font-bold mb-6">
                                <Router className="w-4 h-4" /> Industrial IoT
                            </div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                                Teltonika Networks
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                Endüstriyel ortamlar için tasarlanmış, sağlam ve güvenilir 4G/5G router, 
                                gateway ve switch çözümleri. M2M (Makineden Makineye) ve IoT uygulamaları için 
                                uzaktan yönetim ve yüksek güvenlik standartları.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                <FeatureItem icon={<Shield />} title="Endüstriyel Dayanıklılık" />
                                <FeatureItem icon={<Globe />} title="RMS Uzaktan Yönetim" />
                                <FeatureItem icon={<Wifi />} title="4G LTE & 5G" />
                                <FeatureItem icon={<Router />} title="Kompakt Dizayn" />
                            </div>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                            <h3 className="text-xl font-bold mb-6">Kullanım Alanları</h3>
                            <ul className="space-y-4">
                                <ListItem title="Araç Takip ve Filo" desc="Otobüs, kamyon ve servis araçları için WiFi." />
                                <ListItem title="Akıllı Şehirler" desc="CCTV, trafik ışıkları ve sensör ağları." />
                                <ListItem title="Endüstriyel Otomasyon" desc="Fabrika ve SCADA sistemleri için güvenli VPN." />
                            </ul>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
      </section>
    </div>
  );
}

function FeatureItem({ icon, title }: { icon: React.ReactNode, title: string }) {
    return (
        <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-slate-100">
            <div className="text-accent">{icon}</div>
            <span className="font-bold text-primary text-sm">{title}</span>
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
                <h4 className="font-bold text-primary text-sm">{title}</h4>
                <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
        </li>
    )
}