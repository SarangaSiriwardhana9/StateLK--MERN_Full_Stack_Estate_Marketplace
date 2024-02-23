/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
SwiperCore.use([Navigation]);
import './CSS/swiper-custom.css'
import home from '/home2.png';
import back11 from '/back11.jpg';


export default function Home() {
    const [offerListings, setOfferListings] = useState([]);
    const [saleListings, setSaleListings] = useState([]);
    const [rentListings, setRentListings] = useState([]);

    useEffect(() => {
        const fetchOfferListings = async () => {
            try {
                const res = await fetch('api/listing/get?offer=true&limit=4');
                const data = await res.json();
                setOfferListings(data);
                fetchRentListings();
            } catch (error) {
                console.log(error);
            }
        };
        const fetchRentListings = async () => {
            try {
                const res = await fetch('api/listing/get?type=rent&limit=10');
                const data = await res.json();
                setRentListings(data);
                fetchSaleListings();
            } catch (error) {
                console.log(error);
            }
        };
        const fetchSaleListings = async () => {
            try {
                const res = await fetch('api/listing/get?type=sale&limit=9');
                const data = await res.json();
                setSaleListings(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchOfferListings();
    }, []);

    return (
        <div className=' bg-blue-100'style={{ backgroundImage: `url(${back11})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* banner */}
            <div className=''>
                <div className="flex flex-col md:flex-row justify-center items-center mt-15" >
                    {/* top left side */}
                    <div className="md:w-1/2 p-4 md:p-8 text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
                        Simplify Your<span className="text-[#40b4ab]">  Property </span> Quest, Discover with Ease.
                            {/* Discover the   <span className="text-[#40b4ab]">Future</span>  of Living with StateLk..! */}
                        </h1>
                        <div className="text-lg text-gray-700 mt-4">
                            StateLk is the best place to find your next perfect place to live. We have a wide range of properties to choose from.
                        </div>
                        <Link to="/search" className="mt-8 inline-block">
                            <button className=" bg-[#aaf7f0] hover:bg-[#92e2db] text-[#1f5752] font-semibold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl">
                                get started
                            </button>
                        </Link>
                    </div>
                    {/* top right side */}
                    <div className="md:w-1/2 p-4 md:p-8 flex justify-center md:justify-end mt-16">
                        {/* home image */}
                        <img src={home} alt="home" className=" w-80 h-80 md:w-full md:h-full object-cover" />
                    </div>
                </div>
            </div>

            {/* swiper for sale */}

            <div className=' sm:p-4'>
                {rentListings && rentListings.length > 0 && (
                    <div className='my-3 relative'>
                        <div className='mb-10'>
                            <h2 className='oswald-font text-4xl md:text-5xl font-bold mb-4 text-gray-800'>Recent places for Sale</h2>
                            <Link className='oswald-font text-[#579b95] hover:text-[#41746f] text-xl mb-5' to={'/search?type=sale'}>Show more places for rent</Link>
                        </div>
                        <Swiper
                            // spaceBetween={-110} // Default gap between cards
                            slidesPerView={1} // Display 1 slide initially
                            navigation
                            className='relative'
                            breakpoints={{
                                640: {
                                    spaceBetween: 50, // Increase gap between cards on small screens
                                    slidesPerView: 1.5,
                                },
                                768: {
                                    spaceBetween: 15, // Increase gap between cards on medium screens
                                    slidesPerView: 2,
                                },
                                1024: {
                                    spaceBetween: -200, // Increase gap between cards on large screens
                                    slidesPerView: 3,
                                },
                                1025: {
                                    spaceBetween: -200, // Set spaceBetween to -400 for screens larger than 1024
                                    slidesPerView: 3, // Adjust the number of slides per view if needed
                                },
                            }}
                        >
                            {saleListings.map((listing) => (
                                <SwiperSlide key={listing._id}>
                                    <ListingItem listing={listing} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>
                )}
            </div>


            {/* swiper for rent */}
            <div className=' sm:p-4'>
                {rentListings && rentListings.length > 0 && (
                    <div className='my-3 relative'>
                        <div className='mb-10'>
                            <h2 className='oswald-font text-4xl md:text-5xl font-bold mb-4 text-gray-800'>Recent places for rent</h2>
                            <Link className='oswald-font text-[#579b95] hover:text-[#41746f]  text-xl mb-5' to={'/search?type=rent'}>Show more places for rent</Link>
                        </div>
                        <Swiper
                            // spaceBetween={-110} // Default gap between cards
                            slidesPerView={1} // Display 1 slide initially
                            navigation
                            className='relative'
                            breakpoints={{
                                640: {
                                    spaceBetween: 50, // Increase gap between cards on small screens
                                    slidesPerView: 1.5,
                                },
                                768: {
                                    spaceBetween: 15, // Increase gap between cards on medium screens
                                    slidesPerView: 2,
                                },
                                1024: {
                                    spaceBetween: -200, // Increase gap between cards on large screens
                                    slidesPerView: 3,
                                },
                                1025: {
                                    spaceBetween: -200, // Set spaceBetween to -400 for screens larger than 1024
                                    slidesPerView: 3, // Adjust the number of slides per view if needed
                                },
                            }}
                        >
                            {rentListings.map((listing) => (
                                <SwiperSlide key={listing._id}>
                                    <ListingItem listing={listing} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>
                )}
            </div>
        </div>
    );
}
