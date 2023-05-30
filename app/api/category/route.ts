import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      img: true,
      ingredients: true,
    },
  });

  return NextResponse.json(categories)
}
