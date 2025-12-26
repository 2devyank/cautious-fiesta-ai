'use server'

import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";




export const onBoardUser=async()=>{
    try{
        const user=await currentUser();
        if(!user){
            return {
                success:false,
                error:"No User found"
            }
        }
        console.log("user",user);
        const {id,emailAddresses,firstName,lastName,imageUrl}=user;
        const newUser=await db.user.upsert({
            where:{
                clerkId:id,
            },
            update:{
                name: firstName && lastName ? `${firstName}${lastName}`:firstName || lastName ||null,
                image:imageUrl || null,
                email:emailAddresses[0].emailAddress||'',
            },
            create:{
                clerkId:id,
                name: firstName && lastName ? `${firstName}${lastName}`:firstName || lastName ||null,
                image:imageUrl || null,
                email:emailAddresses[0].emailAddress||'',
            }

        })
        return {
            success:true,
            user:newUser,
            message:"user onboarded successfully"
        }
    }catch(err){
 return {
            success:false,
            error:true,
            message:"user onboarding failed"
        }
    }
}
export const getCurrentUser=async()=>{
   try{
    const user=await currentUser();
    if(!user){
        return null;
    }
    const dbUser=await db.user.findUnique({
        where:{
            clerkId:user.id
        },
        select:{
            id:true,
            email:true,
            name:true,
            image:true,
            clerkId:true,
        }
    })
    return dbUser;
}catch(err){
console.error("err",err);
return null;
}
}