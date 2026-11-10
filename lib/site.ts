/**
 * 사이트 전체에서 쓰는 값. 새 버전을 배포하면 `app` 부분만 고친다.
 */

/** 정식 주소: NEXT_PUBLIC_SITE_URL → Vercel 프로덕션 주소 → 로컬 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const site = {
  url: resolveSiteUrl(),
  name: "Screen Smash",
  nameKo: "스크린 스매시",
  title: "Screen Smash — 내 Mac 화면을 부수는 스트레스 해소 게임",
  description:
    "망치, 전기톱, 기관총, 화염방사기 등 10가지 무기로 지금 보고 있는 Mac 화면을 부수는 무료 게임. 진짜 화면과 파일은 그대로이고, ESC 한 번이면 흔적 없이 사라져요. macOS 14 이상, Apple Silicon·Intel 지원.",
  publisher: "MoreThanDay",
  locale: "ko_KR",
  /** 배포 중인 Mac 앱 */
  app: {
    version: "0.1.0",
    /** DMG 크기(사람이 읽는 표기) */
    size: "3.9MB",
    releaseDate: "2026-11-10",
    minOS: "macOS 14 Sonoma",
    /**
     * DMG는 GitHub Releases(공개 저장소)에서 받는다. 파일 이름을 항상 ScreenSmash.dmg로 올리면
     * 새 버전을 올려도 이 주소가 그대로 최신 파일을 가리킨다.
     */
    downloadUrl: "https://github.com/Geonhyo/screensmash-web/releases/latest/download/ScreenSmash.dmg",
  },
} as const;

export type Weapon = { n: string; name: string; verb: string; desc: string; icon: string };

/** 무기 10종(휠 순서). 아이콘은 앱의 휠 아이콘과 같은 24×24 경로. */
export const weapons: Weapon[] = [
  { n: "01", name: "연필", verb: "낙서", desc: "화면 위에 마음대로 끄적여요. 상사 사진에 수염 그리기 딱 좋아요.", icon: "M4 20l1-5L16 4l4 4L9 19zM14 6l4 4" },
  { n: "02", name: "복구제", verb: "되돌리기", desc: "문지른 곳만 원래 화면으로 돌아와요. 갉은 자국과 핏자국도 지워요.", icon: "M9 3h5v4H9zM7 10l1-3h7l1 3v11H7zM14 5h4M18 3v4M10 14h3" },
  { n: "03", name: "망치", verb: "깨기", desc: "쾅. 거미줄 균열과 번진 액정이 그 자리에 남아요.", icon: "M3 5h11v5H3zM8.5 10v11" },
  { n: "04", name: "전기톱", verb: "갈기", desc: "드르르르. 끌고 가는 대로 화면이 갈려 나가요.", icon: "M2 10h8v7H2zM10 11h10a2 2 0 0 1 0 4H10M12 11l1-2M15 11l1-2M18 11l1-2" },
  { n: "05", name: "기관총", verb: "난사", desc: "꾹 누르면 두두두두. 총알 구멍이 줄지어 박혀요.", icon: "M2 9h16l3 2v2H9l-2 6H4l1-6H2zM12 13v3h3" },
  { n: "06", name: "화염방사기", verb: "그을리기", desc: "불길이 닿는 곳마다 시커멓게 타들어 가요.", icon: "M12 22a7 7 0 0 0 7-7c0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-3 3-5 5-5 8a7 7 0 0 0 7 7z" },
  { n: "07", name: "물감방사기", verb: "칠하기", desc: "랜덤 색 물감을 흩뿌려요. 깨지진 않고 알록달록해져요.", icon: "M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11zM3 5h.01M21 7h.01M4 19h.01M20 18h.01" },
  { n: "08", name: "흰개미", verb: "풀어놓기", desc: "우수수 풀려나 화면을 천천히 갉아먹어요. 다른 무기로 잡을 수도 있어요.", icon: "M10 4.5a2 2 0 1 0 4 0 2 2 0 1 0-4 0zM9.5 9.5h5v7a2.5 2.5 0 0 1-5 0zM9.5 11L6 9M14.5 11L18 9M9.5 13.5H5.5M14.5 13.5h4M9.5 16L6 18.5M14.5 16l3.5 2.5" },
  { n: "09", name: "폭탄", verb: "폭격", desc: "한 방에 크게. 다음 폭탄까지 잠깐 기다려야 해요.", icon: "M17 14a7 7 0 1 1-14 0 7 7 0 0 1 14 0zM14 9l3-3M18 3v2M21 6h-2" },
  { n: "10", name: "레드존", verb: "미사일", desc: "조준한 구역에 미사일이 쏟아져요. 가장 센 한 방이에요.", icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v10M7 12h10" },
];

export type Faq = { q: string; a: string };

/** 자주 묻는 질문. 페이지와 구조화 데이터(FAQPage)가 같은 내용을 쓴다. */
export const faqs: Faq[] = [
  { q: "진짜 화면이 망가지나요?", a: "아니요. 시작하는 순간의 화면을 한 장 찍어서 그 위에 덮은 창을 부수는 거예요. 파일이나 앱에는 아무 영향이 없어요." },
  { q: "화면 기록 권한은 왜 필요한가요?", a: "부수기 직전 화면을 한 장 찍는 데만 써요. 찍은 화면은 저장하거나 보내지 않아요. macOS 15부터는 한 달에 한 번 ‘계속 허용’ 확인 창이 떠요." },
  { q: "끝내면 부순 화면이 남나요?", a: "메뉴 막대에서 ‘끝내기’를 누르면 피해량도 0으로 돌아가고, 다음에는 깨끗한 화면에서 시작해요." },
  { q: "Windows나 휴대폰에서도 되나요?", a: "지금은 macOS 14 이상 Mac에서만 실행돼요. Windows 버전은 준비 중이에요." },
  { q: "무료인가요?", a: "네, 무료예요. 광고나 결제도 없어요." },
];
