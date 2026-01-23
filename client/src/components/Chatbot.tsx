import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    const parts = [];
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
          onClick={() => setIsOpen(false)}
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
        className={`fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#1e3a5f] hover:bg-[#2a4a6f] text-white shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        data-testid="chatbot-toggle"
        aria-label="Sohbet asistanını aç"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 left-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-100px)] bg-[#0a1929] border border-[#1e3a5f] rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e3a5f] bg-[#0d2137] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1e3a5f] flex items-center justify-center">
              <Bot className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">Lacivert Asistan</h3>
              <p className="text-gray-400 text-xs">Size nasıl yardımcı olabilirim?</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
            data-testid="chatbot-close"
            aria-label="Sohbeti kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" data-testid="chatbot-messages">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              <Bot className="w-12 h-12 mx-auto mb-3 text-[#1e3a5f]" />
              <p className="text-sm">Merhaba! Lacivert Teknoloji hizmetleri hakkında size yardımcı olabilirim.</p>
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => setInput("Starlink nedir?")}
                  className="block w-full text-left px-3 py-2 text-xs bg-[#1e3a5f]/30 hover:bg-[#1e3a5f]/50 rounded-lg transition-colors"
                  data-testid="quick-question-1"
                >
                  Starlink nedir?
                </button>
                <button
                  onClick={() => setInput("Denizcilik için hangi çözümleriniz var?")}
                  className="block w-full text-left px-3 py-2 text-xs bg-[#1e3a5f]/30 hover:bg-[#1e3a5f]/50 rounded-lg transition-colors"
                  data-testid="quick-question-2"
                >
                  Denizcilik için hangi çözümleriniz var?
                </button>
                <button
                  onClick={() => setInput("Teklif almak istiyorum")}
                  className="block w-full text-left px-3 py-2 text-xs bg-[#1e3a5f]/30 hover:bg-[#1e3a5f]/50 rounded-lg transition-colors"
                  data-testid="quick-question-3"
                >
                  Teklif almak istiyorum
                </button>
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-blue-400" />
                </div>
              )}
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-[#1e3a5f] text-white rounded-br-md"
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
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-blue-400" />
              </div>
              <div className="bg-[#0d2137] border border-[#1e3a5f]/50 px-4 py-2.5 rounded-2xl rounded-bl-md">
                <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[#1e3a5f] bg-[#0d2137] rounded-b-2xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Mesajınızı yazın..."
              className="flex-1 bg-[#0a1929] border border-[#1e3a5f] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              data-testid="chatbot-input"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-[#1e3a5f] hover:bg-[#2a4a6f] text-white rounded-xl px-4"
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
