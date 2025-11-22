import { Wifi, Router, Globe, Share2, Shield, CheckCircle, Zap, ArrowRight, ExternalLink, Signal, Box, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import imgLand from "@assets/generated_images/futuristic_navy_blue_technology_network_background.png"; // Placeholder

export default function ServicesLand() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2668&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl animate-in slide-in-from-left duration-700">
            <div className="flex items-center gap-3 text-accent mb-8">
                <div className="p-2 bg-accent/10 rounded-lg backdrop-blur-sm border border-accent/20">
                    <Wifi className="w-6 h-6 animate-pulse" />
                </div>
                <span className="font-mono tracking-[0.2em] uppercase text-sm font-semibold">Connectivity Everywhere</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-8 leading-[0.9] tracking-tight">
              KARA <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 font-light">
                HABERLEŞMESİ
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-light">
              Peplink SD-WAN teknolojisi ve Teltonika endüstriyel çözümleri ile 
              zorlu sahalarda ve hareket halinde kesintisiz, güvenli ve yönetilebilir bağlantı altyapıları kuruyoruz.
            </p>
            <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-accent text-primary hover:bg-cyan-400 font-bold h-14 px-10 rounded-full text-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105">
                    <Link href="/iletisim">
                    Proje Başlatın
                    </Link>
                </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Tabs */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 transform origin-top-right z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
            <Tabs defaultValue="peplink" className="w-full">
                <div className="flex justify-center mb-16">
                    <TabsList className="inline-flex h-auto p-2 bg-slate-100 rounded-full border border-slate-200 shadow-inner">
                        <TabsTrigger value="peplink" className="rounded-full px-8 py-4 text-lg font-bold data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg transition-all flex items-center gap-3 text-slate-500">
                            <Router className="w-5 h-5" /> Peplink SD-WAN
                        </TabsTrigger>
                        <TabsTrigger value="teltonika" className="rounded-full px-8 py-4 text-lg font-bold data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg transition-all flex items-center gap-3 text-slate-500">
                            <Box className="w-5 h-5" /> Teltonika Networks
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* PEPLINK CONTENT */}
                <TabsContent value="peplink" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Left Column: Content */}
                        <div className="lg:col-span-7 space-y-10">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                                    Kesintisiz Bağlantı İçin <br/>
                                    <span className="text-indigo-600">SpeedFusion™ Teknolojisi</span>
                                </h2>
                                <p className="text-xl text-slate-600 leading-relaxed">
                                    Peplink, birden fazla internet kaynağını (Starlink, 4G/5G, VSAT, Fiber) birleştirerek 
                                    tek bir "kırılmaz" (unbreakable) bağlantı oluşturur. SD-WAN yetenekleri ile 
                                    trafik akışını optimize eder ve maliyetleri düşürür.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <PremiumFeatureCard 
                                    icon={<Share2 className="text-white" />}
                                    title="Bandwidth Bonding"
                                    desc="Tüm bağlantı hızlarını birleştirerek tek ve süper hızlı bir hat elde edin."
                                    color="bg-indigo-600"
                                />
                                <PremiumFeatureCard 
                                    icon={<Shield className="text-white" />}
                                    title="Hot Failover"
                                    desc="Bir hat kopsa bile oturumlarınız (VoIP, Video) düşmeden devam etsin."
                                    color="bg-cyan-600"
                                />
                                <PremiumFeatureCard 
                                    icon={<Router className="text-white" />}
                                    title="WAN Smoothing"
                                    desc="Veri paketlerini yedekleyerek jitter ve paket kaybını tamamen ortadan kaldırın."
                                    color="bg-purple-600"
                                />
                                <PremiumFeatureCard 
                                    icon={<Globe className="text-white" />}
                                    title="InControl2"
                                    desc="Tüm filonuzu ve cihazlarınızı bulut tabanlı tek ekrandan yönetin."
                                    color="bg-slate-800"
                                />
                            </div>
                        </div>

                        {/* Right Column: Visuals & Use Cases */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-3xl p-8 text-white shadow-2xl transform lg:translate-y-12 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
                                
                                <h3 className="text-2xl font-bold mb-6 relative z-10">Neden Peplink?</h3>
                                <ul className="space-y-6 relative z-10">
                                    <PremiumListItem title="Starlink Entegrasyonu" desc="Starlink ve 4G/5G'yi birleştirerek hibrit ağlar oluşturun." />
                                    <PremiumListItem title="Mobil Yayıncılık" desc="Canlı yayın araçları için güvenilir uplink." />
                                    <PremiumListItem title="Denizcilik" desc="Kıyıdan uzaklaştıkça 4G'den uyduya kesintisiz geçiş." />
                                </ul>
                                <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
                                    <Button asChild variant="outline" className="w-full border-white/20 text-white hover:bg-white hover:text-slate-900 h-12">
                                        <Link href="/kara-haberlesmesi/peplink">
                                            Peplink Ürünlerini İncele <ArrowRight className="ml-2 w-4 h-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* TELTONIKA CONTENT */}
                <TabsContent value="teltonika" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                         {/* Left Column: Content */}
                         <div className="lg:col-span-7 space-y-10">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                                    Endüstriyel IoT İçin <br/>
                                    <span className="text-blue-600">Güvenilir Bağlantı</span>
                                </h2>
                                <p className="text-xl text-slate-600 leading-relaxed">
                                    Teltonika Networks; endüstriyel ortamlar için tasarlanmış, sağlam ve güvenilir 
                                    4G/5G router, gateway ve switch çözümleri sunar. Zorlu koşullarda bile 
                                    M2M ve IoT operasyonlarınızın sürekliliğini sağlar.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <PremiumFeatureCard 
                                    icon={<Box className="text-white" />}
                                    title="Endüstriyel Dizayn"
                                    desc="Titreşim, nem ve aşırı sıcaklıklara dayanıklı alüminyum kasa."
                                    color="bg-slate-800"
                                />
                                <PremiumFeatureCard 
                                    icon={<Globe className="text-white" />}
                                    title="RMS Yönetim"
                                    desc="Binlerce cihazı tek bir platform üzerinden uzaktan yönetin ve güncelleyin."
                                    color="bg-blue-600"
                                />
                                <PremiumFeatureCard 
                                    icon={<Signal className="text-white" />}
                                    title="4G LTE & 5G"
                                    desc="Global frekans bantlarını destekleyen yüksek hızlı hücresel bağlantı."
                                    color="bg-sky-500"
                                />
                                <PremiumFeatureCard 
                                    icon={<Shield className="text-white" />}
                                    title="Yüksek Güvenlik"
                                    desc="VPN, Firewall ve gelişmiş siber güvenlik özellikleri entegre."
                                    color="bg-emerald-600"
                                />
                            </div>
                        </div>

                        {/* Right Column: Visuals & Use Cases */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="bg-gradient-to-br from-slate-800 to-slate-950 rounded-3xl p-8 text-white shadow-2xl transform lg:translate-y-12 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                                
                                <h3 className="text-2xl font-bold mb-6 relative z-10">Kullanım Alanları</h3>
                                <ul className="space-y-6 relative z-10">
                                    <PremiumListItem title="Akıllı Şehirler" desc="Trafik sistemleri, CCTV ve sensör ağları." />
                                    <PremiumListItem title="Enerji Santralleri" desc="SCADA sistemleri için güvenli uzaktan erişim." />
                                    <PremiumListItem title="Toplu Taşıma" desc="Otobüs ve trenler için yolcu WiFi ve telemetri." />
                                    <PremiumListItem title="Perakende & ATM" desc="POS sistemleri için yedekli bağlantı." />
                                </ul>
                                <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
                                    <Button asChild variant="outline" className="w-full border-white/20 text-white hover:bg-white hover:text-slate-900 h-12">
                                        <Link href="/kara-haberlesmesi/teltonika">
                                            Teltonika Ürünlerini İncele <ArrowRight className="ml-2 w-4 h-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
      </section>

      {/* Technical Specs / Comparison Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-heading font-bold text-primary mb-4">Teknik Özellikler & Karşılaştırma</h2>
                <p className="text-muted-foreground">Projeniz için en doğru donanımı seçmenize yardımcı olalım.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <SpecCard 
                    title="Enterprise" 
                    subtitle="Yüksek Performans"
                    features={["Peplink Balance Serisi", "SD-WAN & Bonding", "2.5 Gbps Throughput", "High Availability"]}
                />
                <SpecCard 
                    title="Industrial" 
                    subtitle="Zorlu Koşullar"
                    features={["Teltonika RUT Serisi", "IP30 Alüminyum Kasa", "-40°C to 75°C", "DIN Rail Montaj"]}
                    highlight
                />
                <SpecCard 
                    title="Mobility" 
                    subtitle="Hareket Halinde"
                    features={["Peplink MAX Serisi", "5G/LTE-A Pro", "GPS/GNSS Takip", "E-Mark Sertifikası"]}
                />
            </div>
        </div>
      </section>
    </div>
  );
}

function PremiumFeatureCard({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: string }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
            <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
        </div>
    )
}

function PremiumListItem({ title, desc }: { title: string, desc: string }) {
    return (
        <li className="flex items-start gap-4">
            <div className="mt-1 min-w-[24px] w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-accent" />
            </div>
            <div>
                <h4 className="font-bold text-white text-lg">{title}</h4>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed">{desc}</p>
            </div>
        </li>
    )
}

function SpecCard({ title, subtitle, features, highlight = false }: { title: string, subtitle: string, features: string[], highlight?: boolean }) {
    return (
        <div className={`p-8 rounded-3xl border ${highlight ? 'bg-white border-accent shadow-xl scale-105 z-10' : 'bg-slate-100 border-slate-200'}`}>
            <h3 className="text-2xl font-bold text-primary mb-1">{title}</h3>
            <p className="text-slate-500 mb-8 font-medium">{subtitle}</p>
            <ul className="space-y-4 mb-8">
                {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                        {f}
                    </li>
                ))}
            </ul>
            <Button variant={highlight ? "default" : "outline"} className={`w-full ${highlight ? 'bg-primary hover:bg-primary/90' : ''}`}>
                Detaylı Bilgi
            </Button>
        </div>
    )
}