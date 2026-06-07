'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, BookOpen, Award, CheckCircle2, Circle, Clock, ArrowRight, Zap, Layers, Cpu } from 'lucide-react';
import type { PatternItem } from '@/lib/patterns';

interface Props {
  initialPatterns: PatternItem[];
}

export default function DashboardClient({ initialPatterns }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'C' | 'S' | 'B'>('all');

  const filteredPatterns = useMemo(() => {
    return initialPatterns.filter((pattern) => {
      const matchesSearch =
        pattern.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pattern.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === 'all' || pattern.type === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [initialPatterns, searchQuery, activeTab]);

  const stats = useMemo(() => {
    const total = initialPatterns.length;
    const completed = initialPatterns.filter((p) => p.status === 'completed').length;
    const inProgress = initialPatterns.filter((p) => p.status === 'in-progress').length;
    const todo = initialPatterns.filter((p) => p.status === 'todo').length;
    
    return {
      total,
      completed,
      inProgress,
      todo,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [initialPatterns]);

  // CSS colors mapping for GoF types
  const getThemeColors = (type: 'C' | 'S' | 'B') => {
    switch (type) {
      case 'C': // Creational
        return {
          border: 'hover:border-cyan-500/50',
          text: 'text-cyan-400',
          badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
          shadow: 'hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]',
          bg: 'from-cyan-950/20 to-zinc-950',
        };
      case 'S': // Structural
        return {
          border: 'hover:border-amber-500/50',
          text: 'text-amber-400',
          badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          shadow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
          bg: 'from-amber-950/20 to-zinc-950',
        };
      case 'B': // Behavioral
        return {
          border: 'hover:border-violet-500/50',
          text: 'text-violet-400',
          badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
          shadow: 'hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]',
          bg: 'from-violet-950/20 to-zinc-950',
        };
    }
  };

  const getStatusIcon = (status: 'todo' | 'in-progress' | 'completed') => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-sky-400 animate-pulse" />;
      case 'todo':
        return <Circle className="w-5 h-5 text-zinc-600" />;
    }
  };

  const getStatusBadge = (status: 'todo' | 'in-progress' | 'completed') => {
    switch (status) {
      case 'completed':
        return <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">Hoàn thành</span>;
      case 'in-progress':
        return <span className="text-xs bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded border border-sky-500/20">Đang học</span>;
      case 'todo':
        return <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded border border-zinc-700">Chưa bắt đầu</span>;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-12 text-center md:text-left md:flex justify-between items-end gap-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            GoF Design Patterns Visualizer
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Cuốn sách tương tác động giúp bạn làm chủ 23 mẫu thiết kế kinh điển của Gang of Four. Viết code, xem ví dụ thực tế và luyện tập ngay lập tức.
          </p>
        </div>

        {/* Stats card */}
        <div className="mt-6 md:mt-0 p-6 rounded-2xl glassmorphism text-left min-w-[280px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-zinc-400 font-medium">Tiến độ tổng quát</span>
            <span className="text-xl font-bold text-violet-400">{stats.completed}/{stats.total} bài</span>
          </div>
          <div className="w-full bg-zinc-800 h-3 rounded-full overflow-hidden mb-4 border border-zinc-700">
            <div 
              className="bg-gradient-to-r from-violet-500 to-cyan-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${stats.percent}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-zinc-900/50 p-2 rounded border border-zinc-800">
              <div className="font-semibold text-emerald-400">{stats.percent}%</div>
              <div className="text-zinc-500 mt-0.5">Hoàn thành</div>
            </div>
            <div className="bg-zinc-900/50 p-2 rounded border border-zinc-800">
              <div className="font-semibold text-sky-400">{stats.inProgress}</div>
              <div className="text-zinc-500 mt-0.5">Đang làm</div>
            </div>
            <div className="bg-zinc-900/50 p-2 rounded border border-zinc-800">
              <div className="font-semibold text-zinc-400">{stats.todo}</div>
              <div className="text-zinc-500 mt-0.5">Chưa làm</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm mẫu thiết kế (ví dụ: Observer, Singleton...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        {/* Filters Tabs */}
        <div className="flex bg-zinc-900/60 p-1 rounded-xl border border-zinc-800 self-start md:self-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setActiveTab('C')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'C'
                ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-500/30'
                : 'text-zinc-400 hover:text-cyan-400'
            }`}
          >
            <Zap className="w-4 h-4" /> Creational
          </button>
          <button
            onClick={() => setActiveTab('S')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'S'
                ? 'bg-amber-950/40 text-amber-400 border border-amber-500/30'
                : 'text-zinc-400 hover:text-amber-400'
            }`}
          >
            <Layers className="w-4 h-4" /> Structural
          </button>
          <button
            onClick={() => setActiveTab('B')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'B'
                ? 'bg-violet-950/40 text-violet-400 border border-violet-500/30'
                : 'text-zinc-400 hover:text-violet-400'
            }`}
          >
            <Cpu className="w-4 h-4" /> Behavioral
          </button>
        </div>
      </div>

      {/* Grid of Design Patterns */}
      {filteredPatterns.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPatterns.map((pattern) => {
            const themes = getThemeColors(pattern.type);
            return (
              <motion.div
                key={pattern.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className={`group relative rounded-2xl bg-gradient-to-b ${themes.bg} border border-zinc-800 ${themes.border} ${themes.shadow} p-6 transition-all duration-300 overflow-hidden`}
              >
                {/* Visual glow on group hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-zinc-800/20 to-transparent rounded-bl-full pointer-events-none group-hover:bg-zinc-800/30 transition-colors" />

                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold font-mono text-zinc-700 group-hover:text-zinc-600 transition-colors">
                      {pattern.number}
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${themes.badge}`}>
                      {pattern.type}
                    </span>
                  </div>
                  {getStatusIcon(pattern.status)}
                </div>

                {/* Card Title & Type */}
                <h3 className="text-xl font-bold text-zinc-100 group-hover:text-white mb-2 leading-tight">
                  {pattern.title}
                </h3>
                <p className="text-xs text-zinc-500 mb-6 font-medium uppercase tracking-wider">
                  {pattern.typeName}
                </p>

                {/* Footer Action */}
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-zinc-900">
                  {getStatusBadge(pattern.status)}
                  <Link
                    href={`/pattern/${pattern.id}`}
                    className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${themes.text} hover:opacity-80`}
                  >
                    Học ngay <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="text-center py-20 bg-zinc-950/40 rounded-3xl border border-zinc-900 glassmorphism">
          <p className="text-zinc-500 text-lg">Không tìm thấy Design Pattern nào phù hợp với tìm kiếm của bạn.</p>
        </div>
      )}
    </div>
  );
}
