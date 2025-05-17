import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const res = await axios.get("http://localhost:8080/inventory");
            setInventory(res.data);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        }
    };

    const handleLike = async (id) => {
        try {
            await axios.post(`http://localhost:8080/inventory/${id}/like`);
            fetchInventory();
        } catch (error) {
            console.error("Error liking item:", error);
        }
    };

    const handleAddComment = async (id, comment, clearInput) => {
        if (!comment.trim()) return;
        try {
            await axios.post(`http://localhost:8080/inventory/${id}/comment`, null, { params: { comment } });
            fetchInventory();
            clearInput();
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-gray-800 my-6">
                Welcome To FitSphere
            </h1>
            <p className="text-lg text-gray-600 mb-8 text-center">
                Manage your fitness goals efficiently with our modern, user-friendly app.
            </p>
            
            <div className="flex flex-col w-full max-w-3xl space-y-6 px-4 pb-8">
                {inventory.map((item) => (
                    <div key={item.id} className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-lg shadow-md overflow-hidden">
                        {item.itemImage && (
                            <img
                                src={`http://localhost:8080/uploads/${item.itemImage}`}
                                alt={item.itemName}
                                className="w-full h-96 object-contain"
                            />
                        )}
                        <div className="p-4">
                            <h2 className="text-2xl font-bold mb-2">{item.itemName}</h2>
                            <p className="text-gray-600 mb-4">{item.itemDetails}</p>
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-gray-800">{item.itemCategory}</span>
                                <span className="text-gray-500">{item.itemQty} pcs</span>
                            </div>
                            <div className="mt-4">
                                <button 
                                    onClick={() => handleLike(item.id)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
                                >
                                    Like ({item.likeCount || 0})
                                </button>
                            </div>
                            <div className="mt-4">
                                <CommentSection item={item} handleAddComment={handleAddComment} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CommentSection = ({ item, handleAddComment }) => {
    const [commentText, setCommentText] = useState("");

    const clearInput = () => setCommentText("");

    const onKeyDown = (e) => {
        if(e.key === "Enter"){
            handleAddComment(item.id, commentText, clearInput);
        }
    };

    return (
        <div>
            <input 
                type="text"
                placeholder="Add a comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={onKeyDown}
                className="w-full px-3 py-1 border rounded mb-2"
            />
            {item.comments && item.comments.length > 0 && (
                <div className="mt-2">
                    <h3 className="font-semibold">Comments:</h3>
                    <ul className="list-disc pl-5">
                        {item.comments.map((comm, idx) => (
                            <li key={idx} className="text-gray-700">{comm}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Home;