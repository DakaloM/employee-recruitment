import { FullApplicantFragment } from "@erecruitment/client";

import React from "react";

import { ProfileTab, ProfileTabType } from "../utils";

export const ProfileTabView = (props: ProfileTabViewProps) => {
  const { currentTab, profile } = props;

  return (
    <div className="w-full lg:w-4/5 border h-full p-8 rounded-xl border-primary/40">
      {currentTab.value === ProfileTab.Address ? (
        <currentTab.component
          address={profile?.address}
          userId={profile.userId}
        />
      ) : currentTab.value === ProfileTab.PersonalDetails ? (
        <currentTab.component user={profile?.user} />
      ) : currentTab.value === ProfileTab.ContactDetails ? (
        <currentTab.component
          contact={profile?.contact}
          userId={profile.userId}
        />
      ) : currentTab.value === ProfileTab.Education ? ( 
        <currentTab.component
          education={profile?.education}
          userId={profile.userId}
        />
      ) : currentTab.value === ProfileTab.Experience ? (
        <currentTab.component
          experience={profile?.experience}
          userId={profile.userId}
        />
      ) : currentTab.value === ProfileTab.Documents ? (
        <currentTab.component attachments={profile?.attachments} applicantId={profile.id}/>
      ) : (
        currentTab.value === ProfileTab.CoverLetter && (
          <currentTab.component
            experience={profile?.attachments}
            userId={profile.userId}
          />
        )
      )}
    </div>
  );
};

type ProfileTabViewProps = {
  currentTab: ProfileTabType;
  profile: FullApplicantFragment;
};
