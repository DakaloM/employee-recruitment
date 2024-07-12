import { builder } from "~/graphql/builder";
import { EducationSchema } from "./education";
import { getApplicantEducation } from "../queries";

//@ts-ignore
export const HasEducationType = builder.interfaceType('HasEducation', {
  fields: (t) => ({
    education: t.field({
      type: [EducationSchema],
      args: {},
      description: 'List of applicant education',
      resolve: async (root, _args, ctx) => {
        //@ts-ignore
        return getApplicantEducation(root.userId, ctx);
      }
    })
  })
})