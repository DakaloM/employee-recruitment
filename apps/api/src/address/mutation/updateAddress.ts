import { UpdateAddressInput } from '@erecruitment/client';
import { NotFoundError } from '@erecruitment/serverkit';

import { Context } from '~/context';

import { Address } from '../address';

export async function updateAddress(input: UpdateAddressInput, ctx: Context) {
  const { id, ...attrs } = input;

  const address = await Address.query(ctx.db).findById(id);

  if (!address) {
    throw new NotFoundError({
      message: 'Address not found',
    });
  }

  const addressPatchInput = JSON.parse(JSON.stringify(attrs));

  const updatedAddress = await address
    .$query(ctx.db)
    .patchAndFetch(addressPatchInput)

  return updatedAddress;
}
