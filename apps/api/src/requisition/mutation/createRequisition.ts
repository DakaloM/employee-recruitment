import {
  CreateRequisitionInput
} from "@erecruitment/client";

import { Context } from "~/context";
import { Requisition, RequisitionHierarchy } from "../requisition";
import { Position } from "~/position/position";
import { NotFoundError } from "@erecruitment/serverkit";
import { getMatchValues } from "~/domain/match";
import { parse } from "south-african-id-parser";

export async function createRequisition(
  input: CreateRequisitionInput,
  ctx: Context
) {
  const {
    objectId,
    title,
    endDate,
    hiringDate,
    experience,
    workplace,
    employmentType,
  } = input;

  const hierarchy = input.hierarchy as RequisitionHierarchy;

  return await Requisition.transaction(ctx.db, async (trx) => {
    const position = await Position.query(trx).findById(objectId);

    if (!position) {
      throw new NotFoundError({
        message: "Vacant position not found",
      });
    }

    const newRequisition = await Requisition.query(trx).insertAndFetch({
      objectId,
      title,
      positionTitle: position.positionTitle,
      endDate,
      hiringDate,
      qualifications: position.qualifications,
      experience,
      hierarchy,
      workplace,
      employmentType,
      location: position.location,
    });

    return newRequisition;
  });
}
