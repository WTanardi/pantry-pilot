import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const recipes = await prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
      img: true,
      ingredients: true,
    },
  });

  return NextResponse.json(recipes)
}
