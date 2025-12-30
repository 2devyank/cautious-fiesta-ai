'use client'
import { Spinner } from '@/components/ui/spinner';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useGetProjects } from '@/modules/projects/hooks/project';
import { Folder } from 'lucide-react';
import React from 'react'
import { useRouter } from 'next/navigation';

const ProjectList = () => {
    const {data:projects,isPending}=useGetProjects();
const router=useRouter();
    const formatDate=(date)=>{
        return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    if(isPending) return <div className='flex items-center justify-center h-full'><Spinner/></div>
    if(!projects || projects.length===0) return <div className='flex items-center justify-center h-full'>No projects found</div>
  return (
    <div className='w-full flex flex-col gap-8 justify-center items-center my-16'>
        <h2 className='text-2xl font-bold'>Your Projects</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl px-4'>
            {projects.map((project)=>(
                    <Card 
                    onClick={()=>router.push(`/projects/${project.id}`)}
                        key={project.id} 
                        className='cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/50 hover:-translate-y-1'
                    >
                        <CardHeader className='pb-3'>
                            <div className='flex items-start gap-3'>
                                <div className='p-2 rounded-lg bg-primary/10 text-primary'>
                                    <Folder className='size-5' />
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <CardTitle className='text-lg font-semibold truncate'>
                                        {project.name}
                                    </CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className='flex items-center gap-2 text-xs'>
                                <span>Created</span>
                                <span className='font-medium'>{formatDate(project.createdAt)}</span>
                            </CardDescription>
                        </CardContent>
                    </Card>
            ))}
        </div>
    </div>
  )
}

export default ProjectList
