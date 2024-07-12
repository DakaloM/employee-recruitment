import { UserRole } from "@erecruitment/client";
import { NotFoundError } from "@erecruitment/serverkit";

import { builder } from "~/graphql/builder";

import { allow } from "graphql-shield";
import { isActiveUser } from "~/account/shield";
import { HasAddressType } from "~/address/graphql";
import { HasContactType } from "~/contact/graphql";
import { HasEducationType } from "~/education/graphql/hasEducation";
import { HasExperienceType } from "~/experience/graphql/hasExperience";

import { Applicant } from "../applicant";
import { AttachmentSchema, HasAttachmentsType } from "~/documents/graphql";
import { HasUserSchema, UserSchema } from "~/account/graphql";

export const ApplicantSchema = builder.objectType(Applicant, {
  name: "Applicant",
  shield: isActiveUser,
  interfaces: [
    HasAddressType,
    HasContactType,
    HasExperienceType,
    HasEducationType,
    HasUserSchema,
    HasAttachmentsType,

  ],
  fields: (t) => ({
    id: t.exposeID("id"),
    userId: t.exposeString("userId"),
    name: t.exposeString("name"),
    surname: t.exposeString("surname"),
    applicantNumber: t.exposeString("applicantNumber"),
    user: t.expose("user", {
      type: UserSchema,
      description: "User",
    }),
    attachments: t.expose("attachments", { type: [AttachmentSchema] }),
  }),
});

builder.queryField("applicant", (t) =>
  t.field({
    shield: allow,
    description: "An applicant",
    args: {
      id: t.arg.id({ required: true }),
    },
    type: ApplicantSchema,
    resolve: async (_root, args, ctx) => {
      const applicant = await Applicant.query(ctx.db)
        .findById(args.id)
        .withGraphFetched("user")
        .withGraphFetched("education")
        .withGraphFetched("address")
        .withGraphFetched("experience")
        .withGraphFetched("contact")
        .withGraphFetched("attachments");
      if (!applicant) {
        throw new NotFoundError({
          message: "Applicant not found",
        });
      }

      return applicant;
    },
  })
);

builder.queryField("applicantByUserId", (t) =>
  t.field({
    shield: isActiveUser,
    description: "An applicant by userId",
    args: {
      userId: t.arg({ type: "String", required: true }),
    },
    type: ApplicantSchema,
    resolve: async (_root, args, ctx) => {
      const applicant = await Applicant.query(ctx.db)
        .findOne({ userId: args.userId })
        .withGraphFetched("user")
        .withGraphFetched("education")
        .withGraphFetched("experience")
        .withGraphFetched("address")
        .withGraphFetched("contact")
        .withGraphFetched("attachments");

      if (!applicant) {
        throw new NotFoundError({
          message: "Applicant not found",
        });
      }

      return applicant;
    },
  })
);

builder.queryField("applicantByApplicantNumber", (t) =>
  t.field({
    shield: isActiveUser,
    description: "An applicant by applicantNumber",
    args: {
      applicantNumber: t.arg({ type: "String", required: true }),
    },
    type: ApplicantSchema,
    resolve: async (_root, args, ctx) => {
      const applicant = await Applicant.query(ctx.db)
        .findOne("applicantNumber", "=", args.applicantNumber)
        .withGraphFetched("user");

      if (!applicant) {
        throw new NotFoundError({
          message: "Applicant not found",
        });
      }

      return applicant;
    },
  })
);
