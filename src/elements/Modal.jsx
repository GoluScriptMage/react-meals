import React from "react";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

const Modal = ({ cartMsg, modalFor, component }) => {
  const { cartState, dispatchCart } = useContext(CartContext);
  const { items, isCartOpen, isOrderPlaced } = cartState;

  if (!isCartOpen) return null;
  const cartMessage =
    cartMsg ||
    (isOrderPlaced ? "Order placed successfully!" : "Your cart is empty");


  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 min-w-[320px] max-w-md w-full relative border border-red-200">
        <button
          className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-2xl font-bold focus:outline-none"
          onClick={() => {
            return dispatchCart({ type: "CLOSE_CART" });
          }}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-red-700 mb-4 text-center">
          {modalFor}
        </h2>
        {isOrderPlaced ? (
          <div className="text-gray-500 text-center">{cartMessage}</div>
        ) : !items || items.length === 0 ? (
          <div className="text-gray-500 text-center">{cartMessage}</div>
        ) : (
          component
        )}
      </div>
    </div>
  );
};

export default Modal;
