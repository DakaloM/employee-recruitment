import { isActiveUser, isApplicant } from "~/account/shield";
import { builder } from "~/graphql/builder";
import { ContactSchema } from "./contact";
import { createContact } from "../mutation";
import { or } from "graphql-shield";

const CreateContactInput = builder.inputType("CreateContactInput", {
  fields: (t) => ({
    userId: t.string({ required: true }),
    email: t.string({ required: true }),
    mobileNumber: t.string({ required: true }),
    businessNumber: t.string({ required: false }),
    privateNumber: t.string({ required: false }),
  }),
});

builder.mutationField("createContact", (t) =>
  t.field({
    shield: or(isActiveUser, isApplicant),
    description: "Create user contact",
    args: {
      input: t.arg({ type: CreateContactInput, required: true }),
    },
    type: ContactSchema,
    resolve: async (_root, args, ctx) => {
      return await createContact(args.input, ctx);
    },
  })
);
