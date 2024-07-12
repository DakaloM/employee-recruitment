import { UpdateInterviewPackageInput } from "@erecruitment/client/dist/__generated__/graphql";
import { InterviewPackage } from "../interview_package";
import { NotFoundError } from "@erecruitment/serverkit";


export async function updateInterviewPackage(input: UpdateInterviewPackageInput, ctx: any) {

    const existingPackage = await InterviewPackage.query(ctx.db).findById(input.id);

    if(!existingPackage) {
        throw new NotFoundError({
            message: 'Interview package not found'
        });
    }

    const patchInput = JSON.parse(JSON.stringify(input));

    return await InterviewPackage.query(ctx.db).patchAndFetchById(input.id, patchInput);

    
}