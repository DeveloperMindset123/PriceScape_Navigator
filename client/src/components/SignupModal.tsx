"use client";
import React, { useState } from 'react';
import Signup from './Signup';
import Header from './Header';

// Add a prop for toggleModal function
const SignupModal = ({ onToggleModal}) => {
  return (
    <>
      <Header 
          heading="Signup or create an account"
          paragraph="Already have an account"
          linkName="Signin"
          linkUrl="#Signin"
          onToggleModalType={onToggleModal}
        />
      <Signup />
    </>
  )
}

export default SignupModal;