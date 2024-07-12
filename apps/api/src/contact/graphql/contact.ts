import { builder } from "~/graphql/builder";
import { Contact } from "../contact";
import { isActiveUser, isApplicant } from "~/account/shield";
import { getContactById, getUserContact } from "../queries";
import { or } from "graphql-shield";


export const ContactSchema = builder.objectType(Contact, {
  name: 'Contact',
  description: 'User contact details',
  shield: or(isActiveUser, isApplicant),
  fields: (t) => ({
    id: t.exposeID('id'),
    userId: t.exposeString('userId'),
    email: t.exposeString('email'),
    mobileNumber: t.exposeString('mobileNumber'),
    businessNumber: t.exposeString('businessNumber', {nullable: true}),
    privateNumber: t.exposeString('privateNumber', {nullable: true}),
  })
});

builder.queryField('contact', (t) => (
  t.field({
    shield: or(isActiveUser, isApplicant),
    description: 'Get contact by its id',
    args: {
      id: t.arg.id({required: true})
    },
    type: ContactSchema,
    resolve: async(_root, args, ctx) => {
      return await getContactById(args.id.toString(), ctx);
    }
  })
));

builder.queryField('userContact', (t) => (
  t.field({
    shield: or(isActiveUser, isApplicant),
    description: 'Get user contact details',
    type: ContactSchema,
    resolve: async(_root, args, ctx) => {
      return await getUserContact(ctx);
    }
  })
));