export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">견적서 웹 공유 서비스</h1>
        <p className="text-muted-foreground">
          견적서 링크로 직접 접근하세요:{' '}
          <code className="bg-muted rounded px-2 py-1 text-sm">/q/[pageId]</code>
        </p>
      </div>
    </main>
  )
}
