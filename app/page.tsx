import { CrackedScreen, FinalCracks, Icon, LogoMark, icons } from "@/components/Art";
import { NotifyForm, ShareButton } from "@/components/Interactive";
import { faqs, site, weapons } from "@/lib/site";

/** 검색 엔진·AI가 읽는 구조화 데이터(JSON-LD). 화면에 보이는 내용과 같아야 한다. */
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        alternateName: site.nameKo,
        inLanguage: "ko-KR",
        publisher: { "@id": `${site.url}/#publisher` },
      },
      {
        "@type": "Organization",
        "@id": `${site.url}/#publisher`,
        name: site.publisher,
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${site.url}/#app`,
        name: site.name,
        alternateName: site.nameKo,
        description: site.description,
        url: site.url,
        image: `${site.url}/og.png`,
        applicationCategory: "GameApplication",
        applicationSubCategory: "스트레스 해소 게임",
        operatingSystem: "macOS 14 Sonoma 이상",
        processorRequirements: "Apple Silicon, Intel",
        permissions: "화면 기록",
        softwareVersion: site.app.version,
        datePublished: site.app.releaseDate,
        fileSize: site.app.size,
        downloadUrl: site.app.downloadUrl,
        installUrl: site.app.downloadUrl,
        inLanguage: "ko",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
        publisher: { "@id": `${site.url}/#publisher` },
        featureList: weapons.map((w) => `${w.name}(${w.verb}): ${w.desc}`),
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // JSON 안의 "</" 가 스크립트를 닫지 않게
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** 기기별 다운로드 영역: Mac은 버튼, Windows 등은 출시 알림, 휴대폰은 링크 공유 */
function DownloadArea({ place }: { place: "hero" | "final" }) {
  return (
    <>
      <div className="dl-mac env-mac">
        <a className="cta" href={site.app.downloadUrl}>
          <Icon d={icons.download} size={22} stroke="currentColor" width={2.2} />
          Mac용 다운로드
        </a>
        <p className="dl-meta" style={{ margin: 0 }}>
          {place === "hero"
            ? `Screen Smash ${site.app.version} · .dmg · ${site.app.size} · Apple Silicon · Intel`
            : `${site.app.minOS} 이상 · Apple Silicon · Intel`}
        </p>
      </div>
      <div className="box env-mobile">
        <p className="box-text">
          <strong>모바일에서는 지원되지 않는 앱이에요.</strong>
          <br />
          Mac OS 14 이상에서 실행해 주세요.
        </p>
        <ShareButton />
      </div>
      <div className="box env-other">
        <p className="box-title">Windows 버전 출시 알림 받기</p>
        <NotifyForm id={`email-${place}`} />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <header className="header">
        <div className="wrap header-in">
          <a href="#top" className="brand" aria-label="Screen Smash 처음으로">
            <LogoMark />
            <span className="brand-name en">Screen Smash</span>
          </a>
          <nav aria-label="페이지 메뉴" className="nav">
            <a href="#weapons" className="not-mobile">무기</a>
            <a href="#install" className="not-mobile">설치</a>
            <a href="#download" className="pill">다운로드</a>
          </nav>
        </div>
      </header>

      <main>
        {/* 히어로 */}
        <section id="top" className="wrap hero">
          <div className="hero-copy">
            <div className="badges">
              <span className="badge badge-free">무료</span>
              <span className="badge">
                <Icon d={icons.laptop} size={14} stroke="#C9CBD1" width={2} />
                {site.app.minOS} 이상
              </span>
            </div>
            <h1>
              지금 보고 있는
              <br />그 화면을,
              <br />
              <em>부수세요.</em>
            </h1>
            <p className="lead">
              엑셀, 슬랙, 코드 에디터. 내 Mac 화면 위에서 망치와 전기톱을 마음껏 휘두르는 스트레스 해소 게임이에요. 진짜 화면은 멀쩡하고, ESC 한 번이면 흔적도 없어요.
            </p>
            <div className="dl-area">
              <DownloadArea place="hero" />
            </div>
          </div>
          <div className="hero-art">
            <CrackedScreen />
          </div>
        </section>

        {/* 몰래 하기 */}
        <section id="stealth" className="wrap section" aria-labelledby="stealth-title">
          <div className="sec-head">
            <div className="eyebrow en">STEALTH</div>
            <h2 id="stealth-title">회사에서 해도 티 안 나게</h2>
            <p>게임 화면에는 UI가 거의 없어요. 단축키는 딱 두 개, 게임 중에만 동작해서 다른 앱과 겹치지 않아요.</p>
          </div>
          <ul className="keys env-mobile">
            <li><kbd className="en">ESC</kbd>누르는 즉시 흔적 없이 숨기기</li>
            <li><kbd className="en">Tab</kbd>누른 채 휠에서 무기 고르기</li>
            <li>
              <span className="chip"><Icon d={icons.hammer} size={16} stroke="#F2F2F5" width={2} /></span>
              메뉴 막대엔 피해량 숫자 하나뿐
            </li>
          </ul>
          <div className="grid3 not-mobile">
            <div className="card">
              <kbd className="kbd en">ESC</kbd>
              <h3>즉시 숨기기</h3>
              <p>누르는 순간 균열, 소리, 숫자가 사라져요. 메뉴 막대에서 ‘계속하기’를 누르면 부숴 둔 그대로 이어져요.</p>
            </div>
            <div className="card">
              <kbd className="kbd en">Tab</kbd>
              <h3>무기 휠</h3>
              <p>Tab을 누른 채 원형 휠에서 무기를 가리키고, 손을 떼면 바로 바뀌어요.</p>
            </div>
            <div className="card">
              <div className="menubar-chip en">
                <Icon d={icons.hammer} size={16} stroke="#F2F2F5" width={2} />
                12,340
              </div>
              <h3>메뉴 막대에 숫자 하나</h3>
              <p>누적 피해량만 조용히 올라가요. Dock, 앱 전환기, Mission Control에도 나타나지 않아요.</p>
            </div>
          </div>
        </section>

        {/* 안심 띠 */}
        <section aria-label="안심 포인트" className="band not-mobile">
          <ul className="wrap trust">
            <li><Icon d={icons.shield} stroke="var(--accent)" width={2} />진짜 파일과 앱은 절대 건드리지 않아요</li>
            <li><Icon d={icons.screen} stroke="var(--accent)" width={2} />ESC 한 번이면 원래 화면으로</li>
            <li><Icon d={icons.noEye} stroke="var(--accent)" width={2} />캡처한 화면은 저장하지 않아요</li>
          </ul>
        </section>

        {/* 무기 */}
        <section id="weapons" className="wrap section" aria-labelledby="weapons-title">
          <div className="sec-head">
            <div className="eyebrow en">WEAPONS · 10</div>
            <h2 id="weapons-title">10종의 무기를 사용할 수 있어요</h2>
            <p>처음부터 10종을 모두 쓸 수 있어요. 꾹 누르고 있으면 무기마다 제 속도로 계속 쏘고, 커서 옆에서 무기가 직접 움직여요.</p>
          </div>
          <ul className="weapons">
            {weapons.map((w) => (
              <li key={w.n} className="weapon">
                <div className="weapon-top">
                  <div className="weapon-icon"><Icon d={w.icon} size={28} stroke="#F4F4F5" /></div>
                  <span className="weapon-n en">{w.n}</span>
                </div>
                <h3>{w.name} <span>{w.verb}</span></h3>
                <p>{w.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 설치 */}
        <section id="install" className="band not-mobile" aria-labelledby="install-title">
          <div className="wrap install-in">
            <div className="sec-head">
              <div className="eyebrow en">INSTALL</div>
              <h2 id="install-title">설치는 1분이면 끝나요</h2>
            </div>
            <ol className="steps">
              <li>
                <span className="step-n en" aria-hidden="true">1</span>
                <h3>DMG 열기</h3>
                <p>받은 ScreenSmash.dmg 파일을 더블클릭해요.</p>
              </li>
              <li>
                <span className="step-n en" aria-hidden="true">2</span>
                <h3>Applications로 끌어 놓기</h3>
                <p>창에 보이는 앱 아이콘을 Applications 폴더로 드래그해요.</p>
              </li>
              <li>
                <span className="step-n en" aria-hidden="true">3</span>
                <h3>화면 기록 권한 켜기</h3>
                <p>처음 실행하면 안내가 떠요. 시스템 설정에서 스위치를 켜면 메뉴 막대에 망치 아이콘이 생겨요.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* 요구사항 + FAQ */}
        <section className="wrap split not-mobile">
          <div className="req">
            <h2>시스템 요구사항</h2>
            <dl>
              <div><dt>운영체제</dt><dd>{site.app.minOS} 이상</dd></div>
              <div><dt>칩</dt><dd>Apple Silicon · Intel</dd></div>
              <div><dt>권한</dt><dd>화면 기록 하나</dd></div>
              <div><dt>가격</dt><dd>무료</dd></div>
              <div><dt>Windows</dt><dd className="dim">준비 중</dd></div>
            </dl>
          </div>
          <div className="faq">
            <h2>자주 묻는 질문</h2>
            <div className="faq-list">
              {faqs.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary><h3>{f.q}</h3></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 마지막 다운로드 */}
        <section id="download" className="wrap final" aria-labelledby="download-title">
          <div className="final-box">
            <FinalCracks />
            <h2 id="download-title">오늘 쌓인 거, 화면에 푸세요</h2>
            <DownloadArea place="final" />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-in">
          <p>© 2026 Screen Smash</p>
          <p>Mac, macOS는 Apple Inc.의 상표입니다.</p>
        </div>
      </footer>
    </>
  );
}
