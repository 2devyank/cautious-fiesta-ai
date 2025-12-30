'use client'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import React, { useState } from 'react'
import ProjectHeader from './project-header'
import MessageContainer from './message-container'
import { AgentResult } from './agent-code'

const ProjectView = ({projectId}) => {
  const [activeFragment,setActiveFragment]=useState(null);
  console.log("activeFragment",activeFragment);
  return (
    <div className='h-screen'>
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel
            defaultSize={35}
            minSize={25}
            className="flex flex-col min-h-0"
            >
                <ProjectHeader projectId={projectId} />
                <MessageContainer projectId={projectId} activeFragment={activeFragment} setActiveFragment={setActiveFragment} />

            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel
            defaultSize={65}
            minSize={50}
            className="flex flex-col min-h-0"
            >
            { activeFragment && <AgentResult files={activeFragment[0]?.files} url={activeFragment[0]?.sandboxUrl}  title={activeFragment[0]?.title} />}
            </ResizablePanel>
        </ResizablePanelGroup>
    </div>
  )
}

export default ProjectView