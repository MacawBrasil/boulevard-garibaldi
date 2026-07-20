import type { Field } from 'payload'

export const seoField = (): Field => ({
  type: 'group',
  name: 'seo',
  label: 'SEO',
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Título SEO',
      required: true,
      admin: {
        description: 'Título usado em mecanismos de busca e compartilhamentos.',
      },
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'Descrição SEO',
      required: true,
      admin: {
        description: 'Descrição usada em mecanismos de busca e compartilhamentos.',
      },
    },
    {
      type: 'upload',
      name: 'image',
      label: 'Imagem de compartilhamento',
      relationTo: 'media',
    },
    {
      type: 'checkbox',
      name: 'noIndex',
      label: 'Não indexar esta página',
      defaultValue: false,
    },
  ],
})
