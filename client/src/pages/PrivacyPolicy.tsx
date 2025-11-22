import { FileText, ShieldCheck } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-slate-950 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">Gizlilik Politikası</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Verilerinizin güvenliği bizim için önemlidir. Kişisel verilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu şeffaflıkla açıklıyoruz.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-slate lg:prose-lg max-w-none">
            <p className="lead text-xl text-muted-foreground mb-8">
              Lacivert Teknoloji ("Şirket"), müşterilerinin ve web sitesi ziyaretçilerinin gizliliğine saygı duyar. Bu Gizlilik Politikası, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") ve ilgili mevzuat uyarınca hazırlanmıştır.
            </p>

            <h3 className="text-2xl font-heading font-bold text-primary mt-8 mb-4">1. Toplanan Veriler</h3>
            <p>
              Hizmetlerimizi kullandığınızda veya web sitemizi ziyaret ettiğinizde aşağıdaki türde bilgileri toplayabiliriz:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Kimlik Bilgileri:</strong> Ad, soyad.</li>
              <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası, adres.</li>
              <li><strong>Teknik Veriler:</strong> IP adresi, tarayıcı türü, cihaz bilgileri, çerezler.</li>
              <li><strong>Hizmet Verileri:</strong> Talep ettiğiniz hizmetlere ilişkin detaylar ve proje gereksinimleri.</li>
            </ul>

            <h3 className="text-2xl font-heading font-bold text-primary mt-8 mb-4">2. Verilerin Kullanım Amacı</h3>
            <p>
              Toplanan kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Hizmetlerimizin sunulması ve operasyonel süreçlerin yürütülmesi.</li>
              <li>Teknik destek taleplerinin karşılanması.</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi.</li>
              <li>Hizmet kalitesinin artırılması ve analiz yapılması.</li>
              <li>İletişim faaliyetlerinin yürütülmesi.</li>
            </ul>

            <h3 className="text-2xl font-heading font-bold text-primary mt-8 mb-4">3. Verilerin Korunması</h3>
            <p>
              Lacivert Teknoloji, kişisel verilerinizi yetkisiz erişime, kayba veya ifşaya karşı korumak için endüstri standardı güvenlik önlemleri (Firewall, SSL şifreleme, güvenli sunucular) uygulamaktadır. Verileriniz, yasal zorunluluklar dışında üçüncü şahıslarla paylaşılmaz.
            </p>

            <h3 className="text-2xl font-heading font-bold text-primary mt-8 mb-4">4. Çerezler (Cookies)</h3>
            <p>
              Web sitemizde kullanıcı deneyimini iyileştirmek için çerezler kullanılmaktadır. Tarayıcı ayarlarınızdan çerezleri dilediğiniz zaman devre dışı bırakabilirsiniz, ancak bu durumda web sitesinin bazı özellikleri düzgün çalışmayabilir.
            </p>

            <h3 className="text-2xl font-heading font-bold text-primary mt-8 mb-4">5. Haklarınız</h3>
            <p>
              KVKK kapsamında kişisel verilerinizin; işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını öğrenme ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme haklarına sahipsiniz.
            </p>

            <h3 className="text-2xl font-heading font-bold text-primary mt-8 mb-4">6. İletişim</h3>
            <p>
              Gizlilik politikamızla ilgili sorularınız veya talepleriniz için <a href="mailto:info@lacivertteknoloji.com" className="text-accent hover:underline">info@lacivertteknoloji.com</a> adresinden bizimle iletişime geçebilirsiniz.
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
