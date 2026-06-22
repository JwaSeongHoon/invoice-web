# 견적서 웹 공유 서비스 MVP PRD

## 핵심 정보

**목적**: Notion에 입력한 견적서를 클라이언트가 고유 링크 하나로 웹에서 열람하고 PDF로 저장할 수 있도록 하여, 별도 견적서 툴 없이 Notion 기반 업무 흐름을 그대로 유지하면서 전문적인 견적서를 발행한다.

**사용자**: Notion을 업무 도구로 사용하는 프리랜서, 소규모 에이전시, 1인 개발자로, 클라이언트에게 견적서를 이메일/메신저 링크로 전달하고 싶은 사람.

---

## 사용자 여정

```
1. [발행자] Notion 데이터베이스에 견적서 항목 입력
   (견적 번호, 클라이언트 정보, 항목, 금액, 유효기간 등)
   ↓ Notion 페이지 공개 설정 + 페이지 ID 복사

2. [발행자] 고유 견적서 링크 생성
   예: https://myservice.com/q/[notionPageId]
   ↓ 링크를 클라이언트에게 이메일/메신저로 전달

3. [클라이언트] 견적서 보기 페이지 접속 (로그인 불필요)
   ↓ Notion API 호출 → 데이터 파싱 → 웹 렌더링

   정상 → 견적서 내용 표시
   오류(페이지 없음/비공개) → 안내 메시지 표시
   ↓

4. [클라이언트] 견적서 확인
   ↓ PDF 다운로드 버튼 클릭

5. [완료] PDF 파일 저장
   → 링크 재접속으로 언제든 재열람 가능
```

---

## 기능 명세

### 1. MVP 핵심 기능

| ID | 기능명 | 설명 | MVP 필수 이유 | 관련 페이지 |
|----|--------|------|---------------|-------------|
| **F001** | Notion 데이터 연동 | Notion API로 지정 페이지 ID의 견적서 데이터를 가져와 파싱 | 서비스의 유일한 데이터 소스 | 견적서 보기 페이지 |
| **F002** | 견적서 웹 렌더링 | 파싱된 데이터를 전문적인 견적서 레이아웃으로 화면에 표시 | 클라이언트가 확인하는 핵심 기능 | 견적서 보기 페이지 |
| **F003** | PDF 다운로드 | 화면에 표시된 견적서를 PDF 파일로 변환하여 다운로드 | 클라이언트의 오프라인 보관/결재 필요 | 견적서 보기 페이지 |
| **F004** | 고유 링크 접근 | URL에 포함된 Notion 페이지 ID 기반으로 견적서를 특정 | 로그인 없는 링크 공유 방식의 기반 | 견적서 보기 페이지 |
| **F005** | 오류 처리 | 존재하지 않거나 접근 불가한 페이지 접속 시 안내 메시지 표시 | 잘못된 링크 접속 시 UX 보장 | 오류 안내 페이지 |

### 2. MVP 이후 기능 (Phase 2 제외)

- 발행자 로그인 및 대시보드 (견적서 목록 관리)
- 견적서 상태 추적 (열람 여부, 수락/거절)
- 클라이언트 서명 또는 수락 확인 기능
- 견적서 만료일 자동 비활성화
- 커스텀 브랜딩 (로고, 색상 테마)
- 이메일 자동 발송
- Notion 외 데이터 소스 지원

---

## 메뉴 구조

```
견적서 웹 공유 서비스 내비게이션

공개 접근 (로그인 불필요)
├── 견적서 보기 - F001, F002, F003, F004
│   └── 고유 링크로 직접 접근 (공유된 URL)
└── 오류 안내 - F005
    └── 잘못된 링크 접속 시 자동 이동
```

> 이 MVP는 발행자가 Notion + URL만으로 운영하므로 로그인, 헤더 메뉴, 대시보드가 없다.
> 모든 진입은 발행자가 공유한 고유 링크를 통해 이루어진다.

---

## 페이지별 상세 기능

### 견적서 보기 페이지

> **구현 기능:** `F001`, `F002`, `F003`, `F004` | **인증:** 불필요 (공개 접근)

| 항목 | 내용 |
|------|------|
| **역할** | 발행자가 공유한 고유 링크로 접속한 클라이언트가 견적서를 열람하고 PDF로 저장하는 핵심 페이지 |
| **진입 경로** | 발행자가 공유한 URL `https://myservice.com/q/[notionPageId]` 직접 접속 |
| **사용자 행동** | 견적서 내용 전체 열람 후 PDF 다운로드 버튼 클릭 |
| **주요 기능** | - Notion API 호출 및 데이터 파싱 (서버 사이드, F001)<br>- 발행자 정보 섹션 표시 (상호, 연락처, F002)<br>- 클라이언트 정보 섹션 표시 (이름, 연락처, F002)<br>- 견적 항목 테이블 표시 (품목, 수량, 단가, 소계, F002)<br>- 금액 합계 표시 (소계, 부가세, 총액, F002)<br>- 유효기간 및 메모 표시 (F002)<br>- **PDF 다운로드** 버튼 (F003) |
| **다음 이동** | PDF 다운로드 완료 → 같은 페이지 유지 / 오류 발생 → 오류 안내 페이지 |

---

### 오류 안내 페이지

> **구현 기능:** `F005` | **인증:** 불필요

| 항목 | 내용 |
|------|------|
| **역할** | 잘못된 링크, 비공개 Notion 페이지, API 오류 등 접근 불가 상황을 클라이언트에게 안내 |
| **진입 경로** | 견적서 보기 페이지에서 Notion API 호출 실패 또는 데이터 없음 시 자동 이동 |
| **사용자 행동** | 오류 메시지 확인 후 발행자에게 문의 |
| **주요 기능** | - 오류 유형별 메시지 표시 (페이지 없음 / 접근 권한 없음 / 서버 오류)<br>- 발행자에게 문의 안내 메시지 표시 |
| **다음 이동** | 별도 이동 없음 (정적 안내 페이지) |

---

## 기술 명세

### Notion 데이터 매핑 방식

**전제 조건**: 발행자가 Notion에 지정된 구조의 데이터베이스 또는 페이지를 생성하고,
해당 페이지를 "웹에 공개(Publish to web)" 또는 Integration 연동을 통해 API 접근 가능하게 설정한다.

**방식 A (권장 — Notion Database 기반)**

발행자가 Notion 데이터베이스에 견적서 1건 = 1행으로 입력하고,
각 행의 Notion 페이지 ID를 URL에 사용한다.

```
Notion Database 속성 → 견적서 필드 매핑

[발행자 정보] (데이터베이스 설정 또는 고정 환경변수)
  ISSUER_NAME       → 발행자 상호/이름
  ISSUER_CONTACT    → 연락처
  ISSUER_EMAIL      → 이메일
  ISSUER_ADDRESS    → 주소 (옵션)

[견적서 메타] (Database Row Properties)
  Name (title)      → 견적서 제목
  QuoteNumber       → 견적 번호 (텍스트)
  IssueDate         → 발행일 (날짜)
  ValidUntil        → 유효기간 (날짜)
  Status            → 상태 (Select: 초안/발송/수락/거절)

[클라이언트 정보] (Database Row Properties)
  ClientName        → 클라이언트 이름/상호 (텍스트)
  ClientContact     → 연락처 (텍스트)
  ClientEmail       → 이메일 (이메일)

[견적 항목] (해당 Row의 하위 페이지 또는 데이터베이스 관계)
  → Row 하위 블록에 표 형태로 입력하거나
  → 별도 Items 데이터베이스와 Relation으로 연결

[금액]
  TaxRate           → 세율 (숫자, 기본 10%)
  Note              → 특이사항/메모 (텍스트)
```

**고유 링크 생성 방식**

```
URL 패턴: /q/[pageId]
예시: /q/abc123def456...

pageId = Notion 페이지 URL의 마지막 32자리 UUID
발행자가 Notion 페이지 URL에서 직접 복사하여
https://myservice.com/q/[pageId] 형태로 클라이언트에게 전달
```

**서버 사이드 처리 흐름**

```
1. Next.js Dynamic Route: src/app/q/[pageId]/page.tsx
2. Server Component에서 pageId 추출
3. Notion API 호출: GET /pages/{pageId} + GET /blocks/{pageId}/children
4. 응답 데이터 파싱 → InvoiceData 타입으로 변환
5. 견적 항목 합계 계산 (소계, 세액, 총액)
6. 렌더링 컴포넌트에 데이터 전달
7. 오류 시 notFound() 또는 오류 페이지로 이동
```

### PDF 생성 방식

**권장: `@react-pdf/renderer` (서버/클라이언트 양쪽 지원)**

```
선택 이유:
- React 컴포넌트 방식으로 PDF 레이아웃 구성 → 웹 UI와 별도 템플릿 관리
- 서버 사이드 생성 가능 (Next.js Route Handler 활용)
- 한글 폰트 내장 지원

구현 패턴:
1. src/components/invoice/invoice-pdf.tsx — PDF 전용 레이아웃 컴포넌트
2. /api/pdf/[pageId] Route Handler — PDF 스트림 반환
3. 클라이언트에서 /api/pdf/[pageId] 호출 → Blob → 브라우저 다운로드

대안: html2canvas + jsPDF (웹 화면 캡처 방식)
- 장점: 웹 UI와 100% 동일한 결과물
- 단점: 한글 깨짐 이슈, 이미지 품질 의존, 무거운 번들
→ MVP에서는 @react-pdf/renderer 권장
```

---

## 데이터 모델

> MVP는 DB를 별도로 두지 않고 Notion을 단일 데이터 소스로 사용한다.
> 아래 모델은 Notion API 응답을 파싱한 후 앱 내부에서 사용하는 TypeScript 타입 정의이다.

### InvoiceData (견적서 전체)

| 필드 | 설명 | 타입 |
|------|------|------|
| id | Notion 페이지 ID | string |
| quoteNumber | 견적 번호 | string |
| title | 견적서 제목 | string |
| issueDate | 발행일 | string (YYYY-MM-DD) |
| validUntil | 유효기간 | string (YYYY-MM-DD) |
| status | 견적서 상태 | '초안' \| '발송' \| '수락' \| '거절' |
| issuer | 발행자 정보 | IssuerInfo |
| client | 클라이언트 정보 | ClientInfo |
| items | 견적 항목 목록 | InvoiceItem[] |
| taxRate | 세율 (기본 0.1) | number |
| note | 특이사항/메모 | string \| null |
| subtotal | 항목 합계 (계산값) | number |
| taxAmount | 세액 (계산값) | number |
| total | 총액 (계산값) | number |

### IssuerInfo (발행자 정보)

| 필드 | 설명 | 타입 |
|------|------|------|
| name | 발행자 상호/이름 | string |
| contact | 연락처 | string |
| email | 이메일 | string |
| address | 주소 | string \| null |

### ClientInfo (클라이언트 정보)

| 필드 | 설명 | 타입 |
|------|------|------|
| name | 클라이언트 이름/상호 | string |
| contact | 연락처 | string \| null |
| email | 이메일 | string \| null |

### InvoiceItem (견적 항목)

| 필드 | 설명 | 타입 |
|------|------|------|
| id | 항목 고유 ID | string |
| name | 품목명 | string |
| description | 항목 설명 | string \| null |
| quantity | 수량 | number |
| unitPrice | 단가 | number |
| subtotal | 소계 (quantity * unitPrice, 계산값) | number |

---

## 기술 스택

### 프론트엔드 프레임워크

- **Next.js 15.5.3** (App Router + Turbopack) — 서버 컴포넌트 기반 렌더링, Dynamic Route `/q/[pageId]`
- **TypeScript 5** — 타입 안전성 (InvoiceData 등 내부 타입 정의)
- **React 19.1.0** — UI 라이브러리

### 스타일링 & UI

- **TailwindCSS v4** — 유틸리티 CSS (설정 파일 없는 새 엔진)
- **shadcn/ui (new-york style)** — Button, Card, Table, Badge, Separator 등 활용
- **Lucide React** — 아이콘 (다운로드, 달력, 사용자 등)

### Notion 연동

- **@notionhq/client** — 공식 Notion API SDK
  - `notion.pages.retrieve(pageId)` — 페이지 메타 및 Properties 조회
  - `notion.blocks.children.list(pageId)` — 페이지 내 블록(견적 항목 표 등) 조회

### PDF 생성

- **@react-pdf/renderer** — React 컴포넌트 기반 PDF 생성
  - Next.js Route Handler (`/api/pdf/[pageId]`)에서 서버 사이드 생성
  - 한글 폰트(Noto Sans KR) 내장

### 폼 & 검증

- **Zod** — Notion API 응답 데이터 파싱 및 검증 스키마

### 배포 & 호스팅

- **Vercel** — Next.js 15 최적화 배포, 환경변수 관리 (NOTION_API_KEY, NOTION_DATABASE_ID)

### 환경변수

```
NOTION_API_KEY=secret_xxx          # Notion Integration 토큰
NOTION_DATABASE_ID=xxx             # 견적서 데이터베이스 ID (옵션)
ISSUER_NAME=홍길동                  # 발행자 이름 (환경변수로 고정)
ISSUER_CONTACT=010-0000-0000       # 발행자 연락처
ISSUER_EMAIL=me@example.com        # 발행자 이메일
ISSUER_ADDRESS=서울시 강남구        # 발행자 주소 (옵션)
```

---

## 주요 구현 파일 구조 (예상)

```
src/
├── app/
│   ├── q/
│   │   └── [pageId]/
│   │       ├── page.tsx           # 견적서 보기 페이지 (Server Component)
│   │       └── not-found.tsx      # 오류 안내 페이지
│   └── api/
│       └── pdf/
│           └── [pageId]/
│               └── route.ts       # PDF 생성 API Route Handler
├── components/
│   └── invoice/
│       ├── invoice-view.tsx       # 웹 렌더링용 견적서 컴포넌트
│       ├── invoice-pdf.tsx        # PDF 렌더링용 견적서 컴포넌트
│       └── invoice-items-table.tsx # 견적 항목 테이블
└── lib/
    ├── notion/
    │   ├── client.ts              # Notion SDK 초기화
    │   └── parse-invoice.ts       # Notion API 응답 → InvoiceData 파싱
    ├── types/
    │   └── invoice.ts             # InvoiceData, InvoiceItem 등 타입 정의
    └── schemas/
        └── invoice.ts             # Zod 검증 스키마
```
