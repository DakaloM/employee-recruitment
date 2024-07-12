import { Context } from "~/context";
import { Answer } from "../answer";

type Args = {
    applicantId: string
    refId: string
}


export async function getApplicantAnswers({applicantId, refId}: Args, ctx: Context) {
    
    const answers = await Answer.query(ctx.db).select('answer.*')

    return answers;
}