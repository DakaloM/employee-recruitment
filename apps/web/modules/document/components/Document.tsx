import { AttachmentFragment } from '@erecruitment/client'
import React from 'react'

export const Document = ({attachment}: DocumentProps) => {
  return (
    <div>
      Document
    </div>
  )
}

type DocumentProps = {
    attachment: AttachmentFragment
}

