import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, Student } from '../types';
import { parseAndAnswerQuery } from '../data/chatbotKnowledge';
import { Bot, Send, X, Sparkles, User, RefreshCw } from 'lucide-react';

interface ChatbotWidgetProps {
  currentStudent: Student;
  externalQuery?: string;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ currentStudent, externalQuery }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: `Hello ${currentStudent.name}! I’m the EduStream assistant and I can help you with CGPA, attendance, explanations of indicators, and academic support. If you want, we can start with a simple question: what would you like to understand today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: ['CGPA Formula', 'Attendance Rules', 'Why is my performance declining?', 'Useful Contacts']
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Handle external query triggers
  useEffect(() => {
    if (externalQuery) {
      setIsOpen(true);
      handleSendMessage(externalQuery);
    }
  }, [externalQuery]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const botAnswer = parseAndAnswerQuery(query, currentStudent);
    const botMsg: ChatMessage = {
      id: `m-${Date.now() + 1}`,
      sender: 'bot',
      text: botAnswer.answer,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: botAnswer.quickReplies
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputText('');
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-2xl shadow-xl shadow-[#2563EB]/20 transition-all font-semibold text-xs cursor-pointer group hover:scale-105 border border-[#1D4ED8]"
        >
          <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <span>Ask the assistant</span>
          <span className="w-2 h-2 rounded-full bg-[#BFDBFE] animate-pulse" />
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md bg-white dark:bg-[#111827] rounded-2xl border border-[#DCEBFF] dark:border-white/10 shadow-2xl overflow-hidden flex flex-col h-[520px] transition-all">
          
          {/* Header */}
          <div className="p-4 bg-[#2563EB] text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-xs">EduStream Assistant</h3>
                </div>
                <p className="text-[10px] text-white/80">Friendly support for students and teachers</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([])}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white/80 hover:text-white cursor-pointer"
                title="Clear Chat"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8FBFF] dark:bg-[#0F172A] text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl whitespace-pre-wrap ${
                    m.sender === 'user'
                      ? 'bg-[#2563EB] text-white rounded-br-none shadow-xs'
                      : 'bg-white dark:bg-[#111827] text-[#0F172A] dark:text-[#E2E8F0] border border-[#DCEBFF] dark:border-white/10 rounded-bl-none shadow-xs'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                </div>
                <span className="text-[9px] text-[#64748b] dark:text-[#94a3b8] mt-1 px-1">
                  {m.timestamp}
                </span>

                {/* Quick Replies */}
                {m.sender === 'bot' && m.quickReplies && m.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {m.quickReplies.map((reply, rIdx) => (
                      <button
                        key={rIdx}
                        onClick={() => handleSendMessage(reply)}
                        className="text-[11px] px-2.5 py-1 bg-[#EFF6FF] dark:bg-[#1E293B] text-[#0F172A] dark:text-[#E2E8F0] rounded-lg border border-[#DBEAFE] dark:border-white/10 hover:bg-[#DBEAFE] dark:hover:bg-[#334155] transition-colors font-medium text-left cursor-pointer"
                      >
                        ⚡ {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white dark:bg-[#111827] border-t border-[#DCEBFF] dark:border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask a question about CGPA, attendance, or support..."
                className="flex-1 px-3.5 py-2 bg-[#F8FBFF] dark:bg-[#0F172A] border border-[#DCEBFF] dark:border-white/10 focus:border-[#2563EB] rounded-xl text-xs text-[#0F172A] dark:text-[#E2E8F0] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white rounded-xl transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
