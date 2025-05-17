import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateItem = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    itemId: '',
    itemName: '',
    itemCategory: '',
    itemQty: '',
    itemDetails: '',
    itemImage: null,
  });

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/inventory/${id}`);
        const itemData = response.data;
        setFormData({
          itemId: itemData.itemId || '',
          itemName: itemData.itemName || '',
          itemCategory: itemData.itemCategory || '',
          itemQty: itemData.itemQty || '',
          itemDetails: itemData.itemDetails || '',
          itemImage: null,
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchItemData();
  }, [id]);

  const onInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append(
      'itemDetails',
      JSON.stringify({
        itemId: formData.itemId,
        itemName: formData.itemName,
        itemCategory: formData.itemCategory,
        itemDetails: formData.itemDetails,
        itemQty: formData.itemQty,
      })
    );
    if (formData.itemImage) {
      data.append('file', formData.itemImage);
    }
    try {
      await axios.put(`http://localhost:8080/inventory/${id}`, data);
      alert('Item updated successfully');
      window.location.href = '/allitem';
    } catch (error) {
      console.error('Error updating item: ', error);
      alert('Error updating item');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Update Post</h2>
        <form id="itemForm" onSubmit={onSubmit} className="space-y-6">
          <input
            type="hidden"
            id="itemId"
            name="itemId"
            required
            onChange={onInputChange}
            value={formData.itemId}
          />
          <div>
            <label htmlFor="itemName" className="block text-gray-700 mb-2">
              Post Name
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              required
              onChange={onInputChange}
              value={formData.itemName}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <label htmlFor="itemCategory" className="block text-gray-700 mb-2">
              Post Category
            </label>
            <select
              id="itemCategory"
              name="itemCategory"
              onChange={onInputChange}
              required
              value={formData.itemCategory}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="" disabled>
                Select Post Category
              </option>
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
            value={formData.itemQty}
          />
          <div>
            <label htmlFor="itemDetails" className="block text-gray-700 mb-2">
              Post Details
            </label>
            <textarea
              name="itemDetails"
              id="itemDetails"
              required
              onChange={onInputChange}
              value={formData.itemDetails}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <label htmlFor="itemImage" className="block text-gray-700 mb-2">
              Post Image
            </label>
            <input
              type="file"
              name="itemImage"
              id="itemImage"
              accept="image/*"
              onChange={onInputChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;