"use client";
import React, { useState } from 'react';
import  Link from 'next/link'; 
import Image from 'next/image';

export default function Header({
    heading="",
    paragraph="",
    linkName="",
    linkUrl="#",
    onToggleModalType
}) {

   const [signInOrSignUpModalDisplayed, setsignInOrSignUpModalDisplayed] = useState('signin');
  return (
    <div className='mb-10 pt-8 rounded-2xl'>
        <div className='flex justify-center'>
            <Image 
                className='h-14 w-14'
                alt="Header Image"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlDITjptTPhXrcHXO5hqDeAMDDdmiY2_vEeZabkm467aW5FRDDmJ4REkmDdpr371Cor3E&usqp=CAU"
                width={100}
                height={100}
            />
        </div>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>{heading}</h2>
        <p className='mt-2 text-center text-sm text-gray-600 mt-5'>
            {paragraph} {' '}
        <Link href="#signup" className="font-medium text-purple-600 hover:text-purple-500" onClick={(e) => {
            e.preventDefault();
            onToggleModalType();
        }}>{linkName}</Link>
        </p>
    </div>
  )
}
