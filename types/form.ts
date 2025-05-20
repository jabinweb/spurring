export interface FormData {
  email: string
  firstName?: string
  name?: string
  message?: string
  [key: string]: any
}

export interface FormResponse {
  id: string
  formType: 'contact' | 'getStarted'
  data: FormData
  createdAt: Date
}

export interface DashboardStats {
  totalUsers: number
  totalResponses: number
  contactResponses: number
  getStartedResponses: number
  recentResponses: FormResponse[]
}

export type InputJsonValue =
  | string
  | number
  | boolean
  | { [key: string]: InputJsonValue }
  | InputJsonValue[]
  | null;

export interface SmtpSettings {
  host: string
  port: number
  user: string
  password: string
  from: string
  fromName: string
  [key: string]: InputJsonValue
}

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }
