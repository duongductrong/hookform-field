"use client"

import { createContext } from "react"
import { FieldError } from "react-hook-form"

export interface CustomFormComponent extends Record<string, any> {}

export interface FormContext {
  components: CustomFormComponent

  classNames?: {
    description?: string
    label?: string
    message?: string
    item?: string
  }

  forwardPropsFns?: {
    input?: (args: {
      component: string
      name: string
      value: string
      disabled?: boolean
      error?: FieldError
    }) => Record<any, unknown>
  }
}

export const Context = createContext<FormContext>({} as FormContext)
