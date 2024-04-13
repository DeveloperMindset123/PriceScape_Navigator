"use client";
import React, { useState } from 'react';
import { signupFieldsConstants } from '@/constants/formFields';
import FormAction from './FormAction';
import Input from './Input';
import { PassThrough } from 'stream';
import { signup } from '@/app/login/action';

//TOOD: Enable email provider login option in Supabase Project

const fields=signupFieldsConstants
let fieldsState={}
fields.forEach(field=>fieldsState[field.id]='');

const Signup = () => {
    const [signUpState, setSignUpState] = useState(fieldsState);

    const handleChange=(e)=>setSignUpState({...signUpState, [e.target.id]:e.target.value});

    async function handleSubmitAndSignup(e:any){
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        //console.log(formData);
        const getEmail = formData.get('email');
        const getPassword = formData.get('password')
        console.log("Email", getEmail);
        console.log("Password", getPassword);
        const { data, error } = await supabase.auth.signup({
            email: getEmail,
            password: getPassword,
            options: {
                emailRedirectsTo: "/client/src/app/dashboard",
            }
        })
    }
  return (
    <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
        <div className='px-20 pb-12'>
            {
                fields.map(field=>
                    <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={signUpState[field.id]}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder} customClass={undefined}                        />
                    )
            }
            <FormAction handleSubmit={handleSubmitAndSignup} text="Signup" type={undefined} action={undefined} />
        </div>
    </form>
  )
}

export default Signup;