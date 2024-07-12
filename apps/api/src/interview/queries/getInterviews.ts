import { InterviewFilter } from '@erecruitment/client';

import { applyPagination } from '~/domain/search';

import { Interview } from '../interview';

export async function getInterviews(input: InterviewFilter, ctx: any) {
  const query = Interview.query(ctx.db).select('interview.*');

  Interview.applySearch(query, ctx.db, input?.search);

  applyPagination(query, input);

  const interviews = await query;

  return interviews;
}
