"use client";

import { FullApplicantFragment } from "@erecruitment/client";

import React, { useState } from "react";

import {  ProfileTabType, profileTabs } from "../utils";
import { ProfileNav } from "./ProfileNav";
import { ProfileTabView } from "./ProfileTabView";

export const ProfileDisplay = (props: ProfileDisplayProps) => {
  const [currentTab, setCurrentTab] = useState<ProfileTabType>(profileTabs[0]);

  const { profile } = props;

  return (
    <div className="bg-white w-full xl:w-4/5 h-full mx-auto flex flex-col lg:flex-row items-start gap-10 justify-between shadow-lg p-8 rounded-xl border ">
      <ProfileNav
        setCurrentTab={setCurrentTab}
        profile={profile}
        currentTab={currentTab}
      />
      <ProfileTabView currentTab={currentTab} profile={profile} />
    </div>
  );
};

type ProfileDisplayProps = {
  profile: FullApplicantFragment;
};
