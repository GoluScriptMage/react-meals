import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const { cartState, dispatchCart } = useContext(CartContext);

  return (
    <header className="w-full rounded-xl px-4 py-4 bg-white border-b-2 border-red-200 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
      <h2 className="text-2xl font-bold text-red-700 tracking-tight drop-shadow-md">
        React Meals
      </h2>
      <button
        onClick={() => {
          return dispatchCart({ type: "OPEN_CART" });
        }}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-colors duration-200 relative focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        <span className="text-xl">
          <FaShoppingCart />
        </span>
        <span className="hidden sm:inline">Cart</span>
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-lg border-2 border-red-200">
          {cartState.totalItemsNumber}
        </span>
      </button>
    </header>
  );
};

export default Header;
