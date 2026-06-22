import { z } from 'zod'

export const issuerInfoSchema = z.object({
  name: z.string().min(1),
  contact: z.string().min(1),
  email: z.string().email(),
  address: z.string().nullable(),
})

export const clientInfoSchema = z.object({
  name: z.string().min(1),
  contact: z.string().nullable(),
  email: z.string().email().nullable(),
})

export const invoiceItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().nullable(),
  quantity: z.number().positive(),
  unitPrice: z.number().nonnegative(),
  subtotal: z.number().nonnegative(),
})

export const invoiceDataSchema = z.object({
  id: z.string(),
  quoteNumber: z.string(),
  title: z.string(),
  issueDate: z.string(),
  validUntil: z.string(),
  status: z.enum(['초안', '발송', '수락', '거절']),
  issuer: issuerInfoSchema,
  client: clientInfoSchema,
  items: z.array(invoiceItemSchema),
  taxRate: z.number().min(0).max(1).default(0.1),
  note: z.string().nullable(),
  subtotal: z.number().nonnegative(),
  taxAmount: z.number().nonnegative(),
  total: z.number().nonnegative(),
})

export type InvoiceDataInput = z.input<typeof invoiceDataSchema>
