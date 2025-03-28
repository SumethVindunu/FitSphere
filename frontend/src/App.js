import React from 'react';
import './index.css'; // Importing Tailwind CSS
import { Route, Routes } from 'react-router';
import Home from './components/Home/Home';
import AddItem from './components/AddItem/AddItem';
import DisplayItem from './components/DisplayItems/DisplayItem';
import UpdateItem from './components/UpdateItem/UpdateItem';
import Graph from './components/Graph/Graph';

function App() {
  return (
    <div className="App container mx-auto p-4">

<nav className="bg-blue-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold cursor-pointer" onClick={() => (window.location.href = "/")}>My App</div>
        <div className="flex space-x-4">
          <button
            className="bg-white text-blue-500 hover:bg-gray-100 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            onClick={() => (window.location.href = "/additem")}
          >
            Add Item
          </button>
          <button
            className="bg-white text-blue-500 hover:bg-gray-100 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            onClick={() => (window.location.href = "/allitem")}
          >
            View Item
          </button>
        </div>
      </div>
    </nav>
      
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/allitem" element={<DisplayItem />} />
          <Route path="/updateitem/:id" element={<UpdateItem />} />
          <Route path="/graph" element={<Graph />} />
          


        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
