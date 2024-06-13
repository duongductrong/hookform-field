"use client"

import { ReactNode, useMemo } from "react"
import { Context, FormContext } from "./context/form-context"

export interface FormProviderProps extends FormContext {
  children: ReactNode
}

export const FormProvider = ({ classNames, children }: FormProviderProps) => {
  const values = useMemo<FormContext>(
    () => ({
      classNames,
    }),
    [classNames]
  )
  return <Context.Provider value={values}>{children}</Context.Provider>
}
