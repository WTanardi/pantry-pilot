import { NextResponse } from "next/server";
import { Ingredient, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (req: Request, {params}: {params: {id: string}}) =>{
    const body: Ingredient= await req.json();
    const ingredient= await prisma.ingredient.update({
        where:{
            id: Number(params.id)
        },
        data:{
            name: body.name,
            categoryId: body.categoryId
        }
    });
    return NextResponse.json(ingredient, {status: 200});
}

export const DELETE = async (req: Request, {params}: {params: {id: string}}) =>{
    const ingredient = await prisma.ingredient.delete({
        where:{
            id: Number(params.id)
        }
    });
    return NextResponse.json(ingredient, {status: 200});
}