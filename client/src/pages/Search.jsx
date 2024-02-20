/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Search() {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type:'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc'
    })
    const [loading, setLoading] = useState(false)
    const [listings, setListings] = useState([])
    console.log(listings)

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFormUrl = urlParams.get('searchTerm');
        const typeFormUrl = urlParams.get('type');
        const parkingFormUrl = urlParams.get('parking');
        const furnishedFormUrl = urlParams.get('furnished');
        const offerFormUrl = urlParams.get('offer');
        const sortFormUrl = urlParams.get('sort');
        const orderFormUrl = urlParams.get('order');

        if(
            searchTermFormUrl || typeFormUrl || parkingFormUrl || furnishedFormUrl || offerFormUrl || sortFormUrl || orderFormUrl
        ){
            setSidebardata({
                searchTerm: searchTermFormUrl || '',
                type: typeFormUrl || 'all',
                parking: parkingFormUrl === 'true' ? true : false,
                furnished: furnishedFormUrl === 'true' ? true : false,
                offer: offerFormUrl === 'true' ? true : false,
                sort: sortFormUrl || 'created_at',
                order: orderFormUrl || 'desc'
            })
        }
        const fetchListings = async () => {
            setLoading(true)
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`)
            const data = await res.json()
            setListings(data);
            setLoading(false)
        }
        fetchListings()
        }, [location.search])

  

    const handleChange = (e) => {
        if (e.target.id ==='all' || e.target.id ==='rent' || e.target.id ==='sale') {
            setSidebardata({...sidebardata, type: e.target.id})
        }
        if(e.target.id === 'searchTerm'){
            setSidebardata({...sidebardata, searchTerm: e.target.value})
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setSidebardata({...sidebardata, [e.target.id]:
                 e.target.checked || e.target.checked === 'true' ? true : false})
        }
        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebardata({...sidebardata, sort, order})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       const urlPrams = new URLSearchParams()
         urlPrams.set('searchTerm', sidebardata.searchTerm)
            urlPrams.set('type', sidebardata.type)
            urlPrams.set('parking', sidebardata.parking)
            urlPrams.set('furnished', sidebardata.furnished)
            urlPrams.set('offer', sidebardata.offer)
            urlPrams.set('sort', sidebardata.sort)
            urlPrams.set('order', sidebardata.order)
            const searchQuery = urlPrams.toString();
            navigate(`/search?${searchQuery}`)
    }

  return (
    <div className='flex flex-col md:flex-row'>
        {/* left */}
            <div className=" p-7 border-b-2 md:border-r-2 md:min-h-screen">
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className=' whitespace-nowrap font-semibold'>Search Term :</label>
                        <input type="text"
                        id='searchTerm'
                        placeholder='Search Term'
                        className='border border-gray-300 rounded-lg p-2 w-full'
                        value={sidebardata.searchTerm}
                        onChange={handleChange}
                        />
                    </div>

                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>: Type</label>
                        <div className='flex gap-2 '>
                            <input type="checkbox" id="all" className='w-5'
                            onChange={handleChange}
                            checked={sidebardata.type === 'all' }
                            />
                            <span>Rent & Sale</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type="checkbox" id="rent" className='w-5'
                            onChange={handleChange}
                            checked={sidebardata.type === 'rent' }
                         />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type="checkbox" id="sale" className='w-5'
                             onChange={handleChange}
                            checked={sidebardata.type === 'sale' }
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

                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'> : Amenities</label>
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
                    {/* sort */}
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label>Sort By</label>
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
                    <button type='submit' className='bg-blue-500 text-white p-2 rounded-lg'>Search</button>


                </form>
            </div>
        {/* right */}
            <div className="flex flex-col">
                <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5 '>Search Results</h1>
            </div>
    </div>
  )
}
