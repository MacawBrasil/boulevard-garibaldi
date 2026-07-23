import type { CollectionConfig } from 'payload'

import { revalidateCollectionPaths, revalidateDeletedCollectionPaths } from '@/lib/revalidate'

export const ShopsAndServices: CollectionConfig = {
  slug: 'shops-and-services',
  labels: {
    singular: 'Loja e Serviço',
    plural: 'Lojas e Serviços',
  },
  access: {
    read: () => true,
  },
  orderable:true,
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
      admin: {
        description: 'Dimensões padrão (566x662)',
      },
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
          type: 'text',
          name: 'title',
          label: 'Nome',
          required: true,
          admin: {
            description: 'Exemplo: Instagram, WhatsApp, Facebook.',
          },
        },
        {
          type: 'upload',
          name: 'icon',
          label: 'Ícone',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Dimensões recomendadas: 40x40px. Use SVG ou PNG com fundo transparente.',
          },
        },
        {
          type: 'checkbox',
          name: 'isWhatsappNumber',
          label: 'É número de WhatsApp?',
          defaultValue: false,
          admin: {
            description: 'Marque esta opção quando o campo abaixo for um telefone. O site vai montar o link wa.me automaticamente.',
          },
        },
        {
          type: 'text',
          name: 'url',
          label: 'URL ou número',
          required: true,
          admin: {
            description: 'Para WhatsApp, informe o número com DDD. Exemplo: 54 99999 9999.',
          },
        },
      ],
    },
  ],
  timestamps: true,
}
