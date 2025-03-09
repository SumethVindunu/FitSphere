import React, { useState } from 'react';
import './AddItem.css';
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

  const { itemId, itemName, itemCategory, itemQty, itemDetails } = inventory;

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
    <div className="add-item-container">
      <h2 className="add-item-title">Add Item</h2>
      <form id="itemForm" onSubmit={(e) => onSubmit(e)}>
        <label className="label">Item ID:</label>
        <input
          type="text"
          id="itemId"
          name="itemId"
          required
          onChange={(e) => onInputChange(e)}
          value={itemId}
          className="input"
        />
        <label className="label">Item Name:</label>
        <input
          type="text"
          id="itemName"
          name="itemName"
          required
          onChange={(e) => onInputChange(e)}
          value={itemName}
          className="input"
        />
        <label className="label">Item Category:</label>
        <select
          id="itemCategory"
          name="itemCategory"
          onChange={(e) => onInputChange(e)}
          required
          value={itemCategory}
          className="select"
        >
          <option value="" disabled>Select Item Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Home">Home</option>
          <option value="Other">Other</option>
        </select>
        <label className="label">Item Quantity:</label>
        <input
          type="number"
          name="itemQty"
          id="itemQty"
          required
          onChange={(e) => onInputChange(e)}
          value={itemQty}
          className="input"
        />
        <label className="label">Item Details:</label>
        <textarea
          name="itemDetails"
          id="itemDetails"
          required
          onChange={(e) => onInputChange(e)}
          value={itemDetails}
          className="textarea"
        />
        <label className="label">Item Image:</label>
        <input
          type="file"
          name="itemImage"
          id="itemImage"
          accept="image/*"
          onChange={(e) => onInputChange(e)}
          className="input"
        />
        <button type="submit" className="button">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
