"use client"

import { ComponentProps, ReactNode, forwardRef } from "react"
import {
  FieldValues,
  FormProvider as FormPrimitiveProvider,
  FormProviderProps as FormPrimitiveProviderProps,
} from "react-hook-form"

export interface FormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
> extends ComponentProps<"form"> {
  children: ReactNode
  methods: Omit<
    FormPrimitiveProviderProps<TFieldValues, TContext, TTransformedValues>,
    "children"
  >
}

export const Form = forwardRef<HTMLFormElement, FormProps<any>>(
  ({ children, methods, ...props }, ref) => (
    <FormPrimitiveProvider {...methods}>
      <form {...props} ref={ref}>
        {children}
      </form>
    </FormPrimitiveProvider>
  )
)

Form.displayName = "Form"
