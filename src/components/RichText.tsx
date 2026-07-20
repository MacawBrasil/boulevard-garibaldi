import { RichText as RichTextPayload } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export const RichText = ({
  data,
  className,
}: {
  data: SerializedEditorState
  className?: string
}) => {
  return <RichTextPayload data={data} className={className} />
}
