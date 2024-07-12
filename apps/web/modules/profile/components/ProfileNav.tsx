'use client';

import React from 'react';
import { ProfileTabType, profileItemCheckList, profileTabs } from '../utils';
import { ActionButton } from './ActionButton';
import { FullApplicantFragment } from '@erecruitment/client';
import { ProfileItemCheck } from './ProfileItemCheck';

export const ProfileNav = (props: ProfileNavigationProps) => {
  const {currentTab ,setCurrentTab, profile } = props;

  const checkList = profileItemCheckList(profile);

  return (
    <div className="flex flex-col items-start justify-between gap-8  h-max w-full lg:w-1/5 pl-0 my-8">

      <div className="flex flex-wrap lg:flex-col items-start gap-2 border-l-2 border-gray-300 h-max w-full pl-0 ">

      {profileTabs.map((tab) => (
        <ActionButton setCurrentTab={setCurrentTab} key={tab.id} tab={tab} currentTab={currentTab} className='w-max rounded-full min-w-max'/>
      ))}
      </div>
      <hr className="border-none h-[1px] w-full bg-gray-200"/>
      
      <div className='w-full flex flex-wrap lg:flex-col items-start gap-y-4'>
        <span className='text-sm font-normal text-primary underline w-full'>Profile progress</span>
          {
            checkList.map((item) => (
              <ProfileItemCheck 
                key={item.id}
                check={item.present}
                title={item.title}
              />
            ))
          }
      </div>
    </div>
  );
};

type ProfileNavigationProps = {
  setCurrentTab: (tab: ProfileTabType) => void;
  currentTab: ProfileTabType,
  profile: FullApplicantFragment
};
