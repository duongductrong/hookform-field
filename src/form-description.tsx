"use client"

import { forwardRef, HTMLAttributes } from "react"
import { useFormField } from "./hooks/use-form-field"
import { ForwardRefComponent } from "./react-polymorphic"
import { cn } from "./utils"

export interface FormDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

export const FormDescription = forwardRef(
  ({ component: Comp = "p", className, ...props }, ref) => {
    const { formDescriptionId } = useFormField()

    return (
      <Comp
        ref={ref}
        id={formDescriptionId}
        className={cn("field-description", className)}
        {...props}
      />
    )
  }
) as ForwardRefComponent<"p", FormDescriptionProps>

FormDescription.displayName = "FormDescription"
