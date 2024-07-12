import { UpdateEducationInput, } from '@erecruitment/client';
import { NotFoundError } from '@erecruitment/serverkit';

import { Context } from '~/context';

import { Education, EducationLevel, FinalGrade, Region } from '../education';

export async function updateEducation(input: UpdateEducationInput, ctx: Context) {
  const { id, institution, startDate, endDate, country, location } = input;

  const educationLevel = input.educationLevel ? (input.educationLevel as EducationLevel) : undefined;
  const finalGrade = input.finalGrade ? (input.finalGrade as FinalGrade) : undefined;
  const region = input.region ? (input.region as Region) : undefined;

  const change = {
    id,
    institution,
    startDate,
    endDate,
    country,
    region,
    location,
    finalGrade,
    educationLevel,
  };

  const education = await Education.query(ctx.db).findById(id);
  if (!education) {
    throw new NotFoundError({
      message: 'Education not found',
    });
  }

  const patchInput = JSON.parse(JSON.stringify(change));

  const updatedEducation = await education.$query(ctx.db).patchAndFetch(patchInput);

  return updatedEducation;
}
