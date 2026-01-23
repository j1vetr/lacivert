import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Sen Lacivert Teknoloji'nin müşteri asistanısın. Profesyonel, samimi ve yardımsever bir üslupla konuş.

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

ÖRNEK YANITLAR:
- Soru: "Starlink nedir?" 
  Cevap: "Starlink, SpaceX'in geliştirdiği uydu internet sistemidir. Gemilerde yüksek hızlı ve kesintisiz internet bağlantısı sağlar. Detaylı bilgi için [Starlink sayfamızı](/uzay-haberlesmesi/starlink) inceleyebilirsiniz."

- Soru: "Denizcilik çözümleriniz neler?"
  Cevap: "Denizcilik sektörü için Starlink, OneWeb ve Iridium uydu sistemleri sunuyoruz. Her biri farklı ihtiyaçlara yönelik tasarlanmıştır. Size en uygun çözümü belirlemek için [iletişim formumuzu](/iletisim) doldurabilirsiniz."

- Soru: "Fiyatlar ne kadar?"
  Cevap: "Fiyatlarımız projenin kapsamına göre değişiklik göstermektedir. Size özel bir teklif hazırlamamız için [iletişim sayfamızdan](/iletisim) bize ulaşabilirsiniz."`;

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat API endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required" });
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
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

  const httpServer = createServer(app);

  return httpServer;
}
