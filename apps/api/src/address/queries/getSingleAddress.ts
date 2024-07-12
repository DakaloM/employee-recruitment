import { Context } from "~/context";
import { Address } from "../address";
import { NotFoundError } from "@erecruitment/serverkit";




export async function getAddressById(id: string, ctx:Context) {
  const address = await Address.query(ctx.db).findById(id).withGraphFetched('user');

  if(!address){
    throw new NotFoundError({
      message: 'Address not found'
    })
  }

  return address;
}