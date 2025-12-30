'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Form, FormField } from '@/components/ui/form';
import TextAreaAutosize from "react-textarea-autosize";
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

import { toast } from 'sonner';
import { useCreateProject } from '@/modules/projects/hooks/project';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

const formschema=z.object({
    content:z.string().min(1,{message:"Content is required"}).max(1000,{message:"Content must be less than 1000 characters"}),
})
const PROJECT_TEMPLATES = [
    {
      emoji: "🎬",
      title: "Build a Netflix clone",
      prompt:
        "Build a Netflix-style homepage with a hero banner (use a nice, dark-mode compatible gradient here), movie sections, responsive cards, and a modal for viewing details using mock data and local state. Use dark mode.",
    },
    {
      emoji: "📦",
      title: "Build an admin dashboard",
      prompt:
        "Create an admin dashboard with a sidebar, stat cards, a chart placeholder, and a basic table with filter and pagination using local state. Use clear visual grouping and balance in your design for a modern, professional look.",
    },
    {
      emoji: "📋",
      title: "Build a kanban board",
      prompt:
        "Build a kanban board with drag-and-drop using react-beautiful-dnd and support for adding and removing tasks with local state. Use consistent spacing, column widths, and hover effects for a polished UI.",
    },
    {
      emoji: "🗂️",
      title: "Build a file manager",
      prompt:
        "Build a file manager with folder list, file grid, and options to rename or delete items using mock data and local state. Focus on spacing, clear icons, and visual distinction between folders and files.",
    },
    {
      emoji: "📺",
      title: "Build a YouTube clone",
      prompt:
        "Build a YouTube-style homepage with mock video thumbnails, a category sidebar, and a modal preview with title and description using local state. Ensure clean alignment and a well-organized grid layout.",
    },
    {
      emoji: "🛍️",
      title: "Build a store page",
      prompt:
        "Build a store page with category filters, a product grid, and local cart logic to add and remove items. Focus on clear typography, spacing, and button states for a great e-commerce UI.",
    },
    {
      emoji: "🏡",
      title: "Build an Airbnb clone",
      prompt:
        "Build an Airbnb-style listings grid with mock data, filter sidebar, and a modal with property details using local state. Use card spacing, soft shadows, and clean layout for a welcoming design.",
    },
    {
      emoji: "🎵",
      title: "Build a Spotify clone",
      prompt:
        "Build a Spotify-style music player with a sidebar for playlists, a main area for song details, and playback controls. Use local state for managing playback and song selection. Prioritize layout balance and intuitive control placement for a smooth user experience. Use dark mode.",
    },
  ];
const ProjectForm = () => {
    const router=useRouter();
const [isFocused, setIsFocused] = useState(false)
const {mutateAsync,isPending}=useCreateProject();
const form = useForm({
    resolver: zodResolver(formschema),
    defaultValues: {
        content: "",
    },
    mode:"onChange",
})
const handleTemplate=(prompt)=>{
    form.setValue("content", prompt)
}
const onSubmit=async(values)=>{
    try{
        const res=await mutateAsync(values.content);
        router.push(`/projects/${res.id}`);
        toast.success("Project created successfully");
        form.reset();
        console.log(res);
    }catch(error){
        console.error(error);
    }
}
const isbuttonDisabled=isPending||!form.watch("content").trim();

  return (
    <div className='space-y-8 w-full'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
            {
PROJECT_TEMPLATES.map((template)=>(
    <div key={template.title} onClick={()=>handleTemplate(template.prompt)} className='bg-muted p-4 rounded-lg cursor-pointer hover:bg-muted/80 transition-all duration-300' >
        <div className='flex items-center gap-2'>
            <span className='text-2xl'>{template.emoji}</span>
            <h3 className='text-lg font-semibold'>{template.title}</h3>
        </div>
    </div>
))
            }
        </div>
      

        <div className='relative flex items-center justify-center py-4'>
            <Separator className='absolute' />
            <span className='relative bg-background px-4 text-sm text-muted-foreground'>
                write your own idea
            </span>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
             className={cn("relative bg-sidebar p-4 pt-1 border rounded-xl transition-all dark:bg-sidebar", isFocused && "border-2 border-primary rounded-lg p-4")}>
                <FormField
                control={form.control}
                name='content'
                render={({field})=>(
                    <TextAreaAutosize {...field}
                    onFocus={()=>setIsFocused(true)}
                    onBlur={()=>setIsFocused(false)}
                    className='w-full min-h-[100px] max-h-[300px] resize-none outline-none'
                    placeholder='Write your idea here...'
                    
                    minRows={3}
                    maxRows={8}
                    onKeyDown={((e)=>{
                        if(e.key === 'Enter' && !e.shiftKey){
                            e.preventDefault()
                            form.handleSubmit(onSubmit)(e);
                        }
                    })}


                    />
                )}
                />
                <div className='flex justify-end'>
                    <Button disabled={isbuttonDisabled} onClick={()=>form.handleSubmit(onSubmit)} type='submit'
                     className={cn("cursor-pointer size-8 rounded-full", isbuttonDisabled && "opacity-50 cursor-not-allowed")}>
                       {isPending ? <Spinner className='size-4 text-white' /> : <ArrowUp className='size-4 text-white' />}
                    </Button>
                </div>
            </form>
        </Form>

    </div>
  )
}

export default ProjectForm