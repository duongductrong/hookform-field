"use client"

import { forwardRef, HTMLAttributes, useId, useMemo } from "react"
import FormItemContext from "./context/form-item-context"
import { useCurrentFormContext } from "./hooks/use-context"
import { cn } from "./utils"

export const FormItem = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { classNames } = useCurrentFormContext()
  const id = useId()

  return (
    <FormItemContext.Provider value={useMemo(() => ({ id }), [id])}>
      <div
        ref={ref}
        className={cn("form-item", classNames?.item, className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
})

FormItem.displayName = "FormItem"
