"use client";
import React, { useState } from 'react';
import { signupFieldsConstants } from '@/constants/formFields';
import FormAction from './FormAction';
import Input from './Input';
import { PassThrough } from 'stream';


const fields=signupFieldsConstants
let fieldsState={}
fields.forEach(field=>fieldsState[field.id]='');

const Signup = () => {
    const [signUpState, setSignUpState] = useState(fieldsState);

    const handleChange=(e)=>setSignUpState({...signUpState, [e.target.id]:e.target.value});

    const handleSubmit=(e)=>{
        e.preventDefault();
        createAccount()
    }

    //TODO: Implement logic for creating new user account using SUpabase
    const createAccount = () => {
        PassThrough
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
            <FormAction handleSubmit={handleSubmit} text="Signup" type={undefined} action={undefined} />
        </div>
    </form>
  )
}

export default Signup;