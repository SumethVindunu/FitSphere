import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';

function DisplayItem() {
    const [inventory, setInventory] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadInventory();
    }, []);

    const loadInventory = async () => {
        const userId = localStorage.getItem('userId');
        const result = await axios.get("http://localhost:8080/inventory");
        const data = result.data;
        // Filter inventory items where item.itemId matches the stored userId
        const userInventory = data.filter(item => item.itemId === userId);
        setInventory(userInventory);
    };

    const UpdateNavigate = (id) => {
        window.location.href = `/updateitem/${id}`;
    };

    const deleteItem = async (id) => {
        const confirmationMessage = window.confirm('Are you sure you want to delete this item?');
        if (confirmationMessage) {
            try {
                await axios.delete(`http://localhost:8080/inventory/${id}`);
                loadInventory();
                alert('Item deleted successfully');
            } catch (error) {
                alert('Error deleting item', error);
            }
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("My Posts Report", 14, 15);
        const tableColumn = ["Item Id", "Post Name", "Category", "Details"];
        const tableRows = [];

        // Loop through inventory data to generate rows
        inventory.forEach(item => {
            const row = [
                item.itemId, 
                item.itemName, 
                item.itemCategory, 
                item.itemDetails
            ];
            tableRows.push(row);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save("My_Post_report.pdf");
    };

   

    // Filter inventory based on search term
    const filteredInventory = inventory.filter(item =>
        Object.values(item).some(value =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">All Posts</h1>
                    <button
                        onClick={() => navigate('/additem')}
                        className="bg-indigo-500 hover:bg-indigo-600  text-white font-semibold py-2 px-6 rounded-lg shadow "

                    >
                        Add Post
                    </button>
                </div>

                {/* Search Bar & PDF Button */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        onClick={generatePDF}
                        className="bg-green-500 hover:bg-green-600  text-white font-semibold py-2 px-6 rounded-lg shadow "
                    >
                        Generate PDF
                    </button>
                </div>

                {/* Inventory Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3 px-4 border">Item Id</th>
                                <th className="py-3 px-4 border">Post Image</th>
                                <th className="py-3 px-4 border">Post Name</th>
                                <th className="py-3 px-4 border">Category</th>
                                <th className="py-3 px-4 border">Details</th>
                                <th className="py-3 px-4 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInventory.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="py-3 px-4 border text-center">{item.itemId}</td>
                                    <td className="py-3 px-4 border text-center">
                                        <img
                                            src={`http://localhost:8080/uploads/${item.itemImage}`}
                                            alt={item.itemName || "Item image"}
                                            className="w-24 h-24 object-cover rounded"
                                        />
                                    </td>
                                    <td className="py-3 px-4 border text-center">{item.itemName}</td>
                                    <td className="py-3 px-4 border text-center">{item.itemCategory}</td>
                                    <td className="py-3 px-4 border text-center">{item.itemDetails}</td>
                                    <td className="py-3 px-4 border text-center space-x-2">
                                        <button onClick={() => UpdateNavigate(item.id)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded">
                                            Edit
                                        </button>
                                        <button onClick={() => deleteItem(item.id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredInventory.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-gray-500">
                                        No items found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DisplayItem;