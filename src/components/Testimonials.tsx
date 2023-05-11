import React, { FC } from "react";
import TestimonialCard from "./TestimonialCard";

interface TestimonialsProps {}

const Testimonials: FC<TestimonialsProps> = ({}) => {
  const reviews = [
    {
      name: "Jane Doe",
      isWoman: true,
      location: "Los Angeles, CA",
      content:
        "I have tried many recipe websites but none of them are as easy to use and accurate as Pantry Pilot. I&apos;m always able to find a great recipe based on what I have in my fridge.",
    },
    {
      name: "Mike",
      isWoman: false,
      location: "Houston, TX",
      content:
        "As someone who's not the most confident cook, I love how easy these recipes are to follow. They've helped me step up my cooking game and impress my friends and family!",
    },
    {
      name: "Sofia",
      isWoman: true,
      location: "New York City, NY",
      content:
        "I've tried a ton of different recipe websites, but this one is by far the best. The recipes are delicious and unique, and the fact that I can order food directly from the site is great!",
    },
    {
      name: "Rachel",
      isWoman: true,
      location: "Chicago, IL",
      content:
        "This tool has saved me so much time and money on meal planning. I no longer have to guess what to make for dinner or run to the grocery store for a single ingredient.",
    },
    {
      name: "Jessica",
      isWoman: true,
      location: "Miami, FL",
      content:
        "This website is a lifesaver! I'm always looking for new recipes, and the fact that I can customize them based on what's in my pantry is amazing. Highly recommend!",
    },
  ];

  return (
    <>
      <section className="py-16">
        <p className="max-md:max-w-xs text-4xl min-[424px]:text-5xl md:text-6xl font-bold mb-8 md:mb-12 text-center mx-auto">
          What our customers say
        </p>
        <div className="flex flex-wrap mx-8 gap-6 lg:gap-12 justify-center">
          {reviews.map((review, index) => (
            <TestimonialCard
              key={index}
              id={index}
              isWoman={review.isWoman}
              name={review.name}
              location={review.location}
              content={review.content}
            ></TestimonialCard>
          ))}
        </div>
      </section>
    </>
  );
};

export default Testimonials;
