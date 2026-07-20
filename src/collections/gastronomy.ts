import type { CollectionConfig } from 'payload'

import { revalidateCollectionPaths, revalidateDeletedCollectionPaths } from '@/lib/revalidate'

export const Gastronomy: CollectionConfig = {
  slug: 'gastronomy',
  labels: {
    singular: 'Gastronomia',
    plural: 'Gastronomia',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'room', 'phone'],
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
    },
    {
      type: 'text',
      name: 'name',
      label: 'Nome',
      required: true,
    },
    {
      type: 'text',
      name: 'category',
      label: 'Categoria',
      required: true,
      admin: {
        description: 'Exemplo: Moda jovem',
      },
    },
    {
      type: 'text',
      name: 'room',
      label: 'Sala',
      required: true,
      admin: {
        description: 'Exemplo: Sala 17',
      },
    },
    {
      type: 'group',
      name: 'openingHours',
      label: 'Horários',
      fields: [
        {
          type: 'text',
          name: 'weekdays',
          label: 'Segunda a sexta',
          required: true,
          admin: {
            description: 'Exemplo: 08:30 às 19h',
          },
        },
        {
          type: 'text',
          name: 'saturday',
          label: 'Sábado',
          required: true,
          admin: {
            description: 'Exemplo: 08:30 às 18h',
          },
        },
      ],
    },
    {
      type: 'text',
      name: 'phone',
      label: 'Telefone',
      required: true,
      admin: {
        description: 'Exemplo: 54 3401 5982',
      },
    },
    {
      type: 'array',
      name: 'socialLinks',
      label: 'Redes sociais',
      required: true,
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          type: 'select',
          name: 'network',
          label: 'Rede social',
          required: true,
          options: [
            {
              label: 'Instagram',
              value: 'instagram',
            },
            {
              label: 'WhatsApp',
              value: 'whatsapp',
            },
            {
              label: 'Facebook',
              value: 'facebook',
            },
          ],
        },
        {
          type: 'text',
          name: 'url',
          label: 'URL',
          required: true,
        },
      ],
    },
  ],
  timestamps: true,
}
