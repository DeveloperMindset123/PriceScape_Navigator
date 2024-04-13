"use client";

import { useState } from "react";
import { loginFieldsConstants } from "@/constants/formFields";
import Input from "./Input";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import { PassThrough } from "stream";
import { login } from "@/app/login/action";

const fields = loginFieldsConstants;
let fieldsState : any = {};
fields.forEach(field=>fieldsState[field.id]="");

export default function Login() {
    const [loginState,setLoginState]=useState(fieldsState);
    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    } 
    //import { supabase } from "@/app/supabase"; // Import the 'supabase' module

    async function handleSubmitAndAuthentication(e) {
        e.preventDefault();
        handleAuthenticateUser();
        const formData = new FormData(e.currentTarget)
        //console.log(formData);
        const getEmail = formData.get('email');
        const getPassword = formData.get('password');
        const {data, error} = await supabase.auth.signInWithPassword({
            email: getEmail,
            password: getPassword,
        })
    }

    //TODO: Logic for user authentication
    const handleAuthenticateUser = () => {
        PassThrough
    }

    return (
        <form className="mt-8 space-y-6 px-10 pb-12">
            <div className="-space-y-px">
                {
                    fields.map(field=>
                        <Input 
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder} 
                            customClass={undefined}                        />
                        
                    )
                }
            </div>
            <FormExtra />
            <FormAction handleSubmit={handleSubmitAndAuthentication} text="Login" type={undefined} action={undefined} />
        </form>
        //random
    )
}