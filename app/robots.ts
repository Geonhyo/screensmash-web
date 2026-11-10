import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * 검색 엔진과 AI 검색·답변 로봇 모두 허용한다(AI 답변에 인용되려면 읽을 수 있어야 한다).
 * 알림 신청 API만 막는다.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
