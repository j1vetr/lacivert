import React, { useState, useRef, useEffect } from "react";
import { X, Send, User, Satellite, Wifi, Shield, Monitor, ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
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

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-1">
      <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-[pulse_1.4s_ease-in-out_infinite]" />
      <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-[pulse_1.4s_ease-in-out_0.2s_infinite]" />
      <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-[pulse_1.4s_ease-in-out_0.4s_infinite]" />
    </div>
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
      className="w-full text-left bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4 hover:from-blue-100 hover:to-indigo-100 hover:border-blue-200 transition-all duration-300 group shadow-sm hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-gray-900 text-sm font-bold flex items-center gap-2">
            {card.title}
            <ArrowRight className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </h4>
          <p className="text-gray-500 text-xs mt-1 line-clamp-1">{card.description}</p>
        </div>
      </div>
    </button>
  );
}

function ActionButton({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
    >
      {text}
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}

function SuggestionButtonComponent({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:border-gray-300 rounded-full text-gray-700 text-xs font-medium transition-all duration-200 hover:scale-105"
    >
      {text}
    </button>
  );
}

function LiveSupportButton({ onClick, text }: { onClick: () => void; text: string }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-xl hover:scale-[1.02]"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setLocation] = useLocation();
  const { i18n } = useTranslation();

  const isEnglish = i18n.language === 'en';

  const texts = {
    welcome: isEnglish ? "Hello! How can I help you?" : "Merhaba! Size nasıl yardımcı olabilirim?",
    assistantName: isEnglish ? "Lacivert Assistant" : "Lacivert Asistan",
    online: isEnglish ? "Online" : "Çevrimiçi",
    placeholder: isEnglish ? "Write a message..." : "Bir mesaj yazın...",
    hello: isEnglish ? "Hello!" : "Merhaba!",
    helpText: isEnglish ? "How can I help you today?" : "Bugün size nasıl yardımcı olabilirim?",
    liveSupport: isEnglish ? "Talk to a real person" : "Gerçek kişiyle konuşun",
    getQuote: isEnglish ? "Get Quote" : "Teklif Al",
    viewMap: isEnglish ? "View Map" : "Haritayı Gör",
    poweredBy: isEnglish ? "Powered by AI" : "Yapay Zeka Destekli",
    quickQuestions: isEnglish ? [
      { text: "What is Starlink?", query: "What is Starlink?" },
      { text: "Maritime solutions?", query: "What maritime solutions do you offer?" },
      { text: "Get a quote", query: "I want to get a quote" }
    ] : [
      { text: "Starlink nedir?", query: "Starlink nedir?" },
      { text: "Denizcilik çözümleri?", query: "Denizcilik için hangi çözümleriniz var?" },
      { text: "Teklif almak istiyorum", query: "Teklif almak istiyorum" }
    ],
    serviceCards: {
      starlink: { title: "Starlink Maritime", desc: isEnglish ? "High-speed satellite internet" : "Yüksek hızlı uydu interneti" },
      oneweb: { title: "OneWeb", desc: isEnglish ? "Global LEO satellite" : "Global LEO uydu" },
      iridium: { title: "Iridium", desc: isEnglish ? "Global satellite comm" : "Global uydu iletişimi" },
      peplink: { title: "Peplink", desc: isEnglish ? "SD-WAN solutions" : "SD-WAN çözümleri" },
      teltonika: { title: "Teltonika", desc: isEnglish ? "Industrial IoT" : "Endüstriyel IoT" },
      security: { title: isEnglish ? "Cyber Security" : "Siber Güvenlik", desc: isEnglish ? "Enterprise security" : "Kurumsal güvenlik" },
      it: { title: isEnglish ? "IT Services" : "IT Hizmetleri", desc: isEnglish ? "IT solutions" : "IT çözümleri" }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
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

    return cards.slice(0, 3);
  };

  const detectActionButtons = (content: string): { text: string; link: string }[] => {
    const buttons: { text: string; link: string }[] = [];
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes("iletişim") || lowerContent.includes("teklif") || lowerContent.includes("contact") || lowerContent.includes("quote")) {
      buttons.push({ text: texts.getQuote, link: "/iletisim" });
    }
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
        { text: isEnglish ? "Coverage areas?" : "Kapsama alanları?", query: isEnglish ? "What are Starlink coverage areas?" : "Starlink kapsama alanları nelerdir?" },
        { text: isEnglish ? "Pricing?" : "Fiyatlandırma?", query: isEnglish ? "What are Starlink prices?" : "Starlink fiyatları nedir?" }
      );
    } else if (lowerContent.includes("denizcilik") || lowerContent.includes("maritime") || lowerContent.includes("gemi")) {
      suggestions.push(
        { text: isEnglish ? "Compare solutions" : "Çözümleri karşılaştır", query: isEnglish ? "Compare Starlink, OneWeb and Iridium" : "Starlink, OneWeb ve Iridium'u karşılaştır" },
        { text: isEnglish ? "Installation?" : "Kurulum?", query: isEnglish ? "How is installation?" : "Kurulum nasıl?" }
      );
    } else if (lowerContent.includes("teklif") || lowerContent.includes("fiyat") || lowerContent.includes("quote") || lowerContent.includes("price")) {
      suggestions.push(
        { text: isEnglish ? "Talk to rep" : "Temsilciyle görüş", query: isEnglish ? "I want to talk to a real person" : "Gerçek bir kişiyle görüşmek istiyorum" }
      );
    } else {
      suggestions.push(
        { text: isEnglish ? "All services" : "Tüm hizmetler", query: isEnglish ? "What services do you offer?" : "Hangi hizmetleri sunuyorsunuz?" },
        { text: isEnglish ? "Get quote" : "Teklif al", query: isEnglish ? "I want to get a quote" : "Teklif almak istiyorum" }
      );
    }

    return suggestions.slice(0, 3);
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

  const sendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage || input.trim();
    if (!messageToSend || isLoading) return;

    const userMessage: Message = { role: "user", content: messageToSend, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
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
        { role: "assistant", content: isEnglish ? "Sorry, an error occurred. Please try again." : "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.", timestamp: new Date() },
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
          className="text-blue-600 hover:text-blue-700 underline underline-offset-2 font-semibold"
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
        .chat-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .chat-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .chat-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .msg-animate {
          animation: fadeSlideUp 0.35s ease-out forwards;
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .chat-window-animate {
          animation: scaleIn 0.25s ease-out forwards;
        }
      `}</style>

      {/* Welcome Bubble */}
      <div
        className={`fixed bottom-28 left-6 z-50 transition-all duration-500 ${
          showWelcome && !isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="relative bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-2xl shadow-gray-200/50 max-w-[300px]">
          <button 
            onClick={() => setShowWelcome(false)}
            className="absolute -top-2 -right-2 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 shadow-sm text-sm font-medium transition-all"
          >
            ×
          </button>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-gray-900 text-sm font-semibold">{texts.welcome}</p>
              <button 
                onClick={() => { handleOpen(); setInput(texts.quickQuestions[0].query); }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-1.5 flex items-center gap-1"
              >
                {texts.quickQuestions[0].text}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="absolute bottom-0 left-10 transform translate-y-full">
            <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-white drop-shadow-sm"></div>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <button
        onClick={handleOpen}
        className={`fixed bottom-6 left-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-2xl shadow-blue-500/40 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-blue-500/50 group ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        data-testid="chatbot-toggle"
        aria-label="Sohbet asistanını aç"
      >
        <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" style={{ animationDuration: "2s" }} />
        <MessageCircle className="w-7 h-7 relative z-10 group-hover:scale-110 transition-transform" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 left-6 z-50 w-[420px] max-w-[calc(100vw-48px)] h-[620px] max-h-[calc(100vh-100px)] bg-white rounded-3xl shadow-2xl shadow-gray-300/50 flex flex-col overflow-hidden border border-gray-100 ${
          isOpen ? "chat-window-animate" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 px-5 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <img src="/lacivert-icon.png" alt="Lacivert" className="w-9 h-9" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-[3px] border-blue-600 shadow-sm" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base">{texts.assistantName}</h3>
                <p className="text-blue-100 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  {texts.online}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-2.5 hover:bg-white/10 rounded-xl"
              data-testid="chatbot-close"
              aria-label="Sohbeti kapat"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gray-50/50 chat-scrollbar" data-testid="chatbot-messages">
          {messages.length === 0 && (
            <div className="text-center py-10">
              <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-500/30">
                <img src="/lacivert-icon.png" alt="Lacivert" className="w-12 h-12" />
              </div>
              <p className="text-xl font-bold text-gray-900 mb-2">{texts.hello}</p>
              <p className="text-gray-500 text-sm mb-8">{texts.helpText}</p>
              <div className="space-y-3">
                {texts.quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(q.query)}
                    className="block w-full text-left px-5 py-4 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-2xl transition-all duration-200 group shadow-sm hover:shadow-md"
                    data-testid={`quick-question-${idx + 1}`}
                  >
                    <span className="text-blue-500 mr-2 font-bold group-hover:mr-3 transition-all">→</span>
                    <span className="text-gray-700 group-hover:text-gray-900 font-medium">{q.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => {
            const serviceCards = msg.role === "assistant" ? detectServiceCards(msg.content) : [];
            const actionButtons = msg.role === "assistant" ? detectActionButtons(msg.content) : [];
            const suggestions = msg.role === "assistant" && i === messages.length - 1 ? detectSuggestions(msg.content) : [];
            const showLiveSupport = msg.role === "assistant" && detectLiveSupport(msg.content);
            
            return (
              <div key={i} className="space-y-3 msg-animate" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25">
                      <img src="/lacivert-icon.png" alt="Lacivert" className="w-5 h-5" />
                    </div>
                  )}
                  <div className="flex flex-col gap-1 max-w-[80%]">
                    <div
                      className={`px-5 py-3.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl rounded-br-md shadow-lg shadow-blue-500/25"
                          : "bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-md shadow-sm"
                      }`}
                      data-testid={`message-${msg.role}-${i}`}
                    >
                      {renderMessage(msg.content)}
                    </div>
                    {msg.timestamp && (
                      <span className={`text-[11px] text-gray-400 ${msg.role === "user" ? "text-right mr-1" : "text-left ml-1"}`}>
                        {formatTime(msg.timestamp)}
                      </span>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                
                {/* Service Cards */}
                {serviceCards.length > 0 && (
                  <div className="ml-12 space-y-2.5">
                    {serviceCards.map((card, idx) => (
                      <ServiceCardComponent key={idx} card={card} onNavigate={navigateAndClose} />
                    ))}
                  </div>
                )}
                
                {/* Action Buttons */}
                {actionButtons.length > 0 && (
                  <div className="ml-12 flex gap-2.5 flex-wrap">
                    {actionButtons.map((btn, idx) => (
                      <ActionButton key={idx} text={btn.text} onClick={() => navigateAndClose(btn.link)} />
                    ))}
                  </div>
                )}

                {/* Live Support Button */}
                {showLiveSupport && (
                  <div className="ml-12">
                    <LiveSupportButton onClick={openWhatsApp} text={texts.liveSupport} />
                  </div>
                )}
                
                {/* Suggestion Buttons */}
                {suggestions.length > 0 && !isLoading && (
                  <div className="ml-12 flex gap-2 flex-wrap">
                    {suggestions.map((sug, idx) => (
                      <SuggestionButtonComponent key={idx} text={sug.text} onClick={() => sendMessage(sug.query)} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start msg-animate">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25">
                <img src="/lacivert-icon.png" alt="Lacivert" className="w-5 h-5" />
              </div>
              <div className="bg-white border border-gray-200 px-5 py-4 rounded-2xl rounded-bl-md shadow-sm">
                <TypingIndicator />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:bg-gray-50 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={texts.placeholder}
              className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 text-sm focus:outline-none py-3"
              data-testid="chatbot-input"
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95"
              data-testid="chatbot-send"
              aria-label="Mesaj gönder"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          {/* Powered By */}
          <div className="flex items-center justify-center gap-2 mt-3.5 text-xs text-gray-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{texts.poweredBy}</span>
          </div>
        </div>
      </div>
    </>
  );
}
