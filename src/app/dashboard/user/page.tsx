import Image from "next/image";
import home from "../../../../public/img/navIcon/home.svg";
import pantry from "../../../../public/img/navIcon/cupboard.svg";
import recipe from "../../../../public/img/navIcon/recipe.svg";
import profile from "../../../../public/img/navIcon/profile.svg";
import IngredientCard from "@/components/IngredientCard";
import RecipeCard from "@/components/RecipeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../../../../fontawesome";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { LogoutButton } from "@/components/Buttons";
const prisma = new PrismaClient();

const getIngredients = async () => {
  const res = await prisma.ingredient.findMany({
    select: {
      id: true,
      name: true,
      category: true,
    },
  });
  return res;
};

const getCategories = async () => {
  const res = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      img: true,
      ingredients: true,
    },
  });
  return res;
};

const getRecipes = async () => {
  const res = await prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
      img: true,
      ingredients: true,
    },
  });
  return res;
};

const UserDashboard = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const [ingredients, categories, recipes] = await Promise.all([
    getIngredients(),
    getCategories(),
    getRecipes(),
  ]);
  return (
    <div className="text-slate-800 scroll-smooth bg-[#fffdfa]">
      <main className="flex mx-auto">
        {/* <!-- Pantry --> */}
        <div
          id="pantry"
          className="w-full lg:w-1/4 flex flex-col h-screen bg-rose-600 text-white items-center max-lg:pb-16"
        >
          {/* <!-- Pantry title --> */}
          <div className="text-center w-full flex flex-col p-8 justify-between">
            <div className="h-16">
              <div className="text-3xl font-bold">PantryPilot</div>
              <div className="font-light">You have 0 ingredients</div>
            </div>
            <div className="relative mt-4">
              <input
                className="block w-full py-2 px-3 leading-5 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                type="text"
                placeholder="Search..."
              />
              <button className="absolute inset-y-0 right-0 px-4 py-1 text-gray-300 font-medium rounded-md focus:outline-none">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="pointer-events-none"
                />
              </button>
            </div>
          </div>
          {/* <!-- Pantry Content --> */}
          <div className="flex flex-col md:flex-row md:flex-wrap md:gap-8 md:justify-center overflow-y-scroll items-center scrollbar-hide max-lg:pb-8">
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
                imgPath={e.img ?? ""}
              ></IngredientCard>
            ))}
          </div>
        </div>
        {/* <!-- Recipe --> */}
        <div
          id="recipe"
          className="w-full lg:w-3/4 lg:flex flex-col h-screen max-lg:hidden"
        >
          {/* <!-- Recipe Header --> */}
          <div className="w-full p-8 text-white flex flex-col bg-emerald-500 justify-between">
            <div className="flex justify-between text-center max-lg:justify-center items-center h-16">
              <div className="text-3xl font-semibold">
                You can make 420 Recipes
              </div>
              <div className="flex items-center gap-4 max-lg:hidden">
                <LogoutButton></LogoutButton>
                <FontAwesomeIcon icon={faRightFromBracket} size="2xl" />
              </div>
            </div>
            <div className="relative mt-4">
              <input
                className="block w-full py-2 px-3 leading-5 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                type="text"
                placeholder="Search..."
              />
              <button className="absolute inset-y-0 right-0 px-4 py-1 text-gray-300 font-medium rounded-md focus:outline-none">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="pointer-events-none"
                />
              </button>
            </div>
          </div>
          {/* <!-- Recipes --> */}
          <div className="p-4 flex flex-wrap gap-y-4 justify-evenly overflow-y-scroll scrollbar-hide">
            {/* Recipe Card */}
            {recipes.map((e, i) => (
              <RecipeCard
                key={e.id}
                name={e.name}
                ingCount={e.ingredients.length}
                imgPath={e?.img ?? ""}
              ></RecipeCard>
            ))}
          </div>
        </div>
        {/* <!-- Mobile navigation --> */}
        <nav className="h-16 fixed bottom-0 left-0 z-10 flex justify-around w-full p-4 bg-white shadow lg:hidden">
          <a
            href="/"
            className="flex flex-col items-center justify-center text-gray-500 hover:text-gray-700"
          >
            <span className="text-xs mt-1">Home</span>
          </a>
          <Image
            src={home}
            className="w-7"
            alt="home button"
            width={500}
            height={500}
          ></Image>
          <button
            id="pantryBtn"
            className="flex flex-col items-center justify-center text-gray-500 hover:text-gray-700"
          >
            <Image
              src={pantry}
              className="w-7"
              alt="pantry button"
              width={500}
              height={500}
            ></Image>
            <span className="text-xs mt-1">Pantry</span>
          </button>
          <button
            id="recipeBtn"
            className="flex flex-col items-center justify-center text-gray-500 hover:text-gray-700"
          >
            <Image
              src={recipe}
              className="w-7"
              alt="recipe button"
              width={500}
              height={500}
            ></Image>
            <span className="text-xs mt-1">Recipe</span>
          </button>
          <a className="flex flex-col items-center justify-center text-gray-500 hover:text-gray-700">
            <Image
              src={profile}
              className="w-7"
              alt="profile button"
              width={500}
              height={500}
            ></Image>
            <span className="text-xs mt-1">Profile</span>
          </a>
        </nav>
      </main>
    </div>
  );
};

export default UserDashboard;
