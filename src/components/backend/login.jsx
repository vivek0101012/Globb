import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from "framer-motion";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, credentials);
      
      if (response.data.token) {
        login(response.data.token);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-satoshi"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Glow Effects
      <div className="absolute top-1/3 left-1/2 w-[300px] h-[200px] bg-blue-500 blur-[100px] opacity-20 rounded-full -translate-x-1/2"></div>
      <div className="absolute bottom-1/3 left-1/2 w-32 h-32 bg-blue-500 blur-3xl opacity-20 rounded-full -translate-x-1/2"></div> */}


      
<div className='md:flex hidden items-center justify-center px-4'>
<video src="images/homeanm2.mp4" 

  autoPlay
  muted
  loop
  playsInline

width={500} height={500}  alt="" />
</div>

      <div className="max-w-md w-full space-y-8 relative">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center">
            <img src="/images/logo.png" className="h-16 w-16 animate-pulse drop-shadow-[0_0_10px_rgba(144,175,238,0.8)]" alt="Globb Logo" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Welcome to Globb
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Trade without limits, learn without risks
          </p>
        </motion.div>

        <motion.form 
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {error && (
            <motion.div 
              className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          <div className="rounded-lg backdrop-blur-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                name="email"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-3 border 
                         border-gray-700 bg-gray-800/50 placeholder-gray-400 
                         text-white rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-blue-500/50 focus:border-transparent transition-all"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 border 
                         border-gray-700 bg-gray-800/50 placeholder-gray-400 
                         text-white rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-blue-500/50 focus:border-transparent transition-all"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 
                     border border-[#90AFEE] text-sm font-medium rounded-full 
                     text-white bg-transparent hover:bg-blue-500/10 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 
                     focus:ring-blue-500/50 transition-all duration-200 
                     shadow-inner shadow-[#90AFEE]/20"
          >
            Sign in
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Login;