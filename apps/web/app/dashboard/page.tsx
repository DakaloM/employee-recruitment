import { AdvertFragment } from '@erecruitment/client';
import { Contact } from 'lucide-react';
import React from 'react'
import { apiClient } from '~/client/server-proxy';
import { DashboardCard, DashboardDisplay } from '~/modules/dashboard';

const Page = async () => {

  const applications = await apiClient.applications({});
  const interviews = await apiClient.interviews({});
  const jobs = await apiClient.adverts({});

  return (
    <div className='w-full flex flex-col gap-y-8 items-start'>
     <DashboardDisplay applications={applications} interviews={interviews} jobs={jobs as AdvertFragment[]} />
    </div>
  )
}

export default Page
