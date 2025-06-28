import React from "react";

const HeroContent = () => {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center gap-4 py-8 px-4 bg-white rounded-lg shadow-xl border border-red-200">
      <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-red-100 rounded-full shadow-md border-2 border-red-300">
        {/* Decorative circle, no image */}
        <img
        className="w-full h-full object-cover rounded-full"
          src="https://www.foodiesfeed.com/wp-content/uploads/2023/04/strawberry-milk-splash-683x1024.jpg"
          alt="Foof image"
        />
      </div>
      <div className="max-w-md text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold text-red-700 mb-2 drop-shadow-lg">
          Delicious Food
        </h2>
        <p className="text-gray-700 text-base md:text-lg font-medium">
          Savor mouth-watering meals made with fresh ingredients, delivered fast
          to your door. Enjoy a variety of flavors and dishes every day!
        </p>
      </div>
    </section>
  );
};

export default HeroContent;
