import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Profile = ({ email, onLogout }) => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); 

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/library/api/v1/auth/getuser",
          { email },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUser(data);
      } catch (error) {
        setMessage("Error fetching user details");
      }
    };

    fetchUserDetails();
  }, [email]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:5000/furniture/api/v1/auth/update",
        user,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(data);
      setIsEditing(false);
      setMessage("Profile updated successfully");
    } catch (error) {
      setMessage("Error updating profile");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded-lg shadow border-2">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      {message && (
        <div
          className={`mb-4 p-2 rounded ${
            message.startsWith("Error")
              ? "bg-red-200 text-red-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {message}
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 top-6 px-3 py-2 text-gray-600"
            >
              {passwordVisible ? <IoEye size={20} /> : <IoEyeOff size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save
          </button>
          <div className="mt-2">
            <button
              onClick={onLogout}
              className="block px-4 py-2 text-red-500 bg-white rounded-md shadow border-2 border-red-500 hover:bg-gray-100"
            >
              <Link to="/">Logout</Link>
            </button>
          </div>
        </form>
      ) : (
        <div>
          <p className="mb-2">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          {/* <p className="mb-4">
            <strong>Password:</strong> {user.password}
          </p> */}
          {/* <button
            onClick={handleEditClick}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit
          </button> */}
          <div className="mt-2">
            <button
              onClick={onLogout}
              className="block px-4 py-2 text-red-500 bg-white rounded-md shadow border-2 border-red-500 hover:bg-gray-100"
            >
              <Link to="/">Logout</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
