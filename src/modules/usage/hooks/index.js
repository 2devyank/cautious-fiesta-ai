import { useQuery } from "@tanstack/react-query"
import { credits } from "../actions"


export const useStatus=()=>{
    return useQuery({
        queryKey:["status"],
        queryFn:()=>credits(),
    })
}