// TODO: npm install @notionhq/client 설치 후 아래 import 활성화
// import { Client } from '@notionhq/client'
//
// export function getNotionClient() {
//   const apiKey = process.env.NOTION_API_KEY
//   if (!apiKey) {
//     throw new Error('NOTION_API_KEY environment variable is not set')
//   }
//   return new Client({ auth: apiKey })
// }

export function getNotionClient() {
  throw new Error(
    '@notionhq/client 패키지를 먼저 설치하세요: npm install @notionhq/client'
  )
}
