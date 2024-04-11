"use client";  
import React, { useEffect, useState } from 'react';
import { images } from "@/utils/constants";
import Image from 'next/image';
import Description from './Description';

const Slider = () => {
  const [activeImage, setActiveImage] = useState(0);

  //define the clickNext function
  const clickNext = () => {
    activeImage === images.length - 1 ? 
    setActiveImage(0) 
    : setActiveImage(activeImage + 1);  
  };

  
  const clickPrev = () => {
    activeImage === 0 ? 
    setActiveImage(images.length - 1) 
    : setActiveImage(activeImage - 1);  
  };


  useEffect(() => {
    const timer = setTimeout(() => {
        clickNext();  
    }, 5000);  
    return () => {
        clearTimeout(timer);  
    };
  }, [activeImage]);  


  return (
    <main className='grid place-items-center w-full mx-auto max-w-5xl shadow-2xl rounded-2xl'>
        <div className={`w-full flex justify-center items-center gap-0 transition-transform ease-in-out duration-500 md:rounded-2xl p-6 md:p-0`}>
            {images.map((elem, idx) => (
                <div 
                    key={idx}
                className={`${
                    idx === activeImage
                        ? "block w-full h-[80vh] object-cover transition-all duration-500 ease-in-out"
                    : "hidden"
                    }`}
                 >
                    <Image 
                        src={elem.src}  
                        alt=""  
                        width={400}
                        height={400}
                        className='w-full h-full object-cover md:rounded-tl-3xl md:rounded-bl-3xl'  //by specifying object-cover, we are stating the image should take up the entirely of the screen
                    />
                </div>
            ))}
            <Description 
                activeImage={activeImage}  //this function is defined above
                clickNext={clickNext}  //this function is defined above
                clickPrev={clickPrev}  //this function is defined above
            />
        </div>  
    </main>
  )
}
export default Slider;