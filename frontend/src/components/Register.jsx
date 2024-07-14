import React,{useState} from 'react'
import { IoEye, IoEyeOff } from "react-icons/io5";
import {NavLink,useNavigate} from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState(null); // State to hold error message
    const navigate = useNavigate();
  
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const data = {
        name,
        email,
        password,
      };
  
      try {
        const response = await fetch("http://localhost:5000/library/api/v1/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          // Registration successful (assuming API returns user data or success message)
          const userData = await response.json();
          // console.log("Success:", userData);
          // onLogin(userData.name); // Call onLogin function passed from App.jsx to update login state
          navigate('/login'); // Redirect to home page after registration
        } else {
          // Registration failed
          const errorData = await response.json(); // Assuming API returns error details
          setError(errorData.message); // Set error message state
        }
      } catch (error) {
        console.error("Error:", error);
        setError("An unexpected error occurred. Please try again."); // Generic error message
      }
    };
  return (
    <div>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 top-8 px-3 py-2 text-gray-600"
            >
              {passwordVisible ? <IoEye size={20} /> : <IoEyeOff size={20} />}
            </button>
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Have an Account?{" "}
          <NavLink className="text-blue-500 hover:underline" to="/login">
            Login Here
          </NavLink>
        </p>
      </div>
    </div>
    </div>
  )
}

export default Register