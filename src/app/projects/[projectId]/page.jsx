import { getProjectById } from '@/modules/projects/actions';
import ProjectView from '@/modules/projects/components/project-view';
import React from 'react'

const page = async ({params}) => {
    const {projectId}=await params;
    const project=await getProjectById(projectId);
  return (
   <ProjectView projectId={projectId} />
  )
}

export default page