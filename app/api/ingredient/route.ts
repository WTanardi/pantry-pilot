import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const ingredients = await prisma.ingredient.findMany({
    select: {
      id: true,
      name: true,
      category: true,
    },
  });

  return NextResponse.json(ingredients);
}

export async function POST(req: Request) {
  const { id, name, categoryId } = await req.json();
  console.log("categoryId: ", categoryId);
  const exists = await prisma.ingredient.findUnique({
    where: {
      id,
    },
  });
  if (exists) {
    return NextResponse.json(
      { error: "Ingredient already exists" },
      { status: 400 }
    );
  } else {
    const ingredient = await prisma.ingredient.create({
      data: {
        name,
        categoryId,
      },
    });
    return NextResponse.json(ingredient);
  }
}
