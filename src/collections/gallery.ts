import type { CollectionConfig } from 'payload'

import { revalidateCollectionPaths, revalidateDeletedCollectionPaths } from '@/lib/revalidate'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  labels: {
    singular: 'Item da Galeria',
    plural: 'Galeria',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'createdAt'],
  },
  hooks: {
    afterChange: [revalidateCollectionPaths],
    afterDelete: [revalidateDeletedCollectionPaths],
  },
  fields: [
    {
      type: 'upload',
      name: 'image',
      label: 'Imagem',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Dimensões padrão (1520x750)',
      },
    },
    {
      type: 'text',
      name: 'title',
      label: 'Título',
      admin: {
        description: 'Texto opcional exibido sobre a imagem.',
      },
    },
    {
      type: 'date',
      name: 'date',
      label: 'Data',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'Descrição',
      admin: {
        description: 'Texto opcional exibido sobre a imagem.',
      },
    },
  ],
  timestamps: true,
}
