"use client"

import { createContext } from "react"

export type FormComponent = {
  [x: string]: unknown
}

export interface FormContext {
  classNames?: {
    description?: string
    label?: string
    message?: string
  }
  components: FormComponent
}

export const Context = createContext<FormContext>({} as FormContext)
