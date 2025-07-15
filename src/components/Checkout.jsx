import React from "react";
import { useState, useContext } from "react";
import Button from "../elements/Button";
import { usePostFetch } from "../hooks/usePostFetch";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const { dispatchCart, cartState } = useContext(CartContext);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    items: cartState.items, // Include cart items in the order
    totalAmount: cartState.totalAmount,
    orderDate: new Date().toISOString()
  });

  const updateFormData = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const { postSpecificData } = usePostFetch();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log(`Submitting order data:`, formData);
      // Send order data to orders endpoint instead of menu
      const orderKey = await postSpecificData(formData, "/orders");
      console.log("Order placed successfully with key:", orderKey);
      
      // Update cart state to reflect successful order
      dispatchCart({ type: "ORDER_PLACED" });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 min-w-[320px] max-w-md w-full relative border border-red-200">
      <form
        className="space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="relative">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => updateFormData(e)}
            className="w-full px-4 py-2 pl-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent transition bg-white"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="relative">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => updateFormData(e)}
            className="w-full px-4 py-2 pl-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent transition bg-white"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="relative">
          <label
            htmlFor="address"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Address
          </label>
          <textarea
            id="address"
            value={formData.address}
            onChange={(e) => updateFormData(e)}
            className="w-full px-4 py-2 pl-4 border text-gray-900 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent transition bg-white"
            placeholder="Enter your address"
            required
          ></textarea>
        </div>
        <div className="relative">
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => updateFormData(e)}
            className="w-full px-4 py-2 pl-4 border text-gray-900 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent transition bg-white"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="flex gap-4">
          <Button 
            btnFor="Close" 
            type="button"
            dispatchType="TOGGLE_CHECKOUT" 
          />
          <button
            type="submit"
            className="flex-1 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
          >
            PLACE ORDER
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
