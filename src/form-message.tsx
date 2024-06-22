"use client"

import React from "react"
import { useFormField } from "./hooks/use-form-field"
import { ForwardRefComponent } from "./react-polymorphic"
import { cn } from "./utils"

export interface FormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormMessage = React.forwardRef(
  ({ component: Comp = "p", className, children, ...props }, ref) => {
    const { name, error, formMessageId } = useFormField()
    const body = error ? String(error?.message) : children

    if (!body) {
      return null
    }

    return (
      <Comp
        ref={ref}
        id={formMessageId}
        className={cn("field-message", className)}
        data-state={error ? "error" : "idle"}
        data-name={name}
        {...props}
      >
        {body}
      </Comp>
    )
  }
) as ForwardRefComponent<"p", FormMessageProps>

FormMessage.displayName = "FormMessage"
