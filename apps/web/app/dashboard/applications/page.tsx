import React from "react";
import { apiClient } from "~/client/server-proxy";
import { ApplicationList } from "~/modules/application";

export default async function Page(props: Props) {
  const { searchParams } = props;

  const { search, page = "1", count = "20" } = searchParams;

  const applications = await apiClient.applications({
    limit: Number(count),
    page: Number(page),
    search,
  });

  return (
    <section
      className="grid flex-col gap-8 w-full h-full pb-8 overflow-y-auto"
      suppressHydrationWarning={true}
    >
      <ApplicationList applications={applications} />
    </section>
  );
}

interface Props {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}
