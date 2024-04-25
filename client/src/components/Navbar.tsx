"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-undef */
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Logo, LogoSecondary, LogoTertiary } from "../../public/index";
import Image from "next/image";
import ThemeSwitch from "./themeSwitch";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const handleNavigation = (targetId) => {
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({behavior: "smooth"});
        }
    }

    const links = [  
        {
            id: 1,
            name: "Home",
            link: "/"
        },
        {
            id: 2,
            name: "About",
            link: "/#about"   
        },
        {
            id: 3,
            name: "Categories/Deals",
            link: "/#Deals"  
        },
        {
            id: 4,
            name: "Top Products",
            link: "/#TopProducts"
        },
    ];

    return (
        <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-black nav ">
            <div>
                <h1 className="text-5xl font-signature ml-2"><a className="link-underline link-underline-black" href="" target="_blank" rel="noreferrer">
                   <Image className="object-fit w-28 h-20 rounded-full bg-transparent" src={LogoTertiary} alt="Logo" />
                </a>
                </h1>
            </div>
            <ul className="hidden md:flex">
                { //Make sure the prameters within map are wrapped around ({}) values, or else there will be errors with the syntax
                    links.map(({id, link, name}) => (  
                        <li key={id} 
                        className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline mr-8" 
                        >
                            <Link href={link}>{name}</Link>
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
                <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black t0-gray-800 text-white">
                    {
                        links.map(({ id,link, name }) => (
                            <li 
                                key={id}
                                className="px-4 cursor-pointer capitalize py-6 text-4xl"
                            >
                                <Link onClick={() => setNav(!nav)} href={link}>
                                    {name}
                                </Link>
                            </li>
                                 
                        ))}
                        </ul>
            )}
            <div className="pr-12"><ThemeSwitch /></div>
        </div>
    );
};

export default Navbar;