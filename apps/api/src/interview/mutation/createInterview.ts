import { CreateInterviewInput } from "@erecruitment/client";
import { ConflictError, NotFoundError } from "@erecruitment/serverkit";
import { User } from "~/account";
import { Application, ApplicationStatus } from "~/application";
import { Context } from "~/context";
import { Advert } from "~/requisition";
import { Interview, InterviewStatus } from "../interview";
import { Applicant } from "~/applicant";

export async function createInterview(
  input: CreateInterviewInput,
  ctx: Context
) {
  const {
    applicantId,
    jobId,
    applicationId,
    date,
    time,
    location,
    description,
  } = input;

  const applicant = await Applicant.query(ctx.db).findById(applicantId);

  if (!applicant) {
    throw new NotFoundError({
      message: "Applicant not found",
    });
  }

  const user = await User.query(ctx.db).findById(applicant.userId);
  if (!user) {
    throw new NotFoundError({
      message: "User not found",
    });
  }

  const job = await Advert.query(ctx.db).findById(jobId);
  if (!job) {
    throw new NotFoundError({
      message: "Job not found",
    });
  }

  const application = await Application.query(ctx.db).findById(applicationId);
  if (!application) {
    throw new NotFoundError({
      message: "Application not found",
    });
  }

  if(application.status !== ApplicationStatus.Approved) {
    throw new ConflictError({
      message: "Application is not approved",
    })
  }

  return await Interview.transaction(ctx.db, async (trx) => {
    //Todo: Add this applicant to shortlist

    const user = await User.query(trx).findById(applicant.userId);

    if (!user) {
      throw new NotFoundError({
        message: "User not found",
      });
    }

    const interview = await Interview.query(trx)
      .where({applicantId, applicationId, jobId, status: InterviewStatus.Scheduled})
      .first();

      console.log(interview)

    if(interview) {
      throw new ConflictError({
        message: "There's a scheduled interview for this applicant",
      })
    }

    const newInterview = await Interview.query(trx).insertAndFetch({
      applicantId,
      jobId,
      applicationId,
      jobTitle: job.positionTitle,
      name: user.name,
      surname: user.surname,
      date,
      time,
      location,
      description,
    });

    //Todo: Send email to the applicant and the manager about this interview

    return newInterview;
  });
}

