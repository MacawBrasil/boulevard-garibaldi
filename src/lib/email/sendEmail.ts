import nodemailer from 'nodemailer'
import type { Payload } from 'payload'

export type SendEmailInput = {
  to: string
  replyTo?: string
  subject: string
  text: string
  html: string
}

type SendEmailOptions = {
  payload?: Payload
}

export class EmailProviderNotConfiguredError extends Error {
  constructor(message = 'Nenhum provedor de email foi configurado.') {
    super(message)
    this.name = 'EmailProviderNotConfiguredError'
  }
}

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim()

  if (!value) {
    throw new EmailProviderNotConfiguredError(`Variável de ambiente ${name} não foi configurada.`)
  }

  return value
}

function parseOptionalBoolean(value: string | undefined) {
  if (!value) {
    return undefined
  }

  const normalizedValue = value.trim().toLowerCase()

  if (['1', 'true', 'yes', 'sim'].includes(normalizedValue)) {
    return true
  }

  if (['0', 'false', 'no', 'nao', 'não'].includes(normalizedValue)) {
    return false
  }

  throw new EmailProviderNotConfiguredError(`Valor inválido para SMTP_SECURE: use true ou false.`)
}

function getOptionalPort() {
  const value = process.env.SMTP_PORT?.trim()

  if (!value) {
    return undefined
  }

  const port = Number(value)

  if (!Number.isInteger(port) || port <= 0) {
    throw new EmailProviderNotConfiguredError('Variável de ambiente SMTP_PORT inválida.')
  }

  return port
}

async function sendSmtpEmail(input: SendEmailInput) {
  const from = getRequiredEnv('EMAIL_FROM')
  const host = getRequiredEnv('SMTP_HOST')
  const explicitSecure = parseOptionalBoolean(process.env.SMTP_SECURE)
  const port = getOptionalPort() ?? (explicitSecure ? 465 : 587)
  const secure = explicitSecure ?? port === 465
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS?.trim()

  if ((user && !pass) || (!user && pass)) {
    throw new EmailProviderNotConfiguredError(
      'Configure SMTP_USER e SMTP_PASS juntos, ou remova ambos para SMTP sem autenticação.',
    )
  }

  const transporter = nodemailer.createTransport({
    pool:true,
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  })

  const info = await transporter.sendMail({
    to: input.to,
    from,
    replyTo: input.replyTo,
    subject: input.subject,
    text: input.text,
    html: input.html,
  })

  if (process.env.EMAIL_DEBUG === 'true') {
    console.info('SMTP contact email sent', {
      to: input.to,
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    })
  }
}

export async function sendEmail(input: SendEmailInput, options: SendEmailOptions = {}) {
  const provider = (process.env.EMAIL_PROVIDER || 'payload').toLowerCase()

  if (provider === 'payload') {
    if (!options.payload) {
      throw new EmailProviderNotConfiguredError('Payload não foi inicializado para envio de email.')
    }

    await options.payload.sendEmail({
      to: input.to,
      from: process.env.EMAIL_FROM,
      replyTo: input.replyTo,
      subject: input.subject,
      text: input.text,
      html: input.html,
    })

    return
  }

  if (provider === 'resend') {
    throw new EmailProviderNotConfiguredError(
      'Provider Resend selecionado, mas o adapter ainda não foi implementado.',
    )
  }

  if (provider === 'smtp') {
    await sendSmtpEmail(input)
    return
  }

  throw new EmailProviderNotConfiguredError(`Provider de email desconhecido: ${provider}.`)
}
