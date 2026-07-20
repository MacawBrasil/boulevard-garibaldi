import type { GlobalConfig } from 'payload'

import { seoField } from '@/fields/seo'
import { revalidateGlobalPaths } from '@/lib/revalidate'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Página de Contato',
  hooks: {
    afterChange: [revalidateGlobalPaths],
  },
  fields: [
    {
      type: 'group',
      name: 'arrival',
      label: 'Como chegar',
      fields: [
        {
          type: 'text',
          name: 'breadcrumbLabel',
          label: 'Texto do breadcrumb',
          required: true,
          defaultValue: 'COMO CHEGAR',
        },
        {
          type: 'text',
          name: 'title',
          label: 'Título',
          required: true,
          defaultValue: 'Como chegar',
        },
        {
          type: 'textarea',
          name: 'description',
          label: 'Descrição',
          required: true,
        },
        {
          type: 'text',
          name: 'mapUrl',
          label: 'Link do mapa',
          required: true,
          admin: {
            description:
              'URL do Google Maps usada para exibir o mapa na página e abrir a localização.',
          },
        },
      ],
    },
    {
      type: 'group',
      name: 'contactForm',
      label: 'Formulário de contato',
      fields: [
        {
          type: 'text',
          name: 'title',
          label: 'Título',
          required: true,
          defaultValue: 'Entre em contato',
        },
        {
          type: 'textarea',
          name: 'description',
          label: 'Descrição',
          required: true,
        },
        {
          type: 'upload',
          name: 'backgroundImage',
          label: 'Imagem de fundo',
          relationTo: 'media',
        },
      ],
    },
    seoField(),
  ],
}
