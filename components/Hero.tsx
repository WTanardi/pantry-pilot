"use client";
import Link from "next/link";
import { useState, FC } from "react";
import Image, { StaticImageData } from "next/image";
import IngredientCard from "./IngredientCard";
import burger from "@/public/hero/burger.webp";
import bun from "@/public/hero/bun.webp";
import beef from "@/public/hero/beef.webp";
import lettuce from "@/public/hero/lettuce.webp";
import tomato from "@/public/hero/tomato.webp";
import onion from "@/public/hero/onion.webp";
import cheese from "@/public/hero/cheese.webp";
import egg from "@/public/hero/egg.webp";
import oliveOil from "@/public/hero/olive_oil.webp";
import ketchup from "@/public/hero/ketchup.webp";

declare namespace HeroTypes {
  interface IngredientBoxProps {
    src: StaticImageData;
    alt: string;
  }

  interface HeroButtonProps {
    active: boolean;
    onClick: () => void;
    title: string;
    subtitle: string;
  }
}

const IngredientBox: FC<HeroTypes.IngredientBoxProps> = ({ src, alt }) => {
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

const HeroButton: React.FC<HeroTypes.HeroButtonProps> = ({
  active,
  onClick,
  title,
  subtitle,
}) => {
  return (
    <button
      className={`appearance-none w-40 px-3 pb-2 pt-1 border-4 border-transparent text-left ${
        active ? "border-rose-600 bg-rose-600 rounded-2xl text-white" : ""
      }`}
      onClick={onClick}
    >
      <p className="font-bold text-2xl">{title}</p>
      <p>{subtitle}</p>
    </button>
  );
};

const ingData = {
  ingredients: [
    {
      title: "Pantry Essentials",
      ingredients: [
        "butter",
        "egg",
        "garlic",
        "milk",
        "onion",
        "sugar",
        "flour",
        "olive oil",
      ],
      imgPath: "/public/category/pantryEssentials.webp",
    },
    {
      title: "Vegetables & Greens",
      ingredients: [
        "garlic",
        "onion",
        "bell pepper",
        "carrot",
        "scallion",
        "tomato",
      ],
      imgPath: "/public/category/vegetablesGreens.webp",
    },
    {
      title: "Meats",
      ingredients: [
        "bacon",
        "ground beef",
        "beef steak",
        "ham",
        "pork loin",
        "sausage",
      ],
      imgPath: "/public/category/meats.webp",
    },
    {
      title: "Fruits",
      ingredients: [
        "lemon",
        "lime",
        "apple",
        "orange",
        "banana",
        "raisins",
        "pineapple",
      ],
      imgPath: "/public/category/fruits.webp",
    },
  ],
};

const Hero = () => {
  const ingredientImgPath = [
    bun,
    beef,
    lettuce,
    tomato,
    onion,
    cheese,
    egg,
    oliveOil,
    ketchup,
  ];

  const buttons = [
    {
      id: "kitchen",
      title: "Kitchen",
      subtitle: "Any ingredients you have in your kitchen",
    },
    {
      id: "pantry",
      title: "Pantry",
      subtitle: "Input them into our pantry",
    },
    {
      id: "recipe",
      title: "Recipe",
      subtitle: "And we'll show you the recipes you can make!",
    },
  ];

  const [activeStyle, setActiveStyle] = useState("kitchen");

  const handleToggleActive = (style: string) => {
    setActiveStyle(style);
  };

  const fewIngData = ingData.ingredients.slice(0, 4);

  return (
    <>
      <section className="flex pt-12">
        {/* Hero Left */}
        <div className="w-full text-center lg:text-left lg:pl-8">
          {/* Heading */}
          <p className="font-semibold text-6xl min-[424px]:text-7xl md:text-8xl">
            Navigate your <br />
            <span className="font-bold text-rose-600"> Pantry</span>
            <br />
            like a <br className="max-lg:hidden" />
            pro.
          </p>
          {/* Subheading */}
          <p className="py-8 text-lg max-lg:mx-auto text-stone-500 max-w-xs">
            Input any ingredients you have in your kitchen and we&apos;ll show
            you recipes you can make!
          </p>
          {/* Call to Action */}
          <div>
            <Link href="/login">
              <button className="px-4 py-2 font-semibold text-white border-2 rounded-lg border-rose-600 bg-rose-600">
                Start Cooking
              </button>
            </Link>
          </div>
        </div>

        {/* Hero Middle */}
        <div className="flex max-lg:hidden">
          {/* Hero style 1 */}
          {activeStyle === "kitchen" && (
            <div className="flex-row flex flex-wrap items-center max-xl:justify-center gap-4">
              {ingredientImgPath.map((path, index) => (
                <IngredientBox
                  key={index}
                  src={path}
                  alt={`Image ${index + 1}`}
                ></IngredientBox>
              ))}
            </div>
          )}
          {/* Hero style 2 */}
          {activeStyle === "pantry" && (
            <div className="flex-row flex flex-wrap items-center justify-center">
              {/* Ingredient card */}
              {fewIngData.map((e, i) => (
                <IngredientCard
                  key={i}
                  title={e.title}
                  ingCount={e.ingredients.length}
                  maxIngCount={e.ingredients.length + 5}
                  ingredients={e.ingredients}
                  imgPath={e.imgPath}
                ></IngredientCard>
              ))}
            </div>
          )}
          {/* Hero style 3 */}
          {activeStyle === "recipe" && (
            <div className="h-full shadow-md rounded-lg max-xl:mx-12 xl:mr-32 border-2 border-rose-600">
              <Image
                src={burger}
                alt="classic burger"
                width={350}
                height={350}
                className="w-full h-36 object-cover"
              />
              <div className="p-6 pb-0 text-sm">
                <h2 className="text-2xl font-bold mb-4">Classic Burger</h2>
                <h3 className="font-semibold mb-2">Ingredients:</h3>
                <ul className="mb-4">
                  <li>1 lb ground beef</li>
                  <li>1 tsp salt</li>
                  <li>1/2 tsp black pepper</li>
                  <li>4 slices cheese</li>
                  <li>4 hamburger buns</li>
                  <li>
                    Lettuce, tomato, onion, ketchup, mustard, and mayo for
                    serving
                  </li>
                </ul>

                <h3 className="font-semibold mb-2">Instructions:</h3>
                <ol>
                  <li>Preheat grill to high.</li>
                  <li>
                    In a large bowl, combine ground beef, salt, and black
                    pepper. Mix well and form into four patties.
                  </li>
                  <li>
                    Grill patties for 3-4 minutes per side, or until fully
                    cooked. During the last minute of cooking, add a slice of
                    cheese to each patty.
                  </li>
                  <li>
                    To assemble, place lettuce, tomato, and onion on the bottom
                    half of each bun. Top with a cooked patty and your desired
                    condiments. Serve immediately.
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Hero Right */}
        <div className="max-lg:hidden flex flex-col pr-8 justify-center items-center gap-12">
          {buttons.map((button, index) => (
            <HeroButton
              key={index}
              active={activeStyle === `${button.id}`}
              title={button.title}
              subtitle={button.subtitle}
              onClick={() => handleToggleActive(`${button.id}`)}
            ></HeroButton>
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;
