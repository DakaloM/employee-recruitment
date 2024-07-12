import { ApplicationFilter } from '@erecruitment/client';

import { Context } from '~/context';
import { applyPagination } from '~/domain/search';

import { Application } from '../application';

export async function getApplications(input: ApplicationFilter, ctx: Context) {
  const query = Application.query(ctx.db).select('application.*');

  Application.applySearch(query, ctx.db, input?.search);

  applyPagination(query, input);

  const applications = await query;

  return applications;
}
