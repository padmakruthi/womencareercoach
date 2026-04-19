import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Bot, User, Sparkles } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useApp } from '../context/AppContext';
import { getChatHistory, saveChatMessage, clearChatHistory, generateId, addActivity } from '../utils/storage';
import { ChatMessage } from '../data/types';
import { chatResponses } from '../data/roadmaps';

const suggestedQuestions = [
  'Which career suits me?',
  'How do I start AI/ML?',
  'What projects should I build?',
  'How do I improve my resume?',
  'What salary should I expect?',
  'How do I optimize LinkedIn?',
];

const getBotResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('start')) {
    return chatResponses.greeting[Math.floor(Math.random() * chatResponses.greeting.length)];
  }
  if (lower.includes('career') || lower.includes('which') || lower.includes('suits') || lower.includes('choose')) {
    return chatResponses.career[Math.floor(Math.random() * chatResponses.career.length)];
  }
  if (lower.includes('resume') || lower.includes('cv')) {
    return chatResponses.resume[Math.floor(Math.random() * chatResponses.resume.length)];
  }
  if (lower.includes('ai') || lower.includes('ml') || lower.includes('machine learning')) {
    return chatResponses.aiml[0];
  }
  if (lower.includes('project') || lower.includes('build') || lower.includes('portfolio')) {
    return chatResponses.projects[0];
  }
  if (lower.includes('salary') || lower.includes('pay') || lower.includes('earn') || lower.includes('money')) {
    return chatResponses.salary[0];
  }
  if (lower.includes('linkedin') || lower.includes('profile') || lower.includes('network')) {
    return chatResponses.linkedin[0];
  }
  return chatResponses.default[Math.floor(Math.random() * chatResponses.default.length)];
};

const Chatbot: React.FC = () => {
  const { darkMode, user } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const history = getChatHistory();
    if (history.length === 0) {
      const welcome: ChatMessage = {
        id: generateId(),
        role: 'bot',
        content: chatResponses.greeting[0],
        timestamp: new Date().toISOString(),
      };
      return [welcome];
    }
    return history;
  });
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async (text?: string) => {
    const msgText = (text || input).trim();
    if (!msgText) return;

    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: msgText,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    saveChatMessage(userMsg);
    setInput('');
    setTyping(true);

    // Simulate typing delay
    const delay = 800 + Math.random() * 1000;
    await new Promise(r => setTimeout(r, delay));

    const botContent = getBotResponse(msgText);
    const botMsg: ChatMessage = {
      id: generateId(),
      role: 'bot',
      content: botContent,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, botMsg]);
    saveChatMessage(botMsg);
    setTyping(false);
    addActivity({ type: 'chat', description: `Asked AI Coach: "${msgText.substring(0, 50)}..."` });
    inputRef.current?.focus();
  };

  const handleClear = () => {
    clearChatHistory();
    const welcome: ChatMessage = {
      id: generateId(),
      role: 'bot',
      content: chatResponses.greeting[0],
      timestamp: new Date().toISOString(),
    };
    setMessages([welcome]);
    saveChatMessage(welcome);
  };

  const formatTime = (iso: string) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
        {/* Header */}
        <div className={`flex items-center justify-between p-4 rounded-2xl mb-4 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-sm'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 flex items-center justify-center relative">
              <Bot size={20} className="text-white" />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-gray-800" />
            </div>
            <div>
              <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>CoachBot</p>
              <p className={`text-xs ${darkMode ? 'text-emerald-400' : 'text-emerald-500'}`}>● Online · AI Career Coach</p>
            </div>
          </div>
          <button onClick={handleClear} className={`p-2 rounded-xl transition-colors ${darkMode ? 'text-gray-500 hover:text-rose-400 hover:bg-gray-700' : 'text-gray-400 hover:text-rose-500 hover:bg-rose-50'}`} title="Clear chat">
            <Trash2 size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto rounded-2xl p-4 space-y-4 ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-gray-50 border border-gray-100'}`}>
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
                msg.role === 'bot'
                  ? 'bg-gradient-to-r from-rose-500 to-violet-600'
                  : 'bg-gradient-to-r from-violet-500 to-blue-600'
              }`}>
                {msg.role === 'bot' ? <Sparkles size={14} /> : (user?.name?.charAt(0) || 'U')}
              </div>

              {/* Bubble */}
              <div className={`max-w-xs sm:max-w-md lg:max-w-lg ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'chat-user rounded-tr-sm'
                    : 'chat-bot rounded-tl-sm'
                }`}>
                  {msg.content.split('\n').map((line, i) => (
                    <React.Fragment key={i}>{line}{i < msg.content.split('\n').length - 1 && <br />}</React.Fragment>
                  ))}
                </div>
                <span className={`text-xs px-1 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>{formatTime(msg.timestamp)}</span>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                <Sparkles size={14} className="text-white" />
              </div>
              <div className="chat-bot rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex items-center gap-1">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggested questions */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {suggestedQuestions.map(q => (
            <button key={q} onClick={() => sendMessage(q)} disabled={typing}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                darkMode ? 'border-gray-700 text-gray-400 hover:border-rose-500/50 hover:text-rose-400 bg-gray-800' : 'border-gray-200 text-gray-600 hover:border-rose-300 hover:text-rose-500 bg-white'
              } disabled:opacity-50`}>
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className={`mt-3 flex gap-2 p-2 rounded-2xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Ask me anything about your career..."
            disabled={typing}
            className={`flex-1 bg-transparent outline-none text-sm px-2 ${darkMode ? 'text-white placeholder-gray-600' : 'text-gray-900 placeholder-gray-400'} disabled:opacity-50`}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || typing}
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 flex items-center justify-center text-white disabled:opacity-40 transition-opacity hover:opacity-90 flex-shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chatbot;
