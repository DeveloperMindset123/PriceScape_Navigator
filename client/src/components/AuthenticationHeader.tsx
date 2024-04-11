import React from 'react'
import Image from 'next/image'


//TODO: This component isn't being used, it's a duplicate of Header.tsx
export default function AuthenticationHeader ({
        heading="", 
        paragraph="",
        linkName="",
        linkUrl="#"
        
}) {
    return (
        <div className='mb-10'>
            <div className='flex justify-center'>
                <Image 
                alt=""
                className="h-14 w-14"
                src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315" />
                
            </div>
        </div>
    )
}

