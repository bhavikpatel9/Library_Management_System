import { useState,useEffect } from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Register from './components/Register'
import Login from './components/Login';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Checkout from './components/Checkout';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const savedUserName = localStorage.getItem('userName');
    if (savedUserName) {
      setUserName(savedUserName);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (name, id,  userType, email) => {
    setUserName(name);
    setEmail(email)
    setIsLoggedIn(true);
    if(userType === 'ADMIN'){
      setIsAdmin(true);
    }
    localStorage.setItem('userName', name); 
    localStorage.setItem('email', email); 
  };

  const handleLogout = () => {
    setUserName('');
    setIsLoggedIn(false);
    localStorage.removeItem('userName'); 
    localStorage.removeItem('token'); 
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar isLoggedIn={isLoggedIn} userName={userName} />
          <Home isLoggedIn={isLoggedIn} email={email}/>
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
        <Navbar isLoggedIn={isLoggedIn} userName={userName} />
        <Register onLogin={handleLogin}/>
        </>
        
      ),
    },
    {
      path: "/login",
      element: (
        <>
        <Navbar isLoggedIn={isLoggedIn} userName={userName} />
        <Login onLogin={handleLogin}/>
        </>
      ),
    },
    {
      path: '/profile',
      element: (
        <>
          <Navbar isLoggedIn={isLoggedIn} userName={userName} />
          <Profile email={email} onLogout={handleLogout}/>
        </>
      ),
    },
    {
      path: '/checkout/:id',
      element: (
        <>
          <Navbar isLoggedIn={isLoggedIn} userName={userName} />
          <Checkout/>
        </>
      ),
    },
  ]);

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
