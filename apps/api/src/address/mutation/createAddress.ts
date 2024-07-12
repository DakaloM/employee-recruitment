import { CreateAddressInput } from "@erecruitment/client";
import { Context } from "~/context";
import { Address } from "../address";
import { ConflictError } from "@erecruitment/serverkit";


export async function createAddress(input: CreateAddressInput, ctx: Context) {
  const userAddresses = await Address.query(ctx.db).where('address.userId', '=', input.userId);

  if(userAddresses.length > 1){
    throw new ConflictError({
      message: 'User can only have maximum of two addresses'
    })
  }
  const newAddress = await Address.query(ctx.db).insertAndFetch({...input});

  return newAddress
}