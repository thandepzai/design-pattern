'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ArrowRight, ArrowLeft, RotateCcw, ChevronRight, CheckCircle2 } from 'lucide-react';
import { PATTERN_CATALOG, type PatternType } from '@/lib/recommend';

interface Option {
  label: string;
  hint?: string;
  goto?: string; // sang câu hỏi khác
  result?: string; // ra pattern (id)
}
interface QNode {
  question: string;
  subtitle?: string;
  options: Option[];
}

// Cây quyết định: trả lời lọc dần ra 1 trong 23 pattern.
// Cố ý dùng ngôn ngữ đời thường + ví dụ cụ thể, tránh thuật ngữ.
const TREE: Record<string, QNode> = {
  root: {
    question: 'Bạn đang loay hoay ở chỗ nào?',
    subtitle: 'Chọn câu gần với tình huống của bạn nhất — không cần biết tên mẫu nào cả.',
    options: [
      { label: 'Khâu TẠO RA đối tượng', hint: 'Tạo sao cho gọn, đúng, không bị tạo lung tung', goto: 'creational' },
      { label: 'Khâu LẮP GHÉP các phần lại với nhau', hint: 'Nối 2 thứ không khớp, gom nhiều phần, bọc thêm chức năng', goto: 'structural' },
      { label: 'Khâu cho các phần PHỐI HỢP & xử lý', hint: 'Cái này đổi thì cái kia biết, undo/redo, nhiều cách làm…', goto: 'behavioral' },
    ],
  },

  // ----- Creational -----
  creational: {
    question: 'Về việc tạo đối tượng, ý bạn là gì?',
    options: [
      { label: 'Mình chỉ muốn có DUY NHẤT một cái, dùng chung khắp nơi', hint: 'VD: 1 kết nối database, 1 file cấu hình, 1 logger cho cả app', result: '01-C-Singleton-pattern' },
      { label: 'Object có quá nhiều phần / tuỳ chọn, tạo một phát thì rối', hint: 'VD: dựng một cái form lớn, một câu truy vấn, một nhân vật nhiều thuộc tính', result: '04-C-Builder-pattern' },
      { label: 'Mình muốn tạo cái mới y hệt một cái đã có sẵn', hint: 'Nhân bản (copy) thay vì làm lại từ đầu', result: '05-C-Prototype-pattern' },
      { label: 'Mình không muốn viết "new ..." cụ thể rải rác khắp nơi', hint: 'Giao việc chọn loại nào cho một chỗ khác lo', goto: 'factory' },
    ],
  },
  factory: {
    question: 'Bạn cần sinh ra ít hay nhiều kiểu đồ?',
    options: [
      { label: 'Một kiểu thôi, nhưng mỗi nơi tạo một biến thể khác nhau', hint: 'VD: nút bấm kiểu Windows vs Mac, thông báo Email vs SMS', result: '02-C-FactoryMethod-pattern' },
      { label: 'Cả một BỘ nhiều món phải đi chung với nhau', hint: 'VD: cả bộ giao diện theo theme tối/sáng: nút + ô nhập + menu cùng kiểu', result: '03-C-AbstractFactory-pattern' },
    ],
  },

  // ----- Structural -----
  structural: {
    question: 'Bạn muốn làm gì với các thành phần?',
    options: [
      { label: 'Làm cho 2 thứ vốn không khớp nhau dùng chung được', hint: 'Ghép nối, cho tương thích', goto: 'struct_connect' },
      { label: 'Thêm bớt hoặc che bớt chức năng của một thứ', hint: 'Bọc thêm tính năng, hoặc gói gọn lại cho đỡ phức tạp', goto: 'struct_wrap' },
      { label: 'Quản lý thật nhiều thứ sao cho gọn & nhẹ', hint: 'Tổ chức theo cây, hoặc tiết kiệm bộ nhớ', goto: 'struct_organize' },
    ],
  },
  struct_connect: {
    question: 'Cụ thể hơn nhé:',
    options: [
      { label: 'Mình có 2 đoạn code "lệch chuẩn" nhau, muốn chúng làm việc chung', hint: 'VD: ghép thư viện cũ hoặc của bên thứ ba vào code mới', result: '06-S-Adapter-pattern' },
      { label: 'Mình có nhiều biến thể chồng chéo nhau, muốn tách cho dễ sửa', hint: 'VD: nhiều loại điều khiển × nhiều loại thiết bị, tách thành 2 trục độc lập', result: '07-S-Bridge-pattern' },
    ],
  },
  struct_wrap: {
    question: 'Bạn muốn điều gì?',
    options: [
      { label: 'Thêm tính năng cho một thứ mà KHÔNG được sửa code gốc của nó', hint: 'VD: thêm topping cho ly trà, thêm khung viền cho ảnh', result: '09-S-Decorator-pattern' },
      { label: 'Một hệ thống quá rắc rối, mình muốn một "nút bấm" đơn giản gọi hết', hint: 'Giấu sự phức tạp sau một cửa vào gọn gàng', result: '10-S-Facade-pattern' },
      { label: 'Mình muốn kiểm soát ai/khi nào được dùng thứ "thật"', hint: 'VD: tải ảnh chỉ khi cần (lazy), nhớ tạm (cache), chặn người không có quyền', result: '12-S-Proxy-pattern' },
    ],
  },
  struct_organize: {
    question: 'Tình huống của bạn giống cái nào?',
    options: [
      { label: 'Có thứ lồng trong thứ, muốn xử lý "một cái" và "cả nhóm" giống nhau', hint: 'VD: thư mục chứa file & thư mục con; menu nhiều cấp', result: '08-S-Composite-pattern' },
      { label: 'Mình tạo CỰC NHIỀU object na ná nhau, sợ tốn bộ nhớ', hint: 'VD: render hàng nghìn cái cây trong game, hàng triệu ký tự', result: '11-S-Flyweight-pattern' },
    ],
  },

  // ----- Behavioral -----
  behavioral: {
    question: 'Chuyện phối hợp / xử lý của bạn là gì?',
    options: [
      { label: 'Một thứ đổi thì những thứ khác phải biết & đổi theo', hint: 'VD: dữ liệu đổi → nhiều màn hình tự cập nhật; lưu lại để quay về sau', goto: 'behav_react' },
      { label: 'Có nhiều cách làm cùng một việc, hoặc muốn quy trình linh hoạt', hint: 'VD: đổi qua lại giữa các cách; undo/redo; các bước na ná nhau', goto: 'behav_logic' },
      { label: 'Cần đi qua / điều phối nhiều thứ một cách trật tự', hint: 'VD: duyệt danh sách; cho việc đi qua nhiều người duyệt; gom về một đầu mối', goto: 'behav_traverse' },
    ],
  },
  behav_react: {
    question: 'Cụ thể hơn:',
    options: [
      { label: 'Một chỗ đổi, nhiều chỗ khác phải TỰ ĐỘNG cập nhật theo', hint: 'VD: giỏ hàng đổi → số lượng, tổng tiền, badge cùng đổi một lúc', result: '19-B-Observer-pattern' },
      { label: 'Cùng một thứ nhưng cư xử khác nhau tuỳ "tình trạng" hiện tại', hint: 'VD: đơn hàng: mới → đang giao → đã nhận, mỗi giai đoạn làm khác nhau', result: '20-B-State-pattern' },
      { label: 'Mình muốn lưu lại để sau này quay về trạng thái cũ', hint: 'VD: nút Undo, lưu nháp, ảnh chụp nhanh trạng thái (snapshot)', result: '18-B-Memento-pattern' },
    ],
  },
  behav_logic: {
    question: 'Bạn cần điều gì?',
    options: [
      { label: 'Cùng một việc có nhiều cách làm, muốn đổi qua lại dễ dàng', hint: 'VD: nhiều kiểu thanh toán; nhiều cách sắp xếp / tính giảm giá', result: '21-B-Strategy-pattern' },
      { label: 'Muốn ghi lại các thao tác để hoàn tác hoặc xếp hàng chờ chạy', hint: 'VD: undo/redo trong editor, hàng đợi lệnh', result: '14-B-Command-pattern' },
      { label: 'Nhiều quy trình giống nhau ở khung, chỉ khác vài bước nhỏ', hint: 'VD: các bước pha chế giống nhau, chỉ khác nguyên liệu', result: '22-B-TemplateMethod-pattern' },
      { label: 'Mình cần đọc & chạy một "công thức" hay ngôn ngữ tự định nghĩa', hint: 'VD: máy tính biểu thức, bộ lọc tìm kiếm tự viết', result: '15-B-Interpreter-pattern' },
    ],
  },
  behav_traverse: {
    question: 'Bạn đang xử lý kiểu nào?',
    options: [
      { label: 'Đi qua từng phần tử trong một danh sách / tập hợp', hint: 'Duyệt lần lượt mà không cần biết bên trong nó chứa gì', result: '16-B-Iterator-pattern' },
      { label: 'Cho một yêu cầu đi qua lần lượt nhiều "người duyệt"', hint: 'VD: đơn xin nghỉ qua tổ trưởng → trưởng phòng → giám đốc; chuỗi bộ lọc', result: '13-B-ChainOfResponsibility-pattern' },
      { label: 'Muốn thêm "việc xử lý mới" trên dữ liệu mà không sửa class cũ', hint: 'VD: từ cùng dữ liệu, lúc xuất PDF, lúc xuất Excel, lúc tính tổng', result: '23-B-Visitor-pattern' },
      { label: 'Quá nhiều thứ nói chuyện chằng chịt, muốn gom về một đầu mối', hint: 'VD: phòng chat (mọi người nhắn qua server); điều phối các ô trong form', result: '17-B-Mediator-pattern' },
    ],
  },
};

const typeTheme: Record<PatternType, { text: string; badge: string; border: string; glow: string }> = {
  C: { text: 'text-cyan-400', badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', border: 'border-cyan-500/40', glow: 'shadow-[0_0_30px_rgba(6,182,212,0.15)]' },
  S: { text: 'text-amber-400', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20', border: 'border-amber-500/40', glow: 'shadow-[0_0_30px_rgba(245,158,11,0.15)]' },
  B: { text: 'text-violet-400', badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20', border: 'border-violet-500/40', glow: 'shadow-[0_0_30px_rgba(139,92,246,0.15)]' },
};

const typeName: Record<PatternType, string> = {
  C: 'Creational (Khởi tạo)',
  S: 'Structural (Cấu trúc)',
  B: 'Behavioral (Hành vi)',
};

export default function AiRecommender() {
  const [nodeKey, setNodeKey] = useState('root');
  const [trail, setTrail] = useState<{ key: string; answer: string }[]>([]);
  const [resultId, setResultId] = useState<string | null>(null);

  const node = TREE[nodeKey];
  const result = resultId ? PATTERN_CATALOG.find((p) => p.id === resultId) ?? null : null;

  const choose = (opt: Option) => {
    if (opt.result) {
      setResultId(opt.result);
    } else if (opt.goto) {
      setTrail((t) => [...t, { key: nodeKey, answer: opt.label }]);
      setNodeKey(opt.goto);
    }
  };

  const back = () => {
    if (resultId) {
      setResultId(null);
      return;
    }
    setTrail((t) => {
      const copy = [...t];
      const last = copy.pop();
      if (last) setNodeKey(last.key);
      return copy;
    });
  };

  const restart = () => {
    setNodeKey('root');
    setTrail([]);
    setResultId(null);
  };

  const step = trail.length + 1;
  const canGoBack = resultId !== null || trail.length > 0;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-4">
      <div className="relative rounded-3xl border border-violet-500/20 bg-gradient-to-b from-violet-950/30 via-zinc-900/40 to-zinc-950 p-6 md:p-8 overflow-hidden glassmorphism">
        <div className="absolute -top-16 -right-10 w-64 h-64 bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
          <span className="flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/25">
            <Compass className="w-3.5 h-3.5" /> Trợ lý chọn Pattern
          </span>
          {canGoBack && (
            <div className="flex items-center gap-2">
              <button onClick={back} className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
              </button>
              <button onClick={restart} className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                <RotateCcw className="w-3.5 h-3.5" /> Làm lại
              </button>
            </div>
          )}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-2">
          Không biết dùng mẫu nào? <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Trả lời vài câu, mình lọc giúp.</span>
        </h2>

        {/* Breadcrumb các lựa chọn đã chọn */}
        {trail.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap mb-5 text-xs text-zinc-500">
            {trail.map((t, i) => (
              <React.Fragment key={i}>
                {i > 0 && <ChevronRight className="w-3 h-3" />}
                <span className="px-2 py-0.5 rounded-md bg-zinc-900/70 border border-zinc-800 text-zinc-400">{t.answer}</span>
              </React.Fragment>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {!result ? (
            /* ----- Câu hỏi ----- */
            <motion.div
              key={nodeKey}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4">
                <p className="text-[11px] uppercase tracking-wider text-violet-400/70 mb-1">Bước {step}</p>
                <h3 className="text-lg md:text-xl font-semibold text-zinc-100">{node.question}</h3>
                {node.subtitle && <p className="text-sm text-zinc-500 mt-1">{node.subtitle}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {node.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => choose(opt)}
                    className="group text-left p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-violet-500/50 hover:bg-zinc-900 transition-all flex items-start justify-between gap-3"
                  >
                    <span>
                      <span className="block text-zinc-100 font-medium leading-snug">{opt.label}</span>
                      {opt.hint && <span className="block text-xs text-zinc-500 mt-1">{opt.hint}</span>}
                    </span>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* ----- Kết quả ----- */
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-4">
                <CheckCircle2 className="w-4 h-4" /> Mẫu phù hợp nhất cho bạn:
              </div>

              <div className={`grid md:grid-cols-2 gap-6 items-center rounded-2xl bg-zinc-900/60 border ${typeTheme[result.type].border} ${typeTheme[result.type].glow} p-6`}>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-2xl font-bold text-zinc-700">{result.number}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${typeTheme[result.type].badge}`}>{result.type}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-100">{result.name}</h3>
                  <p className="text-sm text-zinc-500 mb-3">{result.label} · {typeName[result.type]}</p>
                  <p className="text-zinc-300 leading-relaxed mb-5">{result.intent}</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Link
                      href={`/pattern/${result.id}`}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:opacity-90 transition-all`}
                    >
                      Học mẫu này <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button onClick={restart} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-zinc-300 border border-zinc-800 hover:border-zinc-700 transition-colors">
                      <RotateCcw className="w-4 h-4" /> Chọn lại từ đầu
                    </button>
                  </div>
                </div>

                {/* Ảnh minh hoạ sơ đồ UML */}
                <div className="rounded-xl bg-zinc-950/60 border border-zinc-800 p-3 flex items-center justify-center min-h-[180px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/${result.id}.png`}
                    alt={`Sơ đồ ${result.name}`}
                    className="max-h-[260px] w-auto object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
