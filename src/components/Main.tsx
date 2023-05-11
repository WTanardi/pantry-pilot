import React, { useState } from "react";
import Hero from "./Hero";
import Products from "./ProductsServices";
import AboutUs from "./AboutUs";
import Testimonials from "./Testimonials";

interface Props {}

const Main: React.FC<Props> = ({}) => {
  return (
    <>
      <main className="container 2xl:max-w-7xl mx-auto">
        {/* Hero */}
        <Hero></Hero>
        {/* Products & Services */}
        <Products></Products>
        {/* Who are we? */}
        <AboutUs></AboutUs>
        {/* What our customers say */}
        <Testimonials></Testimonials>
      </main>
    </>
  );
};

export default Main;
