import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const ingredients = await prisma.ingredient.findMany({
    select: {
      id: true,
      name: true,
      category: true,
    },
  });

  return NextResponse.json(ingredients)
}
