import React, { FC } from "react";
import Image from "next/image";

interface IngredientBoxProps {
  src: string;
  alt: string;
}

const IngredientBox: FC<IngredientBoxProps> = ({ src, alt }) => {
  return (
    <>
      <div className="flex items-center w-36 h-36 border-4 border-rose-600 rounded-3xl select-none">
        <Image
          src={src}
          alt={alt}
          width={150}
          height={150}
          loading="lazy"
        ></Image>
      </div>
    </>
  );
};

export default IngredientBox;
