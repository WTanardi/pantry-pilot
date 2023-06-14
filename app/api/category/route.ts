import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      img: true,
      ingredients: true,
    },
  });

  return NextResponse.json(categories);
}
