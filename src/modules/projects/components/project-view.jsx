'use client'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import React, { useState } from 'react'
import ProjectHeader from './project-header'
import MessageContainer from './message-container'

const ProjectView = ({projectId}) => {
  const [activeFragment,setActiveFragment]=useState(null);
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

            </ResizablePanel>
        </ResizablePanelGroup>
    </div>
  )
}

export default ProjectView