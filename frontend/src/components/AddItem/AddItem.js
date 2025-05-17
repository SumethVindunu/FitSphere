import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddItem = () => {
  const [inventory, setInventory] = useState({
    itemId: '',
    itemName: '',
    itemCategory: '',
    itemQty: '',
    itemDetails: '',
    itemImage: null
  });

  // Set itemId from local storage on component mount
  useEffect(() => {
    const userId = localStorage.getItem('userId') || '';
    setInventory(prev => ({ ...prev, itemId: userId }));
  }, []);

  const { itemName, itemCategory, itemQty, itemDetails } = inventory;

  const onInputChange = (e) => {
    if (e.target.name === 'itemImage') {
      setInventory({ ...inventory, itemImage: e.target.files[0] });
    } else {
      setInventory({ ...inventory, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', inventory.itemImage);
    let imageName = "";
    try {
      const response = await axios.post("http://localhost:8080/inventory/itemImg", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      imageName = response.data;
      window.location.href = '/allitem';
    } catch (error) {
      alert("Error uploading image");
      return;
    }
    const updateInventory = { ...inventory, itemImage: imageName };
    await axios.post("http://localhost:8080/Inventory", updateInventory);
    alert("Item added successfully");
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Add Posts</h2>
        <form id="itemForm" onSubmit={onSubmit} className="space-y-5">
          {/* Hidden field for itemId */}
          <input 
            type="hidden" 
            name="itemId" 
            value={inventory.itemId} 
          />
          <div>
            <label className="block text-gray-600 mb-2">Post Name:</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              required
              onChange={onInputChange}
              value={itemName}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Post Category:</label>
            <select
              id="itemCategory"
              name="itemCategory"
              onChange={onInputChange}
              required
              value={itemCategory}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="" disabled>Select Post Category</option>
              <option value="Workout">Workout</option>
              <option value="Meal Plan">Meal Plan</option>
              <option value="Progress Journey">Progress Journey</option>
              <option value="Motivation & Mindset">Motivation & Mindset</option>
              <option value="Fitness Tips">Fitness Tips</option>
            </select>
          </div>
          <input
            type="hidden"
            name="itemQty"
            id="itemQty"
            required
            onChange={onInputChange}
            value={itemQty}
          />
          <div>
            <label className="block text-gray-600 mb-2">Post Details:</label>
            <textarea
              name="itemDetails"
              id="itemDetails"
              required
              onChange={onInputChange}
              value={itemDetails}
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Post Image:</label>
            <input
              type="file"
              name="itemImage"
              id="itemImage"
              accept="image/*"
              onChange={onInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out">
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;