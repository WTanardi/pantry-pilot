import React, { FC } from "react";
import Image from "next/image";

interface ProductsServicesProps {}

const ProductsServices: FC<ProductsServicesProps> = ({}) => {
  const products = [
    {
      path: "/img/productImg/rendang.png",
      title: "Local Recipes",
      content:
        "Experience the unique and delicious flavors of your with our collection of local recipes! Discover easy-to-follow recipes that will make mealtime a memorable experience for you and your loved ones.",
    },
    {
      path: "/img/productImg/spaghetti.png",
      title: "International Recipes",
      content:
        "Explore the world through your taste buds with our collection of international recipes! From classNameic French cuisine to spicy Indian curries, discover new and exciting flavors that will take your taste buds on a culinary journey.",
    },
    {
      path: "/img/productImg/foodbox.png",
      title: "Food Order",
      content:
        "Try out new flavors from your favorite restaurants before cooking! Order from nearby restaurants and get delicious meals delivered straight to your door. Explore new cuisines with ease.",
    },
  ];

  return (
    <>
      <div className="flex flex-col pt-16">
        <div className="text-center text-4xl min-[424px]:text-5xl md:text-6xl font-bold md:pb-8">
          <p>What we offer</p>
        </div>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-wrap -mx-4">
            {products.map((product, index) => (
              <div className="w-full md:w-1/2 lg:w-1/3 px-4" key={index}>
                <div className="flex justify-center">
                  <Image
                    src={product.path}
                    alt={`Image ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-64"
                    loading="lazy"
                  ></Image>
                </div>
                <div className="text-center px-4 py-4">
                  <p className="text-gray-900 font-bold text-3xl mb-4">
                    {product.title}
                  </p>
                  <p className="text-gray-700 text-sm mb-4">
                    {product.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsServices;
