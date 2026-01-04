import { auth } from "@clerk/nextjs/server";
import { RateLimiterPrisma } from "rate-limiter-flexible";
import db from "./db";


export const FREE_POINTS=5;
export const PRO_POINTS=100;
export const DURATION=30*24 *60 *60;
export const GENERATE_COST=1;

export async function getUsageTracker(){
    const {has}=await auth();
    const hasProAccess=has({plan:"pro"})
    const usageTracker=new RateLimiterPrisma({
        storeClient:db,
        tableName:"Usage",
        points:hasProAccess?PRO_POINTS:FREE_POINTS,
        duration:DURATION,
    })
    return usageTracker;
}
export async function consumeCredits(){
    const {userId}=await auth();
    if(!userId) throw new Error("Unauthorized");
    const usageTracker=await getUsageTracker();
    const result =await usageTracker.consume(userId,GENERATE_COST);
    return result;
}
export async function getCredits(){
    const {userId}=await auth();
    if(!userId) throw new Error("Unauthorized");
    const usageTracker=await getUsageTracker();
    try{

        const result =await usageTracker.get(userId);

        if(!result)return null;
        return result;
    }catch(error){
        console.error("Error in getCredits:", error);
        return null;
    }
}