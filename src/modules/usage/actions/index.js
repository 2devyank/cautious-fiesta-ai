'use server'

import { FREE_POINTS, getCredits, PRO_POINTS, DURATION } from "@/lib/usage";
import { auth } from "@clerk/nextjs/server";



export const credits=async()=>{
   try{
    const {has, userId}=await auth();
    console.log("userId",userId);
    if(!userId) {
        // Return default values for unauthenticated users
        return {
            remainingPoints: FREE_POINTS,
            msBeforeNext: DURATION*1000,
            consumedPoints: 0,
            isFirstRequest: true,
            maxPoints: FREE_POINTS,
        };
    }
    const hasProAccess=has({plan:"pro"})
    const maxPoints=hasProAccess ? PRO_POINTS : FREE_POINTS;
    const result = await getCredits();
    console.log("result",result);
    if(!result){
       return {
         remainingPoints:maxPoints,
        msBeforeNext:DURATION*1000,
        consumedPoints:0,
        isFirstRequest:true,
        maxPoints,
}

}
const remainingPoints=result.remainingPoints??(maxPoints - (result.consumedPoints||0));
return {
    remainingPoints,
    msBeforeNext:result.msBeforeNext||(DURATION*1000),
    consumedPoints:result.consumedPoints||0,
    isFirstRequest:false,
    maxPoints,
}
}catch(error){
    console.error("Error in credits action:", error);
    // Return default values on error instead of throwing
    return {
        remainingPoints: FREE_POINTS,
        msBeforeNext: DURATION*1000,
        consumedPoints: 0,
        isFirstRequest: true,
        maxPoints: FREE_POINTS,
    };
}
}
