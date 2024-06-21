"use client"

import {
  ComponentPropsWithoutRef,
  ReactNode,
  RefObject,
  useImperativeHandle,
  useRef,
} from "react"
import {
  FieldValues,
  FormProvider as FormPrimitiveProvider,
  UseFormProps,
  UseFormReturn,
  useForm,
} from "react-hook-form"

export interface FormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
> extends Omit<ComponentPropsWithoutRef<"form">, "onSubmit">,
    UseFormProps<TFieldValues, TContext> {
  ref?: RefObject<HTMLFormElement>
  formRef?: RefObject<UseFormReturn<TFieldValues, TContext, TTransformedValues>>
  children: ReactNode
  onSubmit?: (data: TFieldValues) => void
}

export const Form = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>({
  children,
  mode,
  disabled,
  reValidateMode,
  defaultValues,
  values,
  errors,
  resetOptions,
  context,
  shouldFocusError,
  shouldUnregister,
  shouldUseNativeValidation,
  progressive,
  criteriaMode,
  delayError,
  formRef,
  ref,
  resolver,
  onSubmit,
  ...props
}: FormProps<TFieldValues, TContext, TTransformedValues>) => {
  const methods = useForm<TFieldValues, TContext, TTransformedValues>({
    resolver,
    mode,
    disabled,
    reValidateMode,
    defaultValues,
    values,
    errors,
    resetOptions,
    context,
    shouldFocusError,
    shouldUnregister,
    shouldUseNativeValidation,
    progressive,
    criteriaMode,
    delayError,
  })

  const innerFormElementRef = useRef<HTMLFormElement>(null)

  useImperativeHandle(formRef, () => methods as any, [methods])
  useImperativeHandle(ref, () => innerFormElementRef.current as any, [
    innerFormElementRef.current,
  ])

  return (
    <FormPrimitiveProvider {...methods}>
      <form
        {...props}
        onSubmit={onSubmit ? methods.handleSubmit(onSubmit as any) : undefined}
        ref={innerFormElementRef}
      >
        {children}
      </form>
    </FormPrimitiveProvider>
  )
}

Form.displayName = "Form"
