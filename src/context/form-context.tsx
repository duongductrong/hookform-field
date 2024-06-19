"use client"

import { createContext } from "react"

export interface FormContext {
  classNames?: {
    description?: string
    label?: string
    message?: string
    input?: string
    root?: string
  }

  // forwardPropsFns?: {
  //   input?: (args: {
  //     component: string
  //     name: string
  //     value: string
  //     disabled?: boolean
  //     error?: FieldError
  //   }) => Record<any, unknown>
  // }
}

export const Context = createContext<FormContext>({} as FormContext)
