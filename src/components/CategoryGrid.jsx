import React from "react";

const categories = [
  { name: "Mobiles", image: "/categories/mobile.webp" },
  { name: "Electronics", image: "/categories/electronic.jpeg" },
  { name: "Home Appliances", image: "/categories/washing.jpg" },
  { name: "Fashion", image: "/categories/fashion.webp" },
  { name: "Home Appliances", image: "/categories/washing.jpg" },
  { name: "Fashion", image: "/categories/fashion.webp" },
];

const CategoryGrid = () => {
  return (
    <div className="p-2 grid grid-cols-3 md:grid-cols-10 gap-4">
      {categories.map((cat, idx) => (
        <div className="bg-white  shadow rounded p-2 " key={idx}>
          <img src={cat.image} className="h-10 w-10 object-cover rounded" />
          <h2 className="mt-2 text-md truncate md:text-[15px] font-semibold">
            {cat.name}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
