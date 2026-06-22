import type { InvoiceItem } from '@/lib/types/invoice'

interface InvoiceItemsTableProps {
  items: InvoiceItem[]
}

// TODO: 견적 항목 테이블 컴포넌트 구현 (PRD F002)
export function InvoiceItemsTable({ items }: InvoiceItemsTableProps) {
  void items
  return (
    <div>
      <p className="text-muted-foreground text-sm">
        견적 항목 테이블 — 구현 필요 (PRD F002)
      </p>
    </div>
  )
}
