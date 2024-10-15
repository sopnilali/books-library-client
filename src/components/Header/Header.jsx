import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Header/Header.css'
import { useTheme } from '../../hooks/useTheme';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const Header = () => {

  const navigate = useNavigate()

  const {user, logoutUser} = useAuth()
  
  const { mode, changeTheme } = useTheme()

const handleLogout = ()=> {
  logoutUser()
  .then( () => {
    setTimeout(() => {
      toast.success("Logout Successful");
    }, 200);
    navigate('/login') 
  })
  .catch(error => console.error(error))
}

    return (
        <div className="navbar bg-base-100 mb-3 dark:shadow-slate-500 dark:bg-slate-800 dark:shadow-md rounded-md dark:rounded-md">
  <div className="navbar-start ">
    <div className="dropdown ">
      <label tabIndex={0} className="btn btn-ghost lg:hidden dark:btn-secondary  ">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu bg-white dark:bg-zinc-500 dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
      <li className='mr-2 dark:text-white '><NavLink to="/">Home</NavLink></li>
    <li className='mr-2  dark:hover:text-white'><NavLink to="/add-book">Add Book</NavLink></li>
    <li className='mr-2 dark:text-white'><NavLink to="/all-books">All Books</NavLink></li>
    <li className='mr-2 dark:text-white'><NavLink to={`borrow-books/`}>Borrowed Books</NavLink></li>
      </ul>
    </div>
    <img className='w-36 ml-2 md:ml-2 dark:bg-white' src="https://imgdb.net/storage/uploads/3583fe88be6c51b8f69301700f265d2d5bc9d2e34d40bdf2ad47cb03f7da2b17.png" alt="" />
  </div>
  <div className="navbar-center  hidden lg:flex dark:text-white">
    <ul className="menu menu-horizontal  px-1">
    <li className='mr-2 border rounded-2xl dark:text-black dark:outline-none dark:border-none dark:bg-slate-50 dark:rounded-2xl'><NavLink to="/">Home</NavLink></li>
    <li className='mr-2 border rounded-2xl dark:text-black dark:outline-none dark:border-none dark:bg-slate-50 dark:rounded-2xl'><NavLink to="/add-book">Add Book</NavLink></li>
    <li className='mr-2 border dark:outline-none dark:border-none rounded-2xl dark:text-black dark:bg-slate-50 dark:rounded-2xl'><NavLink to="/all-books">All Books</NavLink></li>
    <li className='mr-2 border  dark:border-none dark:outline-none rounded-2xl dark:text-black dark:bg-slate-50 dark:rounded-2xl'><NavLink to={`borrow-books/`}>Borrowed Books</NavLink></li>

    </ul>
  </div>
  <div className="navbar-end">
  <span className='mx-5 dark:text-white '>{user?.displayName }</span> 
  {
    user? <>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={user?.photoURL} />
        </div>
      </label>
    </div>
    </>
    :<></>
  }
  {
      user ? <>
      <a onClick={handleLogout} className="btn btn-sm capitalize hover:bg-orange-600 hover:text-white">Log Out</a>
      </>
      : <>
      <NavLink to="/login" className="btn capitalize btn-sm dark:border-none text-black dark:bg-primary bg-cyan-200 dark:text-white">Login</NavLink>
      
      </>
      
    }
  </div>
  <button onClick={changeTheme}>
     { mode === 'dark' ? <MdDarkMode className='text-2xl ml-2 dark:text-white'/> :  <MdLightMode className='text-2xl ml-2' />  }
</button>
<ToastContainer />
</div>
    );
};

export default Header;