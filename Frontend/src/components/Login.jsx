import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(email)
      // setError('');
  
      axios
        .post('http://localhost:3001/user/login', { email, password })
        .then((result) => {
          console.log('Login successful:', result);
          localStorage.setItem('userId', result.data);
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('role', 'user'); 
          navigate('/dashboard'); // Redirect to home page after login
        })
        .catch((err) => {
          console.log(err);
          // setError('Invalid email or password');
        });
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input type="email" id="email" name="email" required className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" 
            onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" name="password" required className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" 
            onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">Remember me</label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
            </div>
          </div>
          <div>
            <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleSubmit}>Sign in</button>
          </div>
        </form>
        <div className="text-sm text-center">
          <p>Don't have an account? <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Register</Link></p>
        </div>
        <div className="text-sm text-center">
          <p>Admin Login <Link to="/Admin" className="font-medium text-indigo-600 hover:text-indigo-500">Register</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login