'use client'
import React, { useState } from 'react'
import { Jobs } from './Jobs'
import { Job } from './Job'
import { PartialAdvertFragment } from '@erecruitment/client/dist/__generated__/graphql'
import { FullJob } from './FullJob'



export const JobsDisplay = ({jobs, token}: JobsDisplayProps) => {
  const [job, setJob] = useState<PartialAdvertFragment>(jobs[0])

  return (
    <div className='flex flex-col md:flex-row items-start justify-between gap-10 w-full md:w-full md:px-2 lg:3/5 h-[1000px] lg:px-12'>
      <Jobs jobs={jobs} setJob={setJob}/>

      <FullJob job={job} token={token}/>
    </div>
  )
}

export interface JobsDisplayProps {
  jobs: PartialAdvertFragment[];
  token?: any;
}



