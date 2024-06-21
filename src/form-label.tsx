"use client"

import React, { forwardRef } from "react"
import { useFormField } from "./hooks/use-form-field"
import { cn } from "./utils"

export interface FormLabelProps
  extends React.ComponentPropsWithoutRef<"label"> {}

export const FormLabel = forwardRef<React.ElementRef<"label">, FormLabelProps>(
  ({ className, ...props }, ref) => {
    const { error, formItemId, name } = useFormField()

    return (
      <label
        ref={ref}
        className={cn("field-label", className)}
        data-name={name}
        data-state={error ? "error" : "idle"}
        htmlFor={formItemId}
        {...props}
      />
    )
  }
)

FormLabel.displayName = "FormLabel"
