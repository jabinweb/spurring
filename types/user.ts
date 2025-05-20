export interface User {
  id: string
  name: string | null
  email: string
  isAdmin: boolean
  createdAt: string
}

export type UserFormData = Partial<Omit<User, 'createdAt'>> & {
  password?: string
}
