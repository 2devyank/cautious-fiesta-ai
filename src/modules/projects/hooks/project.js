import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createProject, getProjectById, getProjects } from "../actions"

export const useGetProjects=()=>{
    return useQuery({
        queryKey:["projects"],
        queryFn:()=>getProjects(),
    })
}
export const useCreateProject=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(value)=>createProject(value),
        onSuccess:()=>queryClient.invalidateQueries(["projects"])
    })
}
export const useGetProjectById=(id)=>{
    return useQuery({
        queryKey:["project",id],
        queryFn:()=>getProjectById(id),
    })
}