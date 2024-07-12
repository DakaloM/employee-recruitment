import { EducationFragment } from "@erecruitment/client";
import React from "react";
import { Education as DisplayEducation } from "~/modules/education";

export const Education = ({ education }: EducationProps) => {

  return (
    <div className="w-full  flex flex-wrap gap-y-10 justify-evenly">
      {education.map((education) => (
        <DisplayEducation key={education.id} education={education}/>
      ))}
    </div>
  );
};

type EducationProps = {
  education: EducationFragment[];
};
