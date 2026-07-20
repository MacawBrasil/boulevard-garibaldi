import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
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
    },
    {
      type: 'array',
      name: 'legalLinks',
      label: 'Links legais',
      fields: [
        {
          type: 'text',
          name: 'label',
          label: 'Texto',
          required: true,
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
}
