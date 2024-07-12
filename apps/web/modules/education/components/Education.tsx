import { EducationFragment } from '@erecruitment/client'
import { formatDate } from '@erecruitment/utils'
import { BookOpenCheck, Building, Clock1, GraduationCap, History, LucideIcon } from 'lucide-react'
import React from 'react'
import { ItemLabel } from '~/modules/shared'

export const Education = ({education}: EducationProps) => {

  return (
    <div className='w-full flex flex-col items-start gap-4 p-4 border-b border-gray-200 pb-8'>
     <h1 className='font-semibold text-sm border-b border-black'>{education.educationLevel}</h1>

     <div className='flex flex-wrap gap-8 gap-y-4 items-start w-full'>
          <ItemLabel label='Start date'  value={formatDate(education.startDate)} Icon={Clock1}/>
          <ItemLabel label='Institution'  value={education.institution} Icon={Building}/>
          <ItemLabel label='Education level'  value={education.educationLevel} Icon={GraduationCap}/>
          <ItemLabel label='Final grade'  value={education.finalGrade} Icon={BookOpenCheck}/>
          <ItemLabel label='End date'  value={formatDate(education.endDate)}  Icon={History}/>
          <ItemLabel label='Location'  value={education.location} Icon={Building}/>
          <ItemLabel label='Region'  value={education.region} Icon={Building}/>
          <ItemLabel label='Country'  value={education.country} Icon={Building}/>
     </div>
    </div>
  )
}

type EducationProps = {
  education: EducationFragment
}
