import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";



export const helloWorld = inngest.createFunction({
    id: "hello-world",
},
    {
        event: "agent/hello"
    },
    async ({ event, step }) => {
       const helloAgent=createAgent({
        name:"hello-agent",
        description:"A simple agent that says hello",
        system:"You are a helpful assistant that says hello",
        model:gemini({ model: "gemini-2.5-flash" }),
       })
       const output=await helloAgent.run("say hello to the user");
       console.log("output",output);
       return {message:output};
    }
)