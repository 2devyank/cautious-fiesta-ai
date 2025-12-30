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
import { useCreateMessages } from '@/modules/messages/hooks/messages';

const formschema=z.object({
    content:z.string().min(1,{message:"Content is required"}).max(1000,{message:"Content must be less than 1000 characters"}),
})

const MessageForm = ({projectId}) => {
  
const [isFocused, setIsFocused] = useState(false)
const {mutateAsync,isPending}=useCreateMessages(projectId);
const form = useForm({
    resolver: zodResolver(formschema),
    defaultValues: {
        content: "",
    },
    mode:"onChange",
})

const onSubmit=async(values)=>{
    try{
        const res=await mutateAsync(values.content);
        
        form.reset();
        console.log(res);
    }catch(error){
        console.error(error);
    }
}


  return (

       
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
                    <Button disabled={isPending} onClick={()=>form.handleSubmit(onSubmit)} type='submit'
                     className={cn("cursor-pointer size-8 rounded-full", isPending && "opacity-50 cursor-not-allowed")}>
                       {isPending ? <Spinner className='size-4 text-white' /> : <ArrowUp className='size-4 text-white' />}
                    </Button>
                </div>
            </form>
        </Form>


  )
}

export default MessageForm