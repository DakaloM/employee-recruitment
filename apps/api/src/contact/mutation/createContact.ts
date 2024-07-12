import { CreateContactInput } from "@erecruitment/client";
import { Context } from "~/context";
import { Contact } from "../contact";
import { ConflictError } from "@erecruitment/serverkit";
import { getMatchValues } from "~/domain/match";


export async function createContact(input: CreateContactInput, ctx: Context) {
  const {mobileNumber, email} = input
  const userContact = await Contact.query(ctx.db).findOne({userId: input.userId});

  if(userContact){
    throw new ConflictError({
      message: 'User contact information already added'
    })
  }

  const contact = await Contact.query(ctx.db).where({mobileNumber}).orWhere({email}).first();
  if(contact){
    throw new ConflictError({
      message: 'Contact already belong to another applicant',
      path: getMatchValues(contact, {mobileNumber, email})
    })
  }



  const newContact = await Contact.query(ctx.db).insertAndFetch(input);

  return newContact;
}