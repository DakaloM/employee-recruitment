import { isActiveUser } from "~/account/shield";
import { builder } from "~/graphql/builder";
import { AddressSchema } from "./address";
import { updateAddress } from "../mutation";

const UpdateAddressInput = builder.inputType('UpdateAddressInput', {
  fields: (t) => ({
    id: t.field({type: 'String', required: true}),
    addressType: t.field({type: 'String', required: false}),
    streetAddress: t.field({type: 'String', required: false}),
    country: t.field({type: 'String', required: false}),
    city: t.field({type: 'String', required: false}),
    region: t.field({type: 'String', required: false}),
    postalCode: t.field({type: 'String', required: false}),
    contactAddress: t.field({type: 'Boolean', required: false}),
  }),
});

builder.mutationField('updateAddress', (t) => (
  t.field({
    shield: isActiveUser,
    description: 'Update address',
    args: {
      input: t.arg({type: UpdateAddressInput, required: true}),
    },
    type: AddressSchema,
    resolve: async (_root, args, ctx) => {
      return updateAddress(args.input, ctx);
    }
  })
))