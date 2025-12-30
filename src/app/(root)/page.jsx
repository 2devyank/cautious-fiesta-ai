import ProjectForm from '@/modules/home/components/project-form';
import ProjectList from '@/modules/home/components/project-list';
import React from 'react'

const Page = () => {
  return (
<div className='w-full min-h-full'>
  <div className='w-full min-h-full flex flex-col items-center justify-center' > 
    <section className='flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-4 items-center justify-center min-h-full py-8'>
      <h1 className='text-4xl font-bold'>Made something with love ❤️</h1>
      <p className='text-lg text-muted-foreground'>Create application using AI</p>
      <div className='w-full max-w-5xl'>

      <ProjectForm/>
      </div>
      <ProjectList/>
    </section>
  </div>
</div>
  );
};

export default Page;