import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { formType, data } = body

    const response = await prisma.formResponse.create({
      data: {
        formType,
        data
      }
    })

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ error: "Error submitting form" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const responses = await prisma.formResponse.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(responses)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching responses" }, { status: 500 })
  }
}
