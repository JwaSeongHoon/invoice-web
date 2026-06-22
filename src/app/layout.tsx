import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '견적서 웹 공유 서비스',
  description:
    'Notion 기반 견적서를 고유 링크로 공유하고 PDF로 다운로드하는 서비스',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  )
}
