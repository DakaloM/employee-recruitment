import { UpdateContactInput } from "@erecruitment/client";
import { Context } from "~/context";
import { Contact } from "../contact";
import { NotFoundError } from "@erecruitment/serverkit";


export async function updateContact(input: UpdateContactInput, ctx: Context) {
  const {id, ...attrs} = input;
  const contact = await Contact.query(ctx.db).findById(id);

  if(!contact){
    throw new NotFoundError({
      message: 'Contact not found'
    })
  }

  const patchInput = JSON.parse(JSON.stringify(attrs));

  const updatedContact = contact.$query(ctx.db).patchAndFetch(patchInput);

  return updatedContact;
}