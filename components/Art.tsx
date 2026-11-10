/** 정적 그림(SVG). 클라이언트 코드 없음. */

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="76 48 360 360">
      <rect x="76" y="48" width="360" height="360" rx="80" fill="#1B1C22" />
      <g fill="none" stroke="#BEBEC2" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="272,236 190,135 164,66" />
        <polyline points="272,236 346,187 414,130" />
        <polyline points="276,242 370,277 430,272" />
        <polyline points="270,242 253,310 266,404" />
        <polyline points="266,238 158,269 80,249" />
      </g>
      <line x1="248" y1="203" x2="282" y2="276" stroke="#D4D4D9" strokeWidth="22" strokeLinecap="round" />
      <rect x="178" y="151" width="90" height="46" rx="6" fill="var(--accent)" transform="rotate(-25 223 174)" />
    </svg>
  );
}

export function Icon({ d, size = 24, stroke = "currentColor", width = 1.7 }: { d: string; size?: number; stroke?: string; width?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

export const icons = {
  download: "M12 3v12M6 10l6 6 6-6M4 21h16",
  hammer: "M3 5h11v5H3zM8.5 10v11",
  laptop: "M4 6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v9H4zM2 18h20",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4",
  screen: "M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM7 10h2M7 14h10",
  noEye: "M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6zM2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM4 4l16 16",
};

const cracks = [
  "430,250 470,214 512,190 560,140 610,118 712,92",
  "430,250 486,252 540,266 600,262 712,286",
  "430,250 452,300 470,342 462,400 480,450",
  "430,250 400,292 360,330 330,390 300,450",
  "430,250 380,240 320,214 250,220 170,190 10,206",
  "430,250 410,200 404,150 380,96 372,10",
  "430,250 470,280 520,320 560,380 610,450",
];

/** 히어로: 망치에 맞아 금 간 Mac 화면 */
export function CrackedScreen() {
  const rows = [106, 134, 162, 190, 218, 246, 274, 302, 330, 358, 386];
  const cols = [164, 292, 420, 548];
  const cells: [number, number, number][] = [
    [58, 116, 70], [178, 116, 54], [306, 116, 60], [434, 116, 48], [562, 116, 66],
    [58, 144, 84], [178, 144, 40], [306, 144, 58], [434, 144, 62], [562, 144, 50],
    [58, 172, 60], [178, 172, 64], [306, 172, 44], [434, 172, 56], [562, 172, 70],
    [58, 312, 76], [178, 312, 50], [306, 312, 66], [58, 340, 56], [178, 340, 62],
    [562, 340, 54], [58, 368, 80], [434, 368, 60], [562, 368, 48],
  ];
  return (
    <svg role="img" aria-label="스프레드시트 화면 가운데가 망치에 맞아 거미줄처럼 금 간 모습" viewBox="0 0 720 470">
      <defs>
        <clipPath id="scr"><rect x="10" y="10" width="700" height="438" rx="10" /></clipPath>
        <radialGradient id="bleed" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#05040A" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#1A0F2E" stopOpacity="0.7" />
          <stop offset="1" stopColor="#1A0F2E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="720" height="458" rx="18" fill="#2A2B31" />
      <rect x="290" y="458" width="140" height="8" rx="2" fill="#2A2B31" />
      <g clipPath="url(#scr)">
        <rect x="10" y="10" width="700" height="438" fill="#3A4A6B" />
        <rect x="10" y="10" width="700" height="18" fill="#20243C" />
        <text x="24" y="23" fontSize="10" fill="#F2F2F5" fontWeight="700">Numbers</text>
        <text x="610" y="23" fontSize="10" fill="#F2F2F5">12,340</text>
        <rect x="44" y="46" width="632" height="384" rx="8" fill="#F7F8FA" />
        <rect x="44" y="46" width="632" height="30" rx="8" fill="#E9EBEF" />
        <rect x="44" y="66" width="632" height="10" fill="#E9EBEF" />
        <circle cx="62" cy="61" r="5" fill="#FF5F57" />
        <circle cx="78" cy="61" r="5" fill="#FEBC2E" />
        <circle cx="94" cy="61" r="5" fill="#28C840" />
        <text x="300" y="65" fontSize="11" fill="#4A4D55" fontWeight="500">4분기 매출_최종_진짜최종.numbers</text>
        <g stroke="#DADDE3" strokeWidth="1">
          {rows.map((y) => <line key={`r${y}`} x1="44" y1={y} x2="676" y2={y} />)}
          {cols.map((x) => <line key={`c${x}`} x1={x} y1="76" x2={x} y2="430" />)}
        </g>
        <rect x="44" y="76" width="632" height="30" fill="#EEF0F4" />
        <g fontSize="11" fill="#6A6E78" fontWeight="500">
          <text x="58" y="96">항목</text><text x="178" y="96">10월</text><text x="306" y="96">11월</text><text x="434" y="96">12월</text><text x="562" y="96">합계</text>
        </g>
        <g fill="#C9CDD5">
          {cells.map(([x, y, w]) => <rect key={`${x}-${y}`} x={x} y={y} width={w} height="8" rx="2" />)}
        </g>
        <ellipse cx="430" cy="250" rx="150" ry="120" fill="url(#bleed)" />
        <rect x="452" y="10" width="2" height="438" fill="#FF3BD4" opacity="0.75" />
        <rect x="471" y="10" width="1.5" height="438" fill="#3BFFB0" opacity="0.6" />
        <rect x="396" y="130" width="3" height="318" fill="#FFFFFF" opacity="0.55" />
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <g stroke="#000000" strokeOpacity="0.35" strokeWidth="4">
            {cracks.map((p) => <polyline key={p} points={p} />)}
          </g>
          <g stroke="#FFFFFF" strokeOpacity="0.92" strokeWidth="1.6">
            {cracks.map((p) => <polyline key={p} points={p} />)}
            <polyline points="512,190 540,214 540,266" />
            <polyline points="320,214 300,260 360,330" />
            <polyline points="560,140 584,196 600,262" />
            <polyline points="470,342 520,320" />
            <polygon points="452,230 462,256 444,278 414,272 404,246 422,226" />
            <polygon points="480,208 498,262 472,304 418,310 380,278 376,230 414,200" />
          </g>
          <polygon points="430,250 452,230 462,256" fill="#FFFFFF" fillOpacity="0.35" stroke="none" />
          <polygon points="430,250 404,246 422,226" fill="#FFFFFF" fillOpacity="0.18" stroke="none" />
        </g>
      </g>
      <g transform="translate(470 196) rotate(28)">
        <rect x="-8" y="-6" width="16" height="96" rx="6" fill="#2B2C33" stroke="#0C0D10" strokeWidth="3" />
        <rect x="-44" y="-34" width="88" height="40" rx="7" fill="var(--accent)" stroke="#0C0D10" strokeWidth="3" />
      </g>
      <path d="M424 244 L424 266 L430 260 L435 271 L439 269 L434 258 L442 258 Z" fill="#FFFFFF" stroke="#0C0D10" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

/** 마지막 다운로드 상자 배경의 옅은 균열 */
export function FinalCracks() {
  return (
    <svg className="cracks" aria-hidden="true" viewBox="0 0 400 200" preserveAspectRatio="none">
      <g fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round">
        <polyline points="320,40 350,20 400,8" />
        <polyline points="320,40 360,60 400,58" />
        <polyline points="320,40 300,10 296,0" />
        <polyline points="320,40 280,52 230,44" />
        <polyline points="320,40 330,90 320,130" />
        <polygon points="314,32 330,34 328,48 312,48" />
      </g>
    </svg>
  );
}
