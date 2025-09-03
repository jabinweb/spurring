import { handlers } from "@/auth"

export const { GET, POST } = handlers

// Force Node.js runtime for auth API routes
export const runtime = 'nodejs'
