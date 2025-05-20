export interface FormData {
  email: string
  [key: string]: any
}

export interface FormResponse {
  id: string
  formType: 'contact' | 'getStarted'
  data: FormData
  createdAt: string
}

export interface DashboardStats {
  totalUsers: number
  totalResponses: number
  contactResponses: number
  getStartedResponses: number
  recentResponses: FormResponse[]
}
