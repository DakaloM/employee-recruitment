import React from "react";

export default async function Page(props: Props) {
  const { searchParams } = props;

  const { search: name, page = "1", count = "20" } = searchParams;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Job application pagejhfkdsjhg</h1>
    </div>
  );
}

interface Props {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}
