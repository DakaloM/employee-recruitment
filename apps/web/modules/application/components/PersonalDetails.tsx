"use client";
import { UserFragment } from "@erecruitment/client";
import { formatDate } from "@erecruitment/utils";
import {
  Calendar,
  Fingerprint,
  IndentIcon,
  Paintbrush,
  PersonStanding,
} from "lucide-react";
import React from "react";
import { ItemLabel } from "~/modules/shared";

export const PersonalDetails = ({ user }: PersonalDetailsProps) => {
  console.log(user);
  return (
    <div className="w-full flex flex-col gap-4">

      <div className="flex flex-col gap-y-2 w-max border border-100 p-4 rounded-lg">
        <h1 className="font-semibold">Date of birth</h1>
        <ItemLabel
          label="Date of birth"
          value={formatDate(user.birthDate!)}
          labelClass="text-lg"
          valueClass="text-lg"
          Icon={Calendar}
        />

        <ItemLabel
          label="ID Number"
          value={user.idNumber!}
          labelClass="text-lg"
          valueClass="text-lg"
          Icon={Fingerprint}
        />
      </div>

      <div className="flex flex-col gap-y-2 w-max border border-100 p-4 rounded-lg">
        <h1 className="font-semibold">Ethnicity</h1>
        <ItemLabel
          label="Gender"
          value={user.gender!}
          labelClass="text-lg"
          valueClass="text-lg"
          Icon={PersonStanding}
        />

        <ItemLabel
          label="Race"
          value={user.race!}
          labelClass="text-lg"
          valueClass="text-lg"
          Icon={Paintbrush}
        />
      </div>
    </div>
  );
};

type PersonalDetailsProps = {
  user: UserFragment;
};
