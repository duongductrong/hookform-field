"use client"

import { HTMLInputTypeAttribute, ReactNode, Suspense, memo } from "react"
import { get } from "react-hook-form"
import { FormControl } from "./form-control"
import { FormDescription } from "./form-description"
import { FormField } from "./form-field"
import { FormItem } from "./form-item"
import { FormLabel } from "./form-label"
import { FormMessage } from "./form-message"
import { cn } from "./utils"

export interface CreateFieldOptions {
  defineClassNames: {
    description?: string
    label?: string
    message?: string
    input?: string
    root?: string
  }
}

type InferComponentProps<T> = T extends React.ComponentType<infer P> ? P : never

export type FieldBaseProps = {
  name: string

  className?: string
  inputClassName?: string
  labelClassName?: string
  messageClassName?: string
  descriptionClassName?: string
  ClassName?: string

  description?: string
  disabled?: boolean
  id?: string
  label?: string
  placeholder?: string
  required?: boolean
  type?: HTMLInputTypeAttribute

  suspenseFallback?: ReactNode
}

export function createField<T extends Record<string, React.ComponentType<any>>>(
  components: T,
  options?: CreateFieldOptions
) {
  type ComponentName = keyof T
  type SyntheticFieldProps = { component: ComponentName } & FieldBaseProps &
    {
      [K in keyof T]: { component: K } & InferComponentProps<T[K]>
    }[ComponentName]

  const Field: React.FC<SyntheticFieldProps> = ({
    name,
    component,
    className,
    inputClassName,
    labelClassName,
    messageClassName,
    descriptionClassName,
    description,
    label,
    suspenseFallback,
    ...baseProps
  }) => {
    const customClassnames = options?.defineClassNames
    const InputComp = components[component]

    return (
      <Suspense fallback={suspenseFallback}>
        <FormField
          name={name}
          render={({ field, formState: { errors } }) => {
            const errorState = get(errors, name)
            return (
              <FormItem className={cn(customClassnames?.root, className)}>
                {label ? (
                  <FormLabel
                    className={cn(customClassnames?.label, labelClassName)}
                  >
                    {label}
                    {/* TODO: Will implement soon. */}
                    {/* {baseProps?.required ? (
                      <AsteriskIcon className="ml-1 h-3 w-3" />
                    ) : null} */}
                  </FormLabel>
                ) : null}
                <FormControl>
                  <InputComp
                    {...field}
                    {...baseProps}
                    className={cn(
                      inputClassName,
                      customClassnames?.input,
                      errorState?.message ? "error" : null
                    )}
                    data-state={errorState ? "error" : "idle"}
                  />
                </FormControl>

                {errorState?.message ? null : description ? (
                  <FormDescription
                    className={cn(
                      customClassnames?.description,
                      descriptionClassName
                    )}
                  />
                ) : null}

                {errorState && errorState.message ? (
                  <FormMessage
                    className={cn(customClassnames?.message, messageClassName)}
                  />
                ) : null}
              </FormItem>
            )
          }}
        />
      </Suspense>
    )
  }

  return memo(Field)
}
