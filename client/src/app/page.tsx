"use client";
import React, { Fragment, useState } from 'react';
import Navbar from '@/components/Navbar';
import Test from '@/components/test';
import Image from 'next/image';
import Slider from '@/components/Slider';
import FormModal from '@/components/FormModal';


const Landing = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <Fragment>
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
                onClick={() => setShowModal(true)}
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
      <FormModal isVisibleBool={showModal} onClose={() => setShowModal(false)}>
      <div className='py-6 px-6 lg:px-8 text-left'>
        <h3 className='mb-4 text-xl font-medium text-gray-900'>Implementing Sign in Logic</h3>
      </div>
      </FormModal>
    </Fragment>
    </>
  )
}

export default Landing;

