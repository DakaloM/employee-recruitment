'use client';

import { Gender, Race, Title, UserRole } from '@erecruitment/client';
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
  email: z.string().email(),
  mobileNumber: z
    .string()
    .refine((val) => val.startsWith('0') && val.length === 10, { message: 'Invalid phone number' }),
  privateNumber: z
    .string()
    .refine((val) => val.startsWith('0') && val.length === 10, { message: 'Invalid phone number' })
    .optional(),
  businessNumber: z
    .string()
    .refine((val) => val.startsWith('0') && val.length === 10, { message: 'Invalid phone number' })
    .optional(),

});

type Schema = typeof userSchema;
type Data = z.infer<Schema>;


const fields = [
  {
    name: 'email',
    className: 'col-span-1',
    Component: TextInput,
  },
  {
    name: 'mobileNumber',
    className: 'col-span-1',
    Component: TextInput,
  },
  {
    name: 'privateNumber',
    className: 'col-span-1',
    Component: TextInput,
  },

  {
    name: 'businessNumber',
    className: 'col-span-1',
    Component: TextInput,
  },
  
] as const;

export const CreateContact = (props: CreateContactProps) => {
  const router = useRouter();

  const onSubmit = async (data: Data) => {
    await executeApi('createContact', {
      ...data,
      userId: props.userId
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <div className="flex items-center gap-2">
            <PlusIcon size={25} /> Add contact
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <span className="text-center font-semibold">Add new contact</span>
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
            actionText="Create user"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export type CreateContactProps = {
  userId: string
}


