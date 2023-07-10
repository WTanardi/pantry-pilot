import React, { FC } from "react";

interface IngredientProps {
  name: string;
}

const Ingredient: FC<IngredientProps> = ({ name }) => {
  return (
    <>
      <div className="text-white text-sm rounded-md border-x-8 border-y-4 bg-emerald-500 border-emerald-500">
        {name}
      </div>
    </>
  );
};

export default Ingredient;
