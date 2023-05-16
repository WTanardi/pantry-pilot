import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Ingredient {
  name: string;
  category: string;
}

const IngredientsPage: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState<Ingredient>({
    name: '',
    category: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewIngredient({ ...newIngredient, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIngredients([...ingredients, newIngredient]);
    setNewIngredient({ name: '', category: '' });
  };

  const handleDelete = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  return (
    <div>
      <h2>Add Ingredient</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ingredientName">Ingredient Name:</label>
          <input
            type="text"
            id="ingredientName"
            name="name"
            value={newIngredient.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ingredientCategory">Category:</label>
          <select
            id="ingredientCategory"
            name="category"
            value={newIngredient.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Meat">Meat</option>
            <option value="Dairy">Dairy</option>
            <option value="Grains">Grains</option>
          </select>
        </div>
        <button type="submit">Add Ingredient</button>
      </form>

      <h2>Ingredients List</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name} - {ingredient.category}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsPage;
