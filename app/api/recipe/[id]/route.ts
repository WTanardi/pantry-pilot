import { NextResponse } from "next/server";
import { Recipe, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const body: Recipe = await req.json();
  const recipe = await prisma.recipe.update({
    where: {
      id: Number(params.id),
    },
    data: {
      name: body.name,
      desc: body.desc,
      price: body.price,
      step: body.step,
    },
  });
  return NextResponse.json(recipe, { status: 200 });
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const recipe = await prisma.recipe.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(recipe, { status: 200 });
};
