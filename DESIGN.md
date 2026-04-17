# Design System

레퍼런스: イルミイロ(illumiiro) 전시 포스터 — 홀로그래픽 그라데이션 + 기하학적 레이어드 구성

---

## Color Palette

홀로그래픽 파스텔 팔레트. 단색이 아닌 mesh gradient / 혼합 계열로 사용.

| Role | Color | Note |
|------|-------|------|
| Primary | `#A8D8F0` | 하늘빛 블루 |
| Secondary | `#F4B8D4` | 소프트 핑크 |
| Accent | `#C4A8E8` | 라벤더 퍼플 |
| Warm | `#F9D8A0` | 피치/골드 |
| Mint | `#A8ECD8` | 민트 그린 |
| Background | `#F0F4FF` | 극히 연한 블루-화이트 |
| Text (dark) | `#1A1A2E` | 딥 네이비 (가독성) |
| Text (light) | `#FFFFFF` | 화이트 |

### Gradient 사용 원칙
- 최소 3색 이상 혼합한 mesh gradient 사용
- 예: `from-sky-200 via-pink-200 to-purple-200`
- 방향은 대각선(`135deg`) 권장 — 역동성 강조
- opacity를 섞어 레이어드 효과 (backdrop-blur 병행)

---

## Typography

손글씨 + 세리프/산세리프 대비가 핵심.

| Role | Font | Style |
|------|------|-------|
| Display / Hero | 스크립트 계열 (e.g. `Dancing Script`, `Pacifico`) | italic, thin |
| Heading | 산세리프 — `Inter` 또는 `Noto Sans KR` | light~regular |
| Body | `Noto Sans KR` | regular, 16px |
| Accent label | 대문자 영문, letter-spacing 넓게 | `tracking-widest` |

- 큰 타이포와 배경 그래픽을 겹쳐 배치 (레이어드 타이포)
- 텍스트에 `mix-blend-mode: overlay` 또는 `multiply` 효과 고려

---

## Shape & Layout

기하학적 도형들이 겹치고 흘러가는 구성.

- **도형**: 원, 삼각형, 사각형을 투명도(20~60%) 로 레이어드
- **배치**: 비대칭 — 요소들이 화면 밖으로 삐져나오는 구도
- **움직임**: CSS animation으로 도형이 천천히 float / drift
- **blur**: `backdrop-filter: blur` + `opacity` 조합으로 깊이감 표현
- 격자(grid dot) 패턴을 배경에 subtle하게 추가 가능

---

## Visual Effects

| Effect | 적용 방법 |
|--------|----------|
| Holographic shimmer | `@keyframes` shimmer — background-position 이동 |
| Glass morphism | `bg-white/20 backdrop-blur-md border border-white/30` |
| Soft glow | `box-shadow: 0 0 40px rgba(168,216,240,0.5)` |
| Color iridescence | 그라데이션 + `mix-blend-mode` |

---

## Spacing & Radius

- 여백: 넉넉하게 — section padding `py-24` 이상
- radius: 도형/카드는 `rounded-full` 또는 `rounded-3xl` 사용
- 요소 간 겹침(overlap)을 활용 — z-index 레이어링

---

## Overall Tone

> 봄빛 홀로그램 — 가볍고 투명하며, 색이 빛처럼 번지는 느낌.  
> 화려하지만 과하지 않고, 공기처럼 가벼운 레이어드 미감.

- 어둡지 않게 — 전체적으로 밝고 투명한 톤 유지
- 색이 충돌하지 않고 녹아드는 느낌 (blend, not clash)
- 여백과 도형이 함께 숨쉬는 레이아웃
