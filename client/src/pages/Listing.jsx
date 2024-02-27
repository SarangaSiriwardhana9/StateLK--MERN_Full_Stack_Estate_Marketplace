import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaTree,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaMoneyBillWave,
  FaTags,
} from 'react-icons/fa';
import { Gi3DStairs } from "react-icons/gi";

import { GiFamilyHouse } from "react-icons/gi";
import { FaLandMineOn } from "react-icons/fa6";
import { BsHouseCheckFill } from "react-icons/bs";



import Contact from '../Components/Contact';

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user)
  const [contact, setContact] = useState(false)
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  console.log(loading);

  return (
    <main>
      {loading &&  <div className='fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50'>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-gray-300 animate-pulse"></div>
                        <div className="text-white mt-2">Loading...</div>
                    </div>
                </div>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.name} - RS .{' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            {/* tags */}
            <div className='flex gap-4'>
              {listing.propertyType === 'land' && (
                <div className='flex items-center bg-yellow-900 text-white p-1 rounded-md'>
                  <FaTree className='mr-1' />
                  <p className='m-0'>vacant land</p>
                </div>
              )}
              <p className='bg-[#4f9993] w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? (
                  <>
                    <FaMoneyBillWave className='inline mr-1' /> For Rent
                  </>
                ) : (
                  <>
                    <FaTags className='inline mr-1' /> For Sale
                  </>
                )}
              </p>
              {listing.offer && (
                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  Rs. {+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>




            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>

              {listing.propertyType === 'land' && (
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaLandMineOn className='text-lg' />
                  {listing.AreaOfLand ? `Area Of Land: ${listing.AreaOfLand} perches` : 'Area Of Land: N/A'}
                </li>
              )}
              {listing.propertyType !== 'land' && (
                <>
                  <li className='flex items-center gap-1 whitespace-nowrap '>
                    <FaLandMineOn className='text-lg' />
                    {listing.AreaOfLand ? `Area Of Land: ${listing.AreaOfLand} perches` : 'Area Of Land: N/A'}
                  </li>
                  <li className='flex items-center gap-1 whitespace-nowrap '>
                    <BsHouseCheckFill className='text-lg' />
                    {listing.FloorArea ? `Floor Area: ${listing.FloorArea} sq.ft.` : 'Floor Area: N/A'}
                  </li>
                  <li className='flex items-center gap-1 whitespace-nowrap '>
                    <Gi3DStairs className='text-lg' />
                    {listing.NoOfFloors ? `No Of Floors: ${listing.NoOfFloors}` : 'No Of Floors: N/A'}
                  </li>
                  <li className='flex items-center gap-1 whitespace-nowrap '>
                    <GiFamilyHouse className='text-lg' />
                    {listing.AgeOfBuilding ? `Age Of Building: ${listing.AgeOfBuilding}` : 'Age Of Building: N/A'}
                  </li>

                  <li className='flex items-center gap-1 whitespace-nowrap '>
                    <FaBed className='text-lg' />
                    {listing.bedrooms > 1 ? `${listing.bedrooms} beds ` : `${listing.bedrooms} bed `}
                  </li>
                  <li className='flex items-center gap-1 whitespace-nowrap '>
                    <FaBath className='text-lg' />
                    {listing.bathrooms > 1 ? `${listing.bathrooms} baths ` : `${listing.bathrooms} bath `}
                  </li>
                  <li className='flex items-center gap-1 whitespace-nowrap '>
                    <FaParking className='text-lg' />
                    {listing.parking ? 'Parking spot' : 'No Parking'}
                  </li>
                  <li className='flex items-center gap-1 whitespace-nowrap '>
                    <FaChair className='text-lg' />
                    {listing.furnished ? 'Furnished' : 'Unfurnished'}
                  </li>

                </>
              )}

            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button onClick={() => setContact(true)} className='bg-[#6bd4cc] text-slate-700 text-lg p-2 rounded-md'>
                Contact Agent
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );

}

