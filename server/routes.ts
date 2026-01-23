import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";
import nodemailer from "nodemailer";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT_TR = `Sen Lacivert Teknoloji'nin müşteri asistanısın. Profesyonel, samimi ve yardımsever bir üslupla konuş.

ŞİRKET: Lacivert Teknoloji - Denizcilik ve kara haberleşmesi uzmanı.

HİZMETLER:
- Starlink Maritime: Gemiler için yüksek hızlı uydu interneti (sayfa: /uzay-haberlesmesi/starlink)
- OneWeb: LEO uydu internet (sayfa: /uzay-haberlesmesi/oneweb)  
- Iridium: Global uydu iletişimi (sayfa: /uzay-haberlesmesi/iridium)
- Peplink: SD-WAN çözümleri (sayfa: /kara-haberlesmesi/peplink)
- Teltonika: IoT ve router (sayfa: /kara-haberlesmesi/teltonika)
- IT Hizmetleri (sayfa: /it-hizmetleri)
- Siber Güvenlik (sayfa: /siber-guvenlik)

SAYFALAR:
- İletişim/Teklif: /iletisim
- Starlink Haritası: /starlink-haritasi
- Hakkımızda: /hakkimizda

YANITLAMA KURALLARI:
1. Türkçe yanıt ver.
2. Markdown KULLANMA. Yıldız, tire, numara listesi, kalın yazı KULLANMA.
3. Doğal, akıcı cümleler kur. Sanki bir müşteri temsilcisi gibi konuş.
4. Kısa ve öz ol. 2-3 cümleyi geçme.
5. Sayfa yönlendirmesi için [Sayfa Adı](/yol) formatını kullan.
6. Fiyat/teklif sorularında iletişim sayfasına yönlendir.
7. Kullanıcı gerçek kişiyle görüşmek isterse, WhatsApp üzerinden ulaşabileceklerini söyle.

ÖRNEK YANITLAR:
- Soru: "Starlink nedir?" 
  Cevap: "Starlink, SpaceX'in geliştirdiği uydu internet sistemidir. Gemilerde yüksek hızlı ve kesintisiz internet bağlantısı sağlar. Detaylı bilgi için [Starlink sayfamızı](/uzay-haberlesmesi/starlink) inceleyebilirsiniz."

- Soru: "Gerçek kişiyle görüşmek istiyorum"
  Cevap: "Tabii ki! Ekibimizle WhatsApp üzerinden hemen iletişime geçebilirsiniz. Size en kısa sürede yardımcı olacaklardır."`;

const SYSTEM_PROMPT_EN = `You are Lacivert Teknoloji's customer assistant. Speak in a professional, friendly and helpful manner.

COMPANY: Lacivert Teknoloji - Maritime and land communication specialist.

SERVICES:
- Starlink Maritime: High-speed satellite internet for ships (page: /uzay-haberlesmesi/starlink)
- OneWeb: LEO satellite internet (page: /uzay-haberlesmesi/oneweb)  
- Iridium: Global satellite communication (page: /uzay-haberlesmesi/iridium)
- Peplink: SD-WAN solutions (page: /kara-haberlesmesi/peplink)
- Teltonika: IoT and routers (page: /kara-haberlesmesi/teltonika)
- IT Services (page: /it-hizmetleri)
- Cyber Security (page: /siber-guvenlik)

PAGES:
- Contact/Quote: /iletisim
- Starlink Map: /starlink-haritasi
- About Us: /hakkimizda

RESPONSE RULES:
1. Respond in English.
2. DO NOT use Markdown. No asterisks, dashes, numbered lists, or bold text.
3. Use natural, flowing sentences. Speak like a customer representative.
4. Be brief. Don't exceed 2-3 sentences.
5. Use [Page Name](/path) format for page redirections.
6. Redirect to contact page for price/quote inquiries.
7. If user wants to talk to a real person, tell them they can reach via WhatsApp.

EXAMPLE RESPONSES:
- Question: "What is Starlink?" 
  Answer: "Starlink is a satellite internet system developed by SpaceX. It provides high-speed and uninterrupted internet connection on ships. You can check our [Starlink page](/uzay-haberlesmesi/starlink) for more details."

- Question: "I want to talk to a real person"
  Answer: "Of course! You can contact our team via WhatsApp right away. They will assist you as soon as possible."`;

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat API endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, language } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required" });
      }

      const systemPrompt = language === 'en' ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_TR;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      const assistantMessage = completion.choices[0]?.message?.content || "Üzgünüm, bir hata oluştu.";

      return res.json({ message: assistantMessage });
    } catch (error) {
      console.error("OpenAI API error:", error);
      return res.status(500).json({ error: "AI servisi şu an kullanılamıyor." });
    }
  });

  // Contact form email endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "Tüm alanları doldurunuz." });
      }

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      const adminEmail = "info@lacivertteknoloji.com";
      
      // Email to admin
      await transporter.sendMail({
        from: `"Lacivert Teknoloji Web" <${process.env.SMTP_USER}>`,
        to: adminEmail,
        subject: `Yeni İletişim Formu: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 10px;">
            <div style="background: linear-gradient(135deg, #1e3a5f 0%, #0d2137 100%); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Yeni İletişim Talebi</h1>
            </div>
            <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e3a5f; width: 120px;">Ad Soyad:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #334155;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e3a5f;">E-posta:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #334155;"><a href="mailto:${email}" style="color: #0ea5e9;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e3a5f;">Telefon:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #334155;">${phone || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e3a5f;">Konu:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #334155;">${subject}</td>
                </tr>
              </table>
              <div style="margin-top: 20px;">
                <h3 style="color: #1e3a5f; margin-bottom: 10px;">Mesaj:</h3>
                <p style="background: #f1f5f9; padding: 15px; border-radius: 8px; color: #334155; line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
            <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 20px;">Bu e-posta lacivertteknoloji.com web sitesinden otomatik olarak gönderilmiştir.</p>
          </div>
        `,
      });

      // Confirmation email to user
      await transporter.sendMail({
        from: `"Lacivert Teknoloji" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Talebiniz Alındı - Lacivert Teknoloji",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 10px;">
            <div style="background: linear-gradient(135deg, #1e3a5f 0%, #0d2137 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Talebiniz Alındı!</h1>
            </div>
            <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0;">
              <p style="color: #334155; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">
                Sayın <strong>${name}</strong>,
              </p>
              <p style="color: #334155; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">
                İletişim formunuz başarıyla alınmıştır. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
              </p>
              <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #64748b; font-size: 14px;"><strong>Konu:</strong> ${subject}</p>
              </div>
              <p style="color: #334155; font-size: 16px; line-height: 1.8; margin: 0;">
                Acil durumlar için bizi <a href="tel:+905350246977" style="color: #0ea5e9;">0 535 024 69 77</a> numarasından arayabilirsiniz.
              </p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                Saygılarımızla,<br>
                <strong style="color: #1e3a5f;">Lacivert Teknoloji Ekibi</strong>
              </p>
            </div>
            <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 20px;">
              Gürsel Mah. İmrahor Cad. Premier Kampüs Ofis No: 29/A Kat:6 Ofis:217, Kağıthane / İstanbul
            </p>
          </div>
        `,
      });

      return res.json({ success: true, message: "E-posta başarıyla gönderildi." });
    } catch (error) {
      console.error("Email error:", error);
      return res.status(500).json({ error: "E-posta gönderilemedi. Lütfen tekrar deneyin." });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
