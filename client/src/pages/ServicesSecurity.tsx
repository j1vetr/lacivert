import { Shield, Lock, Eye, Globe, Server, FileCheck, Activity, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import imgSecurity from "@assets/generated_images/abstract_cybersecurity_digital_shield_concept.png";

export default function ServicesSecurity() {
  return (
    <div className="pt-20">
       {/* Hero */}
       <section className="relative h-[70vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imgSecurity})` }}
        >
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[1px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 mb-6">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-wider">Kritik Altyapı Koruması</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight">
              Siber Tehditlere Karşı <br/><span className="text-accent">Tam Koruma</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mb-10">
              Şirketlerin ve gemilerin network, endpoint ve tüm dijital altyapılarını en yeni nesil siber tehditlere karşı koruyoruz.
            </p>
            <Button asChild size="lg" className="h-14 px-8 text-lg bg-accent text-primary hover:bg-accent/90">
              <Link href="/iletisim">
                Güvenlik Analizi Talep Et
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Definition */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-8">
            Dijital Varlıklarınız Güvende mi?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Siber saldırılar her geçen gün daha karmaşık hale geliyor. Lacivert Teknoloji olarak, sadece bir antivirüs yazılımı değil, 
            katmanlı ve proaktif bir güvenlik stratejisi sunuyoruz. Özellikle denizcilik sektörü gibi düşük bant genişliğine sahip 
            alanlarda optimize edilmiş çözümlerimizle fark yaratıyoruz.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-primary mb-12 text-center">Güvenlik Çözümlerimiz</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SecurityCard 
              icon={<Shield className="w-10 h-10" />}
              title="Endpoint Güvenliği (EDR)"
              description="Son kullanıcı cihazlarında yapay zeka destekli tehdit algılama ve engelleme."
            />
            <SecurityCard 
              icon={<Lock className="w-10 h-10" />}
              title="Ağ Güvenliği"
              description="Firewall, IPS/IDS sistemleri ile ağ trafiğinizi zararlı aktivitelerden arındırıyoruz."
            />
            <SecurityCard 
              icon={<Globe className="w-10 h-10" />}
              title="Low-Bandwidth Koruma"
              description="Uydu interneti kullanan gemi ve uzak sahalar için optimize edilmiş hafif güvenlik ajanları."
            />
            <SecurityCard 
              icon={<Server className="w-10 h-10" />}
              title="Merkezi Yönetim"
              description="Tüm şube ve filonuzun güvenlik durumunu tek bir merkezden izleyin ve yönetin."
            />
            <SecurityCard 
              icon={<Eye className="w-10 h-10" />}
              title="7/24 İzleme (SOC)"
              description="Güvenlik operasyon merkezimiz ile tehditleri anında tespit edip müdahale ediyoruz."
            />
            <SecurityCard 
              icon={<FileCheck className="w-10 h-10" />}
              title="Raporlama & Uyumluluk"
              description="KVKK, GDPR ve sektörel regülasyonlara uygun detaylı güvenlik raporları."
            />
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">Kimler İçin?</h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-accent p-2 rounded-lg shrink-0">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Denizcilik Sektörü</h3>
                    <p className="text-slate-300">Gemiler için IMO 2021 uyumlu siber risk yönetimi.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-white p-2 rounded-lg shrink-0">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Endüstriyel Tesisler</h3>
                    <p className="text-slate-300">OT/IoT ağları için özel güvenlik katmanları.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-accent p-2 rounded-lg shrink-0">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Kurumsal Yapılar & KOBİ</h3>
                    <p className="text-slate-300">Veri güvenliği ve iş sürekliliği için kapsamlı koruma.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 text-center">Siber Güvenlikte 3 Adım</h3>
              <div className="space-y-8 relative">
                {/* Connecting Line */}
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-white/20"></div>
                
                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center font-bold text-xl">1</div>
                  <div>
                    <h4 className="font-bold text-lg">Analiz & Tespit</h4>
                    <p className="text-sm text-slate-400">Mevcut risklerin belirlenmesi.</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center font-bold text-xl">2</div>
                  <div>
                    <h4 className="font-bold text-lg">Koruma & Kurulum</h4>
                    <p className="text-sm text-slate-400">Güvenlik katmanlarının inşası.</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center font-bold text-xl">3</div>
                  <div>
                    <h4 className="font-bold text-lg">İzleme & Müdahale</h4>
                    <p className="text-sm text-slate-400">7/24 aktif koruma.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-heading font-bold text-primary mb-12 text-center">Sıkça Sorulan Sorular</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium text-primary">Koruma kapsamınız neleri içeriyor?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Endpoint (bilgisayar/sunucu) koruması, ağ güvenliği (firewall), e-posta güvenliği ve bulut güvenliği hizmetlerini kapsayan bütünleşik bir yapı sunuyoruz.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium text-primary">Gemilerde internet yavaş, sistem çalışır mı?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Evet, denizcilik çözümlerimiz düşük bant genişliği (low-bandwidth) için özel olarak optimize edilmiştir. Uydu internetini yormadan güncelleme ve koruma sağlar.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium text-primary">Destek süreciniz nasıl işliyor?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                7/24 çalışan SOC (Güvenlik Operasyon Merkezi) ekibimiz alarmları izler. Bir tehdit algılandığında uzaktan anında müdahale eder ve sizi bilgilendiririz.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-medium text-primary">Kurulum ne kadar sürer?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yapınızın büyüklüğüne göre değişmekle birlikte, endpoint ajanlarının kurulumu merkezi olarak çok hızlı bir şekilde tamamlanabilir. Genellikle 1-3 iş günü içinde tam koruma sağlarız.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}

function SecurityCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-xl border border-border shadow-sm hover:shadow-lg hover:border-accent transition-all duration-300">
      <div className="text-accent mb-6">{icon}</div>
      <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
