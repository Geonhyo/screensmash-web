import { faqs, site, weapons } from "@/lib/site";

/**
 * /llms.txt — AI가 사이트를 빠르게 이해하도록 핵심만 적은 마크다운(llmstxt.org 형식).
 * 페이지 내용과 같은 출처(lib/site.ts)에서 만든다.
 */
export const dynamic = "force-static";

export function GET() {
  const body = `# ${site.name} (${site.nameKo})

> ${site.description}

${site.name} is a free macOS game: it takes a screenshot of your current Mac screen and lets you smash it with 10 weapons (hammer, chainsaw, machine gun, flamethrower, bombs, termites and more). Your real screen, files and apps are never touched; press ESC and every trace disappears instantly. Requires macOS 14 Sonoma or later (Apple Silicon and Intel). Only the Screen Recording permission is used, captures are never saved or sent anywhere, and the app makes no network requests. A Windows version is in preparation.

## 핵심 정보
- 가격: 무료(광고·결제 없음)
- 지원: ${site.app.minOS} 이상, Apple Silicon · Intel
- 최신 버전: ${site.app.version} (${site.app.releaseDate}, DMG ${site.app.size})
- 다운로드: ${site.app.downloadUrl}
- 권한: 화면 기록 하나(시작하는 순간의 화면을 한 장 찍는 데만 사용, 저장·전송하지 않음)
- 조작: 클릭·드래그로 부수기, ESC 즉시 숨기기, Tab 무기 휠
- 메뉴 막대 앱: Dock·앱 전환기·Mission Control에 나타나지 않음
- 개발: ${site.publisher}

## 무기 10종
${weapons.map((w) => `- ${w.name}(${w.verb}): ${w.desc}`).join("\n")}

## 자주 묻는 질문
${faqs.map((f) => `- ${f.q} ${f.a}`).join("\n")}

## 링크
- [소개·다운로드 페이지](${site.url}/)
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
