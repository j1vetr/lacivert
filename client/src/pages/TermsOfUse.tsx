import { FileText, Scale } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function TermsOfUse() {
  return (
    <div>
      <SEO title="Kullanım Şartları" />
      {/* Header */}
      <section className="bg-slate-950 text-white pt-44 sm:pt-48 md:pt-52 lg:pt-44 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scale className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">Kullanım Şartları</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Web sitemizi ve hizmetlerimizi kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız. Lütfen dikkatlice okuyunuz.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-slate lg:prose-lg max-w-none">
            <p className="lead text-xl text-muted-foreground mb-8">
              Bu web sitesi ("Site"), Lacivert Teknoloji tarafından işletilmektedir. Siteye erişim sağlayarak veya Siteyi kullanarak, bu Kullanım Şartları'nı kabul etmiş olursunuz.
            </p>

            <h3 className="text-2xl font-heading font-bold text-primary mt-8 mb-4">1. Hizmetlerin Kapsamı</h3>
            <p>
              Lacivert Teknoloji; IT danışmanlığı, siber güvenlik, ağ kurulumu ve teknik destek hizmetleri sunar. Web sitesinde yer alan bilgiler genel bilgilendirme amaçlıdır ve bağlayıcı bir hizmet taahhüdü oluşturmaz. Kesin hizmet kapsamı, taraflar arasında imzalanacak sözleşmelerle belirlenir.
            </p>

            <h3 className="text-2xl font-heading font-bold text-primary mt-8 mb-4">2. Fikri Mülkiyet Hakları</h3>
            <p>
              Bu web sitesindeki tüm içerik (metinler, grafikler, logolar, görseller, yazılımlar ve kaynak kodları), Lacivert Teknoloji'ye aittir ve ulusal/uluslararası telif hakkı yasalarıyla korunmaktadır. İzinsiz kopyalanması, çoğaltılması veya ticari amaçla kullanılması yasaktır.
            </p>

            <h3 className="text-2xl font-heading font-bold text-primary mt-8 mb-4">3. Kullanıcı Sorumlulukları</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Siteyi yasalara aykırı amaçlarla kullanamazsınız.</li>
              <li>Sitenin güvenliğini tehdit edecek veya işleyişini bozacak girişimlerde bulunamazsınız.</li>
              <li>İletişim formları üzerinden yanıltıcı veya yanlış bilgi beyan edemezsiniz.</li>
            </ul>

            <h3 className="text-2xl font-heading font-bold text-primary mt-8 mb-4">4. Sorumluluk Reddi</h3>
            <p>
              Lacivert Teknoloji, web sitesinin kesintisiz veya hatasız çalışacağını garanti etmez. Sitede yer alan bilgilerin güncelliği konusunda azami özen gösterilse de, olası hatalardan veya eksikliklerden dolayı sorumluluk kabul edilmez. Site üzerinden verilen linkler (üçüncü taraf siteleri) üzerinde kontrolümüz yoktur ve içeriklerinden sorumlu değiliz.
            </p>

            <h3 className="text-2xl font-heading font-bold text-primary mt-8 mb-4">5. Değişiklikler</h3>
            <p>
              Lacivert Teknoloji, bu Kullanım Şartları'nı dilediği zaman önceden bildirimde bulunmaksızın değiştirme hakkını saklı tutar. Değişiklikler sitede yayınlandığı andan itibaren geçerli olur.
            </p>

            <h3 className="text-2xl font-heading font-bold text-primary mt-8 mb-4">6. Yetkili Mahkeme</h3>
            <p>
              Bu şartların uygulanmasından doğabilecek uyuşmazlıklarda İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
            </p>

            <div className="mt-12 pt-8 border-t border-slate-200 text-sm text-slate-500">
              Son Güncelleme: 22 Kasım 2025
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
