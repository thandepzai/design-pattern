import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GoF Design Patterns Visualizer",
  description: "Cuốn sách tương tác động giúp bạn làm chủ 23 mẫu thiết kế kinh điển của Gang of Four. Viết code, xem ví dụ thực tế và luyện tập ngay lập tức.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen bg-zinc-950">
        {children}
      </body>
    </html>
  );
}
