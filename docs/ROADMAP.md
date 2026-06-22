# invoice-web 개발 로드맵

Notion에 입력한 견적서를 고유 링크 하나로 웹에서 열람하고 PDF로 저장할 수 있는 MVP 서비스입니다.

## 개요

invoice-web은 Notion을 업무 도구로 사용하는 프리랜서/소규모 에이전시/1인 개발자를 위한 견적서 웹 공유 서비스로, 다음 기능을 제공합니다:

- **Notion 데이터 연동 (F001)**: Notion API로 지정 페이지 ID의 견적서 데이터를 서버 사이드에서 가져와 파싱
- **견적서 웹 렌더링 (F002)**: 발행자/클라이언트 정보, 견적 항목 테이블, 금액 합계, 유효기간/메모를 전문적인 레이아웃으로 표시
- **PDF 다운로드 (F003)**: `@react-pdf/renderer`로 PDF를 생성하고 `/api/pdf/[pageId]` Route Handler에서 스트림 반환
- **고유 링크 접근 (F004)**: URL의 Notion 페이지 ID 기반 접근, 로그인 불필요
- **오류 처리 (F005)**: 존재하지 않거나 접근 불가한 페이지 접속 시 유형별 안내 메시지 표시

## 개발 워크플로우

1. **작업 계획**

- 기존 코드베이스를 학습하고 현재 상태를 파악
- 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
- 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**

- 기존 코드베이스를 학습하고 현재 상태를 파악
- `/tasks` 디렉토리에 새 작업 파일 생성
- 명명 형식: `XXX-description.md` (예: `001-setup.md`)
- 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
- **Notion 연동/PDF 생성/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)**
- 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조. 예를 들어, 현재 작업이 `006`이라면 `005`와 `004`를 예시로 참조.
- 이러한 예시들은 완료된 작업이므로 내용이 완료된 작업의 최종 상태를 반영함 (체크된 박스와 변경 사항 요약). 새 작업의 경우, 문서에는 빈 박스와 변경 사항 요약이 없어야 함. 초기 상태의 샘플로 `000-sample.md` 참조.

3. **작업 구현**

- 작업 파일의 명세서를 따름
- 기능과 기능성 구현
- **Notion 연동 및 PDF 생성 구현 시 Playwright MCP로 테스트 수행 필수**
- 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
- 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
- 테스트 통과 확인 후 다음 단계로 진행
- 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**

- 로드맵에서 완료된 작업을 ✅로 표시

## 개발 단계

### Phase 1: 애플리케이션 골격 및 타입 구축

- **Task 001: 프로젝트 기반 설정 및 라우팅 골격 구성** - 우선순위
  - 관련 파일: `src/app/q/[pageId]/page.tsx`, `src/app/q/[pageId]/not-found.tsx`, `src/app/api/pdf/[pageId]/route.ts`, `.env.local.example`
  - 관련 기능: `F004`
  - [ ] Dynamic Route `/q/[pageId]` 빈 페이지 껍데기 생성 (Server Component)
  - [ ] 오류 안내 페이지 `not-found.tsx` 빈 껍데기 생성
  - [ ] PDF 생성 API Route Handler `/api/pdf/[pageId]/route.ts` 빈 핸들러 생성
  - [ ] 환경변수 스키마 정리 및 `.env.local.example` 작성 (NOTION_API_KEY, NOTION_DATABASE_ID, ISSUER_*)
  - [ ] 불필요한 스타터 코드(랜딩/로그인/회원가입 등) 정리 및 루트 레이아웃 최소화

- **Task 002: 타입 정의 및 Zod 스키마 설계**
  - 관련 파일: `src/lib/types/invoice.ts`, `src/lib/schemas/invoice.ts`
  - 관련 기능: `F001`, `F002`
  - [ ] `InvoiceData` 타입 정의 (id, quoteNumber, title, issueDate, validUntil, status, issuer, client, items, taxRate, note, subtotal, taxAmount, total)
  - [ ] `IssuerInfo` / `ClientInfo` / `InvoiceItem` 타입 정의
  - [ ] `status` 유니온 타입 정의 ('초안' | '발송' | '수락' | '거절')
  - [ ] Notion API 응답 검증용 Zod 스키마 작성 (raw 속성 → 내부 타입 매핑 검증)
  - [ ] 계산 필드(subtotal, taxAmount, total) 산출 로직의 입출력 타입 정의

### Phase 2: UI/UX 완성 (더미 데이터 활용)

- **Task 003: 견적서 UI 컴포넌트 구현 (더미 데이터)**
  - 관련 파일: `src/components/invoice/invoice-view.tsx`, `src/components/invoice/invoice-items-table.tsx`, `src/lib/mock/invoice.ts`
  - 관련 기능: `F002`
  - [ ] shadcn/ui 컴포넌트 추가 (Button, Card, Table, Badge, Separator)
  - [ ] 더미 `InvoiceData` 목업 데이터 작성
  - [ ] 발행자/클라이언트 정보 섹션 마크업 구현
  - [ ] 견적 항목 테이블 컴포넌트 구현 (품목, 설명, 수량, 단가, 소계)
  - [ ] 금액 합계 영역 구현 (소계 / 부가세 / 총액)
  - [ ] 유효기간·메모·상태 배지 표시 및 PDF 다운로드 버튼(비활성 자리표시) 배치
  - [ ] 반응형 디자인 및 인쇄 친화적 레이아웃 적용

- **Task 004: 오류 안내 페이지 UI 구현**
  - 관련 파일: `src/app/q/[pageId]/not-found.tsx`, `src/components/invoice/invoice-error.tsx`
  - 관련 기능: `F005`
  - [ ] 오류 유형별 메시지 UI 구현 (페이지 없음 / 접근 권한 없음 / 서버 오류)
  - [ ] 발행자 문의 안내 메시지 표시
  - [ ] 더미 상태로 각 오류 케이스 화면 검증
  - [ ] 반응형 레이아웃 및 아이콘(Lucide) 적용

### Phase 3: 핵심 기능 구현 (Notion 연동 → 렌더링 → PDF → 오류)

- **Task 005: Notion 데이터 연동 및 파싱 구현** - 우선순위
  - 관련 파일: `src/lib/notion/client.ts`, `src/lib/notion/parse-invoice.ts`, `src/lib/schemas/invoice.ts`
  - 관련 기능: `F001`
  - [ ] `@notionhq/client` 설치 및 Notion SDK 초기화 (`client.ts`)
  - [ ] `notion.pages.retrieve(pageId)`로 페이지 메타/Properties 조회
  - [ ] `notion.blocks.children.list(pageId)`로 견적 항목 블록 조회
  - [ ] 응답 파싱 → `InvoiceData` 변환 로직 구현 (Zod 검증 포함)
  - [ ] 발행자 정보를 환경변수(ISSUER_*)에서 주입
  - [ ] 견적 항목 합계 계산 (소계 / 세액 / 총액)
  - [ ] Playwright MCP로 실제 페이지 ID 기반 연동 및 파싱 결과 검증
  - ## 테스트 체크리스트
    - [ ] 정상 페이지 ID 호출 시 `InvoiceData` 전 필드가 올바르게 매핑되는지 검증
    - [ ] 견적 항목 합계(subtotal/taxAmount/total) 계산 정확성 검증
    - [ ] 세율 기본값(0.1) 적용 및 커스텀 세율 케이스 검증
    - [ ] 누락/빈 Properties에 대한 안전한 기본값 처리 검증

- **Task 006: 견적서 웹 렌더링 연결 (실데이터)**
  - 관련 파일: `src/app/q/[pageId]/page.tsx`, `src/components/invoice/invoice-view.tsx`
  - 관련 기능: `F001`, `F002`, `F004`
  - [ ] Dynamic Route에서 `pageId` 추출 및 Notion 파싱 결과 호출
  - [ ] 더미 데이터를 실제 `InvoiceData`로 교체하여 `invoice-view`에 전달
  - [ ] 서버 사이드 렌더링 흐름 완성 (page.tsx → parse-invoice → 컴포넌트)
  - [ ] 메타데이터(title 등) 동적 생성
  - [ ] Playwright MCP로 고유 링크 접속 → 견적서 전체 렌더링 E2E 검증
  - ## 테스트 체크리스트
    - [ ] `/q/[pageId]` 접속 시 발행자/클라이언트/항목/합계가 모두 표시되는지 검증
    - [ ] 다양한 항목 수(0건, 1건, 다수)에 대한 테이블 렌더링 검증
    - [ ] 상태 배지/유효기간/메모 표시 정확성 검증

- **Task 007: PDF 다운로드 기능 구현**
  - 관련 파일: `src/components/invoice/invoice-pdf.tsx`, `src/app/api/pdf/[pageId]/route.ts`, `src/components/invoice/download-pdf-button.tsx`
  - 관련 기능: `F003`
  - [ ] `@react-pdf/renderer` 설치 및 한글 폰트(Noto Sans KR) 등록
  - [ ] PDF 전용 레이아웃 컴포넌트 `invoice-pdf.tsx` 구현
  - [ ] `/api/pdf/[pageId]` Route Handler에서 PDF 스트림 반환
  - [ ] 클라이언트 다운로드 버튼: API 호출 → Blob → 브라우저 다운로드
  - [ ] Playwright MCP로 PDF 다운로드 플로우 및 응답 헤더 검증
  - ## 테스트 체크리스트
    - [ ] 다운로드 버튼 클릭 시 PDF 응답(Content-Type, Content-Disposition) 반환 검증
    - [ ] PDF 내 한글 텍스트 정상 표시(폰트 임베딩) 검증
    - [ ] 웹 렌더링과 PDF 항목/합계 일치 여부 검증
    - [ ] 잘못된 pageId에 대한 PDF API 오류 응답 검증

- **Task 008: 오류 처리 연결 및 엣지 케이스 핸들링**
  - 관련 파일: `src/app/q/[pageId]/page.tsx`, `src/app/q/[pageId]/not-found.tsx`, `src/app/api/pdf/[pageId]/route.ts`
  - 관련 기능: `F005`
  - [ ] Notion API 호출 실패/데이터 없음 시 `notFound()` 처리
  - [ ] 오류 유형 분기 (페이지 없음 / 접근 권한 없음 / 서버 오류)
  - [ ] PDF API의 오류 응답 처리 및 사용자 피드백
  - [ ] Playwright MCP로 오류 시나리오 E2E 검증
  - ## 테스트 체크리스트
    - [ ] 존재하지 않는 pageId 접속 시 오류 안내 페이지 노출 검증
    - [ ] 비공개/권한 없는 페이지 접속 시 적절한 메시지 노출 검증
    - [ ] Notion API 장애(서버 오류) 시 안내 메시지 노출 검증
    - [ ] 잘못된 형식의 pageId(UUID 아님) 입력 처리 검증

- **Task 008-1: 핵심 기능 통합 테스트**
  - 관련 파일: 전체 사용자 플로우
  - 관련 기능: `F001`, `F002`, `F003`, `F004`, `F005`
  - [ ] Playwright MCP로 전체 사용자 여정 E2E 테스트 (링크 접속 → 열람 → PDF 다운로드)
  - [ ] Notion 연동 + 합계 계산 + 렌더링 + PDF 일관성 검증
  - [ ] 정상/오류 플로우 분기 통합 검증
  - ## 테스트 체크리스트
    - [ ] 정상 견적서 전체 플로우 통과 검증
    - [ ] 각 오류 케이스 분기 통과 검증
    - [ ] 웹 화면 ↔ PDF 데이터 일치 통합 검증

### Phase 4: 최적화 및 배포

- **Task 009: 성능 최적화 및 캐싱**
  - 관련 파일: `src/app/q/[pageId]/page.tsx`, `src/lib/notion/client.ts`
  - 관련 기능: `F001`, `F002`
  - [ ] Notion 응답 캐싱 전략 적용 (Next.js revalidate / fetch cache)
  - [ ] 서버 컴포넌트 렌더링 최적화 및 불필요한 재호출 제거
  - [ ] PDF 생성 성능 점검 및 폰트 로딩 최적화
  - [ ] 로딩/에러 UI(loading.tsx, error.tsx) 보강

- **Task 010: 배포 및 운영 환경 구성**
  - 관련 파일: `vercel.json`(필요 시), `.env` 설정, `README.md`
  - 관련 기능: 전체
  - [ ] Vercel 프로젝트 연결 및 환경변수 설정 (NOTION_API_KEY, NOTION_DATABASE_ID, ISSUER_*)
  - [ ] `npm run check-all` 및 `npm run build` 통과 확인
  - [ ] 프로덕션 배포 및 실제 Notion 페이지로 동작 검증
  - [ ] 사용 가이드 문서화 (Notion 페이지 공개 설정 → 링크 생성 절차)
