import { SignIn } from '@clerk/nextjs'
import React from 'react'
export const runtime = "edge";

const SignInPage = () => {
  return (
    <div>
        <SignIn/>
    </div>
  )
}

export default SignInPage