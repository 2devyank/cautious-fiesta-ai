'use server'

import { MessageRole, MessageType } from "@/generated/client/enums";
import db from "@/lib/db";
import { getCurrentUser } from "@/modules/auth/actions";
import { inngest } from "@/inngest/client";

export const createMessage=async(value,projectID)=>{
    const user=await getCurrentUser();
    if(!user) throw new Error("User not found");
    if(!projectID) throw new Error("Project ID is required");
    
    const project=await db.project.findUnique({ 
        where:{
            id:projectID,
        }
    })
    if(!project) throw new Error("Project not found");
    if(project.userId !== user.id) throw new Error("Unauthorized access to project");


    const newMessage=await db.message.create({
        data:{
            content:value,
            projectId:projectID,
            role:MessageRole.USER,
            type:MessageType.RESULT,
        }
    })
    await inngest.send({
        name:"code-agent/run",
        data:{
            value:value,
            projectId:projectID,
        }
    })
    return newMessage;
}
export const getMessages=async(projectId)=>{
    const user=await getCurrentUser();
    if(!user) throw new Error("User not found");
    if(!projectId) throw new Error("Project ID is required");
    
    const project=await db.project.findUnique({
        where:{
            id:projectId,
        }
    })
    if(!project) throw new Error("Project not found");
    if(project.userId !== user.id) throw new Error("Unauthorized access to project");

    const messages=await db.message.findMany({
        where:{
            projectId:projectId,
        },
        orderBy:{
            updatedAt:"desc",
        },
        include:{
            fragments:true,
        },
    })
    return messages;
    
}