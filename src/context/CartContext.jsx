import { createContext, useReducer, useEffect } from "react";
import { cartReducer, initialCartState } from "./cartReducer";
import { setLocalStorage } from "../utils/localStorage";

// Creating a CartContext to manage the cart state globally
export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  // Using useReducer to manage the cart state
  const [cartState, dispatchCart] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    setLocalStorage("cartState", cartState);
  }, [cartState]);

  // Providing the cart state and dispatch function to the context
  return (
    <CartContext.Provider value={{ cartState, dispatchCart }}>
      {children}
    </CartContext.Provider>
  );
};
