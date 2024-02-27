/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import back11 from '/back11.jpg';
import Footer from '../Components/Footer';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    propertyType: 'house',
    name: '',
    description: '',
    address: '',
    NoOfFloors: '',
    AgeOfBuilding: '',
    WidthOfApproachRoad: '',
    AreaOfLand: '',
    FloorArea: '',
    type: 'rent',
    bedrooms: '',
    bathrooms: '',
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [hideLandFields, setHideLandFields] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);
  // eslint-disable-next-line no-unused-vars
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        // eslint-disable-next-line no-unused-vars
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (id === 'sale' || id === 'rent') {
      setFormData({
        ...formData,
        type: id,
      });
    } else if (id === 'parking' || id === 'furnished' || id === 'offer') {
      setFormData({
        ...formData,
        [id]: checked,
      });
    } else if (type === 'number' || type === 'text' || type === 'textarea') {
      setFormData({
        ...formData,
        [id]: value,
      });
    } else if (id === 'propertyType') {
      setFormData({
        ...formData,
        propertyType: value,
      });
      if (value === 'land') {
        setHideLandFields(true);
      } else {
        setHideLandFields(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };



  return (
    <div className='h-screen '>
    <main className='p-3 max-w-4xl mx-auto mb-10'>
      <h1 className='text-3xl font-semibold text-center my-7 text-[#779e9b]'>
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>

        {/* Left side */}
        <div className='flex flex-col gap-4 flex-1'>
          <div className='flex items-center gap-2'>
            <label htmlFor='propertyType' className='font-semibold text-slate-700'>Property Type:</label>
            <select
              id='propertyType'
              
              onChange={handleChange}
              value={formData.propertyType}
              className='border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            >
              
              <option value='house'>Residential</option>
              <option value='land'>Vacant Land</option>
            </select>
          </div>

          <p className='font-semibold text-slate-700'>Name:</p>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <p className='font-semibold text-slate-700'>Description:</p>
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <p className='font-semibold text-slate-700'>Address:</p>
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />

          {/* new Updates */}

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* div for property type */}
            {!hideLandFields && (
              <>
                <div>
                  <p className='font-semibold text-slate-700 mb-3'>No Of Floors :</p>
                  <input
                    type='number'
                    placeholder='No of Floors'
                    className='border p-3 rounded-lg w-full'
                    id='NoOfFloors'
                    required
                    onChange={handleChange}
                    value={formData.NoOfFloors}
                  />
                </div>
                <div>
                  <p className='font-semibold text-slate-700 mb-3'>Age of Building<lable className='text-slate-500'> (years)</lable> :</p>
                  <input
                    type='number'
                    placeholder='Age of Building'
                    className='border p-3 rounded-lg w-full'
                    id='AgeOfBuilding'
                    required
                    onChange={handleChange}
                    value={formData.AgeOfBuilding}
                  />
                </div>
                <div>
                  <p className='font-semibold text-slate-700 mb-3'>Floor Area<lable className='text-slate-500'> (sq.ft)</lable> :</p>
                  <input
                    type='number'
                    placeholder='Floor Area'
                    className='border p-3 rounded-lg w-full'
                    id='FloorArea'
                    required
                    onChange={handleChange}
                    value={formData.FloorArea}
                  />
                </div>
              </>)}{/* end of condition div */}
            <div>
              <p className='font-semibold text-slate-700 mb-3'>Area of Land<lable className='text-slate-500'> (perches)</lable> :</p>
              <input
                type='number'
                placeholder='Area of Land'
                className='border p-3 rounded-lg w-full'
                id='AreaOfLand'
                required
                onChange={handleChange}
                value={formData.AreaOfLand}
              />
            </div>
          </div>
        </div>


        {/* Right side */}
        <div className='flex flex-col flex-1 gap-4 mt-6'>
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <span>Rent</span>
            </div>

            {!hideLandFields && (
              <>
                <div className='flex gap-2'>
                  <input
                    type='checkbox'
                    id='parking'
                    className='w-5'
                    onChange={handleChange}
                    checked={formData.parking}
                  />
                  <span>Parking spot</span>
                </div>

                <div className='flex gap-2'>
                  <input
                    type='checkbox'
                    id='furnished'
                    className='w-5'
                    onChange={handleChange}
                    checked={formData.furnished}
                  />
                  <span>Furnished</span>
                </div>
              </>
            )}

            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={formData.offer}
              />

              <span>Offer</span>
            </div>

          </div>
          <div className='flex flex-wrap gap-6'>
            {!hideLandFields && (<>
              <div className='flex items-center gap-2'>
                <p>Bedrooms :</p>
                <input
                  type='number'
                  id='bedrooms'
                  min='1'
                  max='10'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.bedrooms}
                />

              </div>

              <div className='flex items-center gap-2'>
                <p>Bathrooms :</p>
                <input
                  type='number'
                  id='bathrooms'
                  min='1'
                  max='10'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.bathrooms}
                />

              </div>
            </>)}
            <div className='flex items-center gap-2'>
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                {formData.type === 'rent' && (
                  <span className='text-xs'>(per month)</span>
                )}
              </div>
              <input
                type='number'
                id='regularPrice'
                min='100000'
                max='10000000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.regularPrice}
              />

            </div>

            {formData.offer && (
              <div className='flex items-center gap-2'>
                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>

                  {formData.type === 'rent' && (
                    <span className='text-xs'>( per month)</span>
                  )}
                </div>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.discountPrice}
                />

              </div>
            )}
          </div>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className='p-3 bg-[#6fa5a0] text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Creating...' : 'Create listing'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
    <Footer />
    </div>
  );
}

