import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageRole, MessageType } from '@/generated/client/enums'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Bot, Code2Icon } from 'lucide-react'
import React from 'react'

const FragmentCard=({fragment,onFragmentClick,isActiveFragment})=>{
   console.log("fragment::2",fragment);
    return (
        <div 
            onClick={onFragmentClick}
            className={cn(
                "flex items-center gap-2.5 mt-3 p-3 rounded-lg border cursor-pointer transition-all",
                "hover:bg-accent/50 hover:border-accent",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActiveFragment && "bg-accent border-accent shadow-sm"
            )}
        >
            <div className={cn(
                "flex items-center justify-center size-8 rounded-md border",
                isActiveFragment 
                    ? "bg-white/30 text-primary border-primary/20" 
                    : "bg-background text-foreground border-border"
            )}>
                <Code2Icon className='size-4 text-black' />
            </div>
            <span className={cn(
                "text-sm font-medium flex-1",
                isActiveFragment ? "text-foreground" : "text-foreground/90"
            )}>
                {fragment.title}
            </span>
        </div>
    )
}
const UserMessage=({content})=>{
    return (
        <div className='flex  rounded-lg justify-end pb-4 pr-2 pl-10'>
            <Card className="rounded-lg bg-muted border-none shadow-none max-w-[80%] p-2">{content}</Card>
        </div>
    )
}
const AssistantMessage=({content,fragment,createdAt,isActiveFragment,onFragmentClick,type})=>{
    return (
        <div className={cn("flex flex-col rounded-lg group px-2 pb-4 max-w-[80%]",type===MessageType.ERROR && "text-red-700 dark:text-red-400")}>
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="flex items-center gap-1.5 text-xs font-medium">
                    <Bot className="size-3" />
                    <span>Agent</span>
                </Badge>
                <span className={cn("text-xs text-muted-foreground", type===MessageType.ERROR && "text-red-600 dark:text-red-500")}>
                    {format(new Date(createdAt), "HH:mm 'on' MMM dd, yyyy")}
                </span>
            </div>
            <Card className={cn(
                "rounded-lg bg-muted border-none shadow-none p-3 text-sm",
                type===MessageType.ERROR && "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800"
            )}>
                <span className="whitespace-pre-wrap wrap-break-word">{content}</span>
                {
                    fragment && type===MessageType.RESULT && (
                    <FragmentCard 
                    fragment={fragment}
                    onFragmentClick={onFragmentClick}
                    isActiveFragment={isActiveFragment}
                    />
                    )
                }
            </Card>
        </div>
    )
}

const MessageCard = ({content,role,fragment,createdAt,isActiveFragment,onFragmentClick,type}) => {
    console.log("fragment",fragment);
    if(role===MessageRole.ASSISTANT){
        return (
            <AssistantMessage
            content={content}
            fragment={fragment?.[0]}
            createdAt={createdAt}
            isActiveFragment={isActiveFragment}
            onFragmentClick={onFragmentClick}
            type={type}
            />
        )
    }
  return (
    <div>
        <UserMessage content={content} />
    </div>
  )
}
  
export default MessageCard
