
import { withRedirect } from 'auth/withRedirect';
import { ClipboardList } from 'lucide-react';
import React from 'react'
import { z } from 'zod';
import { apiClient } from '~/client/server-proxy';
import { RequisitionList } from '~/modules/requisition/components';
import { PageHeader } from '~/modules/shared';



 async function Page(props: Props) {

  const { searchParams } = props;

  const { search, page = '1', count = '20' } = searchParams;

  const requisitions = await apiClient.requisitions({
    limit: Number(count),
    page: Number(page),
    search,
  })


  return (
    <section className="grid flex-col gap-8 w-full h-full pb-8 overflow-y-auto" suppressHydrationWarning={true}>
     
      <PageHeader title='Requisitions' Icon={ClipboardList}/>
      <RequisitionList requisitions={requisitions}/>
    </section>
  )
}
export default withRedirect(Page)


interface Props {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

