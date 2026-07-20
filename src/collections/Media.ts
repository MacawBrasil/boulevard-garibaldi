import type { CollectionConfig } from 'payload'

import { revalidateCollectionPaths, revalidateDeletedCollectionPaths } from '@/lib/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateCollectionPaths],
    afterDelete: [revalidateDeletedCollectionPaths],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
