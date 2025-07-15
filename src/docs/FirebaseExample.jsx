import React, { useState, useEffect } from "react";
import { useGetFetch } from "../hooks/useGetFetch";
import { usePostFetch } from "../hooks/usePostFetch";

// Example component showing proper usage of Firebase hooks
const FirebaseExample = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Get the hooks
  const { getData } = useGetFetch();
  const { postData } = usePostFetch();

  // Fetch menu items on component mount
  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      setError(null);
      
      const result = await getData("/menu");
      
      if (result.data) {
        // Convert object to array if needed
        const itemsArray = Object.keys(result.data).map(key => ({
          id: key,
          ...result.data[key]
        }));
        setMenuItems(itemsArray);
      } else {
        setError(result.error || "No menu items found");
      }
      
      setLoading(false);
    };

    fetchMenuItems();
  }, [getData]);

  const fetchMenuItems = async () => {
    setLoading(true);
    setError(null);
    
    const result = await getData("/menu");
    
    if (result.data) {
      // Convert object to array if needed
      const itemsArray = Object.keys(result.data).map(key => ({
        id: key,
        ...result.data[key]
      }));
      setMenuItems(itemsArray);
    } else {
      setError(result.error || "No menu items found");
    }
    
    setLoading(false);
  };

  const addNewItem = async () => {
    const newItem = {
      name: "Sample Item",
      description: "This is a sample menu item",
      price: 9.99,
      createdAt: new Date().toISOString()
    };

    const key = await postData(newItem, "/menu");
    
    if (key) {
      console.log("Item added with key:", key);
      // Refresh the list
      fetchMenuItems();
    } else {
      setError("Failed to add new item");
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Firebase Example</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}
      
      <div className="mb-4">
        <button 
          onClick={addNewItem}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Add Sample Item
        </button>
        <button 
          onClick={fetchMenuItems}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Refresh List
        </button>
      </div>

      <div className="grid gap-4">
        {menuItems.length > 0 ? (
          menuItems.map(item => (
            <div key={item.id} className="border p-4 rounded">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-lg font-semibold">${item.price}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No menu items found</p>
        )}
      </div>
    </div>
  );
};

export default FirebaseExample;
