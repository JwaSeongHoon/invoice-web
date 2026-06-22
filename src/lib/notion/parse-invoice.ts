import type { InvoiceData } from '@/lib/types/invoice'

// TODO: @notionhq/client 설치 후 실제 Notion API 타입으로 교체
// PRD 기술 명세 > Notion 데이터 매핑 방식 참고
export function parseInvoiceFromNotion(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  page: Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blocks: Record<string, any>[]
): InvoiceData {
  void page
  void blocks
  throw new Error('parseInvoiceFromNotion: 구현 필요 — PRD 기술 명세 참고')
}
