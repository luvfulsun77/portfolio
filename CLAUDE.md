# 포트폴리오 페이지 프로젝트

개인 포트폴리오 웹페이지를 제작하는 프로젝트입니다.

## 프로젝트 개요

- **목적**: 본인의 작업물, 경력, 기술 스택을 효과적으로 보여주는 포트폴리오 사이트 제작
- **작업 디렉토리**: `C:\Users\park sun young\Desktop\0417`
- **타겟 환경**: 데스크톱 + 모바일 (반응형)

## 기술 스택

- **프레임워크**: Next.js (App Router 권장)
- **언어**: TypeScript
- **스타일**: Tailwind CSS
- **패키지 매니저**: npm (별도 합의 전까지 기본값)
- **배포**: Vercel (권장)

### 컨벤션
- App Router(`app/` 디렉토리) 기반 라우팅
- 서버 컴포넌트 우선, 인터랙션 필요한 부분만 `"use client"`
- 스타일은 Tailwind 유틸리티 클래스 우선 사용 — 커스텀 CSS는 최소화
- 디자인 토큰(컬러, 폰트, 스페이싱)은 `tailwind.config.ts`에서 관리
- 이미지는 `next/image`, 폰트는 `next/font` 사용

## 페이지 구성 (예시)

- **Hero / Intro**: 이름, 한 줄 소개, 대표 이미지
- **About**: 자기소개, 경력, 학력
- **Projects / Works**: 주요 프로젝트 카드 + 상세
- **Contact**: 이메일, GitHub, LinkedIn 등 링크

## 디자인 시스템

> 세부 규칙은 `DESIGN.md` 참조. 아래는 작업 시 반드시 지켜야 할 핵심 원칙.

### 비주얼 방향
- **홀로그래픽 파스텔 그라데이션** — 블루(`#a8d8f0`), 핑크(`#f4b8d4`), 라벤더(`#c4a8e8`), 민트(`#a8ecd8`), 골드(`#f9d8a0`) 혼합
- 배경: `#f0f4ff` 베이스 위에 반투명 컬러 orb/도형을 레이어드
- 단색 사용 금지 — 항상 그라데이션 또는 mesh gradient 사용

### 타이포그래피
- Display/Hero: `Dancing Script` (italic) — `var(--font-dancing)`
- Body/UI: `Geist Sans` — `var(--font-geist-sans)`
- Label/Mono: `Geist Mono` — `var(--font-geist-mono)`, `tracking-widest uppercase`
- 큰 타이포에는 `.holographic-text` 클래스 적용 (globals.css 정의됨)

### 컴포넌트 스타일
- 카드/패널: `.glass` 또는 `.glass-dark` 클래스 사용 (glass morphism)
- 도형: `rounded-full` 또는 `rounded-3xl` 사용
- 애니메이션: `.animate-float`, `.animate-drift`, `.animate-drift-slow` (globals.css 정의됨)
- hover 인터랙션: `hover:scale-105 transition-transform duration-300`

### 색상 사용 원칙
- 텍스트: `text-[#1a1a2e]` 또는 `/60`, `/40`, `/30` opacity 변형
- 배경 orb: `opacity-20` ~ `opacity-40` 범위
- border: `border-white/30` ~ `border-white/40`

## 작업 가이드

### 디자인 원칙
- 시각적 일관성 (컬러, 타이포, 여백) 유지 — DESIGN.md 기준 준수
- 봄빛 홀로그램 톤: 밝고 가볍고 투명하게
- 다크 모드 미지원 (라이트 전용)

### 코드 원칙
- 시멘틱 HTML 사용 (`<header>`, `<section>`, `<article>` 등)
- 접근성(a11y) 고려: 대체 텍스트, 키보드 네비게이션, 충분한 명도 대비
- 반응형 우선 (모바일 → 데스크톱)
- 성능: 이미지 최적화, 불필요한 의존성 최소화

### 작업 흐름
1. 페이지 구조(IA) → 와이어프레임 합의
2. 디자인 토큰(컬러/타이포/스페이싱) 정의
3. 섹션 단위로 마크업 → 스타일 → 인터랙션
4. 반응형/접근성 점검 요망

5. 배포 (GitHub Pages, Vercel, Netlify 등)

## 사용자 정보

- 이메일: luvfulsun@gmail.com
- 인스타그램 :@yuayera
- (추가 정보는 작업하며 수집)

## 기타

- 새 파일 생성 전 기존 파일 수정 가능 여부 우선 확인
- 콘텐츠(자기소개 텍스트, 프로젝트 설명 등)는 임의 생성하지 말고 사용자에게 확인
- 이미지 에셋이 필요할 경우 사용자에게 요청
