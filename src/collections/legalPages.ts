import type { CollectionConfig } from 'payload'

import { seoField } from '@/fields/seo'
import { revalidateCollectionPaths, revalidateDeletedCollectionPaths } from '@/lib/revalidate'

export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  labels: {
    singular: 'Página Legal',
    plural: 'Páginas Legais',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  hooks: {
    afterChange: [revalidateCollectionPaths],
    afterDelete: [revalidateDeletedCollectionPaths],
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Título',
      required: true,
    },
    {
      type: 'text',
      name: 'slug',
      label: 'Slug',
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          'Exemplos: politica-de-cookies, politica-de-cordialidade, politica-de-privacidade, termos-de-uso',
      },
    },
    {
      type: 'richText',
      name: 'content',
      label: 'Conteúdo',
      required: true,
    },
    seoField(),
  ],
  timestamps: true,
}
