import React from "react";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

const CartItem = () => {
  const { cartState, dispatchCart } = useContext(CartContext);
  const { items, totalAmount } = cartState;

  return (
    <>
      <div className="max-h-[220px] overflow-y-auto scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-red-50 rounded-lg">
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between bg-red-50 rounded-lg p-3 shadow-sm"
            >
              <div>
                <div className="font-semibold text-gray-900">{item.name}</div>
                <div className="text-sm text-gray-600">
                  ${item.amount.toFixed(2)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-white border border-red-200 px-2 py-1 rounded text-gray-900 font-semibold">
                  x{item.quantity}
                </span>
                <button
                  onClick={() => {
                    return dispatchCart({
                      type: "REMOVE_ITEM",
                      payload: { id: item.id },
                    });
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-2 rounded"
                >
                  -
                </button>
                <button
                  onClick={() => {
                    return dispatchCart({
                      type: "ADD_ITEM",
                      payload: {
                        id: item.id,
                        name: item.name,
                        amount: item.amount,
                        quantity: 1,
                        isIncrement: true,
                      },
                    });
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-2 rounded"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <hr className="my-4 border-red-200" />
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-gray-900">Total Amount</span>
        <span className="font-bold text-lg text-red-700">
          ${totalAmount.toFixed(2)}
        </span>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => dispatchCart({ type: "CLOSE_CART" })}
          className="flex-1 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold"
        >
          Close
        </button>
        <button
          onClick={() => {
            return dispatchCart({ type: "ORDER_PLACED" });
          }}
          className="flex-1 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
        >
          Order
        </button>
      </div>
    </>
  );
};

export default CartItem;
