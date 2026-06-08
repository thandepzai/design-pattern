'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Editor from '@monaco-editor/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  ArrowLeft, BookOpen, Code, Play, CheckCircle2, 
  Terminal, Save, AlertTriangle, Layers, Cpu, Zap, ChevronRight, Check
} from 'lucide-react';
import type { PatternDetail, PatternItem } from '@/lib/patterns';

// Khai báo kiểu cho window confetti
declare global {
  interface Window {
    confetti?: (options?: any) => void;
  }
}

// Component vẽ sơ đồ UML Mermaid
function MermaidRenderer({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const containerId = useRef(`mermaid-${Math.floor(Math.random() * 1000000)}`);

  const cleanMermaidChart = (chartText: string): string => {
    let clean = chartText;
    
    // 1. Chuyển đổi thuộc tính từ "name: Type" sang "Type name"
    // Ví dụ: -paymentStrategy: PaymentStrategy -> -PaymentStrategy paymentStrategy
    // Nhưng tránh ảnh hưởng đến các dòng định nghĩa mối quan hệ như ShoppingCart --> PaymentStrategy : uses
    clean = clean.replace(/^\s*([+\-#~])\s*(\w+)\s*:\s*([\w\[\]<>]+)/gm, (match, visibility, name, type) => {
      const cleanType = type.replace(/\[\]/g, 'Array').replace(/[<>]/g, '_');
      return `    ${visibility}${cleanType} ${name}`;
    });

    // 2. Rút gọn tham số phương thức: loại bỏ ": Type" trong ngoặc đơn
    // Ví dụ: setPaymentStrategy(strategy: PaymentStrategy) -> setPaymentStrategy(strategy)
    clean = clean.replace(/\(([^)]+)\)/g, (match, p1) => {
      if (p1.includes('<<') || p1.includes('>>')) return match;
      const params = p1.split(',').map((param: string) => {
        const parts = param.split(':');
        return parts[0].trim();
      });
      return `(${params.join(', ')})`;
    });

    // 3. Chuẩn hóa kiểu trả về của phương thức ở cuối dòng (nếu có khoảng trắng + kiểu trả về)
    // Ví dụ: +pay(amount) void -> +void pay(amount)
    clean = clean.replace(/^\s*([+\-#~])\s*(\w+)\(([^)]*)\)\s+(\w+)/gm, (match, visibility, name, params, returnType) => {
      return `    ${visibility}${returnType} ${name}(${params})`;
    });

    return clean;
  };

  useEffect(() => {
    let isMounted = true;
    const render = async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'loose',
          themeVariables: {
            background: '#09090b',
            primaryColor: '#8b5cf6',
            primaryTextColor: '#f4f4f5',
            lineColor: '#27272a',
          }
        });

        // Xóa SVG cũ
        setSvg('');
        setError(false);

        const cleanChart = cleanMermaidChart(chart);
        const { svg: svgHtml } = await mermaid.render(containerId.current, cleanChart);
        if (isMounted) {
          setSvg(svgHtml);
        }
      } catch (err) {
        console.error('Mermaid render error:', err);
        if (isMounted) {
          setError(true);
        }
      }
    };

    render();

    return () => {
      isMounted = false;
      const el = document.getElementById(containerId.current);
      if (el) el.remove();
    };
  }, [chart]);

  if (error) {
    return (
      <pre className="bg-red-950/20 border border-red-900/50 p-4 rounded-xl text-red-400 text-xs overflow-x-auto font-mono my-4">
        {chart}
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="flex justify-center items-center p-8 bg-zinc-950 rounded-xl border border-zinc-900 text-zinc-500 italic text-sm my-4">
        <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mr-2" />
        Đang vẽ sơ đồ UML...
      </div>
    );
  }

  return (
    <div 
      className="flex justify-center p-6 bg-zinc-950 rounded-xl border border-zinc-900 overflow-x-auto my-4 text-zinc-200 animate-fade-in"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

interface Props {
  pattern: PatternDetail;
  allPatterns: PatternItem[];
}

export default function PatternDetailClient({ pattern, allPatterns }: Props) {
  const [activeTab, setActiveTab] = useState<'theory' | 'example' | 'sandbox'>('theory');
  const [code, setCode] = useState(pattern.exercisesCode);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(pattern.status === 'completed');

  // Kiểm tra xem ảnh minh họa có tồn tại không (nếu có lỗi load ảnh thì ẩn đi)
  const [hasIllustration, setHasIllustration] = useState(pattern.hasIllustration);

  useEffect(() => {
    setCode(pattern.exercisesCode);
    setActiveTab('theory');
    setTerminalLogs([]);
    setSaveStatus('idle');
    setIsCompleted(pattern.status === 'completed');
    setHasIllustration(pattern.hasIllustration); // Reset trạng thái ảnh minh họa khi chuyển bài
  }, [pattern]);

  // Tự động load thư viện canvas-confetti khi làm đúng bài tập
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // CSS Colors cho loại Pattern
  const getThemeColors = (type: 'C' | 'S' | 'B') => {
    switch (type) {
      case 'C':
        return {
          text: 'text-cyan-400',
          bg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
          accent: 'cyan',
          focus: 'focus:border-cyan-500',
          borderActive: 'border-cyan-400 text-cyan-400',
          bgButton: 'bg-cyan-500 hover:bg-cyan-600 text-zinc-950',
          glow: 'shadow-[0_0_15px_rgba(6,182,212,0.15)]',
        };
      case 'S':
        return {
          text: 'text-amber-400',
          bg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
          accent: 'amber',
          focus: 'focus:border-amber-500',
          borderActive: 'border-amber-400 text-amber-400',
          bgButton: 'bg-amber-500 hover:bg-amber-600 text-zinc-950',
          glow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]',
        };
      case 'B':
        return {
          text: 'text-violet-400',
          bg: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
          accent: 'violet',
          focus: 'focus:border-violet-500',
          borderActive: 'border-violet-400 text-violet-400',
          bgButton: 'bg-violet-500 hover:bg-violet-600 text-zinc-50',
          glow: 'shadow-[0_0_15px_rgba(139,92,246,0.15)]',
        };
    }
  };

  const themeColors = getThemeColors(pattern.type);

  // Lưu code local
  const handleSave = async (silent = false) => {
    setIsSaving(true);
    setSaveStatus('idle');
    try {
      const res = await fetch(`/api/patterns/${pattern.id}/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      if (res.ok) {
        setSaveStatus('success');
        if (!silent) {
          setTimeout(() => setSaveStatus('idle'), 3000);
        }
      } else {
        setSaveStatus('error');
      }
    } catch (e) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  // Compile TS -> JS và chạy trên Trình duyệt
  const handleRunTests = async () => {
    setIsRunning(true);
    setTerminalLogs(['⚡ Đang biên dịch code TypeScript...', '⌛ Đang chạy test cases...']);

    // Tự động lưu file local luôn
    await handleSave(true);

    setTimeout(async () => {
      try {
        const { transform } = await import('sucrase');
        
        // Cần loại bỏ các import/export của ES Modules để eval chạy được ở client
        const compiled = transform(code, {
          transforms: ['typescript', 'imports'],
        });

        const transpiledJs = compiled.code;

        // Bẫy console.log
        const logs: string[] = [];
        const originalLog = console.log;
        console.log = (...args: any[]) => {
          const msg = args.map(arg => {
            if (typeof arg === 'object') {
              try { return JSON.stringify(arg); } catch(e) { return String(arg); }
            }
            return String(arg);
          }).join(' ');
          logs.push(msg);
        };

        try {
          const hasLogsDeclaration = /\b(const|let|var)\s+operationLogs\b/.test(transpiledJs);
          const wrappedJs = `
            ${hasLogsDeclaration ? '' : 'let operationLogs = [];'}
            ${transpiledJs}
          `;
          
          const runCode = new Function(wrappedJs);
          runCode();

          console.log = originalLog; // Khôi phục ngay lập tức

          setTerminalLogs(logs);

          // Kiểm tra xem tất cả test cases có thành công không
          const allSuccessful = logs.some(log => log.includes('Thành công') || log.includes('✓')) &&
                               !logs.some(log => log.includes('Thất bại') || log.includes('✗') || log.includes('FAIL'));

          if (allSuccessful) {
            setIsCompleted(true);
            if (window.confetti) {
              window.confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
              });
            }
          }
        } catch (execError: any) {
          console.log = originalLog;
          setTerminalLogs([...logs, `❌ LỖI RUNTIME: ${execError.message}`]);
        }
      } catch (compileError: any) {
        setTerminalLogs([`❌ LỖI BIÊN DỊCH: ${compileError.message}`]);
      } finally {
        setIsRunning(false);
      }
    }, 500);
  };

  const handleRunExample = async () => {
    setIsRunning(true);
    setTerminalLogs(['⚡ Đang biên dịch code ví dụ...', '⌛ Đang thực thi...']);

    setTimeout(async () => {
      try {
        const { transform } = await import('sucrase');
        const compiled = transform(pattern.exampleCode, {
          transforms: ['typescript', 'imports'],
        });
        
        const logs: string[] = [];
        const originalLog = console.log;
        console.log = (...args: any[]) => {
          logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
        };

        try {
          const runCode = new Function(compiled.code);
          runCode();
          console.log = originalLog;
          setTerminalLogs(logs);
        } catch (execError: any) {
          console.log = originalLog;
          setTerminalLogs([...logs, `❌ LỖI RUNTIME: ${execError.message}`]);
        }
      } catch (compileError: any) {
        setTerminalLogs([`❌ LỖI BIÊN DỊCH: ${compileError.message}`]);
      } finally {
        setIsRunning(false);
      }
    }, 500);
  };

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden text-zinc-100 relative">
      {/* Sidebar chọn nhanh Pattern */}
      <aside className="w-80 border-r border-zinc-900 bg-zinc-950/80 backdrop-blur-md flex flex-col h-full hidden xl:flex">
        <div className="p-4 border-b border-zinc-900 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" /> Quay lại Dashboard
          </Link>
          <span className="text-xs bg-zinc-900 px-2 py-1 rounded text-zinc-500 border border-zinc-800">GoF Go</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
          {allPatterns.map((p) => {
            const isCurrent = p.id === pattern.id;
            const pColors = getThemeColors(p.type);
            return (
              <Link
                key={p.id}
                href={`/pattern/${p.id}`}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isCurrent 
                    ? 'bg-zinc-900 text-white border border-zinc-800' 
                    : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={`text-xs font-mono font-bold ${isCurrent ? pColors.text : 'text-zinc-600'}`}>
                    {p.number}
                  </span>
                  <span className="truncate">{p.title.split(' (')[0]}</span>
                </div>
                {p.status === 'completed' && <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                {p.status === 'in-progress' && <div className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" />}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header Bar */}
        <header className="p-4 border-b border-zinc-900 bg-zinc-950/40 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <Link href="/" className="xl:hidden p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white mr-1">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-zinc-500 font-mono">PATTERN #{pattern.number}</span>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${themeColors.bg}`}>
                  {pattern.typeName}
                </span>
                {isCompleted && (
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">
                    Đã hoàn thành
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white mt-0.5">{pattern.title}</h2>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => { setActiveTab('theory'); setTerminalLogs([]); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'theory'
                  ? `bg-zinc-950 text-white border border-zinc-800 ${themeColors.glow}`
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Lý thuyết
            </button>
            <button
              onClick={() => { setActiveTab('example'); setTerminalLogs([]); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'example'
                  ? `bg-zinc-950 text-white border border-zinc-800 ${themeColors.glow}`
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Code className="w-4 h-4" /> Ví dụ Code
            </button>
            <button
              onClick={() => { setActiveTab('sandbox'); setTerminalLogs([]); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'sandbox'
                  ? `bg-zinc-950 text-white border border-zinc-800 ${themeColors.glow}`
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Play className="w-4 h-4" /> Thực hành & Check
            </button>
          </div>
        </header>

        {/* Tab Contents */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {activeTab === 'theory' && (
              <motion.div
                key="theory"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full overflow-y-auto p-6 md:p-8 max-w-4xl mx-auto space-y-8"
              >
                {/* Ảnh minh họa Concept Design Pattern */}
                {hasIllustration && (
                  <div className="w-full relative rounded-2xl border border-zinc-900 bg-zinc-950 overflow-hidden shadow-2xl group my-4">
                    {/* Hiệu ứng mờ nền */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
                    
                    {/* Ảnh từ thư mục public/images */}
                    <img 
                      src={`/images/${pattern.id}.png`} 
                      alt={`Visual concept of ${pattern.name}`}
                      onError={() => setHasIllustration(false)} // Ẩn card này nếu ảnh không tồn tại
                      className="w-full h-[260px] md:h-[340px] object-cover opacity-85 group-hover:scale-[1.02] transition-transform duration-700 select-none pointer-events-none"
                    />

                    {/* Text Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 z-20">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${themeColors.bg} inline-block mb-2`}>
                        Visual Concept
                      </span>
                      <h3 className="text-xl font-bold text-white leading-tight">
                        Trực quan hóa thiết kế: {pattern.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                        Mô hình minh họa các thành phần chính và cách chúng phối hợp xử lý logic trong mẫu thiết kế.
                      </p>
                    </div>
                  </div>
                )}

                {/* Custom Markdown Renderer */}
                <article className="prose prose-invert prose-zinc max-w-none text-zinc-300">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => <h1 className="text-3xl font-extrabold text-white border-b border-zinc-900 pb-3 mb-6 mt-8">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-2xl font-bold text-white border-b border-zinc-900 pb-2 mb-4 mt-8">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-xl font-semibold text-white mb-3 mt-6">{children}</h3>,
                      p: ({ children }) => <p className="leading-relaxed mb-4 text-zinc-300">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc pl-6 space-y-2 mb-4 text-zinc-300">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal pl-6 space-y-2 mb-4 text-zinc-300">{children}</ol>,
                      li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                      pre: ({ children }) => {
                        const childrenArray = React.Children.toArray(children);
                        const firstChild = childrenArray[0] as any;
                        const className = firstChild?.props?.className ?? '';
                        const match = /language-(\w+)/.exec(className);

                        if (match?.[1] === 'mermaid') {
                          const chartCode = String(firstChild.props.children).replace(/\n$/, '');
                          return <MermaidRenderer chart={chartCode} />;
                        }

                        const lang = match?.[1] ?? 'typescript';
                        const codeText = String(firstChild?.props?.children ?? '').replace(/\n$/, '');

                        return (
                          <div className="my-4 rounded-xl overflow-hidden border border-zinc-800">
                            <SyntaxHighlighter
                              language={lang}
                              style={vscDarkPlus}
                              customStyle={{
                                margin: 0,
                                padding: '1rem',
                                fontSize: '0.8rem',
                                background: '#0d0d0f',
                              }}
                              showLineNumbers
                              lineNumberStyle={{ color: '#4a4a5a', minWidth: '2.5em' }}
                            >
                              {codeText}
                            </SyntaxHighlighter>
                          </div>
                        );
                      },
                      code: ({ node, ...props }) => {
                        return <code className="bg-zinc-900 px-1.5 py-0.5 rounded text-violet-400 font-mono text-xs" {...props} />;
                      },
                      blockquote: ({ children }) => {
                        const text = React.Children.toArray(children).map(c => (c as any).props?.children).join('');
                        const isRealLifeExample = text.includes('Ví dụ đời thường') || text.includes('Bối cảnh:') || text.includes('💡');

                        if (isRealLifeExample) {
                          return (
                            <div className="my-6 p-6 rounded-2xl bg-gradient-to-br from-violet-950/20 via-zinc-950 to-zinc-950 border border-violet-500/20 relative overflow-hidden shadow-xl">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 blur-xl rounded-full" />
                              <div className="flex items-center gap-2 mb-3 text-violet-400 font-bold text-lg">
                                <span>💡</span> Ví dụ thực tế đời thường
                              </div>
                              <div className="text-zinc-300 leading-relaxed font-sans text-sm space-y-2">
                                {children}
                              </div>
                            </div>
                          );
                        }

                        return (
                          <blockquote className="border-l-4 border-zinc-700 pl-4 italic text-zinc-400 my-4">
                            {children}
                          </blockquote>
                        );
                      }
                    }}
                  >
                    {pattern.readme}
                  </ReactMarkdown>
                </article>
              </motion.div>
            )}
            
            {/* Các tabs ví dụ và sandbox giữ nguyên... */}
            {activeTab === 'example' && (
              <motion.div
                key="example"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full flex flex-col p-6 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-white text-lg">Mã ví dụ thực tế (index.ts)</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">Ví dụ minh họa cấu trúc hoạt động hoàn chỉnh của mẫu thiết kế</p>
                  </div>
                  <button
                    onClick={handleRunExample}
                    disabled={isRunning}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition-all"
                  >
                    <Play className="w-4 h-4 fill-white" /> {isRunning ? 'Đang chạy...' : 'Chạy thử ví dụ'}
                  </button>
                </div>

                <div className="flex-1 rounded-2xl border border-zinc-900 overflow-hidden bg-zinc-950 relative">
                  <Editor
                    height="100%"
                    defaultLanguage="typescript"
                    theme="vs-dark"
                    value={pattern.exampleCode}
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      padding: { top: 16 },
                      fontFamily: "Fira Code, JetBrains Mono, source-code-pro, Menlo, Monaco, Consolas, monospace",
                    }}
                  />
                </div>

                {/* Console Terminal */}
                {terminalLogs.length > 0 && (
                  <div className="h-60 bg-zinc-950 border border-zinc-900 rounded-2xl p-4 flex flex-col font-mono text-sm overflow-hidden">
                    <div className="flex items-center gap-2 mb-2 border-b border-zinc-900 pb-2 text-zinc-400">
                      <Terminal className="w-4 h-4" /> <span>Console Output</span>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-1 scroll-smooth select-text">
                      {terminalLogs.map((log, index) => (
                        <div key={index} className="leading-relaxed whitespace-pre-wrap">
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'sandbox' && (
              <motion.div
                key="sandbox"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full flex flex-col md:flex-row overflow-hidden"
              >
                {/* Cột trái: Đề bài tập (EXERCISES.md) */}
                <div className="w-full md:w-[40%] border-b md:border-b-0 md:border-r border-zinc-900 h-1/2 md:h-full overflow-y-auto p-6 space-y-6">
                  <div>
                    <h3 className="font-bold text-white text-lg">Yêu cầu bài tập (EXERCISES.md)</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">Đọc kỹ đề bài và điền code TODO bên phải</p>
                  </div>
                  <article className="prose prose-invert prose-zinc max-w-none text-sm text-zinc-300">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => <h1 className="text-xl font-bold text-white border-b border-zinc-900 pb-2 mb-4">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-lg font-semibold text-white mt-6 mb-3 border-b border-zinc-900/60 pb-1">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-md font-semibold text-zinc-200 mt-4 mb-2">{children}</h3>,
                        p: ({ children }) => <p className="mb-3 leading-relaxed text-zinc-400">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc pl-5 space-y-1.5 mb-3">{children}</ul>,
                        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                        code: ({ node, ...props }) => <code className="bg-zinc-900 px-1 py-0.5 rounded text-violet-400 font-mono text-xs" {...props} />
                      }}
                    >
                      {pattern.exercisesMd}
                    </ReactMarkdown>
                  </article>
                </div>

                {/* Cột phải: Editor & Terminal */}
                <div className="flex-1 flex flex-col h-1/2 md:h-full overflow-hidden bg-zinc-950">
                  {/* Toolbar */}
                  <div className="p-3 border-b border-zinc-900 bg-zinc-950 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-zinc-400">exercises.ts</span>
                      {saveStatus === 'success' && (
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Đã lưu file local
                        </span>
                      )}
                      {saveStatus === 'error' && (
                        <span className="text-[10px] text-amber-400 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Lỗi lưu file local
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSave(false)}
                        disabled={isSaving}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 font-semibold text-xs transition-all disabled:opacity-50"
                      >
                        <Save className="w-3.5 h-3.5" /> {isSaving ? 'Đang lưu...' : 'Lưu code (Ctrl+S)'}
                      </button>
                      
                      <button
                        onClick={handleRunTests}
                        disabled={isRunning}
                        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg ${themeColors.bgButton} font-bold text-xs transition-all disabled:opacity-50`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" /> {isRunning ? 'Đang chấm bài...' : 'Nộp & Check'}
                      </button>
                    </div>
                  </div>

                  {/* Monaco Editor Container */}
                  <div className="flex-1 border-b border-zinc-900 relative">
                    <Editor
                      height="100%"
                      defaultLanguage="typescript"
                      theme="vs-dark"
                      value={code}
                      onChange={(val) => setCode(val || '')}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 13,
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                        padding: { top: 12 },
                        fontFamily: "Fira Code, JetBrains Mono, source-code-pro, Menlo, Monaco, Consolas, monospace",
                        automaticLayout: true,
                      }}
                    />
                  </div>

                  {/* Terminal Log */}
                  <div className="h-48 bg-zinc-950 flex flex-col font-mono text-xs overflow-hidden p-3 border-t border-zinc-900">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5 text-zinc-500 mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5" /> <span>Terminal Output (Client Sandbox)</span>
                      </div>
                      <button 
                        onClick={() => setTerminalLogs([])}
                        className="text-[10px] hover:text-zinc-300 transition-colors"
                      >
                        Clear
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-0.5 scroll-smooth select-text">
                      {terminalLogs.length > 0 ? (
                        terminalLogs.map((log, index) => {
                          let colorClass = 'text-zinc-300';
                          if (log.includes('✓') || log.includes('Thành công')) {
                            colorClass = 'text-emerald-400 font-bold';
                          } else if (log.includes('✗') || log.includes('Thất bại') || log.includes('❌') || log.includes('FAIL')) {
                            colorClass = 'text-rose-400 font-bold';
                          } else if (log.includes('===') || log.includes('Test')) {
                            colorClass = 'text-sky-400';
                          }
                          
                          return (
                            <div key={index} className={`leading-relaxed whitespace-pre-wrap ${colorClass}`}>
                              {log}
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-zinc-600 italic">
                          Viết code xong, nhấn &apos;Nộp &amp; Check&apos; để kiểm tra kết quả bài làm...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
