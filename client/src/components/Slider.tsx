"use client";  //we need to specify this since we are using useEffect and useState hooks from react
/* eslint-disable react-hooks/exhaustive-deps */
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
    : setActiveImage(activeImage + 1);  //if the activeimage matches the last index of the images object, setActiveImage to 0, aka reset, otherwise, set it based on the next index value
  };

  //similarly, define the logic for clickprevious, logic is similar, except instead of checking if we have reached the last index, this will check if we have reached the first index or not
  const clickPrev = () => {
    activeImage === 0 ? 
    setActiveImage(images.length - 1) 
    : setActiveImage(activeImage - 1);  //set the length to be the last image value, instead of resetting, we are changing the image to the last image in the array, and if we haven't reached the first index, instead simply go back, aka decrement by 1, this is where DSA is helpful
  };

  //there should also be a method to move the sliders automatically, for which we will need to use an useEffect hook
  /**
   * Understanding the purpose of useEffect:
   * The useEffect hook allows you to perform side effects in your components. Some example of such side effects are : fetching data, directly updating the DOM, and timers.
   * in our case, we will be using a timer based logic to automatically change the carousel images
   * 
   */
  useEffect(() => {
    const timer = setTimeout(() => {
        clickNext();  //call on the clickNext function
    }, 5000);  //then set a timer for 5 seconds, 5000 represents 5000 milliseconds
    return () => {
        clearTimeout(timer);  //clear the timer
    };
  }, [activeImage]);  //then display the activeImage


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
                        src={elem.src}  //accessing the unsplash image path here
                        alt=""  //keeping the alternative title empty for now
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