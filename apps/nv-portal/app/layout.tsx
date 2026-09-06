import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BM Bridge | Bình Minh",
  description: "Trung tâm quản trị nhân sự, Terminal và chấm công của Bình Minh.",
  icons: {
    icon: "/sites/binhminh-dahahi-vn-81f51c00/dsKhach-0a4701c1/binh-minh-logo.webp",
    shortcut: "/sites/binhminh-dahahi-vn-81f51c00/dsKhach-0a4701c1/binh-minh-logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
