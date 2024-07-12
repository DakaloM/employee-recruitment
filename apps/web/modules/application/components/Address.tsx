import { AddressFragment } from "@erecruitment/client";
import { Building, Code, Flag, LandPlot, MapPin } from "lucide-react";
import React from "react";
import { ItemLabel } from "~/modules/shared";

export const Address = ({ address }: AddressProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-max flex flex-col gap-2">
        <ItemLabel
          label="Street Address"
          value={address.streetAddress}
          Icon={MapPin}
        />

        <ItemLabel label="City" value={address.city} Icon={Building} />

        <ItemLabel label="Region" value={address.region} Icon={LandPlot} />

        <ItemLabel label="Country" value={address.country} Icon={Flag} />

        <ItemLabel label="Postal code" value={address.postalCode} Icon={Code} />
      </div>
    </div>
  );
};

type AddressProps = {
  address: AddressFragment;
};
