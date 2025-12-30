import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createMessage, getMessages } from "../actions"
import { MessageRole, MessageType } from "@/generated/client/enums"
import { useEffect, useState } from "react"

export const prefetchMessages=async(queryClient,projectId)=>{
    await queryClient.prefetchQuery({
        queryKey:["messages",projectId],
        queryFn:()=>getMessages(projectId),
        staleTime:10000,
    })

}
export const useGetMessages=(projectId)=>{
    const [shouldPoll, setShouldPoll] = useState(true);

  useEffect(() => {
    // Stop polling after 10 seconds
    const timeout = setTimeout(() => {
      setShouldPoll(false);
    }, 10000);

    // Cleanup timeout when component unmounts or projectId changes
    return () => clearTimeout(timeout);
  }, [projectId]);
    return useQuery({
        queryKey:["messages",projectId],
        queryFn:()=>getMessages(projectId),
        staleTime:10000,
        
        refetchInterval: shouldPoll ? 5000 : false,
        
    })
}
export const useCreateMessages=(projectId)=>{
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(value)=>createMessage(value,projectId),
        onSuccess:()=>queryClient.invalidateQueries({queryKey:["messages",projectId]}),
    })
}