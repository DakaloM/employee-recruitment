import { CreateShortlistInput } from "@erecruitment/client";
import { ConflictError, NotFoundError } from "@erecruitment/serverkit";
import { User } from "~/account";
import { Application } from "~/application";
import { Context } from "~/context";
import { Advert } from "~/requisition";
import { Shortlist } from "../shortlist";
import { Applicant } from "~/applicant";

export async function createShortList(
  input: CreateShortlistInput,
  ctx: Context
) {
  const { applicantId, applicationId, jobId } = input;

  const applicant = await Applicant.query(ctx.db).findById(applicantId);

  if (!applicant) {
    throw new NotFoundError({
      message: "Applicant not found",
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

  const shortlist = await Shortlist.query(ctx.db)
    .where({ applicantId })
    .andWhere({ jobId })
    .andWhere({ applicationId })
    .first();

  if (shortlist) {
    throw new ConflictError({
      message: "Applicant already in shortlist",
    });
  }

  return await Shortlist.transaction(ctx.db, async (trx) => {
    const user = await User.query(trx).findById(applicant.userId);

    if (!user) {
      throw new NotFoundError({
        message: "User not found",
      });
    }

    const newShortlist = await Shortlist.query(trx).insertAndFetch({
      applicantId,
      applicationId,
      jobId,
      jobTitle: job.title,
      name: user.name,
      surname: user.surname,
    });

    return newShortlist;
  });
}
