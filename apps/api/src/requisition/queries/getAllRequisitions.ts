import { RequisitionFilter } from '@erecruitment/client';

import { Context } from '~/context';
import { applyPagination } from '~/domain/search';

import { Requisition } from '../requisition';

export async function getAllRequisitions(search: RequisitionFilter, ctx: Context) {

  const query = Requisition.query(ctx.db).select('requisition.*');

  Requisition.applySearch(query, ctx.db, search?.search);

  applyPagination(query, search);

  const requisitions = await query;

  return requisitions;
}
