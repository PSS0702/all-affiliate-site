import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: '종합 어필리에이트 사이트',
    template: '%s | 종합 어필리에이트 사이트'
  },
  description: "최신 쿠폰과 제품 리뷰를 제공하는 종합 어필리에이트 사이트입니다.",
  keywords: ["어필리에이트", "쿠폰", "리뷰", "쇼핑", "여행", "정보"],
  openGraph: {
    title: "종합 어필리에이트 사이트",
    description: "최신 쿠폰과 제품 리뷰를 제공하는 종합 어필리에이트 사이트입니다.",
    type: "website",
    locale: "ko_KR",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'your-google-site-verification',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
