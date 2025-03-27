import React from "react";
const Home = () => {
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        onClick={() => (window.location.href = "/additem")}
      >
        Add Item
      </button>
      <button
        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        onClick={() => (window.location.href = "/allitem")}
      >
        View Item
      </button>
     

  
    </div>
  );
};

export default Home;
