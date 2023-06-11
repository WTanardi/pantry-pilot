import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const recipes = await prisma.order.findMany({
    select: {
      id: true,
      totalPrice: true,
      food: {
        select: {
          name: true,
        },
      },
      foodId: true,
      user: {
        select: {
          name: true,
        },
      },
      userId: true,
      isPaid: true,
    },
  });

  return NextResponse.json(recipes);
}
