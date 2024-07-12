import { builder } from "~/graphql/builder";
import {
  EmploymentType,
  Requisition,
  RequisitionHierarchy,
  RequisitionStatus,
  WorkPlace,
} from "../requisition";
import { isActiveUser } from "~/account/shield";
import { allow } from "graphql-shield";
import { getAllRequisitions, getRequisitionById } from "../queries";
import { HasPositionType, PositionSchema } from "~/position/graphql";


export const RequisitionStatusSchema = builder.enumType(RequisitionStatus, {
  name: "RequisitionStatus",
  description: "Requisition status",
});

export const RequisitionHierarchySchema = builder.enumType(
  RequisitionHierarchy,
  {
    name: "requisitionHierarchy",
    description: "Requisition hierarchy",
  }
);

export const WorkPlaceSchema = builder.enumType(WorkPlace, {
  name: "WorkPlace",
  description: "Work place",
});

export const EmploymentTypeSchema = builder.enumType(EmploymentType, {
  name: "EmploymentType",
  description: "Employment type",
});

export const RequisitionFilter = builder.inputType("RequisitionFilter", {
  fields: (t) => ({
    limit: t.field({ type: "Int", defaultValue: 10 }),
    page: t.field({ type: "Int", defaultValue: 1 }),
    search: t.field({ type: "String", required: false }),
  }),
});

export const RequisitionSchema = builder.objectType(Requisition, {
  name: "Requisition",
  shield: allow,
  description:
    "requisition is any request to create an advert for open job position",
  interfaces: [HasPositionType],

  fields: (t) => ({
    id: t.exposeID("id"),
    objectId: t.exposeString("objectId"),
    position: t.expose("position", {
      type: PositionSchema,
      description: "Position of the requisition",
    }),
    title: t.exposeString("title"),
    endDate: t.expose("endDate", {
      type: "Date",
      description: "The end date of the requisition",
    }),
    positionTitle: t.exposeString("positionTitle"),
    hierarchy: t.expose("hierarchy", {
      type: RequisitionHierarchySchema,
      description: "requisition hierarchy",
    }),
    hiringDate: t.expose("hiringDate", {
      type: "Date",
      description: "Desired hiring date",
    }),
    status: t.expose("status", {
      type: RequisitionStatusSchema,
      description: "Requisition status",
    }),
    workplace: t.expose("workplace", { type: WorkPlaceSchema }),
    employmentType: t.expose("employmentType", { type: EmploymentTypeSchema }),
    qualifications: t.exposeStringList("qualifications"),
    responsibilities: t.exposeStringList("responsibilities"),
    experience: t.exposeInt("experience"),
    createdAt: t.expose("createdAt", {
      type: "Date",
      description: "Creation date of the requisition",
    }),
    location: t.exposeString("location"),
    updatedAt: t.expose("updatedAt", {
      type: "Date",
      description: "Update date of the requisition",
    }),
    sequence: t.exposeInt("sequence"),
  }),
});

builder.queryField("requisitions", (t) =>
  t.field({
    shield: isActiveUser,
    description: "A list of job requisitions",
    args: {
      input: t.arg({ type: RequisitionFilter, required: false }),
    },
    type: [RequisitionSchema],
    resolve: async (_root, args, ctx) => {
      return await getAllRequisitions(args.input || {}, ctx);
    },
  })
);

builder.queryField("requisition", (t) =>
  t.field({
    shield: allow,
    description: "A list of job advertisements",
    args: {
      id: t.arg.id({ required: true }),
    },
    type: RequisitionSchema,
    resolve: async (_root, args, ctx) => {
      return await getRequisitionById(args.id.toLocaleString(), ctx);
    },
  })
);
