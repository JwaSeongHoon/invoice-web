# 견적서 웹 공유 서비스

Notion에 입력한 견적서를 클라이언트가 고유 링크 하나로 웹에서 열람하고 PDF로 저장할 수 있는 서비스입니다.

## 프로젝트 개요

**목적**: 별도 견적서 툴 없이 Notion 기반 업무 흐름을 그대로 유지하면서 전문적인 견적서를 링크로 발행한다.

**사용자**: Notion을 업무 도구로 사용하는 프리랜서, 소규모 에이전시, 1인 개발자

**접근 방식**: 로그인/대시보드 없음 — 발행자가 공유한 고유 링크(`/q/[pageId]`)로 직접 접근

## 주요 페이지

| 경로 | 설명 |
|------|------|
| `/q/[pageId]` | 견적서 보기 페이지 — Notion API에서 데이터를 가져와 렌더링, PDF 다운로드 제공 |
| `/q/[pageId]` (not-found) | 오류 안내 페이지 — 잘못된 링크 또는 비공개 페이지 접근 시 표시 |
| `/api/pdf/[pageId]` | PDF 생성 API Route Handler |

## 핵심 기능

- **F001** Notion 데이터 연동 — Notion API로 견적서 데이터를 가져와 파싱
- **F002** 견적서 웹 렌더링 — 파싱된 데이터를 전문적인 레이아웃으로 표시
- **F003** PDF 다운로드 — `@react-pdf/renderer` 기반 서버 사이드 PDF 생성
- **F004** 고유 링크 접근 — URL의 Notion 페이지 ID로 견적서 특정
- **F005** 오류 처리 — 접근 불가 상황 안내 메시지 표시

## 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0 + TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui (new-york style)
- **Notion 연동**: `@notionhq/client`
- **PDF 생성**: `@react-pdf/renderer`
- **검증**: Zod
- **배포**: Vercel

## 시작하기

```bash
# 의존성 설치
npm install

# 환경변수 설정
cp .env.local.example .env.local
# .env.local 편집 — NOTION_API_KEY, ISSUER_NAME 등 입력

# 개발 서버 실행
npm run dev
```

## 필수 추가 패키지 설치

```bash
# Notion SDK
npm install @notionhq/client

# PDF 생성
npm install @react-pdf/renderer
npm install --save-dev @types/react-pdf
```

## 개발 명령어

```bash
npm run dev         # 개발 서버 (Turbopack)
npm run build       # 프로덕션 빌드
npm run check-all   # 타입체크 + 린트 + 포맷 검사
```

## 환경변수

`.env.local.example` 파일을 복사해 `.env.local`을 만들고 값을 입력하세요.

| 변수 | 설명 | 필수 |
|------|------|------|
| `NOTION_API_KEY` | Notion Integration 토큰 | 필수 |
| `NOTION_DATABASE_ID` | 견적서 데이터베이스 ID | 옵션 |
| `ISSUER_NAME` | 발행자 이름/상호 | 필수 |
| `ISSUER_CONTACT` | 발행자 연락처 | 필수 |
| `ISSUER_EMAIL` | 발행자 이메일 | 필수 |
| `ISSUER_ADDRESS` | 발행자 주소 | 옵션 |

## 문서

- [PRD 문서](./docs/PRD.md) — 상세 요구사항 및 기능 명세
- [개발 가이드](./CLAUDE.md) — 개발 지침
