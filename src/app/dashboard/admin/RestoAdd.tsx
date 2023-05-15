import React, { useState, ChangeEvent, FormEvent, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faSquareMinus,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";

interface RestoAddProps {}

interface MenuItem {
  foodName: string;
  recipe: string;
  price: number | string;
  image: File | null;
  description: string;
}

interface Restaurant {
  name: string;
  image: File | null;
  description: string;
  location: string;
  menu: MenuItem[];
}

const RestoAdd: FC<RestoAddProps> = () => {
  const [restaurant, setRestaurant] = useState<Restaurant>({
    name: "",
    image: null,
    description: "",
    location: "",
    menu: [
      { foodName: "", recipe: "", price: "", image: null, description: "" },
    ],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (name === "image" || name === "menuImage") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setRestaurant({ ...restaurant, [name]: file });
    } else if (index !== undefined) {
      const menu = [...restaurant.menu];
      menu[index] = {
        ...menu[index],
        [name as keyof MenuItem]: value,
      };
      setRestaurant({ ...restaurant, menu });
    } else {
      setRestaurant({ ...restaurant, [name]: value });
    }
  };

  const handleAddMenuItem = () => {
    setRestaurant({
      ...restaurant,
      menu: [
        ...restaurant.menu,
        { foodName: "", recipe: "", price: 0, image: null, description: "" },
      ],
    });
  };

  const handleRemoveMenuItem = (index: number) => {
    const menu = [...restaurant.menu];
    menu.splice(index, 1);
    setRestaurant({ ...restaurant, menu });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert(JSON.stringify(restaurant, null, 2));
  };

  const recipes = ["Recipe 1", "Recipe 2", "Recipe 3"];

  return (
    <div className="py-6 px-8 w-full">
      <div className="flex gap-4 items-center">
        <h1 className="text-4xl font-semibold lead">Restaurant | Add</h1>
      </div>
      <form
        action=""
        method="post"
        className="grid grid-cols-5 gap-x-4 gap-y-5 mt-8"
      >
        <div className="col-span-3 flex flex-col gap-1.5">
          <label htmlFor="name" className="font-bold mb-2">
            Restaurant Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={restaurant.name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="col-span-2 flex flex-col gap-1.5">
          <label htmlFor="image" className="font-bold mb-2">
            Restaurant Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="col-span-3 flex flex-col gap-1.5">
          <label htmlFor="description" className="font-bold mb-2">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={restaurant.description}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          ></textarea>
        </div>
        <div className="col-span-2 flex flex-col gap-1.5">
          <label htmlFor="location" className="font-bold mb-2">
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={restaurant.location}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <label className="font-bold">Menu:</label>
        <div className="flex flex-col col-span-full gap-4 w-full">
          {restaurant.menu.map((menuItem, index) => (
            <div key={index} className="grid col-span-full mb-4">
              <div className="grid grid-cols-5 mb-2 gap-2">
                <input
                  type="text"
                  placeholder="Food Name"
                  name="foodName"
                  value={menuItem.foodName}
                  onChange={(e) => handleChange(e, index)}
                  className="border border-gray-300 rounded px-3 py-2 col-span-2"
                />
                <select
                  name="recipe"
                  value={menuItem.recipe}
                  onChange={(e) => handleChange(e, index)}
                  className="border border-gray-300 rounded px-3 py-2 col-span-1"
                >
                  <option value="">Recipe</option>
                  {recipes.map((recipe, index) => (
                    <option key={index} value={recipe}>
                      {recipe}
                    </option>
                  ))}
                </select>
                <input
                  type="file"
                  placeholder="Menu Image"
                  name="menuImage"
                  onChange={(e) => handleChange(e, index)}
                  className="border border-gray-300 rounded px-3 py-2 col-span-1"
                />
                <input
                  type="text"
                  placeholder="Price"
                  name="price"
                  value={menuItem.price}
                  onChange={(e) => handleChange(e, index)}
                  className="border border-gray-300 rounded px-3 py-2 col-span-1"
                />
              </div>
              <div className="grid grid-cols-5 mb-2">
                <textarea
                  placeholder="Description"
                  name="description"
                  value={menuItem.description}
                  onChange={(e) => handleChange(e, index)}
                  className="border border-gray-300 rounded px-3 py-2 col-span-4"
                ></textarea>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMenuItem(index)}
                    className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded col-span-1"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddMenuItem}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
          >
            Add Menu Item
          </button>
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
  );
};

export default RestoAdd;
