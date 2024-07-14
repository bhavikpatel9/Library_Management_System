import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/library.png'

const Navbar = ({ isLoggedIn, userName, isAdmin }) => {

  return (
    <div className='sticky top-0 z-10'>
      <nav className='flex justify-between p-3 bg-[#3B5998]'>
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={logo} alt="logo" width={30}/>
          <span className="ml-3 text-xl text-white">Library</span>
        </a>

        <ul className='flex gap-7 items-center text-white'>
          <li><NavLink className={(e) => (e.isActive ? "text-blue-300" : "")} to="/">Home</NavLink></li>
          {isAdmin && (<li><NavLink className={(e) => (e.isActive ? "text-blue-300" : "")} to="/admin/:id">Add Package</NavLink></li>)}
        </ul>
        {isLoggedIn ? (
          <div className="relative flex items-center">
            <button className="text-white bg-blue-500 px-2 py-1 rounded"><NavLink to="/profile">{userName}</NavLink>
            </button>

          </div>
        ) : (
          <button>
            <NavLink className={(e) => (e.isActive ? "text-blue-300" : "text-white")} to="/register">Sign Up</NavLink>
          </button>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
