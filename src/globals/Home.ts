import type { GlobalConfig } from 'payload'

import { buttonFields } from '@/fields/button'
import { seoField } from '@/fields/seo'
import { revalidateGlobalPaths } from '@/lib/revalidate'

export const Home: GlobalConfig = {
  slug: 'home',
  hooks: {
    afterChange: [revalidateGlobalPaths],
  },
  fields: [
    {
      type: 'group',
      name: 'hero',
      fields: [
        {
          type: 'array',
          name: 'slides',
          fields: [
            {
              type: 'upload',
              name: 'image',
              label: 'Imagem',
              relationTo: 'media',
              admin: {
                description: 'Dimensões padrão (1920x970)',
              },
            },
            {
              type: 'upload',
              name: 'imageMobile',
              label: 'Imagem Mobile',
              admin: {
                description: 'Dimensões padrão (375x667)',
              },
              relationTo: 'media',
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'section',
      fields: [
        {
          type: 'upload',
          name: 'image',
          label: 'Imagem',
          admin: {
            description: 'Dimensões padrão (750x750)',
          },
          relationTo: 'media',
        },
        {
          type: 'text',
          name: 'title',
          label: 'Título',
          required: true,
        },
        {
          type: 'textarea',
          name: 'description',
          label: 'Descrição',
          required: true,
        },
        {
          type: 'array',
          name: 'items',
          fields: [
            {
              type: 'upload',
              name: 'icon',
              label: 'Ícone',
              relationTo: 'media',
              admin: {
                description: 'Dimensões padrão (85x85)',
              },
            },
            {
              type: 'text',
              name: 'title',
              label: 'Título',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'banner',
      fields: [
        {
          type: 'upload',
          name: 'image',
          label: 'Imagem',
          relationTo: 'media',
          admin: {
            description: 'Dimensões padrão (1082x373)',
          },
        },
        {
          type: 'text',
          name: 'title',
          label: 'Título',
          required: true,
        },
        ...buttonFields(),
      ],
    },
    seoField(),
  ],
}
