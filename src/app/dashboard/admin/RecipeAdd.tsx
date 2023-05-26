"use client";
import React, { useState, ChangeEvent } from "react";

interface Ingredient {
  name: string;
  amount: string;
  measurement: string;
}

interface Recipe {
  foodName: string;
  foodImage: File | null;
  description: string;
  ingredients: Ingredient[];
  steps: string;
}

const RecipeAdd: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe>({
    foodName: "",
    foodImage: null,
    description: "",
    ingredients: [{ name: "", amount: "", measurement: "" }],
    steps: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (name === "foodImage") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setRecipe({ ...recipe, [name]: file });
    } else if (index !== undefined) {
      const ingredients = [...recipe.ingredients];
      ingredients[index][name as keyof Ingredient] = value;
      setRecipe({ ...recipe, ingredients });
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
  };

  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [
        ...recipe.ingredients,
        { name: "", amount: "", measurement: "" },
      ],
    });
  };

  const handleRemoveIngredient = (index: number) => {
    const ingredients = [...recipe.ingredients];
    ingredients.splice(index, 1);
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert(JSON.stringify(recipe, null, 2));
  };

  return (
    <>
      <div className="py-6 px-8 w-full">
        <div className="flex gap-4 items-center">
          <h1 className="text-4xl font-semibold lead">Recipe | Add</h1>
        </div>
        <form
          action=""
          method="post"
          className="grid grid-cols-5 gap-x-4 gap-y-5 mt-8"
        >
          {/* <!-- Name --> */}
          <div className="flex flex-col gap-1.5 col-span-3">
            <label htmlFor="foodName" className="font-bold mb-2">
              Food Name:
            </label>
            <input
              type="text"
              id="foodName"
              name="foodName"
              value={recipe.foodName}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          {/* <!-- Food Image --> */}
          <div className="flex flex-col gap-1.5 col-span-2">
            <label htmlFor="foodImage" className="font-bold mb-2">
              Food Image:
            </label>
            <input
              type="file"
              id="foodImage"
              name="foodImage"
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          {/* <!-- Desc --> */}
          <div className="flex flex-col gap-1.5 col-span-5">
            <label htmlFor="description" className="font-bold mb-2">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={recipe.description}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            ></textarea>
          </div>
          {/* <!-- Ingredients Input --> */}
          <div className="grid col-span-full">
            <div className="gap-4">
              {/* <!-- Labels --> */}
              <label className="font-bold mb-2">Ingredients:</label>
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="grid grid-cols-5 my-2">
                  <input
                    type="text"
                    placeholder="Ingredient Name"
                    name="name"
                    value={ingredient.name}
                    onChange={(e) => handleChange(e, index)}
                    className="border gray-300 rounded px-3 py-2 mr-2 col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="Amount"
                    name="amount"
                    value={ingredient.amount}
                    onChange={(e) => handleChange(e, index)}
                    className="border border-gray-300 rounded px-3 py-2 mr-2"
                  />
                  <select
                    name="measurement"
                    value={ingredient.measurement}
                    onChange={(e) => handleChange(e, index)}
                    className="border border-gray-300 rounded px-3 py-2 "
                  >
                    <option value="">Measurement</option>
                    <option value="cup">Cup</option>
                    <option value="tbsp">Tablespoon</option>
                    <option value="tsp">Teaspoon</option>
                    <option value="g">Grams</option>
                    <option value="oz">Ounces</option>
                  </select>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(index)}
                      className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddIngredient}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
              >
                Add Ingredient
              </button>
            </div>
          </div>
          {/* <!-- Step --> */}
          <div className="flex flex-col gap-1.5 col-span-5">
            <label htmlFor="steps" className="font-bold mb-2">
              Steps:
            </label>
            <textarea
              id="steps"
              name="steps"
              value={recipe.steps}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default RecipeAdd;
