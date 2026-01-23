import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `Sen Lacivert Teknoloji'nin yapay zeka asistanısın. Lacivert Teknoloji, denizcilik ve kara haberleşmesi alanında uzmanlaşmış bir Türk teknoloji şirketidir.

## Şirket Hakkında
- Lacivert Teknoloji, uydu haberleşmesi ve ağ çözümleri konusunda uzmanlaşmış bir firmadır.
- Özellikle denizcilik sektörüne yönelik çözümler sunmaktadır.

## Hizmetler

### Uzay Haberleşmesi (Uydu İnternet)
1. **Starlink Maritime** - SpaceX'in LEO uydu sistemi, gemilerde yüksek hızlı internet (sayfa: /uzay-haberlesmesi/starlink)
2. **OneWeb** - LEO uydu internet çözümü (sayfa: /uzay-haberlesmesi/oneweb)
3. **Iridium** - Global uydu iletişim sistemi (sayfa: /uzay-haberlesmesi/iridium)

### Kara Haberleşmesi
1. **Peplink** - SD-WAN ve ağ çözümleri (sayfa: /kara-haberlesmesi/peplink)
2. **Teltonika** - Endüstriyel IoT ve router çözümleri (sayfa: /kara-haberlesmesi/teltonika)

### IT Hizmetleri
- Kurumsal IT altyapı çözümleri (sayfa: /it-hizmetleri)

### Siber Güvenlik
- Kurumsal siber güvenlik hizmetleri (sayfa: /siber-guvenlik)

## Önemli Sayfalar
- Ana Sayfa: /
- Hakkımızda: /hakkimizda
- İletişim/Teklif Al: /iletisim
- Starlink Haritası: /starlink-haritasi

## Kurallar
1. Her zaman Türkçe yanıt ver.
2. Kısa, net ve profesyonel cevaplar ver.
3. Kullanıcıyı ilgili sayfalara yönlendir (link formatı: [Sayfa Adı](/sayfa-yolu))
4. Teklif veya fiyat sorularında iletişim sayfasına yönlendir.
5. Teknik soruları yanıtla ama detaylı bilgi için ilgili hizmet sayfasına yönlendir.
6. Denizcilik ve uydu teknolojileri konusunda yardımcı ol.`;

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
