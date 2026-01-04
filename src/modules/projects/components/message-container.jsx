import { prefetchMessages, useGetMessages } from '@/modules/messages/hooks/messages';
import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useMemo, useRef } from 'react'
import MessageCard from './message-card';
import { Spinner } from '@/components/ui/spinner';
import MessageForm from './message-form';
import { MessageRole } from '@/generated/client/enums';

const MessageContainer = ({projectId,activeFragment,setActiveFragment}) => {
  const queryClient=useQueryClient();
  const bottomRef=useRef(null);
  const scrollContainerRef=useRef(null);
  const lastAssistanMessageIdRef=useRef(null);
  const {data:messages,isPending,iserror,error} = useGetMessages(projectId);
  useEffect(()=>{
    if(projectId){
    prefetchMessages(queryClient,projectId);
    }
  },[])
  const sortedMessages = useMemo(
    () =>
      messages && [...messages]?.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ),
      [messages]
    );
    useEffect(()=>{
      if(sortedMessages && sortedMessages.length > 0){
        // Use requestAnimationFrame to ensure DOM has updated
        requestAnimationFrame(() => {
          setTimeout(() => {
            bottomRef.current?.scrollIntoView({behavior:'smooth'});
          }, 100);
        });
      }
    },[sortedMessages])
  useEffect(()=>{
    const lastAssistantMessage=sortedMessages?.findLast(message=>message.role===MessageRole.ASSISTANT);  
    if(lastAssistantMessage && lastAssistantMessage?.id!==lastAssistanMessageIdRef.current){
      setActiveFragment(lastAssistantMessage.fragments);
      lastAssistanMessageIdRef.current=lastAssistantMessage.id;
    }

  },[sortedMessages,setActiveFragment])
  if(isPending){
    return <div className='h-full flex justify-center items-center'><Spinner /></div>
  }
  if(iserror){
    return <div className='h-full flex justify-center items-center'>Error: {error.message}</div>
  }
  if( messages && messages?.length===0){
    return <div className='h-full flex  flex-1 flex-col justify-center items-center'>
        <div className='flex flex-col items-center justify-center gap-2'>
        No messages found
        </div>
        </div>
  }
  const lastUserMessage=sortedMessages?.findLast(message=>message.role===MessageRole.USER);
  const lastMessage = sortedMessages && sortedMessages.length > 0 ? sortedMessages[sortedMessages.length - 1] : null;
  const isLastMessageFromUser = lastMessage?.role === MessageRole.USER;
  console.log("messages",messages);
    return (
    <div className='min-h-0 flex flex-1 flex-col'>
        <div ref={scrollContainerRef} className='flex-1 overflow-y-auto min-h-0'>
        {sortedMessages?.map((message)=>(
                <MessageCard key={message.id} 
                content={message.content}
                 role={message.role}
                 fragment={message.fragments}
                 createdAt={message.createdAt}
                isActiveFragment={activeFragment?.id===message.fragments?.id}
                onFragmentClick={()=>setActiveFragment(message.fragments)}
                type={message.type}
                 />
            ))}
            {isLastMessageFromUser && (
              <div className='flex justify-end px-2 pb-4'>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Spinner />
                  <span>Waiting for agent response...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} className='h-0' />
        </div>
            
            <div>
              <MessageForm projectId={projectId}/>
            </div>
    </div>
  )
}

export default MessageContainer
