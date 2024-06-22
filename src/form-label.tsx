"use client"

import React, { forwardRef } from "react"
import { useFormField } from "./hooks/use-form-field"
import { ForwardRefComponent } from "./react-polymorphic"
import { cn } from "./utils"

export interface FormLabelProps
  extends React.ComponentPropsWithoutRef<"label"> {}

export const FormLabel = forwardRef(
  ({ component: Comp = "label", className, ...props }, ref) => {
    const { error, formItemId, name } = useFormField()

    return (
      <Comp
        ref={ref}
        className={cn("field-label", className)}
        data-name={name}
        data-state={error ? "error" : "idle"}
        htmlFor={formItemId}
        {...props}
      />
    )
  }
) as ForwardRefComponent<"label", FormLabelProps>

FormLabel.displayName = "FormLabel"
