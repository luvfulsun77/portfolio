# CLAUDE.md

> 이 문서는 Yu.A.Ye (박선영 / Al) 개인 포트폴리오 웹사이트 제작을 위한 Claude Code 작업 지침입니다. 모든 코드 생성·수정 작업 전에 이 문서와 `DESIGN.md`를 먼저 참조하세요.

---

## 1. 프로젝트 개요

### 1.1 사이트 정체성
- **작가명**: Yu.A.Ye (유어예) / 본명 박선영
- **분야**: AI 미디어 아티스트 — 한국 전통 색채(자개·오방색·색동·단청)와 생성형 AI의 결합
- **주요 도구**: Midjourney, Kling AI, TouchDesigner, Three.js, Web Audio API
- **사이트 목적**: 작품 아카이브 + 전시/공모전 이력 + 작가 소개. 갤러리·기획자·큐레이터가 처음 방문했을 때 "이 작가가 누구이고 무엇을 해왔는가"를 30초 안에 파악하게 만드는 것.

### 1.2 인트로 3분기 구조 (가장 중요)
랜딩 페이지는 3개의 진입점을 가진다. 이 셋은 위계가 아니라 **병렬**이다.

| 섹션 | 역할 | 대표 콘텐츠 |
|------|------|-------------|
| **WORKS** | 전체 작품 아카이브 (영상 + 정지) | 미디어 파사드, 프로젝션 매핑, 설치, 영상 작업, 인터랙티브 모두 포함. 〈자개호소〉, 〈환승객〉, 〈진혼〉, 《빛이 머무는 자리》 등 |
| **RECOGNITION** | 수상·공모전 입선·언론 기고·전시 선정 이력 | 2025 아주예술대전 우수상, 광화문 미디어파사드 금상, 우리미디콘 우수상, KBS AI Gallery, Total Museum Hackathon, Lumen Prize 2026 등 |
| **ABOUT** | 작가 소개 + 이력(CV) + 작가 노트 + 연락처 | 프로필 이미지, Artist Statement(국/영), 학력, 전시 목록, 출판, 연락처 |

인트로에서 이 셋 중 하나를 선택해 진입 → 각 섹션 내부에서 상세 페이지로 이동한다.

### 1.3 톤과 감도
- **엄격하게 미니멀**. 장윤영 작가 사이트처럼 UI는 투명에 가깝게, 이미지가 말하게 한다.
- **한글 우선, 영문 병기**. 모든 작품 제목·statement는 한글→영문 순서.
- **여백이 많다**. 정보 밀도보다 한 호흡 쉬어가는 레이아웃을 우선한다.

---

## 2. 기술 스택

### 2.1 권장 스택
- **프레임워크**: Next.js 14+ (App Router) + TypeScript
- **스타일**: Tailwind CSS (유틸리티) + CSS Variables (디자인 토큰)
- **애니메이션**: Framer Motion (페이지 전환, 이미지 hover)
- **이미지**: `next/image` 필수. 모든 작품 이미지는 WebP/AVIF 최적화
- **비디오 임베드**: `lite-youtube-embed` (paulirish) — 포스터만 먼저 로드하고 클릭 시에만 iframe 생성. 초기 로드 성능 보호 + 유튜브 브랜딩 최소화에 필수.
- **폰트**: `next/font`로 로컬 로딩 (CLS 방지)
- **배포**: Vercel
- **CMS(선택)**: 초기에는 `/content/works/*.json` 파일 기반. 작품 수가 50개 넘어가면 Sanity 이관 검토

### 2.2 라이브러리 선택 원칙
- 의존성 최소화. 한 가지 일을 하는 작은 라이브러리를 선호.
- 무거운 UI 킷(Material UI, Chakra 등) 금지. 이 사이트는 디자인이 정체성이므로 모든 컴포넌트는 직접 만든다.
- 슬라이더가 필요하면 `embla-carousel-react` (가볍고 커스터마이징 쉬움).

### 2.3 폴더 구조
```
/app
  /(landing)/page.tsx          # 인트로 3분기 (Works / Recognition / About)
  /works/page.tsx              # 전체 작품 목록 (영상 + 정지 통합)
  /works/[slug]/page.tsx       # 개별 작품 상세
  /recognition/page.tsx            # 수상·선정·기고 이력 목록
  /recognition/[slug]/page.tsx     # 개별 수상 상세 (선택)
  /about/page.tsx
  /layout.tsx
/components
  /nav                         # 상단 고정 네비
  /work-card                   # 작품 카드 (섬네일 + 캡션)
  /recognition-item                # 수상 아이템
  /media                       # <VideoPlayer />, <ImageViewer />
  /layout                      # <PageShell />, <Gutter />
/content
  /works/*.json                # 작품 메타데이터 (영상/정지 통합)
  /recognitions/*.json             # 수상·공모전·기고
  /about.json
/lib
  /tokens.ts                   # DESIGN.md의 토큰을 TS로 export
/public
  /works/<slug>/*.webp         # 섬네일 + 풀사이즈
  /fonts/*.woff2
```

---

## 3. 콘텐츠 스키마

### 3.1 Work (모든 작품 — 영상·정지 통합)
영상과 정지 작품을 **하나의 스키마**로 통합. 영상 작품은 `video` 필드가 존재하면 영상 플레이어로, 없으면 이미지 갤러리로 렌더링.

```ts
interface Work {
  slug: string;                      // URL용 kebab-case 영문
  title: { ko: string; en: string; hanja?: string };  // 예: 자개호소 / Najeon Tiger Roar / 螺鈿虎嘯
  year: number;
  type: "media-facade" | "installation" | "projection-mapping"
       | "video" | "interactive" | "print" | "mixed-media";
  venue?: string;                    // 전시 장소 or 공모전명
  dimensions?: string;               // 예: "72×27m (Chroma facade)"
  materials?: string[];              // 예: ["자개", "캔버스", "프로젝션"]
  tools?: string[];                  // 예: ["Midjourney", "Kling AI", "TouchDesigner"]
  statement: { ko: string; en: string };
  thumbnail: string;                 // /works/<slug>/thumb.webp

  // 영상 작품은 이 필드를 채움 (정지 작품은 생략)
  video?: {
    youtubeId: string;               // 예: "dQw4w9WgXcQ"
    duration: number;                // 초
    aspectRatio: "16:9" | "9:16" | "1:1" | "4:5";
    poster?: string;                 // 선택. 없으면 maxresdefault 자동 사용
    startAt?: number;
    endAt?: number;
  };

  // 정지 작품은 이 필드를 채움 (영상 작품도 추가 이미지 있을 수 있음)
  images?: { src: string; caption?: string }[];

  // Three.js 등 인터랙티브 별도 빌드
  interactive?: { url: string; tech: string[] };

  credits?: { role: string; name: string }[];
}
```

**작품 목록에서의 구분**
- 작품 카드에는 영상/정지 구분 인디케이터를 표시:
  - 영상: 우하단에 작은 `▷` 아이콘 + 재생 시간(`2'30"`)
  - 정지: 아이콘 없음
- 별도의 탭·필터로 영상과 정지를 분리하지 **않는다**. 섞어서 하나의 그리드로 보여주는 것이 이 사이트의 정체성 (작품은 매체에 따라 나뉘지 않음).

### 3.2 Recognition (수상·공모전·기고)
```ts
interface Recognition {
  slug?: string;                     // 상세 페이지 있는 경우만
  year: number;
  date?: string;                     // ISO 날짜, 정렬용
  category: "award" | "exhibition-selection" | "press" | "publication" | "screening";
  title: { ko: string; en?: string };// 예: 2025 아주예술대전 우수상
  organization: string;              // 주최/매체 이름
  award?: string;                    // 예: "우수상", "금상", "선정"
  relatedWorkSlug?: string;          // 어떤 작품으로 수상했는지 연결
  description?: { ko: string; en?: string };
  link?: string;                     // 외부 링크 (공모전 공지, 기사 등)
  image?: string;                    // 수상 증빙 or 관련 이미지 (선택)
}
```

**예시 데이터**
```json
[
  {
    "year": 2025,
    "category": "award",
    "title": { "ko": "2025 아주예술대전 우수상" },
    "organization": "아주예술문화재단",
    "award": "우수상"
  },
  {
    "year": 2024,
    "category": "award",
    "title": { "ko": "광화문 미디어파사드 국제공모전 금상" },
    "organization": "서울특별시",
    "award": "금상",
    "relatedWorkSlug": "gwanghwamun-facade"
  },
  {
    "year": 2024,
    "category": "exhibition-selection",
    "title": { "ko": "KBS AI Gallery 선정 작가" },
    "organization": "KBS"
  },
  {
    "year": 2026,
    "category": "exhibition-selection",
    "title": { "ko": "Lumen Prize 2026 출품", "en": "Lumen Prize 2026 Submission" },
    "organization": "Lumen Prize",
    "relatedWorkSlug": "requiem"
  }
]
```

### 3.3 About
```ts
interface About {
  portrait: string;
  hanja?: string;                  // 예: 遊 於 藝
  tagline?: { ko: string; en: string };  // 예: 예술에서 놀다 / Playing in Art
  statement: { ko: string; en: string };
  bio: { ko: string; en: string };
  cv: {
    education: CVItem[];
    experience?: CVItem[];          // 작가 활동 이전 경력 (선택)
    soloExhibitions: CVItem[];
    groupExhibitions: CVItem[];
    publications: CVItem[];        // 타로책, 그림책 등
  };
  contact: {
    email: "luvfulsun@gmail.com";
    instagram: "@yuayera";
    sedition?: string;
  };
}
interface CVItem { year: number; title: string; venue?: string; note?: string; }
```

> 수상 이력은 About의 CV에 중복으로 넣지 않는다. Recognition 섹션이 수상의 정식 홈이다. About 페이지에서는 "주요 수상 → Recognition 페이지에서 보기" 정도의 링크만.

---

## 4. 라우팅과 페이지별 지침

### 4.1 `/` (인트로)
- 풀스크린. 스크롤 없음. 3분기는 **세로 3열** (데스크톱) 또는 **세로 스택**(모바일).
- 각 분기(Works / Recognition / About)는 hover 시 대표 이미지가 은은하게 페이드 인 + 한국적 감성의 미세한 컬러 시프트(자개 iridescence) 적용. 자세한 인터랙션은 `DESIGN.md` §인터랙션 참조.
- 상단에는 `Yu.A.Ye / 유어예` 로고만. 상단 네비는 **표시하지 않는다** (진입점이 본문이므로 중복).
- 하단에 아주 작은 글씨로 © year Yu.A.Ye.

### 4.2 `/works` (전체 작품)
- 상단 고정 네비(로고 + WORKS / RECOGNITION / ABOUT) 표시.
- 그리드 레이아웃. 데스크톱 2열, 태블릿 2열(간격 축소), 모바일 1열.
- **영상과 정지 작품을 섞어서** 연도 역순으로 표시.
- 각 카드: 섬네일 + 제목(한/영) + 연도 + 타입. 영상 작품은 우하단에 `▷ 2'30"` 인디케이터.
- hover 시 섬네일만 아주 약한 줌(scale 1.015).
- 선택적 필터(상단 작게): `전체 / 영상 / 설치 / 프로젝션 매핑 / 혼합매체`. 필터는 URL 쿼리(`?type=video`)로 관리해 북마크 가능하게.
- **무한 스크롤 금지**. 페이지네이션 또는 "더 보기" 버튼.

### 4.3 `/works/[slug]` (작품 상세)
- 첫 화면에 대형 이미지 또는 비디오.
  - 영상 작품: 포스터 + 커스텀 플레이 버튼 (DESIGN.md §6.4 참조)
  - 정지 작품: 대표 이미지 풀블리드
- 그 아래 제목(한/영/한자) → 메타(연도·장소·규모·재생시간) → Statement(한→영) → 추가 이미지 시퀀스 → 크레딧.
- **Related Recognition**: 이 작품으로 받은 수상이 있으면 본문 하단에 `이 작품의 수상 이력 →` 섹션. Recognition JSON에서 `relatedWorkSlug`가 일치하는 항목 자동 표시.
- 좌우 화살표로 이전/다음 작품 이동 (키보드 ←/→ 지원).

### 4.4 `/recognition` (수상·공모전·기고)
- 연도별 역순 리스트. 갤러리 CV 스타일로 **간결하게**.
- 각 항목 1~2줄:
  ```
  2025  아주예술대전 우수상                              아주예술문화재단
  2024  광화문 미디어파사드 국제공모전 금상   →〈작품〉   서울특별시
  2024  KBS AI Gallery 선정 작가                          KBS
  ```
- 카테고리 필터(상단): `전체 / 수상 / 선정 / 기고`.
- `relatedWorkSlug`가 있으면 제목 옆 화살표 아이콘, 클릭 시 해당 작품 상세로 이동.
- 외부 링크(`link` 필드)가 있으면 `↗` 아이콘으로 표시, 새 탭 오픈.
- 이미지 증빙이 있는 항목은 아이템 오른쪽에 작은 썸네일(60×60) 표시. 클릭 시 라이트박스.
- 개별 상세 페이지(`/recognition/[slug]`)는 **선택 사항**. 중요한 수상(금상, 국제 공모전 등) 몇 개만 상세 페이지 제공, 나머지는 리스트 아이템으로만 표시.

### 4.5 `/about`
- 상단 원형 프로필 이미지.
- Artist Statement (한/영 병기, 큰 여백).
- Bio (짧은 작가 소개, 한/영).
- CV 섹션 순서: **학력 → 개인전 → 단체전 → 출판물**.
  - 수상 이력은 여기 중복 게재하지 않고, "주요 수상 및 공모전 → Recognition 페이지" 링크만.
- CV는 아코디언이 아니라 **전부 펼쳐서** 긴 세로 리스트로. 갤러리스트가 Cmd+F로 찾을 수 있게.
- 하단에 연락처: 이메일 `luvfulsun@gmail.com` (mailto 링크), Instagram `@yuayera` (외부 링크 `↗` 기호 포함).

> 참고: 인스타그램 핸들 `@yuayera`는 기존에 쓰시던 실제 계정이라 그대로 유지. 작가명 표기는 `Yu.A.Ye`, 인스타 계정명은 `yuayera`로 구분되어 있음. 헷갈릴 여지가 있으면 About 페이지 연락처에 `Instagram ↗ @yuayera`로 명시.

---

## 5. 미디어 처리 원칙

### 5.1 이미지
- 원본은 `/content-raw/`에 보관(깃 제외), 빌드 타임에 `/public/works/<slug>/`로 WebP+AVIF 두 포맷 생성.
- 섬네일은 짧은 변 기준 800px, 풀사이즈는 2400px 이하.
- `next/image`의 `placeholder="blur"` 필수. `blurDataURL`은 빌드 스크립트로 자동 생성.
- 미디어 파사드 사진처럼 **극단적 가로비**(예: Chroma 72×27m)는 원본 비율 유지하고 세로 여백으로 흡수. 크롭 금지.

### 5.1.1 유튜브 포스터 헬퍼
영상 작품의 포스터는 다음 헬퍼를 통해 일관되게 처리한다:
```ts
// /lib/youtube-poster.ts
export function getPoster(work: Work): string {
  if (work.video?.poster) return work.video.poster;
  if (work.video?.youtubeId) {
    return `https://i.ytimg.com/vi/${work.video.youtubeId}/maxresdefault.jpg`;
  }
  return work.thumbnail;  // 정지 작품은 thumbnail로 폴백
}
```
- maxresdefault가 404인 경우(일부 구형 영상) 이미지 `onError`에서 `hqdefault.jpg`로 폴백.
- 커스텀 포스터를 쓰고 싶은 작품만 `work.video.poster`를 채워넣으면 자동으로 우선 적용.

### 5.2 비디오 (유튜브)
유튜브는 편의성과 SEO를 위해 선택한 호스팅이지만, 기본 임베드 UI는 갤러리 포트폴리오 맥락에서 시각적으로 방해가 된다. 다음 전략을 **모두 적용**한다.

**① 포스터-우선 로딩 (lite-youtube-embed)**
- 페이지 로드 시점에는 iframe을 생성하지 않는다. 자체 제작한 포스터 이미지 + 중앙의 미세한 플레이 버튼만 표시.
- 사용자가 포스터를 클릭했을 때만 iframe이 생성되고 자동 재생된다.
- 이점: 초기 로드 시 유튜브의 수백 KB JS·추적 스크립트가 로드되지 않음. LCP 지표 보호.

**② 임베드 파라미터 (필수)**
iframe src에 다음 쿼리 파라미터를 **반드시 모두** 붙인다:
```
?rel=0              # 종료 후 관련 영상 제거 (같은 채널 내 영상만 노출)
&modestbranding=1   # 유튜브 로고 최소화
&controls=1         # 컨트롤 바는 유지 (사용자가 일시정지·볼륨 조정 가능해야 함)
&showinfo=0         # 상단 제목·채널 정보 숨김
&iv_load_policy=3   # 영상 주석(annotations) 제거
&playsinline=1      # iOS 전체화면 강제 진입 방지
&color=white        # 진행바 색상 (빨강 대신 흰색)
&disablekb=0        # 키보드 단축키는 허용
```

**③ 커스텀 플레이 버튼**
포스터 위에 올라가는 플레이 버튼은 유튜브 기본 빨간색 버튼을 **쓰지 않는다**. 다음 사양으로 SVG 커스텀:
- 크기: 64px × 64px (모바일 48px)
- 형태: 얇은 원형 스트로크 (1.5px) + 내부 삼각형
- 색: 기본 `rgba(255, 255, 255, 0.9)`, hover 시 `--najeon-teal`로 300ms 전환
- 그림자 없음

**④ 종료 화면 차단**
유튜브의 "관련 영상 그리드"(종료 화면)는 `rel=0`으로도 완전히 제거되지 않는다. 다음 중 하나를 적용:
- **권장**: 유튜브 스튜디오에서 해당 영상의 "종료 화면(End Screen)" 기능을 OFF.
- 대안: 영상 마지막 5초를 자체 제작 아웃트로(Yu.A.Ye 로고 + 제목)로 편집.

**⑤ 재생 후 처리**
- 영상이 끝나면(`onStateChange === 0`) iframe을 언마운트하고 포스터 + 플레이 버튼으로 복귀. 이렇게 하면 종료 후 유튜브 UI가 절대 노출되지 않는다.
- 구현: YouTube IFrame API의 `onStateChange` 이벤트 리스닝.

**⑥ 배경 루프 영상 (작품 목록 카드 등)**
작품 카드 hover 시 짧은 미리보기를 재생하고 싶다면, **유튜브 대신 자체 호스팅 mp4**를 사용한다 (5~10초, 480p, 무음, 1MB 이하). 유튜브는 배경 루프에 부적합하다 (매 재생마다 광고·로고 노출).

**⑦ 포스터 (자동 우선)**
- 기본 전략: 유튜브의 `maxresdefault.jpg`를 `<img>`로 직접 로드. 추가 작업 제로.
- 단, 유튜브가 자동 생성한 썸네일이 마음에 안 드는 작품은 유튜브 스튜디오에서 **커스텀 썸네일** 업로드(유튜브 기능). 이러면 maxresdefault URL이 그대로 업데이트되므로 코드 변경 불필요.
- 사이트 코드에서 개별 WebP 파일을 만드는 것은 **선택 사항**. 나중에 특정 작품만 더 신경 쓰고 싶어지면 `/public/works/<slug>/poster.webp`에 넣고 `work.video.poster`에 경로 지정하면 자동으로 우선 적용됨.

**유튜브 썸네일 URL 패턴** (참고):
```
https://i.ytimg.com/vi/{id}/maxresdefault.jpg    # 1280×720 (권장)
https://i.ytimg.com/vi/{id}/hqdefault.jpg        # 480×360 (폴백)
https://i.ytimg.com/vi/{id}/sddefault.jpg        # 640×480
```

**구현 예시 (React 컴포넌트)**
```tsx
<YouTubeEmbed
  youtubeId={work.video.youtubeId}
  poster={work.video.poster}
  aspectRatio={work.video.aspectRatio}
  params={{
    rel: 0, modestbranding: 1, showinfo: 0,
    iv_load_policy: 3, playsinline: 1, color: "white",
  }}
  onEnd={() => unmountIframe()}
/>
```

### 5.3 Three.js 등 인터랙티브 작품
- 라이트한 프리뷰(mp4 루프)를 기본 표시, "실행하기" 버튼으로 별도 탭에서 인터랙티브 빌드 오픈.
- 메인 사이트의 번들에 섞지 않는다. 인터랙티브는 별도 서브도메인(`interactive.yuayera.com`) 권장.

---

## 6. 다국어 처리

### 6.1 원칙
- 모든 작품 메타데이터는 `{ ko, en }` 객체로 저장.
- 언어 스위처는 **만들지 않는다**. 한/영을 같은 페이지에 병기하는 것이 이 사이트의 정체성 (장윤영 작가 방식).
- 단, `<html lang>`은 사용자 브라우저 기준으로 `ko` 또는 `en` 설정 (SEO용).

### 6.2 메타 태그
- Open Graph / Twitter Card 이미지는 작품별로 개별 생성 (대표 이미지 + 제목 오버레이).
- `description`은 작가 Statement에서 뽑아서 사용, 한/영 버전 모두 준비.

### 6.3 도메인과 URL 구조

**메인 도메인**: `www.yuayera.com` (이미 보유)

**URL 정책**
- 전체 사이트 `https` 강제. `http://` 및 `yuayera.com`(www 없음)은 `www.yuayera.com`으로 301 리다이렉트.
- 작품 URL은 영문 kebab-case slug 사용:
  - `/works/najeon-tiger-roar` (자개호소)
  - `/works/transit-passenger` (환승객)
  - `/works/requiem` (진혼)
- 한글 URL(`/작품/자개호소`) **사용하지 않는다**. 공유 시 인코딩되어 읽기 불가해지고, 해외 갤러리스트·공모전 심사위원에게 불편함.

**메타데이터 설정 (Next.js `metadata` API)**
```ts
export const metadata = {
  metadataBase: new URL("https://www.yuayera.com"),
  title: { default: "Yu.A.Ye", template: "%s — Yu.A.Ye" },
  description: "유어예 (遊於藝) — 예술에서 놀다. 색동·오방색·자개의 감각을 생성형 AI와 잇는 미디어 아티스트.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    alternateLocale: "en_US",
    siteName: "Yu.A.Ye",
  },
  twitter: { card: "summary_large_image" },
};
```

**서브도메인 활용 (나중에)**
- `interactive.yuayera.com` — Three.js 인터랙티브 작업(〈진혼〉 등) 별도 호스팅
- `archive.yuayera.com` — 과거 작업 아카이브가 100개 넘어갈 때 분리 고려

**robots.txt / sitemap.xml**
- `/app/sitemap.ts`로 동적 생성. 모든 작품 상세 페이지 포함.
- `robots.txt`는 AI 학습 크롤러 차단 고려:
  ```
  User-agent: GPTBot
  Disallow: /
  User-agent: ClaudeBot
  Disallow: /
  User-agent: CCBot
  Disallow: /
  ```
  *(본인이 AI로 작업하는 것과 별개로, 작품 이미지가 타 AI 학습셋에 들어가는 건 차단하는 것이 일반적)*

---

## 7. 성능 예산

| 지표 | 목표 |
|------|------|
| LCP | < 2.0s (4G) |
| CLS | < 0.05 |
| 초기 JS | < 100KB gzipped |
| 이미지 한 장 | < 300KB (풀사이즈 기준) |

- Lighthouse 90+ 는 기본 합격선. 95+ 를 목표로 한다.
- 폰트는 자체 호스팅 `font-display: swap`.

---

## 8. 접근성 (A11y)

- 모든 이미지 `alt` 필수. 장식용은 `alt=""`로 명시.
- 키보드 네비게이션: Tab 순서 자연스럽게, 포커스 아웃라인 유지(디자인상 미묘하게 커스텀하되 제거 금지).
- 색 대비는 본문 텍스트 WCAG AA 이상. 한국 전통색을 쓰더라도 본문은 높은 대비를 유지.
- prefers-reduced-motion 존중: 자개 iridescence 애니메이션은 이 설정에서 페이드로만 대체.

---

## 9. 개발 워크플로

1. **디자인 먼저**. 새 페이지/컴포넌트 작업 시 `DESIGN.md`의 토큰과 스케일을 벗어나지 않는지 먼저 확인.
2. **한 번에 한 페이지**. 전체를 동시에 만들지 말고 인트로 → About → Works 목록 → Work 상세 → Recognition 순으로.
3. **콘텐츠 먼저, 스타일 나중**. 더미 텍스트가 아닌 실제 작품 데이터로 레이아웃을 검증한다. Al의 기존 작품(〈환승객〉, 〈자개호소〉, 〈진혼〉 등)을 초기 fixture로 사용.
4. **커밋 단위는 작게**. "wip" 같은 커밋 메시지 금지.

---

## 10. Claude Code 작업 시 행동 규칙

- 이 문서와 `DESIGN.md`에 명시되지 않은 디자인 결정을 할 때는 **먼저 질문**한다. 임의로 그라데이션·그림자·둥근 모서리를 추가하지 않는다.
- 색상은 반드시 `DESIGN.md`의 팔레트에서만 선택. hex 값을 직접 쓰지 않고 CSS variable 또는 Tailwind 설정의 이름으로 참조.
- 새 폰트·새 아이콘 라이브러리를 도입할 때는 사전 승인.
- 이미지 크롭·리사이즈가 필요하면 원본을 변경하지 말고 `/public`에 파생본을 생성.
- 한국어 텍스트 작업 시 영문 폰트로 폴백되지 않는지 확인 (한글 글리프 포함된 폰트 우선).