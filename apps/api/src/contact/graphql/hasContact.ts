import { builder } from "~/graphql/builder";
import { ContactSchema } from "./contact";
import { getApplicantContact } from "../queries";

//@ts-ignore
export const HasContactType = builder.interfaceType('HasContact', {
  fields: (t) => ({
    contact: t.field({
      type: ContactSchema,
      args: {},
      description: "list of applicant contact details",
      resolve: async (root, _args, ctx) => {
        //@ts-ignore
        return await getApplicantContact(root.userId, ctx)
      }
    })
  })
})

