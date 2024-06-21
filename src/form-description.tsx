"use client"

import { forwardRef, HTMLAttributes } from "react"
import { useFormField } from "./hooks/use-form-field"
import { cn } from "./utils"

export interface FormDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

export const FormDescription = forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("field-description", className)}
      {...props}
    />
  )
})

FormDescription.displayName = "FormDescription"
