import React from "react";
import { apiClient } from "~/client/server-proxy";
import { InterviewList } from "~/modules/interview";

export default async function Page(props: Props) {
  const { searchParams } = props;

  const { search, page = '1', count = '20' } = searchParams;

  const interviews = await apiClient.interviews({
    limit: Number(count),
    page: Number(page),
    search,
  });

  return (
    <section
      className="grid flex-col gap-8 w-full h-full pb-8 overflow-y-auto"
      suppressHydrationWarning={true}
    >
      <InterviewList interviews={interviews} />
    </section>
  );
}

interface Props {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}
