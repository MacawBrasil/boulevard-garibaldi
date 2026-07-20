'use server'

import { getPayload } from 'payload'

import { EmailProviderNotConfiguredError, sendEmail } from '@/lib/email/sendEmail'
import configPromise from '@payload-config'

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
  fieldErrors?: {
    name?: string
    email?: string
    phone?: string
    message?: string
  }
}

const initialFieldErrors: ContactFormState['fieldErrors'] = {}

function getString(formData: FormData, key: string) {
  const value = formData.get(key)

  return typeof value === 'string' ? value.trim() : ''
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const honeypot = getString(formData, 'company')

  if (honeypot) {
    return {
      status: 'success',
      message: 'Mensagem enviada com sucesso.',
    }
  }

  const name = getString(formData, 'name')
  const email = getString(formData, 'email')
  const phone = getString(formData, 'phone')
  const message = getString(formData, 'message')
  const fieldErrors = { ...initialFieldErrors }

  if (!name) {
    fieldErrors.name = 'Informe seu nome.'
  }

  if (!email) {
    fieldErrors.email = 'Informe seu e-mail.'
  } else if (!isValidEmail(email)) {
    fieldErrors.email = 'Informe um e-mail válido.'
  }

  if (!phone) {
    fieldErrors.phone = 'Informe seu telefone.'
  }

  if (!message) {
    fieldErrors.message = 'Escreva sua mensagem.'
  }

  if (Object.keys(fieldErrors).length) {
    return {
      status: 'error',
      message: 'Revise os campos destacados.',
      fieldErrors,
    }
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const generalSettings = await payload.findGlobal({ slug: 'general-settings', depth: 0 })
    const recipientEmail = generalSettings.contactForm.recipientEmail
    const subject = `Contato pelo site - ${name}`
    const text = [
      `Nome: ${name}`,
      `E-mail: ${email}`,
      `Telefone: ${phone}`,
      '',
      'Mensagem:',
      message,
    ].join('\n')
    const html = `
      <h2>Contato pelo site</h2>
      <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telefone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${escapeHtml(message).replaceAll('\n', '<br />')}</p>
    `

    if (process.env.EMAIL_DEBUG === 'true') {
      console.info('Contact form email sending', {
        provider: process.env.EMAIL_PROVIDER || 'payload',
        to: recipientEmail,
        fromConfigured: Boolean(process.env.EMAIL_FROM),
        smtpHostConfigured: Boolean(process.env.SMTP_HOST),
      })
    }

    await sendEmail(
      {
        to: recipientEmail,
        replyTo: email,
        subject,
        text,
        html,
      },
      { payload },
    )

    return {
      status: 'success',
      message: 'Mensagem enviada com sucesso.',
    }
  } catch (error) {
    if (error instanceof EmailProviderNotConfiguredError) {
      return {
        status: 'error',
        message: error.message,
      }
    }

    console.error('Erro ao enviar formulário de contato', error)

    return {
      status: 'error',
      message: 'Não foi possível enviar a mensagem agora. Tente novamente em alguns minutos.',
    }
  }
}
