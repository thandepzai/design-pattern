'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import { PATTERN_CATALOG, keywordRecommend, type PatternType, type Recommendation } from '@/lib/recommend';

const typeTheme: Record<PatternType, {
  badge: string; border: string; glow: string; dot: string;
  tabActive: string; tabIdle: string; chipHover: string; countBg: string;
}> = {
  C: {
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    border: 'border-cyan-500/30',
    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.1)]',
    dot: 'bg-cyan-400',
    tabActive: 'text-cyan-400 border-b-2 border-cyan-400',
    tabIdle: 'text-zinc-500 hover:text-cyan-400/70',
    chipHover: 'hover:border-cyan-500/40 hover:text-cyan-200 hover:bg-cyan-950/20',
    countBg: 'bg-cyan-500/10 text-cyan-500',
  },
  S: {
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    border: 'border-amber-500/30',
    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.1)]',
    dot: 'bg-amber-400',
    tabActive: 'text-amber-400 border-b-2 border-amber-400',
    tabIdle: 'text-zinc-500 hover:text-amber-400/70',
    chipHover: 'hover:border-amber-500/40 hover:text-amber-200 hover:bg-amber-950/20',
    countBg: 'bg-amber-500/10 text-amber-500',
  },
  B: {
    badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    border: 'border-violet-500/30',
    glow: 'shadow-[0_0_20px_rgba(139,92,246,0.1)]',
    dot: 'bg-violet-400',
    tabActive: 'text-violet-400 border-b-2 border-violet-400',
    tabIdle: 'text-zinc-500 hover:text-violet-400/70',
    chipHover: 'hover:border-violet-500/40 hover:text-violet-200 hover:bg-violet-950/20',
    countBg: 'bg-violet-500/10 text-violet-500',
  },
};

const typeName: Record<PatternType, string> = {
  C: 'Creational',
  S: 'Structural',
  B: 'Behavioral',
};

const SUGGESTION_GROUPS: { type: PatternType; items: string[] }[] = [
  {
    type: 'C',
    items: [
      // keywords: "một instance", "duy nhất", "dùng chung"
      'Chỉ muốn có một instance duy nhất dùng chung cho toàn bộ ứng dụng',
      // keywords: "tạo đối tượng", "lớp con quyết định", "khởi tạo"
      'Cần tạo đối tượng theo từng loại, để lớp con quyết định class nào được khởi tạo',
      // keywords: "bộ sản phẩm", "theme"
      'Muốn tạo bộ sản phẩm UI components đồng bộ theo theme sáng/tối',
      // keywords: "từng bước", "nhiều tham số", "tham số tuỳ chọn", "cấu hình phức tạp"
      'Tạo object từng bước với nhiều tham số tuỳ chọn và cấu hình phức tạp',
      // keywords: "nhân bản", "clone", "sao chép"
      'Cần nhân bản (clone) và sao chép đối tượng có sẵn thay vì tạo mới từ đầu',
    ],
  },
  {
    type: 'S',
    items: [
      // keywords: "tương thích", "tích hợp", "bên thứ ba"
      'Tích hợp thư viện bên thứ ba có API không tương thích với code hiện tại',
      // keywords: "kết hợp nhiều biến thể", "nhiều chiều", "độc lập"
      'Muốn kết hợp nhiều biến thể theo nhiều chiều độc lập, tránh bùng nổ số lượng class',
      // keywords: "cấu trúc lồng nhau", "thư mục", "menu lồng nhau"
      'Xử lý cấu trúc lồng nhau như thư mục hoặc menu lồng nhau theo cùng một cách',
      // keywords: "thêm tính năng", "bọc", "wrap", "không sửa class gốc"
      'Thêm tính năng linh hoạt cho object bằng cách bọc (wrap) mà không sửa class gốc',
      // keywords: "gói gọn nhiều bước", "đơn giản hoá"
      'Cần gói gọn nhiều bước phức tạp để đơn giản hoá interface cho client',
      // keywords: "tiết kiệm bộ nhớ", "hàng triệu object", "render nhiều phần tử"
      'Cần tiết kiệm bộ nhớ khi có hàng triệu object giống nhau cần render nhiều phần tử',
      // keywords: "cache", "kiểm soát truy cập", "phân quyền"
      'Cache kết quả API hoặc kiểm soát truy cập và phân quyền trước khi gọi service thật',
    ],
  },
  {
    type: 'B',
    items: [
      // keywords: "duyệt qua nhiều bộ lọc", "chuỗi xử lý", "handler"
      'Yêu cầu duyệt qua nhiều bộ lọc theo chuỗi xử lý, mỗi handler tự quyết định',
      // keywords: "undo", "redo", "lịch sử", "thao tác"
      'Muốn hỗ trợ undo/redo và lưu lịch sử thao tác trong editor',
      // keywords: "biểu thức", "parse", "ngôn ngữ", "dsl"
      'Cần parse biểu thức logic hoặc xây dựng ngôn ngữ DSL tự định nghĩa',
      // keywords: "duyệt", "collection"
      'Duyệt qua collection theo nhiều cách mà không lộ cấu trúc bên trong',
      // keywords: "nhiều component giao tiếp", "trung gian", "điều phối"
      'Nhiều component giao tiếp chằng chịt, cần một trung gian điều phối',
      // keywords: "snapshot", "khôi phục", "undo trạng thái"
      'Cần lưu snapshot để khôi phục trạng thái, undo trạng thái đối tượng',
      // keywords: "cập nhật tự động", "thông báo"
      'Nhiều nơi cần cập nhật tự động và nhận thông báo khi dữ liệu thay đổi',
      // keywords: "trạng thái", "chuyển trạng thái", "máy trạng thái"
      'Đối tượng cần hành xử khác khi chuyển trạng thái, xây dựng máy trạng thái',
      // keywords: "phương thức thanh toán", "hoán đổi", "thuật toán"
      'Có nhiều phương thức thanh toán và thuật toán, muốn hoán đổi qua lại dễ dàng',
      // keywords: "khung", "quy trình chung", "các bước giống nhau khác chi tiết"
      'Nhiều quy trình có bộ khung chung, các bước giống nhau khác chi tiết ở từng loại',
      // keywords: "thêm thao tác", "thao tác mới không sửa class"
      'Muốn thêm thao tác mới không sửa class vào cấu trúc đối tượng phức tạp',
    ],
  },
];

interface ChatMessage {
  role: 'user' | 'bot';
  text?: string;
  results?: Recommendation[];
}

export default function AiRecommender() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<PatternType>('C');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const submit = (text: string) => {
    const query = text.trim();
    if (!query || loading) return;
    setMessages((m) => [...m, { role: 'user', text: query }]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const results = keywordRecommend(query);
      setMessages((m) => [...m, { role: 'bot', results }]);
      setLoading(false);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit(input);
    }
  };

  const reset = () => {
    setMessages([]);
    setInput('');
    inputRef.current?.focus();
  };

  const isEmpty = messages.length === 0;
  const activeGroup = SUGGESTION_GROUPS.find((g) => g.type === activeTab)!;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-4">
      <div className="relative rounded-3xl border border-violet-500/20 bg-gradient-to-b from-violet-950/30 via-zinc-900/40 to-zinc-950 overflow-hidden glassmorphism">
        <div className="absolute -top-16 -right-10 w-64 h-64 bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-6 pt-5 pb-3">
          <span className="flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/25">
            <Sparkles className="w-3.5 h-3.5" /> Trợ lý gợi ý Pattern
          </span>
          {!isEmpty && (
            <button
              onClick={reset}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Cuộc hội thoại mới
            </button>
          )}
        </div>

        {/* Chat area */}
        <div className="px-6 pb-2 min-h-[160px] max-h-[420px] overflow-y-auto">
          <AnimatePresence>
            {isEmpty ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-4"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-1">
                  Mô tả bài toán của bạn,{' '}
                  <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    mình gợi ý pattern phù hợp.
                  </span>
                </h2>
                <p className="text-sm text-zinc-500 mb-4">
                  Không cần biết tên pattern — chỉ cần kể tình huống bằng lời thường.
                </p>

                {/* Tab bar */}
                <div className="flex border-b border-zinc-800 mb-3">
                  {SUGGESTION_GROUPS.map((group) => {
                    const theme = typeTheme[group.type];
                    const isActive = activeTab === group.type;
                    return (
                      <button
                        key={group.type}
                        onClick={() => setActiveTab(group.type)}
                        className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold transition-colors -mb-px ${
                          isActive ? theme.tabActive : theme.tabIdle
                        }`}
                      >
                        {typeName[group.type]}
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${theme.countBg}`}>
                          {group.items.length}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Suggestion list */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col gap-1.5"
                  >
                    {activeGroup.items.map((s, i) => (
                      <motion.button
                        key={s}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        onClick={() => submit(s)}
                        className={`text-left text-xs px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 transition-all ${typeTheme[activeTab].chipHover}`}
                      >
                        {s}
                      </motion.button>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="py-3 space-y-4">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {msg.role === 'user' ? (
                      <div className="flex justify-end">
                        <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-tr-sm bg-violet-600/20 border border-violet-500/25 text-zinc-200 text-sm leading-relaxed">
                          {msg.text}
                        </div>
                      </div>
                    ) : (
                      <BotMessage results={msg.results ?? []} />
                    )}
                  </motion.div>
                ))}

                {loading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1.5 items-center text-zinc-500 text-sm pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:300ms]" />
                  </motion.div>
                )}

                <div ref={bottomRef} />
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className="px-6 pb-5 pt-2">
          <div className="flex items-end gap-2 rounded-2xl bg-zinc-900/80 border border-zinc-700/60 focus-within:border-violet-500/50 transition-colors px-4 py-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="VD: Mình có nhiều cách thanh toán, muốn đổi qua lại dễ dàng..."
              rows={1}
              className="flex-1 bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 resize-none outline-none leading-relaxed max-h-28 overflow-y-auto"
              style={{ minHeight: '1.5rem' }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = 'auto';
                el.style.height = `${el.scrollHeight}px`;
              }}
            />
            <button
              onClick={() => submit(input)}
              disabled={!input.trim() || loading}
              className="shrink-0 w-8 h-8 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
            >
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
          <p className="text-[11px] text-zinc-600 mt-1.5 pl-1">Enter để gửi · Shift+Enter xuống dòng</p>
        </div>
      </div>
    </div>
  );
}

function BotMessage({ results }: { results: Recommendation[] }) {
  if (results.length === 0) {
    return (
      <div className="text-sm text-zinc-500 pl-1">
        Mình chưa tìm được pattern phù hợp. Thử mô tả cụ thể hơn nhé — ví dụ: "muốn undo/redo", "chỉ tạo một instance", "thêm tính năng không sửa code gốc"...
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      <p className="text-xs text-zinc-500 pl-1">
        Tìm thấy <span className="text-zinc-300 font-medium">{results.length}</span> pattern phù hợp:
      </p>
      {results.map((r, i) => {
        const theme = typeTheme[r.type];
        const meta = PATTERN_CATALOG.find((p) => p.id === r.id);
        return (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`rounded-2xl border ${theme.border} ${theme.glow} bg-zinc-900/60 p-4 flex items-center justify-between gap-4`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-2 h-2 rounded-full shrink-0 ${theme.dot}`} />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="text-zinc-100 font-semibold text-sm">{r.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${theme.badge}`}>
                    {typeName[r.type]}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{meta?.intent ?? r.reason}</p>
              </div>
            </div>
            <Link
              href={`/pattern/${r.id}`}
              className="shrink-0 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl border border-zinc-700 hover:border-violet-500/50 hover:text-violet-300 text-zinc-400 transition-all"
            >
              Xem <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
