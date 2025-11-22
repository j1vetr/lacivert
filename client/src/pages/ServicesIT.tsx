import { Check, Server, Network, Cloud, Camera, Headset, ArrowRight, Monitor, Database, ShieldCheck, Cpu, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import imgServer from "@assets/generated_images/modern_clean_server_room_with_blue_lighting.png";

export default function ServicesIT() {
  return (
    <div className="bg-white font-sans">
      {/* Hero Section */}
      <section className="relative h-[75vh] flex items-center overflow-hidden bg-slate-900 text-white">
         <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: `url(${imgServer})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-in slide-in-from-bottom-8 duration-700 fade-in">
            <div className="inline-block px-4 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 font-semibold text-sm mb-6 backdrop-blur-md">
                KURUMSAL TEKNOLOJİ ÇÖZÜMLERİ
            </div>
            <h1 className="text-6xl md:text-8xl font-heading font-bold mb-8 leading-tight">
              IT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">DESTEK</span> <br/>
              & ALTYAPI
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              İşletmenizin teknolojik omurgasını güçlendiriyoruz. Sunucu yönetiminden son kullanıcı desteğine, 
              ağ altyapısından bulut çözümlerine kadar 360° profesyonel hizmet.
            </p>
            <div className="flex gap-4">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-500 text-white h-14 px-8 text-lg font-bold rounded-full shadow-lg shadow-blue-900/20">
                    <Link href="/iletisim">
                    Servis Talep Edin
                    </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white hover:text-slate-900 h-14 px-8 text-lg font-medium rounded-full">
                    <Link href="#services">
                    Hizmetleri İncele
                    </Link>
                </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Premium Layout */}
      <section id="services" className="py-32 bg-slate-50">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-24">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
                    Teknolojiniz Emin Ellerde
                </h2>
                <p className="text-xl text-slate-500 leading-relaxed">
                    Siz işinize odaklanın, biz teknolojinize. Uzman ekibimiz ve proaktif yaklaşımımızla 
                    sistemlerinizin kesintisiz çalışmasını sağlıyoruz.
                </p>
            </div>

            <div className="space-y-32">
                
                {/* Service Block 1: IT Support */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center group">
                    <div className="relative order-2 lg:order-1">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-[2.5rem] transform -rotate-2 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                        <div className="relative bg-white p-10 rounded-[2rem] shadow-xl border border-slate-100">
                            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg shadow-blue-200">
                                <Server className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">IT Destek & Bakım</h3>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Bilgisayar, sunucu ve çevre birimlerinizin periyodik bakımlarını yapıyor, 
                                olası arızaları oluşmadan engelliyoruz.
                            </p>
                            <ul className="space-y-4">
                                <DetailItem text="Sunucu Kurulumu ve Yönetimi (Windows/Linux)" />
                                <DetailItem text="Son Kullanıcı (Helpdesk) Desteği" />
                                <DetailItem text="Active Directory Yönetimi" />
                                <DetailItem text="Yazılım Lisanslama ve Envanter Takibi" />
                            </ul>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 pl-8">
                         <h4 className="text-blue-600 font-bold tracking-widest uppercase mb-4 text-sm">YÖNETİLEN HİZMETLER</h4>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            Sistemleriniz <br/>
                            <span className="text-slate-400">7/24 Çalışsın</span>
                        </h2>
                        <p className="text-lg text-slate-500 mb-8">
                            Plansız kesintiler işinize zarar verir. Kurumsal bakım anlaşmalarımız ile 
                            SLA garantili destek sağlıyor, sorunlara dakikalar içinde müdahale ediyoruz.
                        </p>
                        <div className="grid grid-cols-2 gap-8 border-t border-slate-200 pt-8">
                            <div>
                                <div className="text-4xl font-bold text-blue-600 mb-1">15dk</div>
                                <div className="text-sm text-slate-500 font-medium">Ortalama Yanıt Süresi</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-blue-600 mb-1">%99</div>
                                <div className="text-sm text-slate-500 font-medium">Müşteri Memnuniyeti</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Service Block 2: Network */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center group">
                     <div className="pr-8">
                         <h4 className="text-indigo-600 font-bold tracking-widest uppercase mb-4 text-sm">ALTYAPI ÇÖZÜMLERİ</h4>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            Hızlı ve Güvenli <br/>
                            <span className="text-slate-400">Ağ Mimarisi</span>
                        </h2>
                        <p className="text-lg text-slate-500 mb-8">
                            Veri akışınızın kalbi olan ağ altyapınızı en son teknolojilerle kuruyoruz. 
                            Kablosuz ağlardan fiber optik sonlandırmaya kadar uçtan uca çözüm.
                        </p>
                         <div className="flex flex-wrap gap-3">
                            <Badge text="Switching" />
                            <Badge text="Routing" />
                            <Badge text="Firewall" />
                            <Badge text="Wi-Fi 6" />
                            <Badge text="Fiber Optik" />
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-[2.5rem] transform rotate-2 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                        <div className="relative bg-white p-10 rounded-[2rem] shadow-xl border border-slate-100">
                            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg shadow-indigo-200">
                                <Network className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">Network Hizmetleri</h3>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Yapısal kablolama, kabinet düzenleme ve aktif ağ cihazlarının (Switch, Router, AP) 
                                profesyonel kurulum ve konfigürasyonu.
                            </p>
                            <ul className="space-y-4">
                                <DetailItem text="Ağ Topolojisi Planlama" />
                                <DetailItem text="VLAN ve VPN Yapılandırmaları" />
                                <DetailItem text="Merkezi Yönetilen Wi-Fi Sistemleri" />
                                <DetailItem text="Siber Güvenlik Duvarı (Firewall) Kurulumu" />
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Service Block 3: Cloud & Backup */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center group">
                    <div className="relative order-2 lg:order-1">
                        <div className="absolute -inset-4 bg-gradient-to-r from-sky-100 to-blue-100 rounded-[2.5rem] transform -rotate-2 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                        <div className="relative bg-white p-10 rounded-[2rem] shadow-xl border border-slate-100">
                            <div className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg shadow-sky-200">
                                <Cloud className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">Bulut & Yedekleme</h3>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Verileriniz işletmenizin en değerli varlığıdır. Felaket senaryolarına karşı 
                                3-2-1 kuralına uygun yedekleme stratejileri geliştiriyoruz.
                            </p>
                            <ul className="space-y-4">
                                <DetailItem text="Bulut Sunucu (VPS/VDS) Kiralama" />
                                <DetailItem text="Microsoft 365 & Google Workspace Yönetimi" />
                                <DetailItem text="Acronis & Veeam Yedekleme Çözümleri" />
                                <DetailItem text="Felaket Kurtarma (Disaster Recovery)" />
                            </ul>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 pl-8">
                         <h4 className="text-sky-600 font-bold tracking-widest uppercase mb-4 text-sm">VERİ YÖNETİMİ</h4>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            Verileriniz <br/>
                            <span className="text-slate-400">Her Yerde Güvende</span>
                        </h2>
                        <p className="text-lg text-slate-500 mb-8">
                            Fiziksel sunucu bağımlılığını azaltın. Bulut teknolojileri ile esneklik, 
                            ölçeklenebilirlik ve maliyet avantajı sağlayın.
                        </p>
                         <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                            Yedekleme Planı Oluştur <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Çalışma Sürecimiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <StepCard number="01" title="Analiz & Keşif" desc="Mevcut altyapınızı inceliyor ve ihtiyaçlarınızı belirliyoruz." />
                <StepCard number="02" title="Planlama" desc="Size özel en uygun teknolojik çözüm haritasını çıkarıyoruz." />
                <StepCard number="03" title="Uygulama" desc="Profesyonel ekibimizle kurulum ve entegrasyonu yapıyoruz." />
                <StepCard number="04" title="Destek" desc="Sürekli izleme ve bakım ile sistemin sürekliliğini sağlıyoruz." />
            </div>
        </div>
      </section>
    </div>
  );
}

function DetailItem({ text }: { text: string }) {
    return (
        <li className="flex items-start gap-3">
             <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-green-600" />
            </div>
            <span className="text-slate-700 font-medium">{text}</span>
        </li>
    )
}

function Badge({ text }: { text: string }) {
    return (
        <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold border border-slate-200">
            {text}
        </span>
    )
}

function StepCard({ number, title, desc }: { number: string, title: string, desc: string }) {
    return (
        <div className="p-6 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
            <div className="text-4xl font-bold text-blue-500 mb-4 opacity-50">{number}</div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
        </div>
    )
}