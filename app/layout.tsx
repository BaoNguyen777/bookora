import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BOOKORA — Chạm vào thế giới tri thức",
  description: "Khám phá sách hay, nuôi dưỡng tư duy và tìm cảm hứng mỗi ngày tại BOOKORA.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
