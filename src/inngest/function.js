import Sandbox from "e2b";
import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";



export const helloWorld = inngest.createFunction({
    id: "hello-world",
},
    {
        event: "agent/hello"
    },
    async ({ event, step }) => {

        const sandboxId=await step.run("get-sandbox-id",async()=>{
        const sandbox=await Sandbox.create("cautious-fiesta-ai")
            return sandbox.sandboxId;
        
        })
       const helloAgent=createAgent({
        name:"hello-agent",
        description:"A simple agent that says hello",
        system:"You are a helpful assistant that says hello",
        model:gemini({ model: "gemini-2.5-flash" }),
       })
       const output=await helloAgent.run("say hello to the user");
       console.log("output",output);

       const sandboxUrl=await step.run("get-sandbox-url",async()=>{
        const sandbox=await Sandbox.connect(sandboxId);
        const host= sandbox.getHost(3000);
        return `http://${host}`;
       })
       return {message:output};
    }
)