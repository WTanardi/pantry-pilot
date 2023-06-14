import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user.email;

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
    select: {
      ingredients: {
        select: {
          id: true,
        },
      },
    },
  });
  return NextResponse.json(user?.ingredients);
}

export async function PATCH(req: Request) {
  const { userId, ingredientId } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      ingredients: true,
    },
  });

  const exists = user?.ingredients.some((ing) => ing.id === ingredientId);

  if (!exists) {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ingredients: {
          connect: { id: ingredientId },
        },
      },
      include: {
        ingredients: true,
      },
    });

    return NextResponse.json(user);
  } else {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ingredients: {
          disconnect: { id: ingredientId },
        },
      },
      include: {
        ingredients: true,
      },
    });

    return NextResponse.json(user);
  }
}
