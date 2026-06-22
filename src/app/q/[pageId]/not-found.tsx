import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-2xl font-bold">견적서를 찾을 수 없습니다</h1>
        <p className="text-muted-foreground">
          링크가 올바르지 않거나, 견적서 페이지가 비공개 상태이거나, 삭제된
          경우일 수 있습니다.
        </p>
        <p className="text-muted-foreground text-sm">
          견적서 발행자에게 문의하여 올바른 링크를 받으세요.
        </p>
        <Button variant="outline" asChild>
          <Link href="/">홈으로</Link>
        </Button>
      </div>
    </main>
  )
}
