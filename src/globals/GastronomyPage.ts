import type { GlobalConfig } from 'payload'

import { seoField } from '@/fields/seo'

export const GastronomyPage: GlobalConfig = {
  slug: 'gastronomy-page',
  label: 'Página de Gastronomia',
  fields: [
    {
      type: 'upload',
      name: 'background',
      label: 'Imagem de Fundo',
      required: true,
      relationTo: 'media',
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'Descrição',
      required: true,
    },
    {
      type: 'group',
      name: 'group',
      label: 'Group',
      fields: [
        {
          type: 'text',
          name: 'title',
          label: 'Title',
          required: true,
        },
        {
          type: 'richText',
          name: 'description',
          label: 'Description',
          required: true,
        },
      ],
    },
    seoField(),
  ],
}
