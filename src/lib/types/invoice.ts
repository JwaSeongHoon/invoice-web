export interface IssuerInfo {
  name: string
  contact: string
  email: string
  address: string | null
}

export interface ClientInfo {
  name: string
  contact: string | null
  email: string | null
}

export interface InvoiceItem {
  id: string
  name: string
  description: string | null
  quantity: number
  unitPrice: number
  subtotal: number
}

export interface InvoiceData {
  id: string
  quoteNumber: string
  title: string
  issueDate: string
  validUntil: string
  status: '초안' | '발송' | '수락' | '거절'
  issuer: IssuerInfo
  client: ClientInfo
  items: InvoiceItem[]
  taxRate: number
  note: string | null
  subtotal: number
  taxAmount: number
  total: number
}
