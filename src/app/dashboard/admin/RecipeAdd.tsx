import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faSquareMinus,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";

interface RecipeAddProps {}

const RecipeAdd: FC<RecipeAddProps> = ({}) => {
  return (
    <>
      <div className="py-6 px-8 w-full">
        <div className="flex gap-4 items-center">
          <a href="./recipe.html" className="mt-1 w-5 hover:text-neutral-400">
            <FontAwesomeIcon icon={faAngleLeft} size="xl" />
          </a>
          <h1 className="text-4xl font-semibold lead">Recipe | Add</h1>
        </div>
        <form
          action=""
          method="post"
          className="grid grid-cols-5 gap-x-4 gap-y-5 mt-8"
        >
          {/* <!-- Name --> */}
          <div className="flex flex-col gap-1.5 col-span-2">
            <label htmlFor="fname">Food Name</label>
            <input
              type="text"
              name="fname"
              className="border border-black px-2 py-1"
              required
            />
          </div>
          {/* <!-- Category --> */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="fcategory">Category</label>
            <select
              id="fcategory"
              className="border border-black h-full"
              required
            >
              <option></option>
              <option value="appetizer">Appetizer</option>
              <option value="mainCourse">Main Course</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>
          {/* <!-- Food Image --> */}
          <div className="flex flex-col gap-1.5 col-span-2">
            <label htmlFor="fimg">Food Image</label>
            <input
              name="fimg"
              className="border border-black h-full cursor-pointer file:text-black file:bg-neutral-300 file:border-none file:h-full hover:file:bg-stone-600 hover:file:text-white file:cursor-pointer"
              type="file"
            ></input>
          </div>
          {/* <!-- Desc --> */}
          <div className="flex flex-col gap-1.5 col-span-5">
            <label htmlFor="fdesc">Description</label>
            <textarea
              name="fdesc"
              className="border border-black px-2 py-1"
            ></textarea>
          </div>
          {/* <!-- Ingridients Input --> */}
          <div className="grid col-span-full gap-y-4" id="ingredient-wrapper">
            <div className="grid grid-cols-6 gap-4">
              {/* <!-- Labels --> */}
              <label htmlFor="fingredient" className="col-span-3">
                Ingredient
              </label>
              <label htmlFor="famount">Amount</label>
              <label htmlFor="fcategory">Measurement</label>

              {/* <!-- Ingredient --> */}
              <div className="flex flex-col col-span-3">
                <select
                  id="fingredient"
                  className="border border-black h-full"
                  required
                >
                  <option></option>
                  <option value="beef">Beef</option>
                  <option value="chicken">Chicken</option>
                  <option value="flour">Flour</option>
                  <option value="galangal">Galangal</option>
                  <option value="lemon">Lemon</option>
                  <option value="lemongrass">Lemon Grass</option>
                </select>
              </div>
              {/* <!-- Amount --> */}
              <div className="flex flex-col">
                <input
                  type="number"
                  name="famount"
                  className="border border-black px-2 py-1"
                  required
                />
              </div>
              {/* <!-- Measurement --> */}
              <div className="flex flex-col">
                <select
                  id="fcategory"
                  className="border border-black h-full"
                  required
                >
                  <option></option>
                  <option value="tsp">tsp</option>
                  <option value="tbsp">tbsp</option>
                  <option value="cup">cup</option>
                  <option value="oz">Oz</option>
                  <option value="pound">Pound</option>
                  <option value="g">gram</option>
                  <option value="mg">miligram</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-5">
              {/* <!-- Ingridient --> */}
              <div className="flex flex-col col-span-3">
                <select
                  id="fingredient"
                  className="border border-black h-full"
                  required
                >
                  <option></option>
                  <option value="beef">Beef</option>
                  <option value="chicken">Chicken</option>
                  <option value="flour">Flour</option>
                  <option value="galangal">Galangal</option>
                  <option value="lemon">Lemon</option>
                  <option value="lemongrass">Lemon Grass</option>
                </select>
              </div>
              {/* <!-- Amount --> */}
              <div className="flex flex-col">
                <input
                  type="number"
                  name="famount"
                  className="border border-black px-2 py-1"
                  required
                />
              </div>
              {/* <!-- Measurement --> */}
              <div className="flex flex-col">
                <select
                  id="fcategory"
                  className="border border-black h-full"
                  required
                >
                  <option></option>
                  <option value="tsp">tsp</option>
                  <option value="tbsp">tbsp</option>
                  <option value="cup">cup</option>
                  <option value="oz">Oz</option>
                  <option value="pound">Pound</option>
                  <option value="g">gram</option>
                  <option value="mg">miligram</option>
                </select>
              </div>
              {/* <!-- Remove Ingredient --> */}
              <button
                type="button"
                className="justify-self-start text-red-700 hover:text-red-500 flex items-center gap-3"
              >
                <FontAwesomeIcon icon={faSquareMinus} size="2xl" />
                Remove
              </button>
            </div>
          </div>
          {/* <!-- Add Ingredient --> */}
          <button
            type="button"
            className="justify-self-start text-indigo-700 hover:text-indigo-500 flex items-center gap-3"
          >
            <FontAwesomeIcon icon={faSquarePlus} size="2xl" />
            Add Ingredient
          </button>

          {/* <!-- Step --> */}
          <div className="flex flex-col gap-1.5 col-span-5">
            <label htmlFor="fstep">Steps</label>
            <textarea
              name="fstep"
              className="border border-black px-2 py-1"
            ></textarea>
          </div>
          <button className="h-12 mt-4 w-full bg-sky-500 text-white hover:bg-sky-700 font-semibold">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default RecipeAdd;
