import { ExperienceFragment } from '@erecruitment/client'
import { formatDate } from '@erecruitment/utils'
import { Briefcase, Building, Clock1, History, MapPin, Timer } from 'lucide-react'
import React from 'react'
import { ItemLabel } from '~/modules/shared'

export const Experience = ({experience}: ExperienceProps) => {
  return (
    <div className='w-full flex flex-col items-start gap-4 p-4 border-b border-gray-200 pb-8'>
     <h1 className='font-semibold text-sm border-b border-black'>{experience.employer}</h1>

     <div className='flex flex-wrap gap-8 gap-y-4 items-start w-full'>
          <ItemLabel label='Start date'  value={formatDate(experience.startDate)} Icon={Clock1}/>
          <ItemLabel label='Industry'  value={experience.industry} Icon={Building}/>
          <ItemLabel label='Job Title'  value={experience.jobTitle} Icon={Briefcase}/>
          <ItemLabel label='End date'  value={formatDate(experience.endDate)}  Icon={History}/>
          <ItemLabel label='Region'  value={experience.region} Icon={MapPin}/>
          <ItemLabel label='Country'  value={experience.country} Icon={Building}/>
          <ItemLabel label='Work contract'  value={experience.workContract} Icon={Timer}/>
     </div>
    </div>
  )
}

type ExperienceProps = {
  experience: ExperienceFragment
}