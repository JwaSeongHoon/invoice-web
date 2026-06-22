import type { InvoiceData } from '@/lib/types/invoice'

interface InvoiceViewProps {
  invoice: InvoiceData
}

// TODO: 견적서 웹 렌더링 컴포넌트 구현 (PRD F002)
export function InvoiceView({ invoice }: InvoiceViewProps) {
  void invoice
  return (
    <div>
      <p className="text-muted-foreground text-sm">
        견적서 웹 렌더링 컴포넌트 — 구현 필요 (PRD F002)
      </p>
    </div>
  )
}
