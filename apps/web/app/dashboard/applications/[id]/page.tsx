import { LucideIcon } from "lucide-react";
import { apiClient } from "~/client/index";
import { ApplicationDisplay } from "~/modules/application";

async function Page(props: Props) {
  const { params } = props;

  const application = await apiClient.application({ id: params.id });

  const applicant = application && await apiClient.applicant({ id: application.applicantId });

  return (
    <section className="flex flex-col gap-8 w-full">
      <ApplicationDisplay application={application} applicant={applicant} />
    </section>
  );
}

interface Props {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

export default Page;

const ItemLabel = ({ label, value, Icon }: ItemLabelProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={20} className="text-gray-500" />}
        <span className=" text-gray-500 font-normal">{label}:</span>
      </div>
      <span className=" text-gray-700 font-semibold">{value}</span>
    </div>
  );
};

type ItemLabelProps = {
  label: string;
  value: string;
  Icon?: LucideIcon;
};
