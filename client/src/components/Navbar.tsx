"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-undef */
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Logo, LogoSecondary, LogoTertiary } from "../../public/index";
import Image from "next/image";

console.log(Logo);

const Navbar = () => {
    const [nav, setNav] = useState(false);
//replace them with actual links later
    const links = [  //modify this as needed, we may not need them all to begin with, can be replaed with other information if needed
        {
            id: 1,
            link: "Home",
        },
        {
            id: 2,
            link: "About",
        },
        {
            id: 3,
            link: "Categories/Deals",
        },
        {
            id: 4,
            link: "Top Products",
        },
        {
            id: 5,
            link: "Register/Login",
        },
    ];

    return (
        <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-black fixed nav">
            <div>
                <h1 className="text-5xl font-signature ml-2"><a className="link-underline link-underline-black" href="" target="_blank" rel="noreferrer">
                   <Image className="object-fit w-28 h-20 rounded-full bg-transparent" src={LogoTertiary} alt="Logo" />
                </a>
                </h1>
            </div>
            <ul className="hidden md:flex">
                { //Make sure the prameters within map are wrapped around ({}) values, or else there will be errors with the syntax
                    links.map(({id, link}) => (  
                        <li key={id} 
                        className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline mr-8" 
                        >
                            <Link href={link}>{link}</Link>
                        </li>
                    ))}
            </ul>
            <div
                onClick={() => setNav(!nav)} 
                className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
            > 
                { nav ? <FaTimes size={30} /> : <FaBars size={30} /> }  
            </div>
            { nav && (
                <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black t0-gray-800 text-gray-500">
                    {
                        links.map(({ id,link }) => (
                            <li 
                                key={id}
                                className="px-4 cursor-pointer capitalize py-6 text-4xl"
                            >
                                <Link onClick={() => setNav(!nav)} href={link}>
                                    {link}
                                </Link>
                            </li>
                                 
                        ))}
                        </ul>
            )}
        </div>
    );
};

export default Navbar;