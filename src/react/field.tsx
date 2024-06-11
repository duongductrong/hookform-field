"use client"

import get from "lodash/get"
import { HTMLInputTypeAttribute, Suspense, forwardRef } from "react"
import AsteriskIcon from "./components/asterisk-icon"
import { FormControl } from "./form-control"
import { FormDescription } from "./form-description"
import { FormField } from "./form-field"
import { FormItem } from "./form-item"
import { FormLabel } from "./form-label"
import { FormMessage } from "./form-message"
import { useCurrentFormContext } from "./hooks/use-context"
import { cn } from "./tailwind"

export interface FormFieldStandardBaseProps {
  className?: string
  component: string
  description?: string
  disabled?: boolean
  id?: string
  label?: string
  name: string
  placeholder?: string

  required?: boolean
  type?: HTMLInputTypeAttribute

  wrapperClassName?: string
}

export const Field = forwardRef<HTMLDivElement, FormFieldStandardBaseProps>(
  (
    {
      name,
      component,
      description,
      label,
      wrapperClassName,
      className,
      ...baseProps
    },
    ref
  ) => {
    const { components, classNames } = useCurrentFormContext()
    const InputComp = components[component] as any

    return (
      <FormField
        name={name}
        render={({ field, formState: { errors } }) => {
          const errorState = get(errors, name)

          return (
            <FormItem className={cn(wrapperClassName)} ref={ref}>
              {label ? (
                <FormLabel className={cn(classNames?.label)}>
                  {label}
                  {baseProps?.required ? (
                    <AsteriskIcon className="ml-1 h-3 w-3" />
                  ) : (
                    ""
                  )}
                </FormLabel>
              ) : null}
              <FormControl>
                <Suspense>
                  <InputComp
                    {...field}
                    {...baseProps}
                    hasError={!!errorState?.message}
                    className={cn(
                      className,
                      errorState?.message ? "!border-destructive" : null
                    )}
                    data-error="true"
                  />
                </Suspense>
              </FormControl>

              {errorState?.message ? null : description ? (
                <FormDescription className={classNames?.description} />
              ) : null}

              {errorState && errorState.message ? (
                <FormMessage className={classNames?.message} />
              ) : null}
            </FormItem>
          )
        }}
      />
    )
  }
)

Field.displayName = "Field"
