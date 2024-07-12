import { Context } from "~/context";
import { Address } from "../address";
import { NotFoundError } from "@erecruitment/serverkit";


export async function getAddressByUserId(userId: string, ctx: Context) {
  const userAddress = await Address.query(ctx.db).where({userId}).withGraphFetched('user');

  if(!userAddress){
    throw new NotFoundError({
      message: 'Address not found'
    })
  }

  return userAddress
}
