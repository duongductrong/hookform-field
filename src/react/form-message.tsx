"use client"

import React from "react"
import { cn } from "./tailwind"
import { useFormField } from "./hooks/use-form-field"

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { name, error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("form-message", className)}
      data-error={error ? "error" : "idle"}
      data-name={name}
      {...props}
    >
      {body}
    </p>
  )
})

FormMessage.displayName = "FormMessage"
