"use client";
import React from 'react';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { productNames } from '@/lib/productData';


const SearchBar = () => {
    const [activeSearch, setActiveSearch] = useState<string[]>([]);

    const handleSearch = (e: { target: { value: string; }; }) => {
        // 
        if (e.target.value == '') {
            setActiveSearch([]);
            return false;
        }
        //otherwise, do the following
        setActiveSearch(productNames.filter(w => w.includes(e.target.value)).slice(0,8));
    }
  return (
    <form className='w-500 md: relative'>
        <div className="relative">
            <input type='search' placeholder='Search Up a Product' className='w-full p-4 rounded-full bg-slate-600 text-white' onChange={(e) => handleSearch(e)}/>
                <button className='absolute top-1/2 right-1 transform -translate-y-1/2 p-4 bg-slate-800 rounded-full'>
                    <AiOutlineSearch className='text-white'/>
                </button>
        </div>

        {
            activeSearch.length > 0 && (
                <div className='absolute top-20 p-4 bg-slate-800 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2'>
                    {
                        activeSearch.map((s, index) => (
                            <span key={index}>{s}</span>
                        ))
                    }
                </div>
            )
        }
        


    </form>
  )
}

export default SearchBar