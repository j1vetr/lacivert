import React, { useState, useRef, useEffect } from "react";
import { X, Send, User, Satellite, Wifi, Shield, Monitor, ArrowRight, MessageCircle, Ship, Building2, Truck, Factory, Check } from "lucide-react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  type?: "text" | "sector-select" | "quote-form";
}

interface ServiceCard {
  title: string;
  description: string;
  icon: "satellite" | "wifi" | "shield" | "monitor";
  link: string;
}

interface SuggestionButton {
  text: string;
  query: string;
}

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

function TypingIndicator({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-500 text-xs font-medium">{name}</span>
      <div className="flex items-center gap-0.5">
        <span className="w-1 h-1 bg-blue-500 rounded-full animate-[bounce_1s_ease-in-out_infinite]" />
        <span className="w-1 h-1 bg-blue-500 rounded-full animate-[bounce_1s_ease-in-out_0.15s_infinite]" />
        <span className="w-1 h-1 bg-blue-500 rounded-full animate-[bounce_1s_ease-in-out_0.3s_infinite]" />
      </div>
    </div>
  );
}

function SectorSelector({ onSelect, isEnglish }: { onSelect: (sector: string) => void; isEnglish: boolean }) {
  const sectors = isEnglish ? [
    { id: "maritime", label: "Maritime", icon: Ship },
    { id: "corporate", label: "Corporate", icon: Building2 },
    { id: "logistics", label: "Logistics", icon: Truck },
    { id: "industrial", label: "Industrial", icon: Factory },
  ] : [
    { id: "maritime", label: "Denizcilik", icon: Ship },
    { id: "corporate", label: "Kurumsal", icon: Building2 },
    { id: "logistics", label: "Lojistik", icon: Truck },
    { id: "industrial", label: "Endüstriyel", icon: Factory },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      {sectors.map((sector) => {
        const Icon = sector.icon;
        return (
          <button
            key={sector.id}
            onClick={() => onSelect(sector.id)}
            className="flex items-center gap-2 px-3 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-100 group-hover:bg-blue-500 flex items-center justify-center transition-colors">
              <Icon className="w-4 h-4 text-blue-500 group-hover:text-white transition-colors" />
            </div>
            <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600">{sector.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function QuoteForm({ onSubmit, onCancel, isEnglish }: { onSubmit: (data: QuoteFormData) => void; onCancel: () => void; isEnglish: boolean }) {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  const texts = {
    title: isEnglish ? "Quick Quote Request" : "Hızlı Teklif Formu",
    name: isEnglish ? "Name" : "Ad Soyad",
    email: isEnglish ? "Email" : "E-posta",
    phone: isEnglish ? "Phone" : "Telefon",
    company: isEnglish ? "Company" : "Şirket",
    message: isEnglish ? "Message (optional)" : "Mesaj (opsiyonel)",
    submit: isEnglish ? "Send Request" : "Teklif İste",
    cancel: isEnglish ? "Cancel" : "İptal"
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm space-y-2">
      <h4 className="text-sm font-semibold text-gray-800 mb-2">{texts.title}</h4>
      
      <div className="space-y-1">
        <label className="text-[10px] text-gray-500 font-medium">{texts.name} *</label>
        <input
          type="text"
          placeholder={isEnglish ? "John Doe" : "Ahmet Yılmaz"}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-50"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-[10px] text-gray-500 font-medium">{texts.email} *</label>
          <input
            type="email"
            placeholder="ornek@mail.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-50"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] text-gray-500 font-medium">{texts.phone}</label>
          <input
            type="tel"
            placeholder="05XX XXX XX XX"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-50"
          />
        </div>
      </div>
      
      <div className="space-y-1">
        <label className="text-[10px] text-gray-500 font-medium">{texts.company}</label>
        <input
          type="text"
          placeholder={isEnglish ? "Company name" : "Şirket adı"}
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-50"
        />
      </div>
      
      <div className="space-y-1">
        <label className="text-[10px] text-gray-500 font-medium">{texts.message}</label>
        <textarea
          placeholder={isEnglish ? "Your message..." : "Mesajınız..."}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 resize-none bg-gray-50"
          rows={2}
        />
      </div>
      
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          {texts.cancel}
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !formData.name || !formData.email}
          className="flex-1 px-3 py-2 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
        >
          {isSubmitting ? (
            <div className="flex gap-1">
              <span className="w-1 h-1 bg-white rounded-full animate-bounce" />
              <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
              <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            </div>
          ) : (
            <>
              <Send className="w-3 h-3" />
              {texts.submit}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function ServiceCardComponent({ card, onNavigate }: { card: ServiceCard; onNavigate: (link: string) => void }) {
  const icons = {
    satellite: Satellite,
    wifi: Wifi,
    shield: Shield,
    monitor: Monitor,
  };
  const Icon = icons[card.icon];

  return (
    <button
      onClick={() => onNavigate(card.link)}
      className="w-full text-left bg-blue-50 border border-blue-100 rounded-xl p-2.5 hover:bg-blue-100 transition-all group"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-gray-800 text-xs font-semibold flex items-center gap-1">
            {card.title}
            <ArrowRight className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
          </h4>
          <p className="text-gray-500 text-[10px] truncate">{card.description}</p>
        </div>
      </div>
    </button>
  );
}

function ActionButton({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-full transition-all"
    >
      {text}
      <ArrowRight className="w-3 h-3" />
    </button>
  );
}

function SuggestionButtonComponent({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 text-[11px] font-medium transition-all"
    >
      {text}
    </button>
  );
}

function LiveSupportButton({ onClick, text }: { onClick: () => void; text: string }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-xl transition-all"
    >
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
      {text}
    </button>
  );
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [welcomeShown, setWelcomeShown] = useState(false);
  const [userSector, setUserSector] = useState<string | null>(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showSectorSelect, setShowSectorSelect] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setLocation] = useLocation();
  const { i18n } = useTranslation();

  const isEnglish = i18n.language === 'en';

  const sectorNames: Record<string, { tr: string; en: string }> = {
    maritime: { tr: "Denizcilik", en: "Maritime" },
    corporate: { tr: "Kurumsal", en: "Corporate" },
    logistics: { tr: "Lojistik", en: "Logistics" },
    industrial: { tr: "Endüstriyel", en: "Industrial" }
  };

  const texts = {
    welcome: isEnglish ? "Hi! How can I help you?" : "Merhaba! Size nasıl yardımcı olabilirim?",
    assistantName: isEnglish ? "Lacivert Assistant" : "Lacivert Asistan",
    online: isEnglish ? "Online" : "Çevrimiçi",
    placeholder: isEnglish ? "Type a message..." : "Mesaj yazın...",
    liveSupport: isEnglish ? "Talk to support" : "Destek ile konuşun",
    getQuote: isEnglish ? "Get Quote" : "Teklif Al",
    viewMap: isEnglish ? "View Map" : "Haritayı Gör",
    typing: isEnglish ? "Lacivert is typing" : "Lacivert yazıyor",
    greeting: isEnglish 
      ? "Hi there! 👋 I'm Lacivert's assistant. Which sector are you interested in?"
      : "Merhaba! 👋 Ben Lacivert'in asistanıyım. Hangi sektörle ilgileniyorsunuz?",
    sectorSelected: (sector: string) => isEnglish 
      ? `Great! I can help you with ${sectorNames[sector]?.en || sector} solutions. What would you like to know?`
      : `Harika! ${sectorNames[sector]?.tr || sector} sektörü için size yardımcı olabilirim. Ne öğrenmek istersiniz?`,
    quickQuestions: isEnglish ? [
      { text: "Starlink", query: "Tell me about Starlink" },
      { text: "Get quote", query: "I want a quote" }
    ] : [
      { text: "Starlink", query: "Starlink hakkında bilgi ver" },
      { text: "Teklif al", query: "Teklif almak istiyorum" }
    ],
    serviceCards: {
      starlink: { title: "Starlink", desc: isEnglish ? "Satellite internet" : "Uydu interneti" },
      oneweb: { title: "OneWeb", desc: isEnglish ? "LEO satellite" : "LEO uydu" },
      iridium: { title: "Iridium", desc: isEnglish ? "Global comm" : "Global iletişim" },
      peplink: { title: "Peplink", desc: isEnglish ? "SD-WAN" : "SD-WAN" },
      teltonika: { title: "Teltonika", desc: isEnglish ? "IoT" : "IoT" },
      security: { title: isEnglish ? "Security" : "Güvenlik", desc: isEnglish ? "Cyber security" : "Siber güvenlik" },
      it: { title: "IT", desc: isEnglish ? "IT services" : "IT hizmetleri" }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, showQuoteForm, showSectorSelect]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (isOpen && !welcomeShown) {
      setMessages([{ role: "assistant", content: texts.greeting, timestamp: new Date() }]);
      setShowSectorSelect(true);
      setWelcomeShown(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!hasInteracted) {
      const timer = setTimeout(() => {
        setShowWelcome(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hasInteracted]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowWelcome(false);
    setHasInteracted(true);
  };

  const navigateAndClose = (link: string) => {
    setIsOpen(false);
    setLocation(link);
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/905350246977", "_blank");
  };

  const handleSectorSelect = (sector: string) => {
    setUserSector(sector);
    setShowSectorSelect(false);
    
    const sectorLabel = isEnglish ? sectorNames[sector]?.en : sectorNames[sector]?.tr;
    setMessages(prev => [
      ...prev,
      { role: "user", content: sectorLabel || sector, timestamp: new Date() }
    ]);
    
    setIsLoading(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: texts.sectorSelected(sector), timestamp: new Date() }
      ]);
      setIsLoading(false);
    }, 800);
  };

  const handleQuoteSubmit = async (data: QuoteFormData) => {
    setShowQuoteForm(false);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          subject: isEnglish ? "Quick Quote Request (Chatbot)" : "Hızlı Teklif Talebi (Chatbot)",
          message: `${isEnglish ? "Sector" : "Sektör"}: ${userSector ? (isEnglish ? sectorNames[userSector]?.en : sectorNames[userSector]?.tr) : "-"}\n\n${data.message || (isEnglish ? "Quote request from chatbot" : "Chatbot üzerinden teklif talebi")}`,
          language: i18n.language
        }),
      });

      if (response.ok) {
        setMessages(prev => [
          ...prev,
          { 
            role: "assistant", 
            content: isEnglish 
              ? "Thank you! ✅ Your quote request has been received. Our team will contact you shortly."
              : "Teşekkürler! ✅ Teklif talebiniz alındı. Ekibimiz en kısa sürede sizinle iletişime geçecek.",
            timestamp: new Date() 
          }
        ]);
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { 
          role: "assistant", 
          content: isEnglish 
            ? "Sorry, there was an error. Please try again or contact us directly."
            : "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin veya bizimle doğrudan iletişime geçin.",
          timestamp: new Date() 
        }
      ]);
    }
  };

  const detectServiceCards = (content: string): ServiceCard[] => {
    const cards: ServiceCard[] = [];
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes("starlink")) {
      cards.push({ title: texts.serviceCards.starlink.title, description: texts.serviceCards.starlink.desc, icon: "satellite", link: "/uzay-haberlesmesi/starlink" });
    }
    if (lowerContent.includes("oneweb")) {
      cards.push({ title: texts.serviceCards.oneweb.title, description: texts.serviceCards.oneweb.desc, icon: "satellite", link: "/uzay-haberlesmesi/oneweb" });
    }
    if (lowerContent.includes("iridium")) {
      cards.push({ title: texts.serviceCards.iridium.title, description: texts.serviceCards.iridium.desc, icon: "satellite", link: "/uzay-haberlesmesi/iridium" });
    }
    if (lowerContent.includes("peplink")) {
      cards.push({ title: texts.serviceCards.peplink.title, description: texts.serviceCards.peplink.desc, icon: "wifi", link: "/kara-haberlesmesi/peplink" });
    }
    if (lowerContent.includes("teltonika")) {
      cards.push({ title: texts.serviceCards.teltonika.title, description: texts.serviceCards.teltonika.desc, icon: "wifi", link: "/kara-haberlesmesi/teltonika" });
    }
    if (lowerContent.includes("siber") || lowerContent.includes("security") || lowerContent.includes("güvenlik")) {
      cards.push({ title: texts.serviceCards.security.title, description: texts.serviceCards.security.desc, icon: "shield", link: "/siber-guvenlik" });
    }
    if (lowerContent.includes("it hizmet") || lowerContent.includes("it service") || lowerContent.includes("bilişim")) {
      cards.push({ title: texts.serviceCards.it.title, description: texts.serviceCards.it.desc, icon: "monitor", link: "/it-hizmetleri" });
    }

    return cards.slice(0, 2);
  };

  const detectActionButtons = (content: string): { text: string; link: string }[] => {
    const buttons: { text: string; link: string }[] = [];
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes("harita") || lowerContent.includes("kapsama") || lowerContent.includes("map") || lowerContent.includes("coverage")) {
      buttons.push({ text: texts.viewMap, link: "/starlink-haritasi" });
    }
    
    return buttons;
  };

  const detectSuggestions = (content: string): SuggestionButton[] => {
    const lowerContent = content.toLowerCase();
    const suggestions: SuggestionButton[] = [];

    if (lowerContent.includes("starlink")) {
      suggestions.push(
        { text: isEnglish ? "Coverage?" : "Kapsama?", query: isEnglish ? "Starlink coverage areas" : "Starlink kapsama alanları" },
        { text: isEnglish ? "Price?" : "Fiyat?", query: isEnglish ? "Starlink prices" : "Starlink fiyatları" }
      );
    } else if (lowerContent.includes("denizcilik") || lowerContent.includes("maritime") || lowerContent.includes("gemi")) {
      suggestions.push(
        { text: isEnglish ? "Compare" : "Karşılaştır", query: isEnglish ? "Compare solutions" : "Çözümleri karşılaştır" }
      );
    }

    return suggestions.slice(0, 2);
  };

  const detectLiveSupport = (content: string): boolean => {
    const lowerContent = content.toLowerCase();
    return lowerContent.includes("gerçek kişi") || 
           lowerContent.includes("temsilci") || 
           lowerContent.includes("canlı destek") ||
           lowerContent.includes("real person") ||
           lowerContent.includes("live support") ||
           lowerContent.includes("representative");
  };

  const detectQuoteRequest = (content: string): boolean => {
    const lowerContent = content.toLowerCase();
    return lowerContent.includes("teklif") || 
           lowerContent.includes("fiyat") || 
           lowerContent.includes("quote") ||
           lowerContent.includes("price") ||
           lowerContent.includes("pricing");
  };

  const sendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage || input.trim();
    if (!messageToSend || isLoading) return;

    const userMessage: Message = { role: "user", content: messageToSend, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    if (detectQuoteRequest(messageToSend)) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { 
            role: "assistant", 
            content: isEnglish 
              ? "I'd be happy to help you get a quote! Please fill out this quick form:"
              : "Size teklif hazırlamamız için yardımcı olmaktan mutluluk duyarım! Lütfen bu kısa formu doldurun:",
            timestamp: new Date() 
          }
        ]);
        setShowQuoteForm(true);
        setIsLoading(false);
      }, 600);
      return;
    }

    try {
      const contextMessage = userSector 
        ? `[User sector: ${sectorNames[userSector]?.en || userSector}] ${messageToSend}`
        : messageToSend;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [...messages, { ...userMessage, content: contextMessage }],
          language: i18n.language
        }),
      });

      if (!response.ok) throw new Error("API error");

      const data = await response.json();
      const assistantMessage: Message = { role: "assistant", content: data.message, timestamp: new Date() };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: isEnglish ? "Sorry, please try again." : "Üzgünüm, lütfen tekrar deneyin.", timestamp: new Date() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderMessage = (content: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          className="text-blue-600 hover:text-blue-700 underline font-medium"
          onClick={(e) => {
            e.preventDefault();
            navigateAndClose(match![2]);
          }}
        >
          {match[1]}
        </a>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return parts.length > 0 ? parts : content;
  };

  return (
    <>
      <style>{`
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
        @keyframes msgIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .msg-in { animation: msgIn 0.25s ease-out; }
      `}</style>

      {/* Welcome Bubble */}
      <div className={`fixed bottom-24 left-6 z-50 transition-all duration-400 ${showWelcome && !isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
        <div className="relative bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-xl max-w-[240px]">
          <button onClick={() => setShowWelcome(false)} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 text-xs shadow-sm">×</button>
          <p className="text-gray-800 text-xs font-medium">{texts.welcome}</p>
          <button onClick={handleOpen} className="text-[11px] text-blue-600 font-medium mt-1.5 flex items-center gap-0.5 hover:text-blue-700">
            {isEnglish ? "Start chat" : "Sohbet başlat"} <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Chat Button */}
      <button
        onClick={handleOpen}
        className={`fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 flex items-center justify-center transition-all hover:scale-105 ${isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
        data-testid="chatbot-toggle"
      >
        <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" style={{ animationDuration: "2.5s" }} />
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 left-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[520px] max-h-[calc(100vh-100px)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 transition-all duration-200 origin-bottom-left ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <img src="/lacivert-icon.png" alt="" className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-blue-500" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">{texts.assistantName}</h3>
              <p className="text-blue-100 text-[11px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                {texts.online}
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors" data-testid="chatbot-close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 chat-scroll" data-testid="chatbot-messages">
          {messages.map((msg, i) => {
            const serviceCards = msg.role === "assistant" ? detectServiceCards(msg.content) : [];
            const actionButtons = msg.role === "assistant" ? detectActionButtons(msg.content) : [];
            const suggestions = msg.role === "assistant" && i === messages.length - 1 && !showQuoteForm && !showSectorSelect ? detectSuggestions(msg.content) : [];
            const showLiveSupport = msg.role === "assistant" && detectLiveSupport(msg.content);
            
            return (
              <div key={i} className="space-y-2 msg-in">
                <div className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <img src="/lacivert-icon.png" alt="" className="w-4 h-4" />
                    </div>
                  )}
                  <div className="flex flex-col gap-0.5 max-w-[75%]">
                    <div className={`px-3 py-2 text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-blue-500 text-white rounded-2xl rounded-br-sm"
                        : "bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-sm shadow-sm"
                    }`}>
                      {renderMessage(msg.content)}
                    </div>
                    {msg.timestamp && (
                      <span className={`text-[10px] text-gray-400 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                        {formatTime(msg.timestamp)}
                      </span>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
                
                {serviceCards.length > 0 && (
                  <div className="ml-9 space-y-1.5">
                    {serviceCards.map((card, idx) => (
                      <ServiceCardComponent key={idx} card={card} onNavigate={navigateAndClose} />
                    ))}
                  </div>
                )}
                
                {actionButtons.length > 0 && (
                  <div className="ml-9 flex gap-1.5 flex-wrap">
                    {actionButtons.map((btn, idx) => (
                      <ActionButton key={idx} text={btn.text} onClick={() => navigateAndClose(btn.link)} />
                    ))}
                  </div>
                )}

                {showLiveSupport && (
                  <div className="ml-9">
                    <LiveSupportButton onClick={openWhatsApp} text={texts.liveSupport} />
                  </div>
                )}
                
                {suggestions.length > 0 && !isLoading && (
                  <div className="ml-9 flex gap-1.5 flex-wrap">
                    {suggestions.map((sug, idx) => (
                      <SuggestionButtonComponent key={idx} text={sug.text} onClick={() => sendMessage(sug.query)} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Sector Selection */}
          {showSectorSelect && !isLoading && (
            <div className="ml-9 msg-in">
              <SectorSelector onSelect={handleSectorSelect} isEnglish={isEnglish} />
            </div>
          )}

          {/* Quote Form */}
          {showQuoteForm && !isLoading && (
            <div className="ml-9 msg-in">
              <QuoteForm 
                onSubmit={handleQuoteSubmit} 
                onCancel={() => setShowQuoteForm(false)} 
                isEnglish={isEnglish} 
              />
            </div>
          )}

          {/* Quick Questions */}
          {messages.length > 1 && !showSectorSelect && !showQuoteForm && !isLoading && userSector && messages.length === 3 && (
            <div className="flex gap-1.5 flex-wrap ml-9 msg-in">
              {texts.quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(q.query)}
                  className="px-3 py-1.5 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-full text-gray-700 text-[11px] font-medium transition-all"
                >
                  {q.text}
                </button>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="flex gap-2 justify-start msg-in">
              <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <img src="/lacivert-icon.png" alt="" className="w-4 h-4" />
              </div>
              <div className="bg-white border border-gray-200 px-3 py-2.5 rounded-2xl rounded-bl-sm shadow-sm">
                <TypingIndicator name={texts.typing} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-100">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-1.5">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={texts.placeholder}
              className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 text-sm focus:outline-none py-2"
              data-testid="chatbot-input"
              disabled={isLoading || showSectorSelect}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="w-9 h-9 rounded-lg bg-blue-500 text-white flex items-center justify-center transition-all disabled:opacity-40 hover:bg-blue-600"
              data-testid="chatbot-send"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
