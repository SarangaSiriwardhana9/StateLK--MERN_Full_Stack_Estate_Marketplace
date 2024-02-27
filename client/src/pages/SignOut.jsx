/* eslint-disable no-unused-vars */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import OAuth from '../Components/OAuth';
import back11 from '/back3.jpg'
/* google icon import */
import { FcGoogle } from 'react-icons/fc'


export default function SignOut() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState('')

  const [loading, setLoading] = useState(false)
  const [loading1, setLoading2] = useState(false)
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })


  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await fetch('/api/auth/signup',
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
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null)

      navigate('/sign-in')
    }

    catch (error) {
      setLoading(false)
      setError(error.message)

    }

  };
  console.log(formData)

  return (
    <div className='  flex items-center justify-center h-screen' style={{ backgroundImage: `url(${back11})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className=' p-4 py-10 w-[550px]  h-[600px] max-w-lg mx-auto rounded-xl  shadow-xl bg-[#ffffff] items-center justify-center'>
      <h1 className='text-[#396d69] text-3xl text-center font-semibold my-7'>Sign up</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder="username"
          className='border bg-slate-200 p-3 rounded-lg' id='username'
          onChange={handleChange}

        />
        <input type='email' placeholder='email'
          className=' border bg-slate-200 p-3 rounded-lg'
          id='email'
          onChange={handleChange} />

        <input type='password'
          placeholder='password'
          className='border bg-slate-200 p-3 rounded-lg' id='password'
          onChange={handleChange}

        />

        <button disabled={loading} className=
          'bg-[#489e97] text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign Up'}</button>
        <span className='text-center text-slate-500 mt-4'>or</span>
        <OAuth />






      </form>
      <div className="flex gap-2 mt-14">
        <p>Have an account?</p>

        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign in</span>
        </Link>


      </div>
      </div>
    </div>
  )
}
