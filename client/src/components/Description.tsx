/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { images } from "@/utils/constants";
import { left, right } from '../../public/index';
import Image from 'next/image';
import { motion } from 'framer-motion';

type Props = {  //we can define a constant and save the values of the type here and pass that into the function (this is the sameas writting const Description = ({clickNext:any, clickPrevious:any}) => { ... }
    clickNext : any,
    clickPrev : any,
    activeImage : any,
}
/**
 * Note that in typescript, unless we define the type, we will get a type error
 */
const Description = ({clickNext, clickPrev, activeImage} : Props ) => {
  return (
    <div className='place-items-start w-full bg-[#e7dfd9] relative md:rounded-tr-3xl md:rounded-br-3xl'>
        <div className='uppercase text-sm absolute right-4 top-2 underline-offset-4 underline'>
            PriceScape
        </div>
        {images.map((elem, idx) => (
            <div   //this div, since it's within a map function, requires a key value, whcih is one of the two parameter values listed
                key={idx}
                className={`${
                    idx === activeImage
                      ? "block w-full h-full md:h-[80vh] py-20 md:px-20 px-10 text-left"
                      : "hidden"
                  }`}
            > 
            <motion.div
                initial = {{  //define what the text should look like initially
                    opacity: idx === activeImage ? 0 : 0.5,
                    scale: idx === activeImage ? 0.5 : 0.3,
                    //x: 300,
                }}
                animate = {{  //define what the text should look like during animation
                    opacity : idx === activeImage ? 1 : 0.5,
                    scale: idx === activeImage ? 1 : 0.3,

                }}

                //define how the transition based animation shoud look
                transition = {{
                    ease: "linear",
                    duration : 1.8,
                    x : { duration : 1},
                }}
                className='w-full'
            >
                <div className='py-16 text-5xl font-extrabold '>{elem.title}</div>
                <div className='leading-relaxed font-medium text-base tracking-wide h-40 italic text-gray-600'>{" "}{elem.desc}</div>
            </motion.div>
                <div className='absolute md:bottom-1 bottom-10 right-10 md:right-0 w-full flex justify-center items-center'>
                    <div 
                    onClick={clickPrev}
                    className='absolute bottom-2 right-10 cursor-pointer'>
                        <Image   //Unless the import has been made, we will run into errors with this
                            src={left}
                            alt="left arrow"
                            //width={20} --> make it automatcially adjust
                            //height={20} --> make it automatically adjust
                        />
                    </div>
                    <div 
                    onClick={clickNext}
                    className='absolute bottom-2 right-2 cursor-pointer'>
                    <Image   //Unless the import has been made, we will run into errors with this
                            src={right}
                            alt="left arrow"
                            //width={20} --> also make it automatically adjust
                            //height={20}  --> also make it automatically adjust as needed
                        />
                    </div>
                </div>
            </div>
        ))}
    </div>
  )}


export default Description;