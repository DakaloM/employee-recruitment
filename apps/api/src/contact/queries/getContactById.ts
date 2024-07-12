import { Context } from "~/context";
import { Contact } from "../contact";
import { NotFoundError } from "@erecruitment/serverkit";


export async function getContactById(id: string, ctx: Context) {
  
  const contact = await Contact.query(ctx.db).findById(id);

  if(!contact) {
    throw new NotFoundError({
      message: 'Contact not found'
    })
  }

  return contact;
}