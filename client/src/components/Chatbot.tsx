import React, { useState, useRef, useEffect } from "react";
import { X, Send, User, Satellite, Wifi, Shield, Monitor, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";

interface Message {
  role: "user" | "assistant";
  content: string;
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
    <div className="flex gap-1.5 items-center px-2 py-1">
      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms", animationDuration: "0.6s" }} />
      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s", animationDuration: "0.6s" }} />
      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s", animationDuration: "0.6s" }} />
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
      className="w-full text-left bg-gradient-to-r from-[#1e3a5f]/40 to-[#1e3a5f]/20 border border-[#1e3a5f]/50 rounded-xl p-3 hover:from-[#1e3a5f]/60 hover:to-[#1e3a5f]/40 transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#1e3a5f] flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white text-sm font-medium flex items-center gap-2">
            {card.title}
            <ArrowRight className="w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h4>
          <p className="text-gray-400 text-xs mt-0.5 line-clamp-2">{card.description}</p>
        </div>
      </div>
    </button>
  );
}

function ActionButton({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 rounded-full text-blue-400 text-xs transition-colors"
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
      className="px-3 py-1.5 bg-[#1e3a5f]/30 hover:bg-[#1e3a5f]/50 border border-[#1e3a5f]/40 rounded-full text-gray-300 text-xs transition-colors hover:text-white"
    >
      {text}
    </button>
  );
}

function LiveSupportButton({ onClick, text }: { onClick: () => void; text: string }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 rounded-xl text-[#25D366] text-sm font-medium transition-colors"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
      {text}
    </button>
  );
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();
  const { t, i18n } = useTranslation();

  const isEnglish = i18n.language === 'en';

  const texts = {
    welcome: isEnglish ? "Hello! How can I help you?" : "Merhaba! Size nasıl yardımcı olabilirim?",
    assistantName: isEnglish ? "Lacivert Assistant" : "Lacivert Asistan",
    online: isEnglish ? "Online" : "Çevrimiçi",
    placeholder: isEnglish ? "Type your message..." : "Mesajınızı yazın...",
    hello: isEnglish ? "Hello!" : "Merhaba!",
    helpText: isEnglish ? "I can help you with Lacivert Teknoloji services." : "Lacivert Teknoloji hizmetleri hakkında size yardımcı olabilirim.",
    liveSupport: isEnglish ? "Talk to a real person" : "Gerçek kişiyle konuşun",
    getQuote: isEnglish ? "Get Quote" : "Teklif Al",
    viewMap: isEnglish ? "View Map" : "Haritayı Gör",
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
      starlink: { title: "Starlink Maritime", desc: isEnglish ? "High-speed satellite internet for ships" : "Gemiler için yüksek hızlı uydu interneti" },
      oneweb: { title: "OneWeb", desc: isEnglish ? "Global LEO satellite internet" : "Global LEO uydu internet çözümü" },
      iridium: { title: "Iridium", desc: isEnglish ? "Global satellite communication" : "Global uydu iletişim sistemi" },
      peplink: { title: "Peplink", desc: isEnglish ? "SD-WAN solutions" : "SD-WAN ve ağ çözümleri" },
      teltonika: { title: "Teltonika", desc: isEnglish ? "Industrial IoT and routers" : "Endüstriyel IoT ve router çözümleri" },
      security: { title: isEnglish ? "Cyber Security" : "Siber Güvenlik", desc: isEnglish ? "Enterprise security solutions" : "Kurumsal güvenlik çözümleri" },
      it: { title: isEnglish ? "IT Services" : "IT Hizmetleri", desc: isEnglish ? "Enterprise IT solutions" : "Kurumsal IT altyapı çözümleri" }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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
        { text: isEnglish ? "Installation process?" : "Kurulum süreci?", query: isEnglish ? "How is the installation process?" : "Kurulum süreci nasıl işliyor?" }
      );
    } else if (lowerContent.includes("teklif") || lowerContent.includes("fiyat") || lowerContent.includes("quote") || lowerContent.includes("price")) {
      suggestions.push(
        { text: isEnglish ? "Talk to representative" : "Temsilciyle görüş", query: isEnglish ? "I want to talk to a real person" : "Gerçek bir kişiyle görüşmek istiyorum" }
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

    const userMessage: Message = { role: "user", content: messageToSend };
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
      const assistantMessage: Message = { role: "assistant", content: data.message };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: isEnglish ? "Sorry, an error occurred. Please try again." : "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin." },
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
          className="text-blue-400 hover:text-blue-300 underline"
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
      {/* Welcome Bubble */}
      <div
        className={`fixed bottom-24 left-6 z-50 transition-all duration-500 ${
          showWelcome && !isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="relative bg-[#0d2137] border border-[#1e3a5f] rounded-2xl px-4 py-3 shadow-xl max-w-[260px]">
          <button 
            onClick={() => setShowWelcome(false)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-[#1e3a5f] rounded-full flex items-center justify-center text-gray-400 hover:text-white text-xs"
          >
            ×
          </button>
          <p className="text-white text-sm">{texts.welcome}</p>
          <div className="flex gap-2 mt-2">
            <button 
              onClick={() => { handleOpen(); setInput(texts.quickQuestions[0].query); }}
              className="text-xs text-blue-400 hover:text-blue-300"
            >
              {texts.quickQuestions[0].text}
            </button>
          </div>
          <div className="absolute bottom-0 left-8 transform translate-y-full">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#1e3a5f]"></div>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <button
        onClick={handleOpen}
        className={`fixed bottom-6 left-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#0d2137] text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        data-testid="chatbot-toggle"
        aria-label="Sohbet asistanını aç"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" style={{ animationDuration: "2s" }} />
        <span className="absolute inset-[-4px] rounded-full border-2 border-blue-400/30 animate-pulse" />
        
        {/* Logo */}
        <img src="/lacivert-icon.png" alt="Lacivert" className="w-9 h-9 relative z-10 group-hover:scale-110 transition-transform" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 left-6 z-50 w-[400px] max-w-[calc(100vw-48px)] h-[550px] max-h-[calc(100vh-100px)] bg-[#0a1929] border border-[#1e3a5f] rounded-2xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-left ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e3a5f] bg-gradient-to-r from-[#0d2137] to-[#1e3a5f]/30 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#0d2137] flex items-center justify-center overflow-hidden ring-2 ring-blue-500/30">
              <img src="/lacivert-icon.png" alt="Lacivert" className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">{texts.assistantName}</h3>
              <p className="text-gray-400 text-xs">{texts.online}</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
            data-testid="chatbot-close"
            aria-label="Sohbeti kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" data-testid="chatbot-messages">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 py-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#0d2137] flex items-center justify-center ring-4 ring-[#1e3a5f]/30">
                <img src="/lacivert-icon.png" alt="Lacivert" className="w-12 h-12" />
              </div>
              <p className="text-base font-medium text-white mb-1">{texts.hello}</p>
              <p className="text-xs text-gray-400 mb-5">{texts.helpText}</p>
              <div className="space-y-2">
                {texts.quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setInput(q.query); }}
                    className="block w-full text-left px-4 py-3 text-sm bg-gradient-to-r from-[#1e3a5f]/30 to-transparent hover:from-[#1e3a5f]/50 border border-[#1e3a5f]/30 rounded-xl transition-all group"
                    data-testid={`quick-question-${idx + 1}`}
                  >
                    <span className="text-blue-400 mr-2">→</span>
                    <span className="text-gray-300 group-hover:text-white">{q.text}</span>
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
              <div key={i} className="space-y-2">
                <div className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#0d2137] flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img src="/lacivert-icon.png" alt="Lacivert" className="w-5 h-5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-md shadow-lg"
                        : "bg-[#0d2137] text-gray-200 border border-[#1e3a5f]/50 rounded-bl-md"
                    }`}
                    data-testid={`message-${msg.role}-${i}`}
                  >
                    {renderMessage(msg.content)}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                
                {/* Service Cards */}
                {serviceCards.length > 0 && (
                  <div className="ml-11 space-y-2">
                    {serviceCards.map((card, idx) => (
                      <ServiceCardComponent key={idx} card={card} onNavigate={navigateAndClose} />
                    ))}
                  </div>
                )}
                
                {/* Action Buttons */}
                {actionButtons.length > 0 && (
                  <div className="ml-11 flex gap-2 flex-wrap">
                    {actionButtons.map((btn, idx) => (
                      <ActionButton key={idx} text={btn.text} onClick={() => navigateAndClose(btn.link)} />
                    ))}
                  </div>
                )}

                {/* Live Support Button */}
                {showLiveSupport && (
                  <div className="ml-11">
                    <LiveSupportButton onClick={openWhatsApp} text={texts.liveSupport} />
                  </div>
                )}
                
                {/* Suggestion Buttons */}
                {suggestions.length > 0 && !isLoading && (
                  <div className="ml-11 flex gap-2 flex-wrap mt-2">
                    {suggestions.map((sug, idx) => (
                      <SuggestionButtonComponent key={idx} text={sug.text} onClick={() => sendMessage(sug.query)} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#0d2137] flex items-center justify-center overflow-hidden flex-shrink-0">
                <img src="/lacivert-icon.png" alt="Lacivert" className="w-5 h-5" />
              </div>
              <div className="bg-[#0d2137] border border-[#1e3a5f]/50 px-4 py-3 rounded-2xl rounded-bl-md">
                <TypingIndicator />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[#1e3a5f] bg-gradient-to-r from-[#0d2137] to-[#0a1929] rounded-b-2xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={texts.placeholder}
              className="flex-1 bg-[#0a1929] border border-[#1e3a5f] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
              data-testid="chatbot-input"
              disabled={isLoading}
            />
            <Button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 transition-all disabled:opacity-50"
              data-testid="chatbot-send"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
