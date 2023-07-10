"use client";
import Link from "next/link";
import React, { useState, FC } from "react";
import burger from "../../public/img/heroImg/burger.jpg";
import Image from "next/image";
import IngredientBox from "./IngredientBox";
import HeroButton from "./HeroButton";
import IngredientCard from "./IngredientCard";
import ingData from "../data/IngredientData.json";

const Hero: React.FC = ({}) => {
  const ingredientImgPath = [
    "/img/heroImg/bun.png",
    "/img/heroImg/beef.png",
    "/img/heroImg/lettuce.png",
    "/img/heroImg/tomato.png",
    "/img/heroImg/onion.png",
    "/img/heroImg/cheese.png",
    "/img/heroImg/egg.png",
    "/img/heroImg/olive_oil.png",
    "/img/heroImg/ketchup.png",
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
          Input any ingredients you have in your kitchen and we&apos;ll show you
          recipes you can make!
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
                ingCount={e.ingCount}
                maxIngCount={e.maxIngCount}
                ingredients={e.ingredients}
                imgPath={e.imgPath}
              ></IngredientCard>
            ))}
          </div>
        )}
        {/* Hero style 3 */}
        {activeStyle === "recipe" && (
          <div className="h-full bg-[#fafcff] shadow-md rounded-lg max-xl:mx-12 xl:mr-32 border-2 border-rose-600">
            <div className="p-6 text-sm">
              <Image
                src={burger}
                alt="classic burger"
                width={350}
                height={350}
                className="w-full h-28 object-cover"
              />
              <h2 className="text-2xl font-bold mb-4">Classic Burger</h2>

              <h3 className="font-semibold mb-2">Ingredients:</h3>
              <ul className="mb-4">
                <li>1 lb ground beef</li>
                <li>1 tsp salt</li>
                <li>1/2 tsp black pepper</li>
                <li>4 slices cheese</li>
                <li>4 hamburger buns</li>
                <li>
                  Lettuce, tomato, onion, ketchup, mustard, and mayo for serving
                </li>
              </ul>

              <h3 className="font-semibold mb-2">Instructions:</h3>
              <ol>
                <li>Preheat grill to high.</li>
                <li>
                  In a large bowl, combine ground beef, salt, and black pepper.
                  Mix well and form into four patties.
                </li>
                <li>
                  Grill patties for 3-4 minutes per side, or until fully cooked.
                  During the last minute of cooking, add a slice of cheese to
                  each patty.
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
  );
};

export default Hero;
