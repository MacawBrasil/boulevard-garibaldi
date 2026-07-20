import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Evento',
    plural: 'Eventos',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'startTime', 'endTime'],
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
      name: 'title',
      label: 'Título',
      required: true,
      admin: {
        description: 'Exemplo: Participe da Estação Bem-estar',
      },
    },
    {
      type: 'date',
      name: 'date',
      label: 'Data',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
    {
      type: 'row',
      fields: [
        {
          type: 'text',
          name: 'startTime',
          label: 'Horário de início',
          required: true,
          admin: {
            width: '50%',
            description: 'Exemplo: 9h',
          },
        },
        {
          type: 'text',
          name: 'endTime',
          label: 'Horário de término',
          required: true,
          admin: {
            width: '50%',
            description: 'Exemplo: 13h',
          },
        },
      ],
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'Descrição',
      required: true,
      admin: {
        description: 'Exemplo: Uma manhã para cuidar de você no Boulevard Garibaldi',
      },
    },
    {
      type: 'group',
      name: 'cta',
      label: 'Chamada para ação',
      fields: [
        {
          type: 'text',
          name: 'label',
          label: 'Texto do botão',
          required: true,
          defaultValue: 'Quero me inscrever',
        },
        {
          type: 'text',
          name: 'url',
          label: 'URL do botão',
          required: true,
        },
      ],
    },
  ],
  defaultSort: 'date',
  timestamps: true,
}
