/* eslint-disable no-unused-vars */
import React from 'react';
import { FaDatabase, FaHome, FaUsers, FaClock } from 'react-icons/fa';
import aboutUs from '/aboutUs.jpg';
import back11 from '/backHeader.jpg';

export default function About() {
  return (
    <div className='flex justify-center items-center shadow-xl p-4 ' style={{backgroundImage: `url(${back11})`, minHeight: '100vh'}}>
    <div className="max-w-6xl mx-auto p-8 bg-slate-50 rounded-xl">
      {/* Banner */}
      <div className="bg-[#bff5f0] p-8 rounded-lg mb-8">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-lg">
          StateLK is dedicated to providing the best real estate experience in Sri Lanka.
          Our mission is to connect buyers and sellers, making property transactions
          simple, efficient, and enjoyable.
        </p>
      </div>

      {/* Fast Facts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#dafffb] p-4 rounded-lg flex items-center">
          <FaDatabase className="text-3xl text-[#8bd4ce] mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Living Database Size</h2>
            <p className="text-gray-600">9852 properties</p>
          </div>
        </div>
        <div className="bg-[#dafffb] p-4 rounded-lg flex items-center">
          <FaHome className="text-3xl text-[#8bd4ce]  mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Listings on Site</h2>
            <p className="text-gray-600">1582M listings</p>
          </div>
        </div>
        <div className="bg-[#dafffb] p-4 rounded-lg flex items-center">
          <FaUsers className="text-3xl text-[#8bd4ce]  mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Average Monthly Unique Users</h2>
            <p className="text-gray-600">1M users</p>
          </div>
        </div>
        <div className="bg-[#dafffb] p-4 rounded-lg flex items-center">
          <FaClock className="text-3xl text-[#8bd4ce]  mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Time Spent</h2>
            <p className="text-gray-600">85958 minutes</p>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="flex">
        <div className="w-1/2 pr-4 ">
          <img src={aboutUs} alt="About Us" className="w-full rounded-lg  " />
        </div>
        <div className="w-1/2 pl-4 text-lg bg-[#bff5f0] px-2 py-8">
          <p>
          Welcome to StateLk, your premier destination for real estate in Sri Lanka. At StateLk, we are committed to providing a seamless and efficient platform for buying and selling properties across the island. Our mission is to connect prospective buyers with sellers, making property transactions simple, secure, and enjoyable. With a diverse range of listings and a user-friendly interface, StateLk is your go-to source for finding your dream home or ideal investment property in Sri Lanka.
          </p>
        </div>
      </div>
    </div>
  </div>
  );
}
