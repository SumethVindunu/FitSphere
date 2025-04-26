import React from 'react';
import './index.css'; // Importing Tailwind CSS
import { Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Home from './components/Home/Home';
import AddItem from './components/AddItem/AddItem';
import DisplayItem from './components/DisplayItems/DisplayItem';
import UpdateItem from './components/UpdateItem/UpdateItem';
import Graph from './components/Graph/Graph';
import Register from './components/Reginster/Register';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div className="App container mx-auto p-4">
      <Navbar/>
      <ToastContainer 
        position="top-right"
        autoClose={2000} 
        hideProgressBar={false} 
        newestOnTop={true} 
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <React.Fragment>
        
        <Routes>
          {/* inventory */}
          <Route path="/" element={<Home />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/allitem" element={<DisplayItem />} />
          <Route path="/updateitem/:id" element={<UpdateItem />} />
          <Route path="/graph" element={<Graph />} />
          {/* user */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          {/* navbar */}
          


        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
