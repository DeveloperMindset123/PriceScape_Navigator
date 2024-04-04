"use client";
import React from 'react';
//import RootLayout from '../layout';
//import 'client/src/app/globals.css'
import Navbar from '@/components/Navbar';
import Test from '@/components/test';
//import { LandingImage, secondImage, perfectImage } from '../../../public';
import Image from 'next/image';
import Slider from '@/components/Slider';


const Landing = () => {
  return (
    <>
      <div className='relative overflow-hidden shadow-lg bg-cover bg-no-repeat p-12 text-center'
        style={{
          "backgroundImage": "url('https://t3.ftcdn.net/jpg/05/35/13/82/360_F_535138292_62ZnI4Hcw37J8Jaeg4E9TzJwUciCwSnp.jpg')",
          "height": "400px",
        }}
      >
        <div className='absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed'
          style={{
            "backgroundColor": "rgba(0, 0, 0, 0.6)",
          }}
        >
          <div className='flex h-full items-center justify-center'>
            <div className='text-white'>
              <h2 className='mb-4 text-4xl font-semibold'>PriceScape</h2>
              <h4 className='mb-6 text-xl font-semibold'>Compare and Save on Every Purchase!</h4>
              <button 
                type='button'
                className='rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
                data-twe-ripple-init 
                data-twe-ripple-color="light"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-gradient-to-r from-[#c8bdba] to-[#a49d9b] w-full min-h-screen mx-auto grid place-items-center'>
      <Slider />
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