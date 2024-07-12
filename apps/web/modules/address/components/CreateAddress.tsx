

import { AddressType, Gender, Race, Title, UserRole } from '@erecruitment/client';
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
  FormFileInputProps,
  CheckboxInput,
} from '@erecruitment/ui';
import { startCase } from '@erecruitment/utils';
import {z} from 'zod'
import { executeApi } from 'client/api';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Address } from '~/modules/profile/components/details';


const addressSchema = z.object({
  streetAddress: z.string(),
  region: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string(),
  addressType: z.nativeEnum(AddressType),


});

type Schema = typeof addressSchema;
type Data = z.infer<Schema>;

const addressTypeOptions= Object.values(AddressType).map((value) => ({
  value,
  label: startCase(value),
}));



const fields = [
  {
    name: 'streetAddress',
    className: 'col-span-1',
    Component: TextInput,
  },
  {
    name: 'city',
    className: 'col-span-1',
    Component: TextInput,
  },
  {
    name: 'region',
    className: 'col-span-1',
    Component: TextInput,
  },

  {
    name: 'postalCode',
    className: 'col-span-1',
    Component: TextInput,
  },
  {
    name: 'country',
    className: 'col-span-1',
    Component: TextInput,
  },
  
  {
    name: 'addressType',
    className: 'col-span-1',
    Component: (props: FormFieldProps<AddressType>) => <Select {...props} options={addressTypeOptions}/>,
  },
  
];

export const CreateAddress = (props: CreateAddressProps) => {
  const router = useRouter();

  const onSubmit = async (data: Data) => {
    await executeApi('createAddress', {
      ...data,
      userId: props.userId,
      contactAddress: true
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <div className="flex items-center gap-2">
            <PlusIcon size={18} /> Add address
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <span className="text-center font-semibold">Add new address</span>
        <div className="flex flex-col p-6">
          <Form
            fields={fields as any}
            onSubmit={onSubmit}
            onCompleted={() => {
              router.refresh();
              closeDialog();
            }}
            initialValues={{}}
     
            schema={addressSchema}
            actionText="Create address"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export type CreateAddressProps = {
  userId: string
}


