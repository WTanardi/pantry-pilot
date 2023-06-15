import { NextResponse } from 'next/server'
import { PrismaClient, Order } from '@prisma/client'
const prisma = new PrismaClient()

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  const body: Order = await req.json()
  const order = await prisma.order.update({
    where: {
      id: Number(params.id),
    },
    data: {
      isPaid: body.isPaid,
    },
  })
  return NextResponse.json(order, { status: 200 })
}

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  const recipe = await prisma.order.delete({
    where: {
      id: Number(params.id),
    },
  })
  return NextResponse.json(recipe, { status: 200 })
}
