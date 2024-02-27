/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Listingitem from '../Components/Listingitem';
import back11 from '/back11.jpg';
export default function AllListings() {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        propertyType: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc'
    })
    const [loading, setLoading] = useState(false)
    const [listings, setListings] = useState([])
    const [showMore, setShowMore] = useState(false)

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFormUrl = urlParams.get('searchTerm');
        const typeFormUrl = urlParams.get('type');
        const propertyTypeFormUrl = urlParams.get('propertyType');
        const parkingFormUrl = urlParams.get('parking');
        const furnishedFormUrl = urlParams.get('furnished');
        const offerFormUrl = urlParams.get('offer');
        const sortFormUrl = urlParams.get('sort');
        const orderFormUrl = urlParams.get('order');

        if (
            searchTermFormUrl || typeFormUrl || propertyTypeFormUrl || parkingFormUrl || furnishedFormUrl || offerFormUrl || sortFormUrl || orderFormUrl
        ) {
            setSidebardata({
                searchTerm: searchTermFormUrl || '',
                type: typeFormUrl || 'all',
                propertyType: propertyTypeFormUrl || 'all',
                parking: parkingFormUrl === 'true' ? true : false,
                furnished: furnishedFormUrl === 'true' ? true : false,
                offer: offerFormUrl === 'true' ? true : false,
                sort: sortFormUrl || 'created_at',
                order: orderFormUrl || 'desc'
            })
        }
        const fetchListings = async () => {
            setLoading(true)
            setShowMore(false)
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`)
            const data = await res.json()
            if (data.length > 8) {
                setShowMore(true)
            }else{
                setShowMore(false)
            }
            setListings(data);
            setLoading(false)
        }
        fetchListings()
    }, [location.search])



    const handleChange = (e) => {
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSidebardata({ ...sidebardata, type: e.target.id })
        }
        if (e.target.id === 'searchTerm') {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value })
        }
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSidebardata({
                ...sidebardata, [e.target.id]:
                    e.target.checked || e.target.checked === 'true' ? true : false
            })
        }
        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebardata({ ...sidebardata, sort, order })
        }
        if (e.target.id === 'propertyType') {
            setSidebardata({ ...sidebardata, propertyType: e.target.value })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlPrams = new URLSearchParams()
        urlPrams.set('searchTerm', sidebardata.searchTerm)
        urlPrams.set('type', sidebardata.type)
        urlPrams.set('propertyType', sidebardata.propertyType)
        urlPrams.set('parking', sidebardata.parking)
        urlPrams.set('furnished', sidebardata.furnished)
        urlPrams.set('offer', sidebardata.offer)
        urlPrams.set('sort', sidebardata.sort)
        urlPrams.set('order', sidebardata.order)
        const searchQuery = urlPrams.toString();
        navigate(`/search?${searchQuery}`)
    }

    const onShowMoreClick = async () => {
        const numOfListings = listings.length;
        const startIndx = numOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndx);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`)
        const data = await res.json()
        if (data.length < 9) {
            setShowMore(false)
        }
        setListings([...listings, ...data]);
    }


    return (
        <div className='flex flex-col md:flex-row  ' style={{ backgroundImage: `url(${back11})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* left */}
            <div className="p-4 border-b-2 md:border-r-2 md:min-h-screen  w-96 mt-4">
                <form onSubmit={handleSubmit} className='flex flex-col gap-2'>

                    {/* left menu starts */}
                    <div className='flex items-center gap-2'>
                        <label className=' whitespace-nowrap font-semibold text-slate-600'>Search Term :</label>
                        <input type="text"
                            id='searchTerm'
                            placeholder='Search Term'
                            className='border border-gray-300 rounded-lg p-2 w-full'
                            value={sidebardata.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Add a new input for property type */}

                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold text-slate-600'> : Property Type</label>
                        <select
                            onChange={handleChange}
                            value={sidebardata.propertyType}
                            name="propertyType" id="propertyType" className='border border-gray-300 rounded-lg p-2'>
                            <option value="all">All</option>
                            <option value="land">Land</option>
                            <option value="house">House</option>
                        </select>
                    </div>

                    <div className='flex flex-col items-start'>
                        <label className='font-semibold text-slate-600'>: Type</label>
                        <div className='flex flex-col pl-10 gap-2'>
                            <div className='flex gap-2 '>
                                <input type="checkbox" id="all" className='w-5'
                                    onChange={handleChange}
                                    checked={sidebardata.type === 'all'}
                                />

                                <span>Rent & Sale</span>
                            </div>

                            <div className='flex gap-2 '>
                                <input type="checkbox" id="rent" className='w-5'
                                    onChange={handleChange}
                                    checked={sidebardata.type === 'rent'}
                                />
                                <span>Rent</span>
                            </div>

                            <div className='flex gap-2 '>
                                <input type="checkbox" id="sale" className='w-5'
                                    onChange={handleChange}
                                    checked={sidebardata.type === 'sale'}
                                />
                                <span>Sale</span>
                            </div>

                            <div className='flex gap-2 '>
                                <input type="checkbox" id="offer" className='w-5'
                                    onChange={handleChange}
                                    checked={sidebardata.offer}
                                />
                                <span>Offer</span>
                            </div>
                        </div>
                    </div>



                    <div className='flex flex-col items-start'>
                        <label className='font-semibold text-slate-600'> : Amenities</label>
                        <div className='flex flex-col gap-2 pl-10'>
                            <div className='flex gap-2 '>
                                <input type="checkbox" id="parking" className='w-5'
                                    onChange={handleChange}
                                    checked={sidebardata.parking}
                                />
                                <span>Parking</span>
                            </div>

                            <div className='flex gap-2 '>
                                <input type="checkbox" id="furnished" className='w-5'
                                    onChange={handleChange}
                                    checked={sidebardata.furnished}
                                />
                                <span>Furnished</span>
                            </div>
                        </div>
                    </div>

                    {/* sort */}

                    <div className='flex flex-col '>
                        <label className='font-semibold text-slate-600'>: Sort By</label>
                        <div className=''>
                            <select
                                onChange={handleChange}
                                defaultValue={'created_at_desc'}
                                name="sort" id="sort_order" className='border border-gray-300 rounded-lg p-2'>
                                <option value="regularPrice_desc">Price High to Low</option>
                                <option value="regularPrice_asc">Price Low to High</option>
                                <option value="createdAt_desc">Latest</option>
                                <option value="CreatedAt_asc">Oldest</option>
                            </select>
                        </div>
                    </div>

                    {/* ledt menu ends */}

                    <button type='submit' className='bg-[#aaf7f0] hover:bg-[#92e2db] text-[#1f5752] font-semibold p-2 mt-5 rounded-lg'>Search</button>
                </form>
            </div>

            {/* right */}
            <div className="items-center">
                {/* Search results text */}
                <h2 className='oswald-font text-2xl md:text-4xl font-bold mb-8 mt-4 text-center text-gray-600'>Explore All Available  Properties </h2>
                    
                
                {/* centered loading */}
                {loading && (
                    <div className='fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50'>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-gray-300 animate-pulse"></div>
                            <div className="text-white mt-2">Loading...</div>
                        </div>
                    </div>
                )}
                {/* listings */}
                <div className='flex flex-wrap gap-4 w-full gap-y-6 justify-center'>
                    {!loading && listings && listings.map((listing) => (
                        <Listingitem key={listing._id} listing={listing} />

                    ))}
                </div>
                <div className='w-full items-center flex justify-center mb-10 mt-4'>
                    {showMore && (
                        <button onClick={onShowMoreClick} className='inline-block px-4 py-2 mt-4 bg-[#aaf7f0] hover:bg-[#92e2db] text-[#1f5752] font-semibold rounded-lg shadow-md  transition-colors duration-300 ease-in'>
                            Show More
                        </button>

                    )}
                </div>
            </div>

        </div>


    )

}

