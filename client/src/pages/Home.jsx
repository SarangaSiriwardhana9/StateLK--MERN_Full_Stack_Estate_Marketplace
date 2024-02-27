/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../Components/Listingitem';
SwiperCore.use([Navigation]);
import './CSS/swiper-custom.css'
import home from '/home2.png';
import back11 from '/back11.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faLandmark, faBuilding, faCity } from '@fortawesome/free-solid-svg-icons';
import agent1 from '/agent1.jpg';
import agent2 from '/agent2.jpg';
import agent3 from '/agent3.jpg';
import agent4 from '/agent4.jpg';
import agent5 from '/agent5.jpg';
import map from '/map.png';
import { FaUserFriends, FaHandsHelping, FaClipboardList, FaHandshake } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import Footer from '../Components/Footer';

export default function Home() {
    const [offerListings, setOfferListings] = useState([]);
    const [saleListings, setSaleListings] = useState([]);
    const [rentListings, setRentListings] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchOfferListings = async () => {
            try {
                const res = await fetch('api/listing/get?offer=true&limit=4');
                const data = await res.json();
                setOfferListings(data);
                setLoading(false); // Set loading to false after data is fetched
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
        <div className=' bg-blue-100' style={{ backgroundImage: `url(${back11})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {loading && ( // Show loading indicator if loading is true
                <div className='fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50'>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-gray-300 animate-pulse"></div>
                        <div className="text-white mt-2">Loading...</div>
                    </div>
                </div>
            )}
            {/* banner */}
            <div className=''>
                <div className="flex flex-col md:flex-row justify-center items-center mt-15  " >
                    {/* top left side */}
                    <div className="md:w-1/2 p-4 md:p-8 text-center md:text-left   ">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
                            Simplify Your<span className="text-[#40b4ab]">  Property </span> Quest, Discover with Ease.
                            {/* Discover the   <span className="text-[#40b4ab]">Future</span>  of Living with StateLk..! */}
                        </h1>
                        <div className="text-lg text-gray-700 mt-4">
                            StateLk is the best place to find your next perfect place to live. We have a wide range of properties to choose from.
                        </div>
                        <Link to="/all-listings" className="mt-8 inline-block">
                            <button className=" bg-[#aaf7f0] hover:bg-[#92e2db] text-[#1f5752] font-semibold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl">
                                get started
                            </button>
                        </Link>
                    </div>
                    {/* top right side */}
                    <div className="md:w-1/2 p-4 md:p-8 flex justify-center md:justify-end mt-18">
                        {/* home image */}
                        <img src={home} alt="home" className=" w-80 h-80 md:w-full md:h-full object-cover" />
                    </div>
                </div>
            </div>

            {/* what are you looking for section */}
            <div>
                <div className="container mx-auto px-14 mt-8 mb-20">
                    <h2 className="oswald-font text-4xl md:text-5xl font-bold mb-16 text-gray-800 mb-12">What are you looking for ?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Card 1 */}
                        <div className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center transition-colors duration-300 hover:bg-blue-100">
                            <FontAwesomeIcon icon={faHome} className="text-4xl text-gray-500 mb-4 hover:text-blue-500" />
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Homes for Sale</h3>
                            <p className="text-sm text-gray-600 text-center">Find your dream home today!</p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center transition-colors duration-300 hover:bg-blue-100">
                            <FontAwesomeIcon icon={faLandmark} className="text-4xl text-gray-500 mb-4 hover:text-blue-500" />
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Land for Sale</h3>
                            <p className="text-sm text-gray-600 text-center">Explore available land options.</p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center transition-colors duration-300 hover:bg-blue-100">
                            <FontAwesomeIcon icon={faBuilding} className="text-4xl text-gray-500 mb-4 hover:text-blue-500" />
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Commercial Properties</h3>
                            <p className="text-sm text-gray-600 text-center">Find properties for your business.</p>
                        </div>
                        {/* Card 4 */}
                        <div className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center transition-colors duration-300 hover:bg-blue-100">
                            <FontAwesomeIcon icon={faCity} className="text-4xl text-gray-500 mb-4 hover:text-blue-500" />
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Rural Properties</h3>
                            <p className="text-sm text-gray-600 text-center">Discover peaceful rural living.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* swiper for sale */}
            <div className='  sm:p-14'>
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
            <div className='sm:p-14  '>
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
            
            {/* Our agents section with swiper */}
            {!loading && ( // Render Swiper only when loading is false
            
            <div>
                <div className=" mx-auto px-4 mt-8 mb-16 sm:px-14">
                    <h2 className="oswald-font text-4xl md:text-5xl font-bold mb-4 text-gray-800 ">Our Agents</h2>
                    <p className="text-lg text-gray-600 mb-4  mb-8">Meet our dedicated team of real estate agents ready to assist you in finding your dream property.</p>
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                        }}
                        navigation
                    >
                        {/* Agent 1 */}
                        <SwiperSlide>
                            <div className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center">
                                <img src="/agent1.jpg" alt="Agent 1" className="w-24 h-24 rounded-full mb-4" />
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Saman Kumara</h3>
                                <p className="text-sm text-gray-600 text-center">Real Estate Consultant with 10+ years of experience.</p>
                            </div>
                        </SwiperSlide>
                        {/* Agent 2 */}
                        <SwiperSlide>
                            <div className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center">
                                <img src="/agent2.jpg" alt="Agent 2" className="w-24 h-24 rounded-full mb-4" />
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Nadeesha Silva</h3>
                                <p className="text-sm text-gray-600 text-center">Property Manager specializing in residential properties.</p>
                            </div>
                        </SwiperSlide>
                        {/* Agent 3 */}
                        <SwiperSlide>
                            <div className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center">
                                <img src="/agent3.jpg" alt="Agent 3" className="w-24 h-24 rounded-full mb-4" />
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Thilini Perera</h3>
                                <p className="text-sm text-gray-600 text-center">Real Estate Agent helping clients find their dream homes.</p>
                            </div>
                        </SwiperSlide>
                        {/* Agent 4 */}
                        <SwiperSlide>
                            <div className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center">
                                <img src="/agent4.jpg" alt="Agent 4" className="w-24 h-24 rounded-full mb-4" />
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Rajitha Fernando</h3>
                                <p className="text-sm text-gray-600 text-center">Commercial Property Specialist assisting businesses in finding the right space.</p>
                            </div>
                        </SwiperSlide>
                        {/* Agent 5 */}
                        <SwiperSlide>
                            <div className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center">
                                <img src="/agent5.jpg" alt="Agent 5" className="w-24 h-24 rounded-full mb-4" />
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Chaminda Perera</h3>
                                <p className="text-sm text-gray-600 text-center">Land Sales Expert with extensive knowledge of the local market.</p>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            )}


            {/* Discover States All Around the Country */}
            <div>
                <section className="flex flex-wrap items-center justify-center px-12 mt-24">
                    <div className="w-full lg:w-1/2 ">


                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <img src={map} alt="Map" className="w-full" />
                        </div>

                    </div>
                    <div className="w-full lg:w-1/2 p-4">

                        <div className="bg-[#d1fcf8]  rounded-lg shadow-lg ">
                            <h2 className="text-2xl text-[#698d89] lg:text-3xl font-bold mb-4">Discover States All Around the Country</h2>
                            <p className="text-lg lg:text-xl text-gray-700">
                                StateLk provides a comprehensive platform to explore properties in various states across Sri Lanka.
                                Whether you&apos;re looking for a home or land, you can easily find listings from different regions,
                                making it convenient to discover your next property investment.
                            </p>
                        </div>

                    </div>
                </section>
            </div>

            {/* Our Partners section */}
            <div className="container mx-auto px-16 mt-14">
                <h2 className="oswald-font text-4xl md:text-5xl font-bold mb-4 text-gray-800">Our Partners</h2>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed line-clamp-2  mb-8">Discover our trusted partners who help us deliver exceptional real estate services.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Partner 1 */}
                    <div className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center">
                        <FaUserFriends className="text-4xl text-gray-500 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">ProManage Solutions</h3>
                        <p className="text-sm text-gray-600 text-center">Specializing in residential property management.</p>
                        <div className="mt-4 flex items-center">
                            <FaStar className="text-yellow-500 mr-2" />
                            <p className="text-sm text-gray-600">4.8</p>
                        </div>
                    </div>
                    {/* Partner 2 */}
                    <div className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center">
                        <FaHandsHelping className="text-4xl text-gray-500 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">BuildRight Construction</h3>
                        <p className="text-sm text-gray-600 text-center">Offering high-quality construction services for homes and buildings.</p>
                        <div className="mt-4 flex items-center">
                            <FaStar className="text-yellow-500 mr-2" />
                            <p className="text-sm text-gray-600">4.5</p>
                        </div>
                    </div>
                    {/* Partner 3 */}
                    <div className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center">
                        <FaClipboardList className="text-4xl text-gray-500 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">LegalEase Firm</h3>
                        <p className="text-sm text-gray-600 text-center">Providing legal services for real estate transactions and property disputes.</p>
                        <div className="mt-4 flex items-center">
                            <FaStar className="text-yellow-500 mr-2" />
                            <p className="text-sm text-gray-600">4.2</p>
                        </div>
                    </div>
                    {/* Partner 4 */}
                    <div className="bg-white rounded-xl p-4 shadow-md flex flex-col items-center">
                        <FaHandshake className="text-4xl text-gray-500 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">FinWise Finance</h3>
                        <p className="text-sm text-gray-600 text-center">Offering mortgage and financing solutions for property purchases.</p>
                        <div className="mt-4 flex items-center">
                            <FaStar className="text-yellow-500 mr-2" />
                            <p className="text-sm text-gray-600">4.0</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div className='mt-10'>
                <Footer />
            </div>
        </div>

    );
}
