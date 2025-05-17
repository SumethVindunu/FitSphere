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
            const responce = await axios.post('http://localhost:8080/login', loginDetails);
            if(responce.data.id){
                localStorage.setItem('userId',responce.data.id);//save user
                toast.success('Login successful');
                setTimeout(() => {
                  window.location.href = '/profile';
              }, 2000);
              }else{
                toast.error('Invalid credentials');
            }
            
        } catch (error) {
          toast.error('Error loging in');
          setTimeout(() => {
            window.location.reload();
        }, 2000);
            
        }
    }
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center pt-12">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form
        id="registrationForm"
        onSubmit={onSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md space-y-6"
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
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login