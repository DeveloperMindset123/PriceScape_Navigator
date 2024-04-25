/* eslint-disable @next/next/no-img-element */
"use client"
import Link from "next/link";
import React from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import './styles/TopProducts.css';

const TopProducts = () => {
    const filteredItems = [
        {
            id: 1,
            img: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Camera",
            price: 200,
        },
        {
            id: 2,
            img: "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Phone",
            price: 150,
        },
        {
            id: 3,
            img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Laptop",
            price: 500
        },
        {
            id: 4,
            img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Headphone",
            price: 40,
        },
        {
            id: 5,
            img: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Keyboard",
            price: 65,
        },
        {
            id: 6,
            img:"https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Gaming Console",
            price: 450,
        },
        {
            id: 7,
            img: "https://images.unsplash.com/photo-1558537348-c0f8e733989d?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Bluetooth Speaker",
            price: 90,
        },
        {
            id: 8,
            img: "https://images.unsplash.com/photo-1467043237213-65f2da53396f?q=80&w=2134&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Summer Outfits",
            price: 70,
        },
        {
            id: 9,
            img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Apple Watch",
            price: 300,
        },
        {
            id: 10,
            img: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Sneakers",
            price: 80,
        }
    ];

    const slideLeft = () => {
        let slider = document.getElementById("slider");
        if (slider) {
            slider.scrollLeft = slider.scrollLeft - 235;
        }
    }

    const slideRight = () => {
        let slider = document.getElementById("slider");
        if (slider) {
            slider.scrollLeft = slider.scrollLeft + 235;
        }
    };
    return (
        <>
            <div className="trending p-5 pt-15 overflow-hidden">
                <div className="row-container flex flex-nowrap overflow-x-auto">
                    <div className="title-btns">
                        <h3></h3>
                        <div className="btns">
                            <button title="scroll left" onClick={slideLeft}>
                                <AiOutlineArrowLeft />
                            </button> 
                            <button title="scroll right" onClick={slideRight}>
                                <AiOutlineArrowRight />
                            </button>
                        </div>
                    </div>
                    <div className="row-container" id="slider">
                        {
                            filteredItems.map((item) => (
                                <div key={item.id} className="row-item flex-shrink-0 w-1/5">
                                    <Link href={`/`} className="link">
                                        <div className="item-header">
                                            <img src={item.img} alt="product" />
                                        </div>
                                        <div className="item-description">
                                            <p>{item.description}</p>
                                            <p className="item-price">${item.price}</p>
                                        </div>
                                    </Link>
                                </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopProducts;
