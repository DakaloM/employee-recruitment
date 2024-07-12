import { UpdateApplicationStatusInput } from '@erecruitment/client';
import { NotFoundError } from '@erecruitment/serverkit';

import { User } from '~/account';
import { Context } from '~/context';
import { Shortlist } from '~/shortlist';

import { Application, ApplicationStatus } from '../application';

export async function updateApplicationStatus(input: UpdateApplicationStatusInput, ctx: Context) {
  const status = input.status as ApplicationStatus;
  const id = input.id;

  const application = await Application.query(ctx.db).findById(id);

  if (!application) {
    throw new NotFoundError({
      message: 'Application not found',
    });
  }

  const user = await User.query(ctx.db).findById(application.userId);

  if (!user) {
    throw new NotFoundError({
      message: 'User not found',
    });
  }

  // Todo: Add applicant to shortlist if application is approved
  if (status === ApplicationStatus.Approved) {
    // Todo: Add applicant to shortlist

    await Shortlist.query(ctx.db).insert({
      applicantId: application.applicantId,
      jobId: application.jobId,
      applicationId: id,
      jobTitle: application.jobTitle,
      name: user.name,
      surname: user.surname,
    });
  }

  const updatedApplication = application
    .$query(ctx.db)
    .patchAndFetch({ status })
    .withGraphFetched('requisition')
    .withGraphFetched('applicant');

  return updatedApplication;
}
