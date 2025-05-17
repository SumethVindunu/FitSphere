import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Login = () => {

    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');

    const onSubmit = async (e)=>{
        e.preventDefault();
        const loginDetails = {email,password};
        try {
            const response = await axios.post('http://localhost:8080/login', loginDetails);
            if(response.data.id){
                localStorage.setItem('userId',response.data.id);//save user
                toast.success('Login successful');
                setTimeout(() => {
                  window.location.href = '/userprofile';
              }, 2000);
              }else{
                toast.error('Invalid credentials');
            }
            
        } catch (error) {
          console.error("Login Error:", error.response ? error.response.data : error.message); // Log error details
          toast.error('Error logging in');
          setTimeout(() => {
              window.location.href = '/login';
          }, 2000);
      }
    }
  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form
        id="loginForm"
        onSubmit={onSubmit}
        className="w-full max-w-lg space-y-4"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login
