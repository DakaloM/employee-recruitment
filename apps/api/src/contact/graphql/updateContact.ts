import { isActiveUser } from "~/account/shield";
import { builder } from "~/graphql/builder";
import { ContactSchema } from "./contact";
import { updateContact } from "../mutation";


const UpdateContactInput = builder.inputType('UpdateContactInput', {
  fields: (t) => ({
    id: t.string({required: true}),
    email: t.string({required: false}),
    mobileNumber: t.string({required: false}),
    businessNumber: t.string({required: false}),
    privateNumber: t.string({required: false}),

  })
});

builder.mutationField('updateContact', (t) => (
  t.field({
    shield: isActiveUser,
    description: 'Create user contact',
    args: {
      input: t.arg({type: UpdateContactInput, required: true})
    },
    type: ContactSchema,
    resolve: async (_root, args, ctx) => {
      return await updateContact(args.input, ctx);
    }
  })
))