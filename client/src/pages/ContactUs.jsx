/* eslint-disable no-unused-vars */
import React, { useState } from 'react'; 
import back11 from '/backHeader.jpg';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'; 
import Footer from '../Components/Footer'; // 

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    console.log('Form submitted:', formData);

    
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div>
    <div className='flex justify-center items-center shadow-xl p-4 ' style={{backgroundImage: `url(${back11})`, minHeight: '100vh'}}>
      <div className='bg-white p-8 flex flex-col md:flex-row md:w-4/5 rounded-lg shadow-lg'>
        {/* Left side with company details (1/3 of width on large screens, full width on small screens) */}
        <div className='md:w-1/3 pr-4 md:pr-8 mb-4 md:mb-0'>
          <h2 className='text-xl font-bold mb-4'>StateLK Details</h2>
          <div className='flex items-center mb-2'>
            <FaEnvelope className='mr-2' />
            <span>Email: info@statelk.com</span>
          </div>
          <div className='flex items-center mb-2'>
            <FaMapMarkerAlt className='mr-2' />
            <span>Address: 123 StateLK Street, Colombo, Sri Lanka</span>
          </div>
          <div className='flex items-center'>
            <FaPhone className='mr-2' />
            <span>Mobile: +94 112 345 678</span>
          </div>
        </div>

        {/* Right side with contact form (2/3 of width on large screens, full width on small screens) */}
        <div className='md:w-2/3 bg-slate-100 shadow-lg p-4 rounded-xl'>
          <h2 className='text-xl font-bold mb-4'>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>Name</label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Your Name'
                required
                className='border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Your Email'
                required
                className='border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='message' className='block text-gray-700 font-bold mb-2'>Message</label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                placeholder='Your Message'
                required
                rows={4}
                className='border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500'
              />
            </div>
            <button type='submit' className='bg-[#40b4ab] text-white px-4 py-2 rounded hover:bg-[#4f9993]'>Submit</button>
          </form>
        </div>
      </div>
       {/* Footer */}
       
    </div>
    <Footer />
    </div>
  );
}
