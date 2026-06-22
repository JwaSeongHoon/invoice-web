import { NextRequest, NextResponse } from 'next/server'

// TODO: @react-pdf/renderer 설치 후 PDF 생성 구현
// npm install @react-pdf/renderer
// PRD 기술 명세 > PDF 생성 방식 참고

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ pageId: string }> }
) {
  const { pageId } = await params

  // TODO: Notion에서 데이터 가져오기 → PDF 생성 → 스트림 반환
  void pageId

  return NextResponse.json(
    { error: 'PDF 생성 기능 구현 필요 (PRD F003)' },
    { status: 501 }
  )
}
