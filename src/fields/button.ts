import type { Field } from 'payload'

type ButtonFieldsOptions = {
  labelName?: string
  linkName?: string
  label?: string
  linkLabel?: string
  required?: boolean
}

export const buttonFields = ({
  labelName = 'cta',
  linkName = 'ctaLink',
  label = 'Botão',
  linkLabel = 'Link do Botão',
  required = true,
}: ButtonFieldsOptions = {}): Field[] => [
  {
    type: 'text',
    name: labelName,
    label,
    required,
  },
  {
    type: 'text',
    name: linkName,
    label: linkLabel,
    required,
  },
]
