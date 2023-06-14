"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Prisma } from "@prisma/client";

type Ingredient = Prisma.IngredientGetPayload<{
  select: {
    id: true;
    name: true;
  };
}>;

interface IngredientProps {
  name: string;
  id: number;
  userHas: boolean;
}

const Ingredient: FC<IngredientProps> = ({ name, id, userHas }) => {
  const { data: session } = useSession();

  const originalState = userHas;

  const [selected, setSelected] = useState(false);

  const handleClick = async () => {
    await axios.patch("/api/userIngredient", {
      userId: session?.user.id,
      ingredientId: id,
    });
    setSelected(!selected);
  };
  return (
    <>
      <div
        className={`text-white text-sm rounded-md border-x-8 border-y-4 select-none ${
          selected || originalState
            ? "bg-emerald-500 border-emerald-500"
            : "bg-gray-400 border-gray-400"
        }`}
        onClick={handleClick}
      >
        {name}
      </div>
    </>
  );
};

interface IngredientCardProps {
  title: string;
  ingredients: Ingredient[];
  imgPath: string;
  userIngArr: Array<number>;
}

const IngredientCard: FC<IngredientCardProps> = ({
  title,
  ingredients,
  imgPath,
  userIngArr,
}) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      {/* Card */}
      <div className="p-4 shadow-md bg-white flex-col border-2 border-rose-600 flex text-black rounded-2xl w-full">
        {/* Card Top */}
        <div className="flex items-center space-x-4 pb-3 mb-3 border-b-2">
          {/* Card logo */}
          <Image
            src={imgPath}
            alt={`${title} icon`}
            width={50}
            height={50}
            className="w-12 h-12"
          />
          {/* Card title and ingredient */}
          <div className="xl:text-lg">{title}</div>
        </div>
        {/* Card bottom */}
        <div className="flex flex-wrap gap-2 overflow-hidden items-start">
          {/* Ingredients */}
          {!showMore &&
            ingredients
              .slice(0, 10)
              .map((e, i) => (
                <Ingredient
                  name={e.name}
                  key={i}
                  id={e.id}
                  userHas={userIngArr.includes(e.id) ? true : false}
                />
              ))}
          {showMore &&
            ingredients.map((e, i) => (
              <Ingredient
                name={e.name}
                key={i}
                id={e.id}
                userHas={userIngArr.includes(e.id) ? true : false}
              />
            ))}
          {/* Show More button */}
          {ingredients.length > 10 && (
            <div className="text-white text-sm rounded-md border-x-8 border-y-4 bg-emerald-500 border-emerald-500">
              <button className="" onClick={toggleShowMore}>
                {showMore ? "- Less" : "+ More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default IngredientCard;
