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
  institution: z.string(),
  educationLevel: z.nativeEnum(EducationLevel),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  finalGrade: z.nativeEnum(FinalGrade),
  region: z.nativeEnum(Region),
  location: z.string(),
  country: z.string(),
});

const educationLevelOptions = Object.values(EducationLevel).map((value) => ({
  value,
  label: startCase(value),
}));

const finalGradeOptions = Object.values(FinalGrade).map((value) => ({
  value,
  label: startCase(value),
}));

const regionOptions = Object.values(Region).map((value) => ({
  value,
  label: startCase(value),
}));

type Schema = typeof userSchema;
type Data = z.infer<Schema>;


const fields = [
  {
    name: 'institution',
    className: 'col-span-1',
    Component: TextInput,
  },
  {
    name: 'educationLevel',
    className: 'col-span-1',
    Component: (props: FormFieldProps<EducationLevel>) => <Select {...props} options={educationLevelOptions}/>,
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
    name: 'finalGrade',
    className: 'col-span-1',
    Component: (props: FormFieldProps<FinalGrade>) => <Select {...props} options={finalGradeOptions}/>,
  },
  {
    name: 'region',
    className: 'col-span-1',
    Component: (props: FormFieldProps<Region>) => <Select {...props} options={regionOptions}/>,
  },
  {
    name: 'location',
    className: 'col-span-1',
    Component: TextInput,
  },
  {
    name: 'country',
    className: 'col-span-1',
    Component: TextInput,
  },



  
] as const;

export const CreateEducation = ({userId}: CreateEducationProps) => {
  const router = useRouter();


  const onSubmit = async (data: Data) => {

   
    await executeApi('createEducation', {
      ...data,
      userId: userId,
     
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <div className="flex items-center gap-2">
            <PlusIcon size={25} /> Add education
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <span className="text-center font-semibold">Add education</span>
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

export type CreateEducationProps = {
  userId: string
}


