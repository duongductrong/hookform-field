"use client"

/* eslint-disable react/jsx-no-constructed-context-values */
import { forwardRef, HTMLAttributes, useId } from "react"
import { cn } from "./tailwind"
import FormItemContext from "./context/form-item-context"

export const FormItem = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-[10px]", className)} {...props} />
    </FormItemContext.Provider>
  )
})

FormItem.displayName = "FormItem"
