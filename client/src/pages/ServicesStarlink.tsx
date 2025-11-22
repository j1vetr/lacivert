import { Radio, Wifi, Globe, Rocket, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import imgStarlink from "@assets/generated_images/starlink_satellite_dish_on_a_modern_commercial_ship.png";

export default function ServicesStarlink() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imgStarlink})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-in slide-in-from-left duration-700">
            <div className="flex items-center gap-2 text-accent mb-6">
                <Radio className="w-6 h-6 animate-pulse" />
                <span className="font-mono tracking-widest uppercase">High Speed Low Latency</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 leading-none">
              STARLINK <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 text-4xl md:text-6xl font-light">
                Global Connectivity
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-xl mb-10 leading-relaxed">
              LEO uydu teknolojisi ile dünyanın en uzak noktalarında bile fiber hızında internet. 
              Denizcilik, enerji sahaları ve kırsal bölgeler için devrim niteliğinde bağlantı.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-slate-950 hover:bg-slate-200 font-bold h-14 px-8">
                    <Link href="/iletisim">
                    Hemen Başvur
                    </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white/20 hover:bg-white/10 h-14 px-8">
                    Paketleri İncele
                </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is Starlink */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                    Sınırları Ortadan Kaldırın
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    Starlink, dünyanın en gelişmiş geniş bant uydu internet sistemidir. Geleneksel uyduların aksine, 
                    Dünya'ya çok daha yakın yörüngede (LEO) bulunan binlerce uyduyu kullanarak, gecikmeyi (latency) 
                    minimuma indirir ve indirme hızlarını fiber internet seviyelerine taşır.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FeatureItem icon={<Globe />} title="Global Kapsama" />
                    <FeatureItem icon={<Rocket />} title="Düşük Gecikme (Latency)" />
                    <FeatureItem icon={<Wifi />} title="Yüksek Hız" />
                    <FeatureItem icon={<Radio />} title="Kolay Kurulum" />
                </div>
            </div>
            <div className="bg-slate-100 rounded-3xl p-8 border border-slate-200">
                <h3 className="text-2xl font-bold mb-6">Kullanım Alanları</h3>
                <ul className="space-y-4">
                    <AreaItem title="Ticari Gemiler" desc="Mürettebat refahı ve operasyonel verimlilik." />
                    <AreaItem title="Yatlar" desc="Açık denizde kesintisiz 4K streaming ve ofis." />
                    <AreaItem title="Offshore Platformlar" desc="Enerji sahalarında güvenilir veri akışı." />
                    <AreaItem title="Uzak Çalışma Alanları" desc="Şantiyeler ve maden sahaları." />
                    <AreaItem title="Kırsal Bölgeler" desc="Altyapının olmadığı yerlerde yüksek hız." />
                </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 bg-slate-950 text-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Hizmet Paketleri</h2>
                <p className="text-slate-400">İhtiyacınıza en uygun veri paketini seçin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <PackageCard name="Starter" data="50 GB" recommended={false} />
                <PackageCard name="Professional" data="100 GB" recommended={true} />
                <PackageCard name="Platinum" data="150 GB" recommended={false} />
                <PackageCard name="Enterprise" data="250 GB+" recommended={false} />
            </div>
        </div>
      </section>

      {/* Installation & FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-16 text-center">
                <h2 className="text-3xl font-heading font-bold text-primary mb-6">Kurulum ve Destek</h2>
                <p className="text-muted-foreground">
                    Anten kurulumundan aktivasyona kadar tüm süreci yönetiyoruz. Sonrasında 7/24 uzaktan destek ile 
                    bağlantınızın sürekliliğini sağlıyoruz.
                </p>
            </div>

            <h3 className="text-2xl font-heading font-bold text-primary mb-8">Sıkça Sorulan Sorular</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-medium text-primary">Starlink nerelerde çalışır?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                    Starlink global bir kapsama alanına sahiptir. Açık denizler ve okyanuslar dahil olmak üzere dünyanın neredeyse her yerinde (kutuplar dahil) hizmet vermektedir.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-medium text-primary">Hızlar neye bağlı değişir?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                    Hızlar, gökyüzünün açıklığına ve o anki uydu yoğunluğuna göre değişebilir. Ancak LEO teknolojisi sayesinde geleneksel VSAT sistemlerinden çok daha hızlıdır.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-medium text-primary">Kurulum süresi nedir?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                    Donanım elimizde olduğu sürece kurulum 1 gün içerisinde tamamlanabilir. Gemi montajları için liman programına uyum sağlıyoruz.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger className="text-lg font-medium text-primary">Teknik destek veriyor musunuz?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                    Evet, Lacivert Teknoloji olarak Starlink kurulumu sonrası teknik destek, paket yönetimi ve sorun giderme hizmetleri sunuyoruz.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
      </section>
    </div>
  );
}

function FeatureItem({ icon, title }: { icon: React.ReactNode, title: string }) {
    return (
        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
            <div className="text-accent">{icon}</div>
            <span className="font-bold text-primary">{title}</span>
        </div>
    )
}

function AreaItem({ title, desc }: { title: string, desc: string }) {
    return (
        <li className="border-b border-slate-200 pb-4 last:border-0 last:pb-0">
            <h4 className="font-bold text-primary">{title}</h4>
            <p className="text-sm text-muted-foreground">{desc}</p>
        </li>
    )
}

function PackageCard({ name, data, recommended }: { name: string, data: string, recommended: boolean }) {
    return (
        <Card className={`border-2 relative ${recommended ? "border-accent bg-slate-900" : "border-white/10 bg-white/5"}`}>
            {recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">
                    ÖNERİLEN
                </div>
            )}
            <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl font-bold text-white">{name}</CardTitle>
                <CardDescription className="text-slate-400">Aylık Veri</CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-6">
                <div className="text-4xl font-bold text-white mb-4">{data}</div>
                <ul className="text-sm text-slate-300 space-y-2 text-left px-4">
                    <li className="flex gap-2"><Check className="w-4 h-4 text-accent" /> Yüksek Hız</li>
                    <li className="flex gap-2"><Check className="w-4 h-4 text-accent" /> Düşük Gecikme</li>
                    <li className="flex gap-2"><Check className="w-4 h-4 text-accent" /> Global Roaming</li>
                </ul>
            </CardContent>
            <CardFooter>
                <Button asChild className={`w-full ${recommended ? "bg-accent text-primary hover:bg-accent/90" : "bg-white/10 text-white hover:bg-white/20"}`}>
                    <Link href="/iletisim">
                        Teklif Al
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
