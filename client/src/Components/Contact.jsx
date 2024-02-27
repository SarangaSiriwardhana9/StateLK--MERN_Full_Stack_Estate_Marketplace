/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className="w-full px-4 py-8 bg-white shadow-lg rounded-lg">
          <p className="text-center text-lg font-semibold mb-4">
            Contact {landlord.username} for {listing.name.toLowerCase()}
          </p>
          <textarea
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
            name='message'
            id='message'
            rows='4'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="block w-full px-4 py-2 text-center text-white bg-[#4f9993] rounded-md hover:bg-[#3f807a] focus:outline-none"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
