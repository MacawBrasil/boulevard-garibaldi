import type { GlobalConfig } from 'payload'

import { revalidateGlobalPaths } from '@/lib/revalidate'

export const Footer: GlobalConfig = {
  slug: 'footer',
  hooks: {
    afterChange: [revalidateGlobalPaths],
  },
  fields: [
    {
      type: 'group',
      name: 'brand',
      label: 'Identidade',
      fields: [
        {
          type: 'upload',
          name: 'logo',
          label: 'Logo',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Dimensões padrão (237x72)',
          },
        },
        {
          type: 'textarea',
          name: 'address',
          label: 'Endereço',
          required: true,
        },
      ],
    },
    {
      type: 'group',
      name: 'openingHours',
      label: 'Horários',
      fields: [
        {
          type: 'text',
          name: 'title',
          label: 'Título',
          required: true,
        },
        {
          type: 'array',
          name: 'items',
          label: 'Itens',
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
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'contacts',
      label: 'Contatos',
      fields: [
        {
          type: 'text',
          name: 'title',
          label: 'Título',
          required: true,
        },
        {
          type: 'array',
          name: 'items',
          label: 'Itens',
          fields: [
            {
              type: 'text',
              name: 'name',
              label: 'Nome',
              required: true,
            },
            {
              type: 'text',
              name: 'phone',
              label: 'Telefone',
              required: true,
            },
            {
              type: 'email',
              name: 'email',
              label: 'E-mail',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'social',
      label: 'Redes Sociais',
      fields: [
        {
          type: 'text',
          name: 'title',
          label: 'Título',
          required: true,
        },
        {
          type: 'array',
          name: 'links',
          label: 'Links',
          fields: [
            {
              type: 'text',
              name: 'title',
              label: 'Nome',
              required: true,
              admin: {
                description: 'Exemplo: Instagram, Facebook, LinkedIn.',
              },
            },
            {
              type: 'upload',
              name: 'icon',
              label: 'Ícone',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Dimensões recomendadas: 30x30px. Use SVG ou PNG com fundo transparente.',
              },
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
    },
    {
      type: 'group',
      name: 'legalDocuments',
      label: 'Documentos legais',
      fields: [
        {
          type: 'array',
          name: 'items',
          label: 'Arquivos',
          admin: {
            description:
              'Cadastre aqui os arquivos exibidos no rodapé, como política de privacidade, cookies, cordialidade e termos de uso.',
          },
          fields: [
            {
              type: 'text',
              name: 'title',
              label: 'Título',
              required: true,
            },
            {
              type: 'upload',
              name: 'file',
              label: 'Arquivo',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
