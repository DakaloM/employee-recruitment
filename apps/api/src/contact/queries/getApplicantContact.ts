import { NotFoundError } from '@erecruitment/serverkit';

import { Context } from '~/context';

import { Contact } from '../contact';

export async function getApplicantContact(userId: string, ctx: Context) {
  const contact = await Contact.query(ctx.db).where({ userId }).first();

  if (!contact) {
    throw new NotFoundError({ message: 'Contact not found' });
  }

  return contact;
}
