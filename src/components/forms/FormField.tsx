'use client'

import { ReactNode } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { Input, InputProps } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

interface FormFieldProps extends Omit<InputProps, 'error'> {
  label: string
  error?: string
  required?: boolean
  children?: ReactNode
  registration?: UseFormRegisterReturn
}

export function FormField({
  label,
  error,
  required = false,
  children,
  registration,
  className,
  ...props
}: FormFieldProps) {
  if (children) {
    return (
      <div className="space-y-2">
        <label className={cn('label', required && 'after:content-["*"] after:ml-0.5 after:text-red-500')}>
          {label}
        </label>
        {children}
        {error && <p className="text-sm text-danger-600">{error}</p>}
      </div>
    )
  }

  return (
    <Input
      label={label}
      error={error}
      className={className}
      {...registration}
      {...props}
    />
  )
}
