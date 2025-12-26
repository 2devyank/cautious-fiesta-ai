import { onBoardUser } from '@/modules/auth/actions';
import Navbar from '@/modules/home/components/Navbar';
import React from 'react'

const layout =async ({children}) => {
    await onBoardUser();
  return (
    <main className=' h-screen'>
        <Navbar/>
        <div className='w-full h-full'>{children}</div>
    </main>
  )
}

export default layout