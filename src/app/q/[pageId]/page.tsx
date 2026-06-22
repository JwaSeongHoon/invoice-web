import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ pageId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pageId } = await params
  return {
    title: `견적서 — ${pageId.slice(0, 8)}`,
  }
}

export default async function QuotePage({ params }: Props) {
  const { pageId } = await params

  // TODO: Notion API 연동 구현 (@/lib/notion/client, @/lib/notion/parse-invoice)
  // const notion = getNotionClient()
  // const invoice = await parseInvoiceFromNotion(...)
  // if (!invoice) notFound()

  void pageId
  void notFound

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-4xl px-4">
        <p className="text-muted-foreground text-center text-sm">
          견적서 보기 페이지 — pageId: <code>{pageId}</code>
        </p>
        <p className="text-muted-foreground mt-2 text-center text-xs">
          Notion API 연동 구현 필요 (PRD F001 ~ F004)
        </p>
      </div>
    </main>
  )
}
