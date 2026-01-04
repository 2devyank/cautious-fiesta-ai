'use server'

import { MessageRole, MessageType } from "@/generated/client/enums";
import { inngest } from "@/inngest/client";
import db from "@/lib/db";
import { generateSlug } from "random-word-slugs";
import { getCurrentUser } from "@/modules/auth/actions";

export const createProject=async(value)=>{
    const user=await getCurrentUser();
    if(!user) throw new Error("User not found");
    try{
        await consumeCredits();
    }catch(error){
        console.error("Error in consumeCredits:", error);
        throw new Error("something went wrong");
    }
    const newProject=await db.project.create({
        data:{
            name:generateSlug(2,{format:"kebab"}),
            userId:user.id,
            messages:{
                create:{
                    content:value,
                    role:MessageRole.USER,
                    type:MessageType.RESULT,
                }
            }
        }
    })
    await inngest.send({
        name:"code-agent/run",
        data:{
            value:value,
            projectId:newProject.id,
        }
    })
    return newProject;
}
export const getProjects=async()=>{
    const user=await getCurrentUser();
    if(!user) throw new Error("User not found");
    const projects=await db.project.findMany({
        where:{
            userId:user.id,
        },
        orderBy:{
            createdAt:"desc",
        }
    })
    return projects;
}
export const getProjectById=async(id)=>{
    const user=await getCurrentUser();
    if(!user) throw new Error("User not found");
    const project=await db.project.findUnique({
        where:{
            id:id,
            userId:user.id,
        }
    })
    if(!project) throw new Error("Project not found");
    return project;
}