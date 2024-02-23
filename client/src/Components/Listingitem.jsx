/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { MdLocationOn, MdHotel, MdHotTub, MdLandscape } from 'react-icons/md';
import '../pages/CSS/swiper-custom.css'

export default function ListingItem({ listing }) {
  return (
    <div className='bg-[#f9ffff]  shadow-lg hover:shadow-xl transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          <p className='text-red-500 mt-2 font-semibold'>
            RS.
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' '}
            {listing.type === 'rent' && <span className="text-slate-500  text-xs"> Per month</span>}
          </p>
          <div className='text-slate-700 flex gap-4'>
            {/* display land size if propertyType is 'land' */}
            {listing.propertyType === 'land' && (
              <div className='flex items-center'>
                <MdLandscape className='h-4 w-4 mr-1' />
                <span className='font-bold text-xs'>
                  {listing.AreaOfLand} perches
                </span>
              </div>
            )}
            {/* display area, bed, and bath if propertyType is not 'land' */}
            {listing.propertyType !== 'land' && (
              <>
                <div className='flex items-center'>
                  <MdLandscape className='h-4 w-4 mr-1' />
                  <span className='font-bold text-xs'>
                    {listing.AreaOfLand} perches
                  </span>
                </div>
                <div className='flex items-center'>
                  <MdHotel className='h-4 w-4 mr-1' />
                  <span className='font-bold text-xs'>
                    {listing.bedrooms > 1
                      ? `${listing.bedrooms} bedrooms`
                      : `${listing.bedrooms} bedroom`}
                  </span>
                </div>
                <div className='flex items-center'>
                  <MdHotTub className='h-4 w-4 mr-1' />
                  <span className='font-bold text-xs'>
                    {listing.bathrooms > 1
                      ? `${listing.bathrooms} bathrooms`
                      : `${listing.bathrooms} bathroom`}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
