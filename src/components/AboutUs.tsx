import Image from "next/image";
import team from "../../public/img/team.png";
import React, { FC } from "react";

interface AboutUsProps {}

const AboutUs: FC<AboutUsProps> = ({}) => {
  return (
    <>
      <section id="about" className="pt-16">
        <div className="container mx-auto flex flex-col lg:grid lg:grid-rows-4 lg:grid-cols-2 items-center px-6">
          <div className="text-4xl min-[424px]:text-5xl md:text-6xl font-bold text-gray-800 lg:row-start-1 lg:col-start-2 lg:row-span-1 lg:col-span-3 lg:bottom-0 lg:left-0 lg:flex lg:self-end">
            <p>Who are we?</p>
          </div>
          <div className="w-full lg:w-1/2 flex lg\:grid justify-center lg:row-start-1 lg:col-start-1 lg:row-span-4 lg:col-span-2">
            <Image
              src={team}
              alt="team picture"
              height={500}
              width={500}
            ></Image>
          </div>
          <div className="max-lg:max-w-xl text-center lg:text-left items-center lg:row-start-2 lg:col-start-2 lg:row-span-3 lg:col-span-3">
            <p className="text-gray-700 mb-4">
              Here at Pantry Pilot, we believe that cooking delicious, healthy
              meals at home should be easy and stress-free.
            </p>
            <p className="text-gray-700 mb-4">
              That&apos;s why we&apos;ve created a platform that helps you make
              the most of the ingredients you have in your pantry, fridge, and
              freezer. With our innovative recipe generator, you can quickly and
              easily find recipes that match your dietary preferences and
              available ingredients.
            </p>
            <p className="text-gray-700 mb-8">
              Our mission is to make home cooking more accessible and enjoyable
              for everyone, regardless of their cooking skills or experience.
            </p>
            <a href="./login.html">
              <button className="px-4 py-2 font-semibold text-white border-2 rounded-lg border-rose-600 bg-rose-600">
                Join Us Now
              </button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
