'use client';

import { AttachmentFragment, AttachmentType, TypeIdentifier } from '@erecruitment/client';
import { Button, Dialog, DialogContent, Loader, closeDialog } from '@erecruitment/ui';

import { FileIcon, FilesIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { coerce, z } from 'zod';
import { executeApi } from '~/client/api';
import { ListDisplay } from '~/modules/shared';

import { AddDocument } from './AddDocument';
import { DeleteDocument } from './DeleteDocument';
import { UpdateDocumentForm } from './UpdateDocumentForm';
import { ViewDocument } from './ViewDocument';

export const DocumentsDisplay = (props: EducationsDisplayProps) => {
  const { attachments: documents, applicantId } = props;
  const router = useRouter();

  const schema = z.object({
    id: z.string(),
    document: z.string(),
    date: z.coerce.date(),
    type: z.array(z.string()),
  });

  const handleClick = async (item: z.infer<typeof schema>) => {
    router.push(`/document/${item.id}`);
  };
  return (
    <div className="w-full h-full flex flex-col gap-y-4 justify-between overflow-y-auto">
      <div className="flex flex-col gap-y-4">
        <h1 className="font-bold text-2xl border-b w-max self-center">Documents</h1>

        <p className="text-gray-500 text-sm max-w-[500px] self-center">
          Submit all required documents before apply for any position
        </p>

        <ListDisplay
          data={documents.map(
            (doc) =>
              ({
                sequence: doc.sequence,
                description: doc.description || '',
                id: doc.id,
                document: doc.name,
                type: doc.type,
                date: doc.createdAt,
              }) as any,
          )}
          schema={schema}
          hideSearch={true}
          onItemSelect={handleClick}
          title="Documents"
          Create={() => (
            <AddDocument
              refId={applicantId}
              refTypeIdentifier={TypeIdentifier.Applicant}
              type={AttachmentType.CertificateOrDiploma}
              closeOnSubmit={false}
            >
              <Button size="sm" className="my-auto  w-full flex gap-2 whitespace-nowrap">
                <FilesIcon /> Add Document
              </Button>
            </AddDocument>
          )}
          actions={{
            Edit: ({ defaults }: { defaults: any }) => {
              const document = documents.find((d) => d.sequence == defaults.id)!;

              return (
                <Dialog defaultOpen={true}>
                  <DialogContent>
                    <span className="text-center font-semibold">Update document</span>
                    <div className="flex flex-col p-6">
                      <UpdateDocumentForm
                        fileId={document.id}
                        refId={document.refId}
                        initialValues={
                          {
                            ...document,
                            type: document.type,
                          } as any
                        }
                        type={document.type}
                        onCompleted={() => closeDialog()}
                        includeFields={['location']}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              );
            },

            View: ({ defaults }: { defaults: any }) => {
              const document = documents.find((d) => d.sequence == defaults.id)!;

              return (
                <Dialog defaultOpen={true}>
                  <ViewDocument document={document} />
                </Dialog>
              );
            },

            Delete: ({ defaults }: { defaults: any }) => {
              const document = documents.find((d) => d.sequence == defaults.id)!;

              return (
                <Dialog defaultOpen={true}>
                  <DeleteDocument documentId={document.id} />
                </Dialog>
              );
            },
          }}
        />
      </div>

      <div></div>

      {/* <AddDocument
        refTypeIdentifier={TypeIdentifier.Applicant}
        refId={applicantId}
        type={AttachmentType.CertificateOrDiploma}
      /> */}
    </div>
  );
};

export type EducationsDisplayProps = {
  attachments: AttachmentFragment[];
  applicantId: string;
};
