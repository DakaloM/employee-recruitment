import { AdvertFragment, RoleFilter, UserRole } from '@erecruitment/client';

import React from 'react';
import { apiClient } from '~/client/server-proxy';
import { JobList } from '~/modules/jobs';

export default async function Page(props: Props) {
  const { searchParams } = props;

  const { search, page = '1', count = '20' } = searchParams;

  const adverts = await apiClient.adverts({
    limit: Number(count),
    page: Number(page),
    search,
  });



  return (
    <section
      className="flex flex-col gap-8 w-full h-max min-h-max pb-8 "
      suppressHydrationWarning={true}
    >
      <JobList jobs={adverts} />
    </section>
  );
}

interface Props {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}
