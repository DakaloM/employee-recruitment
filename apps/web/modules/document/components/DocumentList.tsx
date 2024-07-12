'use client';

import { AttachmentFragment, AttachmentType } from '@erecruitment/client';
import { Dialog, DialogContent, Table, closeDialog } from '@erecruitment/ui';

import { TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { executeApi } from '~/client/api';
import { MediaViewer } from '~/modules/shared/components/MediaViewer';

import { UpdateDocumentForm } from './UpdateDocumentForm';
import { ViewDocument } from './ViewDocument';

export const schema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  type: z.string(),
});

export function DocumentList({ documents, type }: DocumentListProps) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<AttachmentFragment | null | undefined>(null);
  const data = documents.map((v) => ({
    ...v,
    id: v.sequence.toString(),
    name: v.description || v.name,
    type: v.type,
  }));

  const handleClick = (sequence: string) => {
   
  };

  const deleteDocument = (sequence: string) => {
    const document = documents.find((c) => c.sequence.toString() === sequence);
    if (!document) {
      return;
    }

    executeApi('deleteAttachment', document.id).then(router.refresh);
    router.refresh();
  };

  return (
    <section className="grid w-full">
      <Dialog open={Boolean(selectedFile)} onOpenChange={(open) => !open && setSelectedFile(null)}>
        <DialogContent className="max-w-6xl">
          {selectedFile && (
            <div className="relative">
              <MediaViewer
                src={selectedFile.downloadUrl}
                title={selectedFile.description || selectedFile.name}
                contentType={selectedFile.contentType}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Table
        schema={schema}
        data={data}
        onClick={handleClick}
        actions={{
          View: ({ defaults }: { defaults: any }) => {
            const document = documents.find((d) => d.sequence == defaults.id)!;

            return (
              <Dialog defaultOpen={true}>
                <ViewDocument document={document} />
              </Dialog>
            );
          },
        }}
      />
    </section>
  );
}

interface DocumentListProps {
  documents: AttachmentFragment[];
  type: AttachmentType;
}
