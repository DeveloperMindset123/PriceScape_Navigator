"use client";
import React, { useState } from 'react';
import Signup from './Signup';
import Header from './Header';

// Add a prop for toggleModal function
const SignupModal = ({ onToggleModal}) => {
  const [signInOrSignUpModalDisplayed, setsignInOrSignUpModalDisplayed] = useState('signin');
  const toggleModalType = () => {
    setsignInOrSignUpModalDisplayed(signInOrSignUpModalDisplayed === 'signin' ? 'signup' : 'singin');
  }
  return (
    <>
      <Header 
          heading="Signup or create an account"
          paragraph="Already have an account"
          linkName="Signin"
          linkUrl={signInOrSignUpModalDisplayed === 'signin' ? "#signup" : "#signin"}
          onToggleModalType={onToggleModal}
        />
      <Signup />
    </>
  )
}

export default SignupModal;