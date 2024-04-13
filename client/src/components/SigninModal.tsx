"use client";
import React, { useState } from "react";
import Header from "./Header";
import Login from "./Login";

export default function SigninModal( {onToggleModal} ) : any {  /**Set the return type to any to not cause any errors */
const [signInOrSignUpModalDisplayed, setsignInOrSignUpModalDisplayed] = useState('signin');
  const toggleModalType = () => {
    setsignInOrSignUpModalDisplayed(signInOrSignUpModalDisplayed === 'signin' ? 'signup' : 'singin');
  }
  return (
    <>
        <Header 
            heading="Login to your Account"
            paragraph="Don't have an account yet?"
            linkName="Signup"
            linkUrl={signInOrSignUpModalDisplayed === 'signin' ? "#signup" : "#signin"}
            onToggleModalType={onToggleModal}
        />
        <Login />
    </>
  )

}