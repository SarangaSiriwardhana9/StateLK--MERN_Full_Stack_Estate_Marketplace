/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import logo from '/logo.png';

export default function Header() {
  const [isSticky, setSticky] = useState(false);
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlPrarams = new URLSearchParams(window.location.search);
    urlPrarams.set('searchTerm', searchTerm);
    const searchQuery = urlPrarams.toString();
    navigate(`/search?${searchQuery}`);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFormUrl = urlParams.get('searchTerm');
    if (searchTermFormUrl) {
      setSearchTerm(searchTermFormUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      // eslint-disable-next-line no-undef
      dispatch(deleteUserFailure(data.message));
    }
  };

  return (
    <header className={`bg-[#d1fffb]  h-24 shadow-xl mx-auto ${isSticky ? 'sticky top-0 left-0 right-0' : ''} transition-all duration-300 ease-in-out z-50`} >
      <div className="flex justify-between items-center  max-w-6xl mx-auto p-6">
        {/* header buttons */}
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
            <img src={logo} alt="logo" className="  sm:h-16  sm:w-28 mr-2 " />
            
          </h1>
        </Link>

        <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="text-slate-600">
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-600 hover:bg-[#eaf8f6] hover:text-gray-800 rounded-full px-3 py-1">
              Home
            </li>
          </Link>

          <Link to="/all-listings">
            <li className="hidden sm:inline text-slate-600 hover:bg-[#eaf8f6] hover:text-gray-800 rounded-full px-3 py-1">
              Properties
            </li>
          </Link>

          <Link to="/about">
            <li className="hidden sm:inline text-slate-600 hover:bg-[#eaf8f6] hover:text-gray-800 rounded-full px-3 py-1">
              About
            </li>
          </Link>

          {/* contact us */}
          <Link to="/contact">
            <li className="hidden sm:inline text-slate-600 hover:bg-[#eaf8f6] hover:text-gray-800 rounded-full px-3 py-1">
              Contact
            </li>
          </Link>

          {/* Add Property  with icon */}
          {currentUser && (
            <Link to="/create-listing">
              <li className="hidden sm:inline text-slate-700 hover:underline hidden sm:inline text-slate-600 hover:bg-[#eaf8f6] hover:text-gray-800 rounded-full px-3 py-1">
                <FaPlus className="hidden sm:inline text-slate-700 hover:underline mr-1 mb-1" />
                Add Property
              </li>
            </Link>

          )}

          {currentUser ? (
            <div ref={menuRef} className="relative">
              <img
                onClick={() => setMenuOpen(!isMenuOpen)}
                className="rounded-full h-7 w-7 object-cover cursor-pointer justify-center"
                src={currentUser.avatar}
                alt="profile"
              />
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[#c9fffb] shadow-lg rounded-lg py-2">
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-[#bfece9]">
                    Profile
                  </Link>
                  <Link to="/my-listings" className="block px-4 py-2 text-gray-800 hover:bg-[#bfece9]">
                    My Listings
                  </Link>
                  <button onClick={handleSignOut} className="block px-4 py-2 text-gray-800 hover:bg-[#bfece9] w-full text-left">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            
            <Link to="/sign-in">
              <li className=" text-slate-600 hover:bg-[#ffffff] hover:text-gray-800 rounded-full ">Login</li>
            </Link>
            
          )}
        </ul>
      </div>
    </header>
  );
}
