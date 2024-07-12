import { builder } from "~/graphql/builder";
import { ExperienceSchema } from "./experience";
import { getApplicantExperience } from "../queries";


//@ts-ignore
export const HasExperienceType = builder.interfaceType('HasExperience', {
  fields: (t) => ({
    experience: t.field({
      type: [ExperienceSchema],
      args: {},
      description: 'List of applicant education',
      resolve: async (root, _args, ctx) => {
        //@ts-ignore
        return getApplicantExperience(root.userId, ctx);
      }
    })
  })
})