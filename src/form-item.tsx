"use client"

import { forwardRef, HTMLAttributes, useId, useMemo } from "react"
import FormItemContext from "./context/form-item-context"
import { ForwardRefComponent } from "./react-polymorphic"
import { cn } from "./utils"

export interface FormItemProps extends HTMLAttributes<HTMLDivElement> {}

export const FormItem = forwardRef(
  ({ component: Comp = "div", className, ...props }, ref) => {
    const id = useId()

    return (
      <FormItemContext.Provider value={useMemo(() => ({ id }), [id])}>
        <Comp ref={ref} className={cn("field-item", className)} {...props} />
      </FormItemContext.Provider>
    )
  }
) as ForwardRefComponent<"div", FormItemProps>

FormItem.displayName = "FormItem"
