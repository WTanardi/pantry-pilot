import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const recipes = await prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
      img: true,
      ingredients: {
        select: {
          amount: true,
          measurement: true,
          ingredient: true,
        },
      },
      desc: true,
      price: true,
      step: true,
    },
  });

  return NextResponse.json(recipes);
}

export async function POST(req: Request) {
  const { id, name, desc, price, step } = await req.json();
  const exists = await prisma.recipe.findUnique({
    where: {
      id,
    },
  });
  if (exists) {
    return NextResponse.json(
      { error: "Recipe already exists" },
      { status: 400 }
    );
  } else {
    const recipe = await prisma.recipe.create({
      data: {
        name,
        desc,
        price,
        step,
      },
    });
    return NextResponse.json(recipe);
  }
}
