import React, { useState, useRef, useEffect } from "react";
import { X, Send, User, Satellite, Wifi, Shield, Monitor, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

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

function TypingIndicator() {
  return (
    <div className="flex gap-1 items-center px-2">
      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
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

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const navigateAndClose = (link: string) => {
    setIsOpen(false);
    setLocation(link);
  };

  const detectServiceCards = (content: string): ServiceCard[] => {
    const cards: ServiceCard[] = [];
    
    if (content.toLowerCase().includes("starlink")) {
      cards.push({
        title: "Starlink Maritime",
        description: "Gemiler için yüksek hızlı uydu interneti",
        icon: "satellite",
        link: "/uzay-haberlesmesi/starlink"
      });
    }
    if (content.toLowerCase().includes("oneweb")) {
      cards.push({
        title: "OneWeb",
        description: "Global LEO uydu internet çözümü",
        icon: "satellite",
        link: "/uzay-haberlesmesi/oneweb"
      });
    }
    if (content.toLowerCase().includes("iridium")) {
      cards.push({
        title: "Iridium",
        description: "Global uydu iletişim sistemi",
        icon: "satellite",
        link: "/uzay-haberlesmesi/iridium"
      });
    }
    if (content.toLowerCase().includes("peplink")) {
      cards.push({
        title: "Peplink",
        description: "SD-WAN ve ağ çözümleri",
        icon: "wifi",
        link: "/kara-haberlesmesi/peplink"
      });
    }
    if (content.toLowerCase().includes("teltonika")) {
      cards.push({
        title: "Teltonika",
        description: "Endüstriyel IoT ve router çözümleri",
        icon: "wifi",
        link: "/kara-haberlesmesi/teltonika"
      });
    }
    if (content.toLowerCase().includes("siber güvenlik") || content.toLowerCase().includes("güvenlik")) {
      cards.push({
        title: "Siber Güvenlik",
        description: "Kurumsal güvenlik çözümleri",
        icon: "shield",
        link: "/siber-guvenlik"
      });
    }
    if (content.toLowerCase().includes("it hizmet") || content.toLowerCase().includes("bilişim")) {
      cards.push({
        title: "IT Hizmetleri",
        description: "Kurumsal IT altyapı çözümleri",
        icon: "monitor",
        link: "/it-hizmetleri"
      });
    }

    return cards.slice(0, 3);
  };

  const detectActionButtons = (content: string): { text: string; link: string }[] => {
    const buttons: { text: string; link: string }[] = [];
    
    if (content.toLowerCase().includes("iletişim") || content.toLowerCase().includes("teklif")) {
      buttons.push({ text: "Teklif Al", link: "/iletisim" });
    }
    if (content.toLowerCase().includes("harita") || content.toLowerCase().includes("kapsama")) {
      buttons.push({ text: "Haritayı Gör", link: "/starlink-haritasi" });
    }
    
    return buttons;
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error("API error");

      const data = await response.json();
      const assistantMessage: Message = { role: "assistant", content: data.message };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin." },
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
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#1e3a5f] hover:bg-[#2a4a6f] text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        data-testid="chatbot-toggle"
        aria-label="Sohbet asistanını aç"
      >
        <img src="/lacivert-icon.png" alt="Lacivert" className="w-8 h-8" />
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
            <div className="w-10 h-10 rounded-full bg-[#1e3a5f] flex items-center justify-center overflow-hidden ring-2 ring-blue-500/30">
              <img src="/lacivert-icon.png" alt="Lacivert" className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">Lacivert Asistan</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-gray-400 text-xs">Çevrimiçi</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
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
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#0d2137] flex items-center justify-center ring-4 ring-[#1e3a5f]/30">
                <img src="/lacivert-icon.png" alt="Lacivert" className="w-10 h-10" />
              </div>
              <p className="text-sm font-medium text-white mb-1">Merhaba!</p>
              <p className="text-xs text-gray-400 mb-4">Lacivert Teknoloji hizmetleri hakkında size yardımcı olabilirim.</p>
              <div className="space-y-2">
                <button
                  onClick={() => { setInput("Starlink nedir?"); }}
                  className="block w-full text-left px-4 py-2.5 text-xs bg-gradient-to-r from-[#1e3a5f]/30 to-transparent hover:from-[#1e3a5f]/50 border border-[#1e3a5f]/30 rounded-xl transition-all"
                  data-testid="quick-question-1"
                >
                  <span className="text-blue-400">→</span> Starlink nedir?
                </button>
                <button
                  onClick={() => { setInput("Denizcilik için hangi çözümleriniz var?"); }}
                  className="block w-full text-left px-4 py-2.5 text-xs bg-gradient-to-r from-[#1e3a5f]/30 to-transparent hover:from-[#1e3a5f]/50 border border-[#1e3a5f]/30 rounded-xl transition-all"
                  data-testid="quick-question-2"
                >
                  <span className="text-blue-400">→</span> Denizcilik için hangi çözümleriniz var?
                </button>
                <button
                  onClick={() => { setInput("Teklif almak istiyorum"); }}
                  className="block w-full text-left px-4 py-2.5 text-xs bg-gradient-to-r from-[#1e3a5f]/30 to-transparent hover:from-[#1e3a5f]/50 border border-[#1e3a5f]/30 rounded-xl transition-all"
                  data-testid="quick-question-3"
                >
                  <span className="text-blue-400">→</span> Teklif almak istiyorum
                </button>
              </div>
            </div>
          )}

          {messages.map((msg, i) => {
            const serviceCards = msg.role === "assistant" ? detectServiceCards(msg.content) : [];
            const actionButtons = msg.role === "assistant" ? detectActionButtons(msg.content) : [];
            
            return (
              <div key={i} className="space-y-2">
                <div className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center flex-shrink-0 overflow-hidden">
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
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center flex-shrink-0 overflow-hidden">
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
              placeholder="Mesajınızı yazın..."
              className="flex-1 bg-[#0a1929] border border-[#1e3a5f] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
              data-testid="chatbot-input"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
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
