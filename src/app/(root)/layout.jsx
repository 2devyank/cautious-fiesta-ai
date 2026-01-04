import { onBoardUser } from '@/modules/auth/actions';
import Navbar from '@/modules/home/components/Navbar';
import React from 'react'
export const runtime = "edge";

const layout =async ({children}) => {
    await onBoardUser();
  return (
    <main className='h-screen flex flex-col overflow-hidden'>
        <Navbar/>
        <div className='w-full flex-1 overflow-y-auto'>{children}</div>
    </main>
  )
}

export default layout