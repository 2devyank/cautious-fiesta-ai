import ProjectForm from '@/modules/home/components/project-form';
import React from 'react'

const Page = () => {
  return (
<div className='w-full h-full'>
  <div className='w-full h-full flex flex-col items-center justify-center' > 
    <section className='flex flex-col w-full gap-4 items-center justify-center h-full'>
      <h1 className='text-4xl font-bold'>Made something with love ❤️</h1>
      <p className='text-lg text-muted-foreground'>Create application using AI</p>
      <ProjectForm/>
    </section>
  </div>
</div>
  );
};

export default Page;