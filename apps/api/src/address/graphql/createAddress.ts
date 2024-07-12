import { isActiveUser } from "~/account/shield";
import { builder } from "~/graphql/builder";
import { AddressSchema } from "./address";
import { createAddress } from "../mutation";
import { AddressType } from "../address";


const CreateAddressInput = builder.inputType('CreateAddressInput', {
  fields: (t) => ({
    userId: t.field({type: 'String', required: true}),
    addressType: t.field({type: AddressType, required: true}),
    streetAddress: t.field({type: 'String', required: true}),
    country: t.field({type: 'String', required: true}),
    city: t.field({type: 'String', required: true}),
    region: t.field({type: 'String', required: true}),
    postalCode: t.field({type: 'String', required: true}),
    contactAddress: t.field({type: 'Boolean', required: true}),
  }),
});


builder.mutationField('createAddress', (t) => (
  t.field({
    shield: isActiveUser,
    description: 'Create address',
    args: {
      input: t.arg({type: CreateAddressInput, required: true}),
    },
    type: AddressSchema,
    resolve: async (_root, args, ctx) => {
      return createAddress(args.input, ctx);
    }
  })
))