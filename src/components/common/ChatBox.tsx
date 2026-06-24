import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Send, Plus, Smile } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
}

interface ChatBoxProps {
  recipientName: string;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ recipientName }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: `Hey! I saw your profile and loved your bio.`, sender: 'them', timestamp: '10:00 AM' },
    { id: '2', text: `Thanks! I really appreciate it. How's your day going?`, sender: 'me', timestamp: '10:02 AM' },
    { id: '3', text: `It's going great! Just finished a session. Do you have any plans for the weekend?`, sender: 'them', timestamp: '10:05 AM' },
    { id: '4', text: `I was thinking about checking out that new exhibit downtown.`, sender: 'me', timestamp: '10:07 AM' },
    { id: '5', text: `Oh! I've been wanting to go there too.`, sender: 'them', timestamp: '10:08 AM' },
    { id: '6', text: `Maybe we could go together?`, sender: 'them', timestamp: '10:08 AM' },
    { id: '7', text: `That sounds like a great idea! What time works for you?`, sender: 'me', timestamp: '10:10 AM' },
    { id: '8', text: `How about Saturday afternoon, around 2 PM?`, sender: 'them', timestamp: '10:12 AM' },
    { id: '9', text: `Perfect. I'll put it in my calendar.`, sender: 'me', timestamp: '10:15 AM' },
    { id: '10', text: `Awesome! I'm really looking forward to it.`, sender: 'them', timestamp: '10:16 AM' },
    { id: '11', text: `By the way, have you ever been to that coffee shop next door?`, sender: 'them', timestamp: '10:18 AM' },
    { id: '12', text: `The one with the blue door? Yes, their lattes are incredible.`, sender: 'me', timestamp: '10:20 AM' },
    { id: '13', text: `Exactly! We should grab a drink after the exhibit.`, sender: 'them', timestamp: '10:22 AM' },
    { id: '14', text: `Definitely. It's a plan.`, sender: 'me', timestamp: '10:25 AM' },
    { id: '15', text: `See you then!`, sender: 'them', timestamp: '10:26 AM' },
    { id: '16', text: `Can't wait!`, sender: 'me', timestamp: '10:27 AM' },
    { id: '17', text: `I'll send you a message when I'm on my way.`, sender: 'me', timestamp: '10:28 AM' },
    { id: '18', text: `Sounds good. See ya!`, sender: 'them', timestamp: '10:30 AM' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Messages List */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 pt-6 pb-4 flex flex-col gap-1.5 hide-scrollbar"
      >
        <div className="flex justify-center mb-2">
          <span className="px-2 py-0.5 bg-[#392B28]/[0.03] rounded-full text-[8px] font-black uppercase tracking-[1.5px] text-[#392B28]/20">
            Today
          </span>
        </div>

        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={cn(
              "flex flex-col max-w-[85%] transition-all animate-in fade-in slide-in-from-bottom-1",
              msg.sender === 'me' ? "self-end items-end" : "self-start items-start"
            )}
          >
            <div 
              className={cn(
                "px-3.5 py-2.5 rounded-[1.25rem] text-[12px] font-medium leading-[1.4] shadow-sm",
                msg.sender === 'me' 
                  ? "bg-[#392B28] text-white rounded-br-none" 
                  : "bg-[#FDFDFD]/80 text-[#392B28] rounded-bl-none border border-[#392B28]/5"
              )}
            >
              {msg.text}
            </div>
            <span className="text-[8px] font-bold text-[#392B28]/20 mt-1 px-1 uppercase tracking-tighter">
              {msg.timestamp}
            </span>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex-none px-4 pb-4 pt-2">
        <div className="bg-[#FDFDFD]/90 backdrop-blur-md rounded-[1.5rem] p-1 shadow-[0_4px_20px_rgba(57,43,40,0.06)] border border-[#392B28]/5 flex items-center gap-1">
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#392B28]/30 active:scale-90 transition-transform">
            <Plus className="w-4 h-4" />
          </button>
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Message ${recipientName}...`}
            className="flex-1 bg-transparent border-none outline-none text-[12px] font-medium text-[#392B28] placeholder:text-[#392B28]/15 px-1"
          />
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#392B28]/30 active:scale-90 transition-transform">
            <Smile className="w-4 h-4" />
          </button>
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm active:scale-95",
              inputValue.trim() ? "bg-[#392B28] text-white" : "bg-[#392B28]/[0.03] text-[#392B28]/10"
            )}
          >
            <Send className="w-3.5 h-3.5" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};
