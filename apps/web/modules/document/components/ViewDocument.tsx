'use client';

import { AttachmentFragment } from '@erecruitment/client';
import { Button, DialogContent } from '@erecruitment/ui';

import { Download } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { PDFViewer } from '~/modules/shared';

export const ViewDocument = ({ document }: ViewDocumentProps) => {
  return (
    <DialogContent className="h-full p-8 flex flex-col gap-4 min-w-[1000px]">
      <div className="flex w-full items-center justify-between">
        <h1 className="font-bold text-lg w-full text-center">{document.name}</h1>

        <Link href={document.downloadUrl} download className="mt-2">
          <Button variant="ghost">
            <Download />
          </Button>
        </Link>
      </div>

      <PDFViewer url={document.downloadUrl} />
    </DialogContent>
  );
};

type ViewDocumentProps = {
  document: AttachmentFragment;
};
