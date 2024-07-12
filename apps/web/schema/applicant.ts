import { ApplicantFragment } from '@erecruitment/client';
import { z } from 'zod';

export const applicantSchema = z.object({
  id: z.string(),
  name: z.string(),
  surname: z.string(),
  applicantNumber: z.string(),
});

export type ApplicantSchemaType = z.infer<typeof applicantSchema>

export interface ApplicantListProps {
  applicants: ApplicantFragment[]
}