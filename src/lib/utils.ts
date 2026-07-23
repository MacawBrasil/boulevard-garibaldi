import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizePhoneNumber(phone: string) {
  return phone.replace(/\D/g, '')
}

export function normalizePhoneHref(phone: string) {
  const digits = normalizePhoneNumber(phone)

  return digits ? `tel:${digits}` : ''
}
