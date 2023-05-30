"use client";
import IngredientCard from "@/components/IngredientCard";
import RecipeCard from "@/components/RecipeCard";
import { Book, LogOut, Refrigerator, Search } from "lucide-react";
import SignOut from "@/components/sign-out";
import { Prisma } from "@prisma/client";
import { useState, useEffect } from "react";
import axios from "axios";
import { signOut } from "next-auth/react";

type Ingredient = Prisma.IngredientGetPayload<{
  select: {
    id: true;
    name: true;
    category: true;
  };
}>;
type Category = Prisma.CategoryGetPayload<{
  select: {
    id: true;
    name: true;
    img?: true;
    ingredients: true;
  };
}>;
type Recipe = Prisma.RecipeGetPayload<{
  select: {
    id: true;
    name: true;
    img: true;
    ingredients: true;
  };
}>;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function UserDashboard() {
  const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [showPantry, setShowPantry] = useState(true);

  const handlePantryClick = () => {
    setShowPantry(true);
  };

  const handleRecipeClick = () => {
    setShowPantry(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ingredientResponse, categoryResponse, recipeResponse] =
          await Promise.all([
            fetcher("/api/ingredient"),
            fetcher("/api/category"),
            fetcher("/api/recipe"),
          ]);
        setIngredients(ingredientResponse);
        setCategories(categoryResponse);
        setRecipes(recipeResponse);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  // Check if data is fetched
  // console.log("Ingredients: ", ingredients);
  // console.log("Categories: ", categories);
  // console.log("Recipes: ", recipes);

  if (!ingredients || !categories || !recipes) {
    // Handle loading state
    return <div>Loading...</div>;
  }

  return (
    <div className="text-slate-800 scroll-smooth bg-[#fffdfa]">
      <main className="flex mx-auto">
        {/* <!-- Pantry --> */}
        <div
          className={`w-full lg:w-1/4 flex flex-col h-screen bg-rose-600 text-white items-center max-lg:pb-16 ${
            showPantry ? "" : "hidden"
          }`}
        >
          {/* <!-- Pantry title --> */}
          <div className="text-center w-full flex flex-col p-8 justify-between">
            <div className="h-16">
              <div className="text-3xl font-bold">PantryPilot</div>
              <div className="font-light">
                You have {ingredients.length} ingredients
              </div>
            </div>
            <div className="relative mt-4">
              <input
                className="block w-full py-2 px-3 leading-5 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                type="text"
                placeholder="Search..."
              />
              <button className="absolute inset-y-0 right-0 px-4 py-1 text-gray-300 font-medium rounded-md focus:outline-none">
                <Search />
              </button>
            </div>
          </div>
          {/* <!-- Pantry Content --> */}
          <div className="flex flex-col md:flex-row md:flex-wrap md:gap-8 md:justify-center items-center max-lg:pb-8">
            {/* IngredientCard */}
            {categories.map((e, i) => (
              <IngredientCard
                key={i}
                title={e.name}
                ingCount={e.ingredients.length}
                ingredients={e.ingredients.map((ingredient) =>
                  ingredient.name.toString()
                )}
                maxIngCount={e.ingredients.length}
                imgPath={e.img ?? "/category/fish.webp"}
              ></IngredientCard>
            ))}
          </div>
        </div>
        {/* <!-- Recipe --> */}
        <div
          className={`w-full lg:w-3/4 lg:flex flex-col h-screen ${
            showPantry ? "hidden" : "flex"
          }`}
        >
          {/* <!-- Recipe Header --> */}
          <div className="w-full p-8 text-white flex flex-col bg-emerald-500 justify-between">
            <div className="flex justify-between text-center max-lg:justify-center items-center h-16">
              <div className="text-3xl font-semibold">
                You can make {recipes?.length} Recipes
              </div>
              <div className="flex items-center gap-4 max-lg:hidden">
                <SignOut />
              </div>
            </div>
            <div className="relative mt-4">
              <input
                className="block w-full py-2 px-3 leading-5 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                type="text"
                placeholder="Search..."
              />
              <button className="absolute inset-y-0 right-0 px-4 py-1 text-gray-300 font-medium rounded-md focus:outline-none">
                <Search />
              </button>
            </div>
          </div>
          {/* <!-- Recipes --> */}
          <div className="p-4 flex flex-wrap gap-y-4 justify-evenly overflow-y-scroll scrollbar-hide">
            {/* Recipe Card */}
            {recipes?.map((e, i) => (
              <RecipeCard
                key={e.id}
                name={e.name}
                ingCount={e.ingredients.length}
                imgPath={e?.img || "/category/fish.webp"}
              ></RecipeCard>
            ))}
          </div>
        </div>
        {/* <!-- Mobile navigation --> */}
        <nav className="h-20 fixed bottom-0 left-0 z-10 flex justify-around w-full p-4 bg-white shadow lg:hidden">
          <button
            className="flex flex-col items-center justify-center text-gray-500 hover:text-gray-700"
            onClick={handlePantryClick}
          >
            <Refrigerator />
            <span className="text-xs mt-1">Pantry</span>
          </button>
          <button
            className="flex flex-col items-center justify-center text-gray-500 hover:text-gray-700"
            onClick={handleRecipeClick}
          >
            <Book />
            <span className="text-xs mt-1">Recipe</span>
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex flex-col items-center justify-center text-gray-500 hover:text-gray-700"
          >
            <LogOut />
            <span className="text-xs mt-1">Sign out</span>
          </button>
        </nav>
      </main>
    </div>
  );
}
