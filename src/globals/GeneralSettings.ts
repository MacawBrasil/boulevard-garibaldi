import type { GlobalConfig } from 'payload'

export const GeneralSettings: GlobalConfig = {
  slug: 'general-settings',
  label: 'Configurações Gerais',
  fields: [
    {
      type: 'group',
      name: 'whatsapp',
      label: 'WhatsApp flutuante',
      fields: [
        {
          type: 'checkbox',
          name: 'enabled',
          label: 'Exibir botão flutuante',
          defaultValue: true,
        },
        {
          type: 'text',
          name: 'phone',
          label: 'Número do WhatsApp',
          required: true,
          admin: {
            description: 'Use DDI + DDD + número, somente dígitos. Ex: 5551999999999',
          },
        },
        {
          type: 'textarea',
          name: 'message',
          label: 'Mensagem inicial',
          admin: {
            description: 'Mensagem opcional que será preenchida ao abrir o WhatsApp.',
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
          type: 'email',
          name: 'recipientEmail',
          label: 'E-mail de recebimento',
          required: true,
        },
      ],
    },
  ],
}
