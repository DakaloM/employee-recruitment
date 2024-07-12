import { CreateInterviewPackageInput } from "@erecruitment/client/dist/__generated__/graphql";
import { InterviewPackage } from "../interview_package";
import { ConflictError } from "@erecruitment/serverkit";


export async function createInterviewPackage(input: CreateInterviewPackageInput, ctx: any) {

    const existingPackage = await InterviewPackage.query(ctx.db).findOne({jobId: input.jobId});

    if(existingPackage) {
        throw new ConflictError({
            message: 'Interview package already exists'
        });
    }

    return await InterviewPackage.query(ctx.db).insertAndFetch(input);
}