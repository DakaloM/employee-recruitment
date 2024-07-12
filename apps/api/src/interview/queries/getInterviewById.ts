import { Context } from "~/context";
import { Interview } from "../interview";

export async function getInterviewById(id: string, ctx: Context) {
  const interview = await Interview.query(ctx.db).findById(id);
  if (!interview) {
    throw new Error("Interview not found");
  }

  return interview;
}
