import { getPatternDetail, getPatternsList } from "@/lib/patterns";
import PatternDetailClient from "@/components/PatternDetailClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 0; // Đảm bảo luôn lấy dữ liệu mới khi reload trang

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const detail = getPatternDetail(id);
  if (!detail) {
    return {
      title: "Pattern Not Found",
    };
  }
  return {
    title: `${detail.title} - GoF Design Patterns`,
    description: `Học lý thuyết, xem ví dụ thực tế và giải bài tập thực hành về ${detail.title}.`,
  };
}

export default async function PatternPage({ params }: Props) {
  const { id } = await params;
  const detail = getPatternDetail(id);
  
  if (!detail) {
    notFound();
  }

  const allPatterns = getPatternsList();

  return (
    <main className="h-screen bg-zinc-950 overflow-hidden select-none">
      <PatternDetailClient pattern={detail} allPatterns={allPatterns} />
    </main>
  );
}
