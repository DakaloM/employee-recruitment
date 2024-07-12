import { CreateApplicationInput } from '@erecruitment/client';
import { ConflictError } from '@erecruitment/serverkit';

import { User } from '~/account';
import { Answer } from '~/answer';
import { Applicant } from '~/applicant';
import { Context } from '~/context';
import { Advert } from '~/requisition';

import { Application, ApplicationStatus } from '../application';

export async function createApplication(input: CreateApplicationInput, ctx: Context) {
  const { requisitionId, jobId, answers } = input;

  const userId = ctx.auth.user?.id!;

  const applicant = await Applicant.query(ctx.db)
    .findOne({ userId })
    .withGraphFetched('education')
    .withGraphFetched('experience')
    .withGraphFetched('address')
    .withGraphFetched('contact')
    .withGraphFetched('attachments');
  if (!applicant) {
    throw new ConflictError({
      message: 'Applicant not found for user',
    });
  }

  const noEducation = applicant.education.length === 0;
  const noExperience = applicant.experience.length === 0;
  const noAddress = applicant.address.length === 0;
  const noContact = applicant.contact === null;
  const noDocument = applicant.attachments.length === 0;

  if (noEducation || noExperience || noAddress || noContact || noDocument) {
    throw new ConflictError({
      message: 'Please complete your profile before applying',
    });
  }

  const application = await Application.query(ctx.db)
    .where({
      applicantId: applicant.id,
      jobId,
      requisitionId,
    })
    .first();

  if (application) {
    throw new ConflictError({
      message: `You have already applied for this job`,
    });
  }

  return await Application.transaction(ctx.db, async (trx) => {
    const data = answers.map((answer) => {
      return {
        applicantId: applicant.id,
        questionId: answer.questionId,
        refId: jobId,
        answer: answer.answer,
      };
    });
    await Answer.query(trx).insertGraph(data);

    //TODO: create score

    const job = await Advert.query(trx).findOne({ id: jobId });

    if (!job) {
      throw new ConflictError({
        message: 'Job not found',
      });
    }

    const user = await User.query(trx).findOne({ id: userId });

    if (!user) {
      throw new ConflictError({
        message: 'User not found',
      });
    }

   

    const newApplication = await Application.query(trx).insertAndFetch({
      applicantId: applicant.id,
      requisitionId,
      jobId,
      jobTitle: job.positionTitle,
      name: user.name,
      surname: user.surname,
      status: ApplicationStatus.Submitted,
      userId,
    });

    // Todo: create notification

    return newApplication;
  });
}
