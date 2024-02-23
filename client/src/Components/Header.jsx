/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link,useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import backHeader from '/backHeader.jpg';

export default function Header() {
  const [isSticky, setSticky] = useState(false);
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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

  return (
    /* style={{ backgroundImage: `url(${backHeader})`, backgroundSize: 'cover', backgroundPosition: 'center' }} */
    <header className="bg-[#d1fffb] shadow-xl mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out z-50" >
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">State</span>
            <span className="text-slate-700">LK</span>
          </h1>
        </Link>

        <form  onSubmit={handleSubmit}
         className="bg-slate-100 p-3 rounded-lg flex items-center">
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
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>

          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>

          {currentUser ? (
            <Link to="/profile">
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            </Link>
          ) : (
            <Link to="/sign-in">
              <li className="text-slate-700 hover:underline">Sign in</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
