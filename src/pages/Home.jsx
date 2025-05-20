import React from "react";
import BannerCarousel from "../components/BannerCarousel";
import CategoryGrid from "../components/CategoryGrid";

const Home = () => {
  return (
    <div className="pt-10">
      <BannerCarousel />
      <h1 className="text-xl font-bold p-4">Shop by Category</h1>
      <CategoryGrid />
    </div>
  );
};

export default Home;
