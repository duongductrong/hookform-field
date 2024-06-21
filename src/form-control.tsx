"use client"

import { Slot } from "@radix-ui/react-slot"
import React, { forwardRef } from "react"
import { useFormField } from "./hooks/use-form-field"

export interface FormControlProps
  extends React.ComponentPropsWithoutRef<typeof Slot> {}

export const FormControl = forwardRef<
  React.ElementRef<typeof Slot>,
  FormControlProps
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})

FormControl.displayName = "FormControl"
