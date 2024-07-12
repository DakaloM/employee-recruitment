import { Factory as BaseFactory, createFactory as createBaseFactory } from '@erecruitment/datakit';

import { userBuilder } from '~/account/builder';
import { clientBuilder } from '~/auth/builder';
import { Context } from '~/context';
import { attachmentBuilder } from '~/documents/builder';
import { typeSeeds } from '~/type/builder';
import { addressBuilder } from '~/address/builder';

const builders = {
  attachment: attachmentBuilder,
  client: clientBuilder,
  user: userBuilder,
  address: addressBuilder,
};

const seeds = {
  types: typeSeeds,
};

export type Factory = BaseFactory<typeof builders, typeof seeds>;

export function createFactory(ctx: Context): Factory {
  return createBaseFactory(builders, seeds, ctx);
}
