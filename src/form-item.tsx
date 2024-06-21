"use client"

import { forwardRef, HTMLAttributes, useId, useMemo } from "react"
import FormItemContext from "./context/form-item-context"
import { cn } from "./utils"

export interface FormItemProps extends HTMLAttributes<HTMLDivElement> {}

export const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, ...props }, ref) => {
    const id = useId()

    return (
      <FormItemContext.Provider value={useMemo(() => ({ id }), [id])}>
        <div ref={ref} className={cn("field-item", className)} {...props} />
      </FormItemContext.Provider>
    )
  }
)

FormItem.displayName = "FormItem"
