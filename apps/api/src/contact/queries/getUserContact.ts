import { Context } from "~/context";
import { Contact } from "../contact";
import { NotFoundError } from "@erecruitment/serverkit";


export async function getUserContact(ctx: Context) {
  const contact = await Contact.query(ctx.db).whereIn('contact.userId', ctx.auth.actorIds).first();

  if(!contact){
    throw new NotFoundError({
      message: 'Contact not found'
    })
  }

  return contact;
}