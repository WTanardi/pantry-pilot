import Image from "next/image";
import React, { FC } from "react";

interface TestimonialCardProps {
  content: string;
  name: string;
  location: string;
  isWoman: boolean;
  id: number;
}

const TestimonialCard: FC<TestimonialCardProps> = ({
  content,
  name,
  location,
  isWoman,
  id,
}) => {
  return (
    <>
      <div className="md:w-1/4">
        <div className="bg-[#fafcff] shadow-2xl rounded-3xl overflow-hidden">
          <div className="px-4 py-4">
            <p className="text-gray-800 mb-4">&quot;{content}&quot;</p>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-emerald-500">
                <Image
                  src={`https://source.unsplash.com/featured/400x400/?${
                    isWoman === true ? "woman" : "man"
                  },face&${id + 1}`}
                  alt="testimonial author"
                  height={30}
                  width={30}
                  className="h-full w-full object-cover"
                ></Image>
              </div>
              <div className="ml-4">
                <p className="text-gray-800 text-sm font-semibold">{name}</p>
                <p className="text-gray-600 text-sm">{location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialCard;

// &quot;I have tried many recipe websites but none of them are as
//               easy to use and accurate as Pantry Pilot. I&apos;m always able to
//               find a great recipe based on what I have in my fridge.&quot;
