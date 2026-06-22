import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  // Notion API
  NOTION_API_KEY: z.string().optional(),
  NOTION_DATABASE_ID: z.string().optional(),

  // 발행자 정보 (환경변수로 고정)
  ISSUER_NAME: z.string().optional(),
  ISSUER_CONTACT: z.string().optional(),
  ISSUER_EMAIL: z.string().optional(),
  ISSUER_ADDRESS: z.string().optional(),
})

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NOTION_API_KEY: process.env.NOTION_API_KEY,
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  ISSUER_NAME: process.env.ISSUER_NAME,
  ISSUER_CONTACT: process.env.ISSUER_CONTACT,
  ISSUER_EMAIL: process.env.ISSUER_EMAIL,
  ISSUER_ADDRESS: process.env.ISSUER_ADDRESS,
})

export type Env = z.infer<typeof envSchema>
