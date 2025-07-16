import React from "react";
import { useContext } from "react";
import Button from "../elements/Button";
import { usePostFetch } from "../hooks/usePostFetch";
import { CartContext } from "../context/CartContext";
import useFormValidation from "../hooks/useFormValidation";

const Checkout = () => {
  const { dispatchCart, cartState } = useContext(CartContext);
  const { postSpecificData } = usePostFetch();

  const { values, errors, touched, handleChange, handleBlur, resetForm } =
    useFormValidation(
      { name: "", email: "", address: "", phone: "" }, // Initial values
      { name: "text", email: "email", address: "text", phone: "number" } // Validation rules
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    if (
      Object.values(values).some((value) => value.trim() === "") ||
      Object.values(errors).some((error) => error)
    ) {
      alert("Please fix the errors and complete all fields before submitting.");
      return;
    }

    try {
      // Prepare form data for submission
      const formData = {
        ...values,
        items: cartState.items, // Include cart items in the order
        totalItemsNumber: cartState.totalItemsNumber,
        totalAmount: cartState.totalAmount,
        orderDate: new Date().toISOString(),
      };

      // Send order data to orders endpoint
      await postSpecificData(formData, "/orders");

      // Update cart state to reflect successful order
      dispatchCart({ type: "ORDER_PLACED" });

      // Reset form and cart state
      resetForm();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 min-w-[320px] max-w-md w-full relative border border-red-200">
      <form className="space-y-6" onSubmit={handleSubmit}>
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
            value={values.name}
            onChange={(e) => handleChange(e)}
            onBlur={() => handleBlur("name")}
            className={`w-full px-4 py-2 pl-4 border text-gray-900 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent transition bg-white ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="Enter your name"
          />
          {errors.name && touched.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
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
            value={values.email}
            onChange={(e) => handleChange(e)}
            onBlur={() => handleBlur("email")}
            className={`w-full px-4 py-2 pl-4 border text-gray-900 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent transition bg-white ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="Enter your email"
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
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
            value={values.address}
            onChange={(e) => handleChange(e)}
            onBlur={() => handleBlur("address")}
            className={`w-full px-4 py-2 pl-4 border text-gray-900 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent transition bg-white ${
              errors.address ? "border-red-500" : ""
            }`}
            placeholder="Enter your address"
          ></textarea>
          {errors.address && touched.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
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
            value={values.phone}
            onChange={(e) => handleChange(e)}
            onBlur={() => handleBlur("phone")}
            className={`w-full px-4 py-2 pl-4 border text-gray-900 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent transition bg-white ${
              errors.phone ? "border-red-500" : ""
            }`}
            placeholder="Enter your phone number"
          />
          {errors.phone && touched.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
        <div className="flex gap-4">
          <Button btnFor="Close" type="button" dispatchType="TOGGLE_CHECKOUT" />
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
