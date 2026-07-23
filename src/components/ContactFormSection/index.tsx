'use client'

import Image from 'next/image'
import type { HTMLInputTypeAttribute } from 'react'
import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'

import { submitContactForm, type ContactFormState } from '@/app/(frontend)/como-chegar/actions'
import { Button } from '@/components/ui/button'
import { FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type ContactFormSectionProps = {
  title: string
  description: string
  backgroundImageUrl: string | null
  backgroundImageAlt?: string
}

type ContactFieldProps = {
  id: string
  label: string
  type?: HTMLInputTypeAttribute
  name: string
  error?: string
  className?: string
}

const fieldClasses =
  'h-[57px] rounded-[5px] border border-[#d9d9d9] bg-transparent px-5 pt-4 text-[1.25rem] text-white shadow-none placeholder:text-white/50 focus-visible:border-white focus-visible:ring-2 focus-visible:ring-white/20'

const initialState: ContactFormState = {
  status: 'idle',
  message: '',
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length <= 2) {
    return digits
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      variant="outline"
      size="sm"
      disabled={pending}
      className="absolute bottom-4 right-4 h-[26px] cursor-pointer rounded-full border-white bg-transparent px-3 py-1 text-[1rem] font-normal leading-none text-white hover:bg-white hover:text-[#212322] disabled:cursor-default disabled:opacity-60"
    >
      {pending ? 'Enviando' : 'Enviar'}
    </Button>
  )
}

function FloatingField({ id, label, type = 'text', name, error, className }: ContactFieldProps) {
  return (
    <div className={cn('relative', className)}>
      <Label
        htmlFor={id}
        className="absolute -top-1 left-3 z-10 rounded-[3px] bg-[#874230] px-1.5 text-[1.25rem] font-normal leading-none text-white"
      >
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={label}
        aria-invalid={Boolean(error)}
        className={fieldClasses}
      />
      <FieldError className="mt-1 text-white" errors={error ? [{ message: error }] : undefined} />
    </div>
  )
}

function PhoneField({ id, label, name, error, className }: Omit<ContactFieldProps, 'type'>) {
  const [value, setValue] = useState('')

  return (
    <div className={cn('relative', className)}>
      <Label
        htmlFor={id}
        className="absolute -top-1 left-3 z-10 rounded-[3px] bg-[#874230] px-1.5 text-[1.25rem] font-normal leading-none text-white"
      >
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        placeholder={label}
        value={value}
        onChange={(event) => {
          setValue(formatPhone(event.target.value))
        }}
        aria-invalid={Boolean(error)}
        className={fieldClasses}
      />
      <FieldError className="mt-1 text-white" errors={error ? [{ message: error }] : undefined} />
    </div>
  )
}

export function ContactFormSection({
  title,
  description,
  backgroundImageUrl,
  backgroundImageAlt = '',
}: ContactFormSectionProps) {
  const [state, formAction] = useActionState(submitContactForm, initialState)

  useEffect(() => {
    if (state.status === 'idle' || !state.message) {
      return
    }

    if (state.status === 'success') {
      toast.success(state.message)
      return
    }

    toast.error(state.message)
  }, [state.message, state.status])

  return (
    <section className="relative overflow-hidden bg-[#111312] py-14 text-white lg:py-[74px]">
      {backgroundImageUrl ? (
        <Image
          src={backgroundImageUrl}
          alt={backgroundImageAlt}
          fill
          sizes="100vw"
          unoptimized
          className="object-cover"
        />
      ) : null}

      <div className="layout-container relative">
        <h2 className="text-[clamp(2.25rem,4vw,3rem)] font-bold leading-normal tracking-normal">
          {title}
        </h2>
        <p className="mt-1 max-w-[1023px] text-[clamp(1.125rem,2.4vw,1.75rem)] font-normal leading-normal">
          {description}
        </p>

        <form action={formAction} className="mt-10 grid gap-x-[23px] gap-y-4 lg:grid-cols-2">
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
          <div className="grid gap-4">
            <FloatingField
              id="contact-name"
              name="name"
              label="Nome"
              error={state.fieldErrors?.name}
            />
            <FloatingField
              id="contact-email"
              name="email"
              label="E-mail"
              type="email"
              error={state.fieldErrors?.email}
            />
            <PhoneField
              id="contact-phone"
              name="phone"
              label="Telefone"
              error={state.fieldErrors?.phone}
            />
          </div>

          <div className="relative">
            <Label
              htmlFor="contact-message"
              className="absolute -top-1 left-3 z-10 rounded-[3px] bg-[#874230] px-1.5 text-[1.25rem] font-normal leading-none text-white"
            >
              Mensagem
            </Label>
            <Textarea
              id="contact-message"
              name="message"
              placeholder="Mensagem"
              aria-invalid={Boolean(state.fieldErrors?.message)}
              className="min-h-[223px] resize-none rounded-[5px] border border-[#d9d9d9] bg-transparent px-5 pb-14 pt-5 text-[1.25rem] text-white shadow-none placeholder:text-white/50 focus-visible:border-white focus-visible:ring-2 focus-visible:ring-white/20"
            />
            <FieldError
              className="mt-1 text-white"
              errors={
                state.fieldErrors?.message ? [{ message: state.fieldErrors.message }] : undefined
              }
            />
            <SubmitButton />
          </div>

        </form>
      </div>
    </section>
  )
}
