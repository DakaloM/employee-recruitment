import { builder } from "~/graphql/builder";
import { AddressSchema } from "./address";
import { UserSchema } from "~/account/graphql";
import { getAddressByUserId } from "../queries";
// import { getApplicantAddress } from "../queries";

//@ts-ignore
export const HasAddressType = builder.interfaceType('HasAddress', {
  fields: (t) => ({
    address: t.field({
      type: [AddressSchema],
      args: {},
      description: 'list of applicant addresses',
      resolve: async(root, _args, ctx) => {
        //@ts-ignore
        return getAddressByUserId(root.userId, ctx);
      }
    })
  })
});

//@ts-ignore
export const HasAddressSchema = builder.interfaceType('UserHasAddress', {
  fields: (t) => ({
    address: t.field({
      type: [AddressSchema],
      args: {},
      description: 'list of user addresses',
      resolve: async(root, _args, ctx) => {
        //@ts-ignore
        return getAddressByUserId(root.userId, ctx);
      }
    })
  })
});