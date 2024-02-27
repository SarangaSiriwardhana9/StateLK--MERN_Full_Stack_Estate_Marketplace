/* eslint-disable no-unused-vars */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
import { useSelector } from 'react-redux';
import OAuth from '../Components/OAuth';
import back11 from '/back3.jpg'
/* google icon import */
import { FcGoogle } from 'react-icons/fc'




export default function SignIn() {
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)


  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })


  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await fetch('/api/auth/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',

          },
          body: JSON.stringify(formData),

        }


      )
      const data = await res.json();
      console.log(data);
      if (data.success == false) {
        dispatch(signInFailure(data.message))
        return;
      }
      dispatch(signInSuccess(data))

      Navigate('/')
    }
    catch (error) {
      dispatch(signInFailure(error.message))

    }

  };
  return (
    <div className='  flex items-center justify-center h-screen' style={{ backgroundImage: `url(${back11})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className=' p-4 py-10 w-[550px]  h-[500px] max-w-lg mx-auto rounded-xl  shadow-xl bg-[#ffffff] items-center justify-center'>
        <h1 className=' text-[#396d69] text-3xl text-center font-semibold mb-8'>Sign In</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>



          <input type='email' placeholder='email'
            className=' bg-slate-200 border p-3 rounded-lg'
            id='email'
            onChange={handleChange} />

          <input type='password'
            placeholder='password'
            className=' bg-slate-200 border p-3 rounded-lg' id='password'
            onChange={handleChange}

          />

          <button disabled={loading} className=
            'bg-[#489e97] mt-4 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            {loading ? 'Loading...' : 'Sign In'}</button>

            <span className='text-center text-slate-500 mt-4'>or</span>
          <OAuth />

        </form>
        <div className="flex gap-2 mt-8">
          <p>Don&apos;t have an account?</p>

          <Link to={"/sign-up"}>
            <span className='text-blue-700'>Sign up</span>
          </Link>

          {error && <p className='text-red-500 mt-5'>{error.toString()}</p>}

        </div>
      </div>
    </div>
  )
}
