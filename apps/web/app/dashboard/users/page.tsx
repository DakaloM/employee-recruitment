import { RoleFilter, UserFragment, UserRole } from '@erecruitment/client';
import { Users, Users2Icon } from 'lucide-react';
import React from 'react'
import { apiClient } from '~/client/server-proxy';
import { PageHeader } from '~/modules/shared';
import { UsersDisplay } from '~/modules/user';

export default async function Page(props: Props) {

  const { searchParams } = props;

  const { search: name, page = '1', count = '10' } = searchParams;

  const {total, items} = await apiClient.users({
    limit: Number(count),
    page: Number(page),
    filter: {
      name,
    }
  })

  const users = items as UserFragment[];

  return (
    <section className="flex flex-col gap-8 w-full h-max min-h-max pb-8 " suppressHydrationWarning={true}>
      <UsersDisplay users={users} />
    </section>
  )
}


interface Props {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

