"use client"

import { Suspense, forwardRef } from "react"
import { get } from "react-hook-form"
import AsteriskIcon from "./components/asterisk-icon"
import { FormControl } from "./form-control"
import { FormDescription } from "./form-description"
import { FormField } from "./form-field"
import { FormItem } from "./form-item"
import { FormLabel } from "./form-label"
import { FormMessage } from "./form-message"
import { useCurrentFormContext } from "./hooks/use-context"
import { FieldProps, UnionFieldProps } from "./types/field"
import { cn } from "./utils"

export const Field = forwardRef<HTMLDivElement, FieldProps & UnionFieldProps>(
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
    const { components, classNames, forwardPropsFns } = useCurrentFormContext()
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
                  ) : null}
                </FormLabel>
              ) : null}
              <FormControl>
                <Suspense>
                  <InputComp
                    {...field}
                    {...baseProps}
                    {...forwardPropsFns?.input?.({
                      component,
                      name: field.name,
                      value: field.value,
                      disabled: field.disabled,
                      error: errorState,
                    })}
                    className={cn(
                      className,
                      errorState?.message ? "error" : null
                    )}
                    data-state={errorState ? "error" : "idle"}
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
