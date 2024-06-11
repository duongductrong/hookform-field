"use client"

import React, { forwardRef } from "react"
import { useFormField } from "./hooks/use-form-field"
import { cn } from "./utils"

export const FormLabel = forwardRef<
  React.ElementRef<"label">,
  React.ComponentPropsWithoutRef<"label">
>(({ className, ...props }, ref) => {
  const { error, formItemId, name } = useFormField()

  return (
    <label
      ref={ref}
      className={cn("form-label", className)}
      data-name={name}
      data-state={error ? "error" : "idle"}
      htmlFor={formItemId}
      {...props}
    />
  )
})

FormLabel.displayName = "FormLabel"
