"use client"

import { forwardRef, HTMLAttributes } from "react"
import { useFormField } from "./hooks/use-form-field"
import { cn } from "./utils"

export const FormDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
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
