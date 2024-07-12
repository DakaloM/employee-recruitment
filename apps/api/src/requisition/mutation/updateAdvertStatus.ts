
import { NotFoundError } from '@erecruitment/serverkit';
import { Context } from '~/context';
import { Advert, AdvertStatus } from '../advert';

export async function updateAdvertStatus(input: any, ctx: Context) {
  const id = input.id;
  const status = input.status as AdvertStatus;

  const advert = await Advert.query(ctx.db).findById(id);
  if (!advert) {
    throw new NotFoundError({
      message: 'Job advert not found',
    });
  }

  const updatedAdvert = await advert
    .$query(ctx.db)
    .patchAndFetch({ status })

  return updatedAdvert;
}
