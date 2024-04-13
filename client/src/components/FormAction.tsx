import React from 'react'
import { login } from '@/app/login/action'

export default function FormAction({
    handleSubmit,
    type='Button',
    action='submit',
    text
} : { handleSubmit: any, type : any, action : any, text : any }) {
    return(
        <>
        {
            type==='Button' ?
            <button
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                onSubmit={handleSubmit}
                formAction={login}
            >
                {text}
            </button>
            :
            <></>
        }
        </>
    )
}