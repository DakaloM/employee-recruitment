'use client';

import { Button, cn } from '@erecruitment/ui';

import React, { useEffect, useState } from 'react';

import { ProfileTabType } from '../utils';

export const ActionButton = (props: NavButtonProps) => {
  const [active, setActive] = useState<boolean>(false);
  const { setCurrentTab, tab, currentTab, className } = props;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const list = document.querySelectorAll('.navButton');
    for (var i = 0; i < list.length; i++) {
      list[i].classList.remove('bg-primary', 'font-semibold', 'text-white');
      list[i].classList.add('text-gray-500');
    }
    e.currentTarget.classList.add('bg-primary', 'text-white', 'font-semibold');
    setCurrentTab(tab);
  };

  useEffect(() => {
    const list = document.querySelectorAll('.navButton');
    for (var i = 0; i < list.length; i++) {
      list[i].classList.remove('bg-primary', 'font-semibold', 'text-white');
      list[i].classList.add('text-gray-500');
    }
    setActive(tab.value === currentTab.value);
  }, [currentTab.value, tab.value]);

  const cls = active
    ? 'bg-primary text-white font-semibold'
    : 'bg-transparent text-gray-500 hover:text-primary hover:bg-transparent';

  return (
    <Button
      className={cn(`navButton flex items-center justify-start text-md lg:w-full lg:rounded-r-full lg:rounded-l-none  ${cls} `, className)}
      onClick={(e) => handleClick(e)}
    >
      <p className={`flex text-inherit text-sm`}>{tab.title}</p>
    </Button>
  );
};

type NavButtonProps = {
  setCurrentTab: (tab: ProfileTabType) => void;
  tab: ProfileTabType;
  currentTab: ProfileTabType;
  className?:  string
};
