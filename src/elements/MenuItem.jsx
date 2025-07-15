import React, { useState, useContext, useEffect, useRef } from "react";
import MenuData from "../Data/menuData.json";
import { CartContext } from "../context/CartContext";

import { useGetFetch } from "../hooks/useGetFetch";
// import { usePostFetch } from "../hooks/usePostFetch";
import Spinner from "../ui/Spinner";

const MenuItem = () => {
  const [inputQuantity, setInputQuantity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatchCart } = useContext(CartContext);

  // Run only to update the menu data
  // const { postMultipleData } = usePostFetch();
  // useEffect(() => {
  //   postMultipleData(MenuData, "/menu");
  // }, [postMultipleData]); // Added empty dependency array to ensure it runs only once on mount

  const { getMultipleData } = useGetFetch();
  const [menuItems, setMenuItems] = useState([]);

  let isExecuted = useRef(false);

  useEffect(() => {
    if (isExecuted.current) return;
    isExecuted.current = true;
    setIsLoading(true);

    const fetchMenuItems = async () => {
      const data = await getMultipleData("/menu");
      setMenuItems(data || []);
      setIsLoading(false);
    };
    fetchMenuItems();
  }, [getMultipleData]); // Added getMultipleData to the dependency array

  return (
    <>
      {isLoading && (<Spinner />)}
      {!isLoading && menuItems.map((item) => (
        <li
          key={item.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between bg-red-50 rounded-lg p-3 sm:p-4 shadow-sm border border-red-100"
        >
          <div className="flex-1 min-w-0 pr-0 lg:pr-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-1 truncate">
              {item.name}
            </h4>
            <p className="text-gray-600 mb-1 text-sm sm:text-base break-words">
              {item.description}
            </p>
            <p className="text-red-700 font-bold text-base sm:text-lg">
              ${item.price ? item.price.toFixed(2) : "0.00"}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 min-w-[160px] lg:min-w-[200px] bg-white rounded-lg p-4 border border-red-100 shadow-sm">
            <div className="flex items-center gap-2 w-full">
              <label
                className="text-sm font-medium text-gray-700 mr-2"
                htmlFor={`amount-${item.id}`}
              >
                Quantity
              </label>
              <input
                id={`amount-${item.id}`}
                min="1"
                max="10"
                type="number"
                className="w-16 px-2 text-black py-1 border rounded focus:outline-none focus:ring-2 focus:ring-red-300 text-center"
                onChange={(e) => {
                  if (e.target.value < 1) {
                    setInputQuantity(1);
                  }
                  if (e.target.value > 10) {
                    setInputQuantity(10);
                  }
                }}
              />
            </div>
            <button
              onClick={() => {
                const quantity = inputQuantity || 1; // Default to 1 if no input
                dispatchCart({
                  type: "ADD_ITEM",
                  payload: {
                    id: item.id,
                    name: item.name,
                    amount: item.price,
                    quantity: quantity,
                  },
                });
                setInputQuantity(null); // Reset input after adding
              }}
              className="w-full mt-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition shadow"
            >
              + Add
            </button>
          </div>
        </li>
      ))}
    </>
  );
};

export default MenuItem;
