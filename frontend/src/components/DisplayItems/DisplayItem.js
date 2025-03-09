import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';

function DisplayItem() {
    const [inventory, setInventory] = useState([]);
    // const { id } = useParams();

    useEffect(() => {
        loadInventory();
    }, []);

    const loadInventory = async () => {
        const result = await axios.get("http://localhost:8080/inventory");
        setInventory(result.data);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Inventory Item</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">Item Id</th>
                        <th className="py-2 px-4 border">Item Image</th>
                        <th className="py-2 px-4 border">Item Name</th>
                        <th className="py-2 px-4 border">Category</th>
                        <th className="py-2 px-4 border">Quantity</th>
                        <th className="py-2 px-4 border">Details</th>
                        <th className="py-2 px-4 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((item, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border">{item.itemId}</td>
                            <td className="py-2 px-4 border">
                                <img 
                                    src={`http://localhost:8080/uploads/${item.itemImage}`} 
                                    
                                    width="100" 
                                    height="100" 
                                    
                                />

                            </td>
                            <td className="py-2 px-4 border">{item.itemName}</td>
                            <td className="py-2 px-4 border">{item.itemCategory}</td>
                            <td className="py-2 px-4 border">{item.itemQty}</td>
                            <td className="py-2 px-4 border">{item.itemDetails}</td>
                            <td className="py-2 px-4 border">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                                <button className=" ml-2 bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DisplayItem;
