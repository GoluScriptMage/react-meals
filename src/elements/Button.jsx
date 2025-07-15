import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

//   <Button btnFor="Close" type="CLOSE_CART" />
//   <Button btnFor="Checkout" type="TOGGLE_CHECKOUT" />

const Button = ({ dispatchType, type, btnFor }) => {
  const { dispatchCart } = useContext(CartContext);

  const customClass =
    btnFor === "Close"
      ? "flex-1 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold"
      : "flex-1 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold";

  return (
    <button
      type={type || "button"}
      onClick={() => dispatchCart({ type: dispatchType })}
      className={customClass}
    >
      {btnFor}
    </button>
  );
};

export default Button;
