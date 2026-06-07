import { getPatternsList } from "@/lib/patterns";
import DashboardClient from "@/components/DashboardClient";
import AiRecommender from "@/components/AiRecommender";

export const revalidate = 0; // Đảm bảo luôn render mới khi tải lại trang

export default function Home() {
  const patterns = getPatternsList();

  return (
    <main className="min-h-screen bg-zinc-950 pb-20 text-zinc-100 selection:bg-violet-500/35 relative">
      {/* Hiệu ứng ánh sáng nền phía sau */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-violet-950/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="pt-8">
        <AiRecommender />
      </div>

      <DashboardClient initialPatterns={patterns} />
    </main>
  );
}
