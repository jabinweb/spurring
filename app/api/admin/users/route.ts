import { NextResponse } from "next/server"
import { getUsers, createUser, updateUser, deleteUser } from "@/lib/db"
import { auth } from "@/auth"

export async function GET() {
  const session = await auth()
  if (!session?.user?.isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const users = await getUsers()
  return NextResponse.json(users)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const data = await req.json()
  const user = await createUser(data)
  return NextResponse.json(user)
}

export async function PUT(req: Request) {
  const session = await auth()
  if (!session?.user?.isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const data = await req.json()
  const { id, ...updateData } = data
  const user = await updateUser(id, updateData)
  return NextResponse.json(user)
}

export async function DELETE(req: Request) {
  const session = await auth()
  if (!session?.user?.isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return new NextResponse("Missing id", { status: 400 })

  await deleteUser(id)
  return new NextResponse(null, { status: 204 })
}
