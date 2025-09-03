import { NextResponse } from 'next/server'

// Explicitly set to use Node.js runtime, not Edge
export const runtime = 'nodejs'

export async function GET() {
  return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() })
}
