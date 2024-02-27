/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import { FaTrash, FaEdit } from 'react-icons/fa';

import ListingItem from '../components/ListingItem';
import { Link } from 'react-router-dom';
import profileback1 from '/profileback2.jpg';

export default function MyListings() {
  const [userListings, setUserListings] = useState([]);
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [showListingsError, setShowListingsError] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setShowListingsError(true);
          return;
        }

        setUserListings(data);
      } catch (error) {
        setShowListingsError(true);
      }
    };
    fetchListings();
  }, []);

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleListingEdit = (listingId) => {
    // Implement edit functionality here
    console.log('Edit listing with ID:', listingId);
  };

  return (
    <div className='' style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${profileback1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className="container mx-auto px-4 py-8">
      <h1 className="oswald-font text-4xl md:text-5xl font-bold mb-8 text-center text-[#4f6d69]">My Listings</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 gap-y-8">
          <Link
            to="/create-listing"
            className=" bg-slate-100 shadow-md rounded-lg p-4    w-80 flex flex-col justify-center items-center hover:bg-blue-100 transition duration-300 ease-in-out"
          >
            <FaPlus className="text-4xl mb-2 text-blue-500" />
            <p className="text-lg text-blue-500 font-semibold">Add Listing</p>
          </Link>
          {userListings.map((listing) => (
            <div key={listing._id} className="relative">
              <ListingItem listing={listing} />
              <div className="absolute top-2 right82 flex gap-2">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  <FaTrash />
                </button>
                {/* link to update */}
                <Link
                  to={`/update-listing/${listing._id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  <FaEdit />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
