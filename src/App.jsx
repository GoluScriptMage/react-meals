import React from "react";
import Header from "./components/Header";
import HeroContent from "./components/HeroContent";
import Cart from "./components/Cart";
import Menu from "./components/Menu";
import { CartContext } from "./context/CartContext";
import { useContext } from "react";

const App = () => {
  const { cartState } = useContext(CartContext);
  const { isCartOpen } = cartState;

  return (
    <div className="flex flex-col gap-5 w-full min-h-screen p-8 bg-gradient-to-br from-red-300 via-pink-400 to-yellow-200 border border-red-400  shadow-2xl  text-white">
      <Header />
      <HeroContent />
      <Menu />
      {isCartOpen ? <Cart /> : null}
    </div>
  );
};

export default App;
