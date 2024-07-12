import { NotFoundError } from '@erecruitment/serverkit';

import { Context } from '~/context';
import { Advert } from '~/requisition';

import { InterviewPackage } from '../interview_package';

export async function getInterviewPackage(id: string, ctx: Context) {
  const job = await Advert.query(ctx.db).findById(id);

  if (!job) {
    throw new NotFoundError({
      message: 'Job not found',
    });
  }

  const interviewPackage = await InterviewPackage.query(ctx.db)
    .where('jobId', id)
    .first()
    .withGraphFetched('questions');

  if (!interviewPackage) {
    throw new NotFoundError({
      message: 'Interview package not found',
    });
  }

  return interviewPackage;
}
