import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
<nav className='w-full flex justify-center items-center h-14 bg-background py-[10px] px-[40px] border-b'>
<div className='w-full max-w-7xl mx-auto flex items-center justify-between'>
    <Link href='/'>
    <Button className='text-2xl font-bold'>
        Home
        </Button>
    </Link>

    <SignedOut>
        <div className='flex items-center gap-4'>
            <SignUpButton>
                <Button variant='outline' size='sm'>
                    Sign Up
                </Button>
            </SignUpButton>
            <SignInButton>
                <Button size='sm'>
                    SignIn
                </Button>
            </SignInButton>
        </div>
    </SignedOut>
            <SignedIn>
    <div className='flex items-center gap-4 ' >
                        <UserButton/>
    </div>

            </SignedIn>
</div>
</nav>
  )
}

export default Navbar