import { ExperienceFragment } from '@erecruitment/client'
import React from 'react';
import { Experience as DisplayExperience } from '~/modules/experience';

export const Experience = ({experience}: ExperienceProps) => {
  return (
    <div className="w-full  flex flex-wrap gap-y-10 justify-evenly">
      {experience.map((experience) => (
        <DisplayExperience key={experience.id} experience={experience}/>
      ))}
    </div>
  )
}

type ExperienceProps = {
    experience: ExperienceFragment[]    
}

