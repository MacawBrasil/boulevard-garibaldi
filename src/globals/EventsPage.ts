import type { GlobalConfig } from 'payload'

import { seoField } from '@/fields/seo'

export const EventsPage: GlobalConfig = {
  slug: 'events-page',
  label: 'Página de Eventos',
  fields: [
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
      type: 'richText',
      name: 'textPrimary',
      label: 'Texto Principal',
      required: true,
    },
    {
      type: 'richText',
      name: 'text',
      label: 'Campo de Texto',
      admin: {
        description:"Ese texto será exibido na página Home (seção de eventos).",
      },
      required: true,
    },
    seoField(),
  ],
}
