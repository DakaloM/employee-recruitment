
import { ApplicationFragment } from '@erecruitment/client';
import { z } from 'zod';

export const applicationSchema = z.object({
  id: z.string(),
  status: z.string(),
  createdAt: z.date(),
});



export interface ApplicantListProps {
  applications: ApplicationFragment[]
}