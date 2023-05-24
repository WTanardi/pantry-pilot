/*
  Warnings:

  - You are about to drop the column `description` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `restaurantId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `steps` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `Restaurant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `img` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_restaurantId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "description",
DROP COLUMN "image",
DROP COLUMN "restaurantId",
DROP COLUMN "steps",
ADD COLUMN     "desc" TEXT,
ADD COLUMN     "img" TEXT NOT NULL,
ADD COLUMN     "step" TEXT;

-- DropTable
DROP TABLE "Restaurant";

-- CreateTable
CREATE TABLE "IngredientsOnRecipes" (
    "ingredientId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "measurement" TEXT NOT NULL,

    CONSTRAINT "IngredientsOnRecipes_pkey" PRIMARY KEY ("ingredientId","recipeId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "IngredientsOnRecipes" ADD CONSTRAINT "IngredientsOnRecipes_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsOnRecipes" ADD CONSTRAINT "IngredientsOnRecipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
