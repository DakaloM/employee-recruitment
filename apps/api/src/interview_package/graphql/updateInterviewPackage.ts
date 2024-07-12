import { isActiveUser, isDashboardOperator } from "~/account/shield";
import { builder } from "~/graphql/builder";
import { InterviewPackageSchema } from "./interview_package";
import { updateInterviewPackage } from "../mutation";


const UpdateInterviewPackageInput = builder.inputType('UpdateInterviewPackageInput', {
    fields: (t) => ({
     id: t.string({required: true}),
     date: t.field({type: 'Date', required: false}),
     time: t.string({required: false}),
     location: t.string({required: false}),
     description: t.string({required: false}),
    
  
    })
  });
  
  builder.mutationField('updateInterviewPackage', (t) => (
    t.field({
      shield: isDashboardOperator,
      description: 'Update interview package',
      args: {
        input: t.arg({type: UpdateInterviewPackageInput, required: true})
      },
      type: InterviewPackageSchema,
      resolve: async(_root, args, ctx) => {
        return updateInterviewPackage(args.input, ctx);
      }
    })
  ))