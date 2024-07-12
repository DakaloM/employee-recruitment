import { ContactFragment } from "@erecruitment/client";
import { MailOpen, Phone, PhoneCall, Smartphone } from "lucide-react";
import React from "react";
import { ItemLabel } from "~/modules/shared";

export const Contact = ({ contact }: ContactProps) => {

  return (
    <div className="w-full flex flex-wrap gap-y-4 gap-x-4">
     
        <ItemLabel label="Email" value={contact.email} Icon={MailOpen} />

        <ItemLabel label="Mobile Number" value={contact.mobileNumber} Icon={Smartphone} />

        {contact.privateNumber && <ItemLabel label="Secondary number" value={contact.privateNumber} Icon={Smartphone} />}

        {contact.businessNumber && <ItemLabel label="Telephone Number" value={contact.businessNumber} Icon={Phone} />}
     
    </div>
  );
};

type ContactProps = {
  contact: ContactFragment;
};
