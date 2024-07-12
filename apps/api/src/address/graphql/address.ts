import { builder } from "~/graphql/builder";
import { Address, AddressType } from "../address";
import { isActiveUser } from "~/account/shield";
import { getAddressById, getAddressByUserId } from "../queries";

const AddressTypeSchema = builder.enumType(AddressType, {
  name: 'AddressType',
  description: 'Address type'
});

export const AddressSchema = builder.objectType(Address, {
  name: 'Address',
  shield: isActiveUser,
  description: 'A user address',
  fields: (t) => ({
    id: t.exposeID('id'),
    userId: t.exposeString('userId'),
    addressType: t.expose('addressType', {type: AddressTypeSchema, description: 'Address type'}),
    streetAddress: t.exposeString('streetAddress'),
    country: t.exposeString('country'),
    city: t.exposeString('city'),
    region: t.exposeString('region'),
    postalCode: t.exposeString('postalCode'),
    contactAddress: t.exposeBoolean('contactAddress'),
    createdAt: t.expose('createdAt', {type: 'Date', description: 'Creation date of the address'})
  })
});

builder.queryField('address', (t) => (
  t.field({
    shield: isActiveUser,
    description: 'a single address',
    args: {
      id: t.arg.id({required: true})
    },
    type: AddressSchema,
    resolve: async (_root, args, ctx) => {
      return getAddressById(args.id.toString(), ctx);
    }
  })
));

builder.queryField('userAddresses', (t) => (
  t.field({
    shield: isActiveUser,
    description: 'a single address',
    args: {
      userId: t.arg({type: 'String', required: true})
    },
    type: [AddressSchema],
    resolve: async (_root, args, ctx) => {
      return getAddressByUserId(args.userId.toString(), ctx);
    }
  })
));