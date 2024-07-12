import { Context } from "~/context";
import { Question } from "../question";


export async function getJobQuestions(id: string, ctx: Context) {

  const questions = await Question.query(ctx.db).where('refId', '=', id);
  
  return questions;
}
