# Screen Smash — 소개·다운로드 페이지

macOS 앱 Screen Smash의 한 장짜리 소개 페이지. Next.js(App Router)로 만들고 Vercel에 배포한다.
접속한 기기에 따라 다운로드 영역만 바뀐다: Mac은 DMG 다운로드, Windows 등은 출시 알림 신청, 휴대폰은 링크 공유.

## 개발

```
pnpm install
pnpm dev           # http://localhost:3000
pnpm build         # 배포 전 확인
```

## 배포(Vercel)

1. Vercel에서 이 저장소를 Import한다(Framework: Next.js, 설정 그대로). `pnpm-lock.yaml`과 `packageManager`를 보고 pnpm으로 설치한다.
2. Settings → Environment Variables (`.env.example` 참고)
   - `NEXT_PUBLIC_SITE_URL` — 정식 도메인(예: `https://screensmash.app`). 비우면 Vercel 프로덕션 주소를 쓴다. canonical·sitemap·OG 이미지 주소가 이 값으로 만들어진다.
   - `DISCORD_WEBHOOK_URL` — Windows 출시 알림 신청이 쌓일 Discord 채널의 웹훅. 서버에서만 쓴다. 없으면 신청이 실패로 표시된다(신청이 사라지지 않게).
   - `GOOGLE_SITE_VERIFICATION` — Google Search Console의 HTML 태그 확인 값(선택).
3. 도메인을 연결한 뒤 Google Search Console에 사이트를 등록하고 `/sitemap.xml`을 제출한다.

## DMG(다운로드 파일)

DMG는 Vercel에 올리지 않고 **이 저장소의 GitHub Releases**에 올린다(전송량 무료, 저장소 용량에도 안 잡힘).
다운로드 버튼은 항상 `https://github.com/Geonhyo/screensmash-web/releases/latest/download/ScreenSmash.dmg`를 가리키므로,
새 버전을 올릴 때 파일 이름을 `ScreenSmash.dmg`로 유지하면 사이트는 고칠 필요가 없다.

새 버전을 낼 때:
1. `mac/scripts/release.sh` → `build/release/ScreenSmash.dmg`가 생긴다(마지막에 올리는 명령도 출력).
2. `gh release create vX.Y.Z …`로 Releases에 올린다.
3. `lib/site.ts`의 `app.version`·`size`·`releaseDate`를 고친다(페이지 문구·구조화 데이터·llms.txt에 반영).

## 검색 노출(SEO·AI 답변)

- 모든 내용이 정적 HTML로 미리 만들어진다. 기기별로 숨기는 부분도 HTML에는 다 들어 있다.
- `<title>`·description·canonical·Open Graph·Twitter 카드(`public/og.png`, 생성: `scripts/make-og.swift`).
- 구조화 데이터(JSON-LD): WebSite, Organization, SoftwareApplication(가격 0, 요구 OS, 버전, 다운로드 주소), FAQPage.
- `/robots.txt`(검색·AI 로봇 모두 허용, `/api/`만 제외), `/sitemap.xml`, `/llms.txt`(AI용 요약, 한국어 + 영어).
- 글꼴은 next/font로 직접 제공(외부 요청·레이아웃 흔들림 없음).
