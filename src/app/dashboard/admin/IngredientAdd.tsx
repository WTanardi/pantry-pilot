"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface Ingredient {
  id: number;
  name: string;
  category: string;
}

const IngredientsPage: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState<Ingredient>({
    id: 0,
    name: "",
    category: "",
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editIngredientId, setEditIngredientId] = useState<number | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewIngredient((prevIngredient) => ({
      ...prevIngredient,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      newIngredient.name.trim() === "" ||
      newIngredient.category.trim() === ""
    ) {
      return;
    }

    if (editMode && editIngredientId !== null) {
      // Editing existing ingredient
      const updatedIngredients = ingredients.map((ingredient) =>
        ingredient.id === editIngredientId
          ? { ...newIngredient, id: ingredient.id }
          : ingredient
      );
      setIngredients(updatedIngredients);
      setEditMode(false);
      setEditIngredientId(null);
    } else {
      // Adding new ingredient
      const newId =
        ingredients.length > 0 ? ingredients[ingredients.length - 1].id + 1 : 1;
      const updatedIngredients = [
        ...ingredients,
        { ...newIngredient, id: newId },
      ];
      setIngredients(updatedIngredients);
    }

    setNewIngredient({ id: 0, name: "", category: "" });
  };

  const handleDelete = (id: number) => {
    const updatedIngredients = ingredients.filter(
      (ingredient) => ingredient.id !== id
    );
    setIngredients(updatedIngredients);
    if (editMode && editIngredientId === id) {
      setEditMode(false);
      setEditIngredientId(null);
    }
  };

  const handleEdit = (id: number) => {
    const ingredientToEdit = ingredients.find(
      (ingredient) => ingredient.id === id
    );
    if (ingredientToEdit) {
      setNewIngredient(ingredientToEdit);
      setEditMode(true);
      setEditIngredientId(id);
    }
  };

  const handleCancelEdit = () => {
    setNewIngredient({ id: 0, name: "", category: "" });
    setEditMode(false);
    setEditIngredientId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-4 items-center">
        <h1 className="text-4xl font-semibold lead">Ingredient | Add</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-3 gap-4 mt-8"
      >
        <div className="flex flex-col mb-4 col-span-2">
          <label htmlFor="ingredientName" className="font-bold mb-2">
            Ingredient Name:
          </label>
          <input
            type="text"
            id="ingredientName"
            name="name"
            value={newIngredient.name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="flex flex-col mb-4 col-span-1">
          <label htmlFor="ingredientCategory" className="font-bold mb-2">
            Category:
          </label>
          <select
            id="ingredientCategory"
            name="category"
            value={newIngredient.category}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select Category</option>
            <option value="Vegetables"> Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Meat">Meat</option>
            <option value="Dairy">Dairy</option>
            <option value="Grains">Grains</option>
          </select>
        </div>
        {editMode ? (
          <div className="flex">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Update Ingredient
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Ingredient
          </button>
        )}
      </form>

      <h2 className="text-2xl font-bold mb-4 mt-8">Ingredients List</h2>
      {ingredients.length === 0 ? (
        <p>No ingredients added yet.</p>
      ) : (
        <ul className="grid grid-cols-3 gap-4">
          {ingredients.map((ingredient) => (
            <li
              key={ingredient.id}
              className="mb-2 p-4 bg-white rounded shadow"
            >
              <span>
                {ingredient.name} - {ingredient.category}
              </span>
              <div className="flex mt-2 gap-2">
                <button
                  onClick={() => handleEdit(ingredient.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ingredient.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IngredientsPage;
