import { Context } from "~/context";
import { Question } from "../question";
import { ConflictError, NotFoundError } from "@erecruitment/serverkit";
import { Application } from "~/application";


export const deleteJobQuestion = async (id: string, ctx: Context) => {
  const question = await Question.query(ctx.db).findById(id);

  if (!question) {
    throw new NotFoundError({
      message: "Question not found",
    });
  }

  const application = await Application.query(ctx.db).where({jobId: question.refId}).first();

  if(application){

    throw new ConflictError({
      message: "Can't delete question involved in a job application",
    });
  }

  return await question.$query(ctx.db).delete();
};
