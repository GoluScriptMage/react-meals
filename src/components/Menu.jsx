import React from "react";
import MenuItem from "../elements/MenuItem";
// import Input from "../ui/Input";
// import Button from "../ui/Button";

const Menu = () => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-red-200 mt-6 sm:mt-8">
      <h3 className="text-2xl font-bold text-red-700 mb-4 sm:mb-6 text-center">
        Menu
      </h3>
      <div className="max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-red-50 rounded-lg">
        <ul className="space-y-4 sm:space-y-6">
          <MenuItem />
        </ul>
      </div>
    </div>
  );
};

export default Menu;
