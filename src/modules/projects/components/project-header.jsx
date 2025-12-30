import React from 'react'
import { useGetProjectById } from '../hooks/project';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDownIcon, ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';

const ProjectHeader = ({projectId}) => {
    const {data:project,isPending}=useGetProjectById(projectId);
    const {theme,setTheme}=useTheme();
  return (
    <header className="p-2 flex justify-between items-center border-b">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button  size={'sm'} className='pl-2 '>
<span className='text-sm font-medium'>{isPending? 'Loading...': project?.name||'Untitled Project'}</span>
<ChevronDownIcon className='size-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side='bottom' align='start'>
                <DropdownMenuItem>
                    <Link className='flex items-center gap-2' href={`/`}>
                    <ChevronLeftIcon className='size-4 rotate-360' />
            <span className='text-sm font-medium'>Go To Dashboard</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </header>
  )
}

export default ProjectHeader