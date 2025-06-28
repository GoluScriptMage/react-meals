import React from "react";
import CartItem from "../elements/CartItem";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

const Cart = () => {
  const { cartState, dispatchCart } = useContext(CartContext);
  const { items, isCartOpen, isOrderPlaced } = cartState;

  if (!isCartOpen) return null;
  const cartMsg = isOrderPlaced ? 'Order placed successfully!' : 'Your cart is empty';

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
          Cart
        </h2>
        {items.length === 0 ? (
          <div className="text-gray-500 text-center">{cartMsg}</div>
        ) : (
          <CartItem />
        )}
      </div>
    </div>
  );
};

export default Cart;
