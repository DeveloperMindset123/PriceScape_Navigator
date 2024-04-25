"use client";
import React from 'react';
import SearchBar from '@/components/DashboardComponents/SearchBar';
import Logout from '@/components/DashboardComponents/Logout';



const Landing = () => {
  return (
    <>
    <div className='m-8 fixed top-20 right-2'>
      <div><SearchBar /></div>
    </div>
    </>
  )
}

export default Landing;

/**  This is the old code, but it wasn't responsive
 * <div>
      <div className='grid lg:grid-cols-3 gap-0'>
        <div className='bg-gray-400 shadow-2xl mt-3 sm:m-0 lg:col-span-2'>
          <p className='text-6xl p-24 md:mt-16 sm:mt-12 mt-16'>
            Find the Best Prices, Compare and Save on Every Purchase!
          </p>
          <button 
            className='bg-transparent hover:bg-slate-100 text-black font-semibold hover:text-slate-950 py-2 px-4 border border-white hover:border-transparent rounded-full ml-24 '
          > 
            Get Started 
            </button>

        </div>
        <div className='shadow-2xl'>
          <Image className='lg:rounded-none sm:rounded-none' src={perfectImage} alt='landing' />
        </div>
      </div>
    </div>
 */