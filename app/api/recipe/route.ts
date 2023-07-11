import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
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
          ingredientId: true,
        },
      },
      desc: true,
      price: true,
      step: true,
    },
  })

  return NextResponse.json(recipes)
}

export async function POST(req: Request) {
  const { id, name, desc, price, step, ingredients } = await req.json()
  const exists = await prisma.recipe.findUnique({
    where: {
      id,
    },
  })

  if (exists) {
    return NextResponse.json(
      { error: 'Recipe already exists' },
      { status: 400 },
    )
  } else {
    // Check if all ingredients exist before creating the recipe
    const ingredientIds = ingredients.map(
      (ingredient: any) => ingredient.ingredientId,
    )
    const existingIngredients = await prisma.ingredient.findMany({
      where: {
        id: {
          in: ingredientIds,
        },
      },
    })

    // If any of the required ingredients are missing, return an error
    if (existingIngredients.length !== ingredientIds.length) {
      return NextResponse.json(
        { error: 'One or more ingredients not found' },
        { status: 400 },
      )
    }

    // Create the recipe and connect it to the existing ingredients
    const recipe = await prisma.recipe.create({
      data: {
        name,
        desc,
        price,
        step,
        ingredients: {
          create: ingredients.map((ingredient: any) => ({
            ingredient: {
              connect: {
                id: ingredient.ingredientId,
              },
            },
            amount: ingredient.amount,
            measurement: ingredient.measurement,
          })),
        },
      },
    })

    return NextResponse.json(recipe)
  }
}
