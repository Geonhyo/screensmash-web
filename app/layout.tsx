import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR, Space_Grotesk } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// 폰트는 빌드할 때 받아 이 사이트에서 직접 제공한다(외부 요청·글자 깜빡임 없음).
const kr = Noto_Sans_KR({ weight: ["400", "500", "700", "900"], variable: "--font-kr", display: "swap", preload: false });
const en = Space_Grotesk({ weight: ["500", "700"], subsets: ["latin"], variable: "--font-en", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  category: "games",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "금 간 Mac 화면과 망치 — Screen Smash" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0C0D10",
  colorScheme: "dark",
};

/**
 * 그리기 전에 접속 기기를 정한다: mac(다운로드) · other(Windows 등, 출시 알림) · mobile(링크 공유).
 * 페이지 내용은 모두 HTML에 들어 있고, 이 값으로 보이는 부분만 바뀐다(검색 로봇은 전체를 읽는다).
 */
const envScript = `(function(){try{var u=navigator.userAgent||"",t=/Macintosh/.test(u)&&(navigator.maxTouchPoints||0)>1;document.documentElement.setAttribute("data-env",/iPhone|iPad|iPod|Android|Mobile/i.test(u)||t?"mobile":/Macintosh|Mac OS X/.test(u)?"mac":"other")}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${kr.variable} ${en.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: envScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
