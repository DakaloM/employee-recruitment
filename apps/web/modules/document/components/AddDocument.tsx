'use client';

import { AttachmentType, TypeIdentifier } from '@erecruitment/client';
import {
  Button,
  TextInput,
  TextAreaInput,
  DateInput,
  Dialog,
  DialogContent,
  DialogTrigger,
  closeDialog,
  FileUpload,
} from '@erecruitment/ui';

import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useMemo } from 'react';
import { z } from 'zod';
import { executeApi } from '~/client/api';

import { UpdateDocumentForm, type UpdateDocumentFormProps } from './UpdateDocumentForm';


export function AddDocument({
  closeOnSubmit = true,
  children,
  refId,
  refTypeIdentifier,
  type,
  includeFields = [],
}: AddDocumentProps) {
  const onSubmit = async (files: string[]) => {
    if (closeOnSubmit) {
      closeDialog();
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        {children || (
          <Button className="flex my-auto" size="sm" type="button">
            <PlusIcon size={16} /> <span className="whitespace-nowrap">Add Document</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px]">
        <span className="text-center font-semibold">Add new document</span>
        <FileUpload
          type={"Document"}
          refId={refId}
          
          createFile={async (file) => {
            const data = await executeApi('uploadAttachment', {
              contentLength: file.size,
              contentType: file.type,
              name: file.name,
              refId,
              refTypeIdentifier,
              type: AttachmentType.CertificateOrDiploma,

            });

            return {
              id: data.id,
              name: data.name,
              size: data.contentLength,
              url: data.uploadUrl,
            };
          }}
          onCompleted={onSubmit}
          UpdateDocumentForm={(props) => (
            <UpdateDocumentForm {...(props as any)} includeFields={includeFields} />
          )}
        />
      </DialogContent>
    </Dialog>
  );
}

interface AddDocumentProps
  extends PropsWithChildren<Pick<UpdateDocumentFormProps, 'includeFields' | 'refId' | 'type'>> {
  refTypeIdentifier: TypeIdentifier;
  closeOnSubmit?: boolean;
}
