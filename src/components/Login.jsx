import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { loginUser } from '../services/Auth';
import { toast } from 'react-toastify';
import forage from '../../src/assets/images/forage.png';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginUser(formData);
      if(response.status === 200){
        localStorage.setItem('token', response.data.accessToken);
        navigate('/admin');
        toast.success('Welcome back!');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Invalid credentials. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="max-w-md w-full space-y-8 p-6 bg-white shadow-lg rounded-lg">
        <img src={forage} alt="Legal Forage" className="w-32 h-24 mx-auto mb-6" />
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Welcome Back!</h2>
          <p className="text-gray-500">Please sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute inset-y-0 left-0 pl-3 flex items-center h-5 w-5 text-gray-400" />
            <input
              type="email"
              required
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 transition duration-200 ease-in-out"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="relative">
            <FaLock className="absolute inset-y-0 left-0 pl-3 flex items-center h-5 w-5 text-gray-400" />
            <input
              type="password"
              required
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 transition duration-200 ease-in-out"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="w-full flex justify-center items-center py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-200">
            <FcGoogle size={25} />
          </button>
          <button className="w-full flex justify-center items-center py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-200">
            <FaFacebook size={25} color="blue" />
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;