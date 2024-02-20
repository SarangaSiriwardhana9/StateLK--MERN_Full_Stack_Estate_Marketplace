/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from "swiper/modules";
import 'swiper/css/bundle';

export default function Listing() {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const params = useParams();
    useEffect(()=>{
       
        const fetchListings = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if (data.success == false) {
                    setError(true);
                    setLoading(false);
                     return;
                }
                setListing(data);
                setLoading(false)
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
            
        }
    fetchListings();
    
}, [params.listingId]);
  return (
  
    <main>
        {/* loading spinner */}
    {loading && (
      <div className="flex justify-center my-7">
        <svg className="animate-spin h-10 w-10 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.83A9.95 9.95 0 003.17 12H4zm13.17 0a9.95 9.95 0 00-1.83-5.17V4a8 8 0 018 8h-1.17zM20 12h-2.83a9.95 9.95 0 00-1.83 5.17H20a8 8 0 01-8-8v1.17A9.95 9.95 0 0020 12z"></path>
        </svg>
      </div>
    )}
    {/* error message */}
    {error && (
      <div className="text-center text-red-500">
        <h1>Something went wrong, please try again later.</h1>
      </div>
    )}
    {/* listing */}
    {listing && !loading && !error &&
    <div>
        {/* swiper */}
        <Swiper navigation>
            {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                    <div className='h-[400px]' style={{background:`url(${url}) no-repeat center `, backgroundSize:'cover'}}></div>
                </SwiperSlide>
            
            ))}
        </Swiper>
    </div>

    }
  </main>
  )
}