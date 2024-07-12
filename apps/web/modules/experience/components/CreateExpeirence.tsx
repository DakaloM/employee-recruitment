'use client';

import { EducationLevel, FinalGrade, Gender, Race, Region, Title, UserRole } from '@erecruitment/client';
import {
  Button,
  TextInput,
  Select,
  DateInput,
  Form,
  Dialog,
  DialogContent,
  DialogTrigger,
  FormFieldProps,
  closeDialog,
  EmailInput,
  FieldProps,
} from '@erecruitment/ui';
import { startCase } from '@erecruitment/utils';
import {z} from 'zod'
import { executeApi } from 'client/api';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';


const userSchema = z.object({
  employer: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  industry: z.string(),
  jobTitle: z.string(),
  region: z.nativeEnum(Region),
  country: z.string(),
  workContract: z.string()
});



const regionOptions = Object.values(Region).map((value) => ({
  value,
  label: startCase(value),
}));

type Schema = typeof userSchema;
type Data = z.infer<Schema>;


const fields = [
  {
    name: 'employer',
    className: 'col-span-1',
    Component: TextInput,
  },
  {
    name: 'startDate',
    className: 'col-span-1',
    Component: DateInput,
  },
  {
    name: 'endDate',
    className: 'col-span-1',
    Component: DateInput,
  },
  {
    name: 'industry',
    className: 'col-span-1',
    Component: TextInput,
  },

  {
    name: 'region',
    className: 'col-span-1',
    Component: (props: FormFieldProps<Region>) => <Select {...props} options={regionOptions}/>,
  },
  {
    name: 'jobTitle',
    className: 'col-span-1',
    Component: TextInput,
  },
  {
    name: 'country',
    className: 'col-span-1',
    Component: TextInput,
  },
  {
    name: 'workContract',
    className: 'col-span-1',
    Component: TextInput,
  },



  
] as const;

export const CreateExperience = ({userId}: CreateExperienceProps) => {
  const router = useRouter();


  const onSubmit = async (data: Data) => {

   
    await executeApi('createExperience', {
      ...data,
      userId: userId,
     
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <div className="flex items-center gap-2">
            <PlusIcon size={20} /> Add experience
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <span className="text-center font-semibold">Add experience</span>
        <div className="flex flex-col p-6">
          <Form
            fields={fields as any}
            onSubmit={onSubmit}
            onCompleted={() => {
              router.refresh();
              closeDialog();
            }}
            initialValues={{}}
            // @ts-ignore
            schema={userSchema}
            actionText="Save"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export type CreateExperienceProps = {
  userId: string
}


