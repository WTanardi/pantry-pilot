import Image from "next/image";
import { FC } from "react";

interface RecipeCardProps {
  name: string;
  ingCount: number;
  imgPath: string;
}

const RecipeCard: FC<RecipeCardProps> = ({ name, ingCount, imgPath }) => {
  return (
    <>
      {/* Recipe Card */}
      <div className="flex rounded-lg drop-shadow-xl w-80 gap-4 bg-[#fafcff] items-center">
        {/* Card Image */}
        <div>
          <Image
            src={imgPath}
            alt={`${name} recipe`}
            width={150}
            height={150}
            className="rounded-lg w-32 h-24 bg-red-300"
          ></Image>
        </div>
        {/* Recipe Details */}
        <div>
          <div className="text-lg">{name}</div>
          <div className="font-light text-sm">
            You have all {ingCount} Ingredients
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
