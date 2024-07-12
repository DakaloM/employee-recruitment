import { ExperienceFragment } from '@erecruitment/client'
import React from 'react'
import { Experience } from './Experience';
import { CreateExperience } from './CreateExpeirence';

export const ExperienceDisplay = ({experience, userId}: ExperienceDisplayProps) => {

  const hasExperience: boolean = experience.length > 0;

  return (
    <div className="w-full h-full flex flex-col gap-y-4 overflow-y-auto">
      <h1 className="font-bold text-2xl border-b w-max self-center">Experience Details</h1>

      <div className='flex flex-col w-full h-full '>


      {!hasExperience ? (
        <div className="flex flex-col gap-2 w-full items-center h-full justify-center">
          <p className="text-gray-500 font-normal ">No Experience found</p>
         
        </div>
      ) : (
        <div className="flex flex-col w-full gap-y-4 mb-8">
          {experience.map((item) => (
            <Experience experience={item} key={item.id} />
          ))}
        </div>
      )}
      <CreateExperience userId={userId} />
      </div>
    </div>
  );
}

type ExperienceDisplayProps = {
  experience: ExperienceFragment[]
  userId: string
}