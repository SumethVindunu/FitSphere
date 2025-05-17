import React, { useState } from 'react'
import axios from 'axios';

const Register = () => {
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    password: '',
    phone: ''
  });

  const { fullname, email, password, phone } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/user', user);
      alert('User registered successfully');
      window.location.href = '/login';
      // Optionally redirect or reset the form here
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center pt-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Register</h1>
      <form id="registrationForm" onSubmit={onSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" id="fullname" name="fullname"
            onChange={onInputChange}
            value={fullname}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" 
            onChange={onInputChange}
            value={email}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" name="password" 
            onChange={onInputChange}
            value={password}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input type="text" id="phone" name="phone" 
            onChange={onInputChange}
            value={phone}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required/>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Register</button>
      </form>
    </div>
  )
}

export default Register