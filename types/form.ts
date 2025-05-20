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
