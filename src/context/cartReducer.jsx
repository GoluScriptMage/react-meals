import { getLocalStorage } from "../utils/localStorage";

// Initial state for the cart
export let initialCartState = {
  items: [],
  totalAmount: 0,
  totalItemsNumber: 0,
  isCartOpen: false,
  isCheckoutOpen: false,
  isOrderPlaced: false,
};

// Getting the cartState is true update the initialCartState with the data
if (getLocalStorage("cartState")) {
  initialCartState = getLocalStorage("cartState");
}

// Reducer function to handle cart actions
export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const updatedItems = [...state.items];
      const existingItemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.id
      );

      // Determine how much quantity to add
      const quantityToAdd = action.isIncrement
        ? 1 // If it's an increment operation, always add 1
        : action.payload.quantity || 1; // Otherwise use the passed quantity

      if (existingItemIndex >= 0) {
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantityToAdd,
        };
      } else {
        updatedItems.push({
          ...action.payload,
          quantity: quantityToAdd,
        });
      }

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount + action.payload.amount * quantityToAdd,
        totalItemsNumber: state.totalItemsNumber + quantityToAdd,
      };
    }
    case "REMOVE_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex === -1) {
        console.warn("Item not found in cart to remove");
        return state;
      }

      const itemToRemove = state.items[existingItemIndex];
      let updatedItems;

      if (itemToRemove.quantity > 1) {
        updatedItems = state.items.map((item, idx) =>
          idx === existingItemIndex
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        updatedItems = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemToRemove.amount,
        totalItemsNumber: state.totalItemsNumber - 1,
      };
    }
    case "OPEN_CART": {
      return {
        ...state,
        isCartOpen: true,
      };
    }
    case "CLOSE_CART": {
      return {
        ...state,
        isCartOpen: false,
        isOrderPlaced: false,
      };
    }
    case "ORDER_PLACED": {
      return {
        ...initialCartState, // Use all initial state properties
        items: [],
        totalAmount: 0,
        totalItemsNumber: 0,
        isCartOpen: true, // Keep modal open to show success message
        isCheckoutOpen: false, // Close checkout form
        isOrderPlaced: true, // Set order placed flag
      };
    }
    case "TOGGLE_CHECKOUT": {
      return {
        ...state,
        isCheckoutOpen: !state.isCheckoutOpen,
        isOrderPlaced: false,
      };
    }
  }
  return {
    ...state,
    items: state.items || [],
  };
};
