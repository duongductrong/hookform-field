"use client"

import { HTMLInputTypeAttribute, Suspense, memo } from "react"
import { get } from "react-hook-form"
import AsteriskIcon from "./components/asterisk-icon"
import { FormControl } from "./form-control"
import { FormDescription } from "./form-description"
import { FormField } from "./form-field"
import { FormItem } from "./form-item"
import { FormLabel } from "./form-label"
import { FormMessage } from "./form-message"
import { useCurrentFormContext } from "./hooks/use-context"
import { cn } from "./utils"

type InferComponentProps<T> = T extends React.ComponentType<infer P> ? P : never

export type FieldBaseProps = {
  name: string

  className?: string
  inputClassName?: string
  labelClassName?: string
  messageClassName?: string
  descriptionClassName?: string

  description?: string
  disabled?: boolean
  id?: string
  label?: string
  placeholder?: string
  required?: boolean
  type?: HTMLInputTypeAttribute
}

export function createField<T extends Record<string, React.ComponentType<any>>>(
  components: T
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
    ...baseProps
  }) => {
    const { classNames: customClassnames } = useCurrentFormContext()
    const InputComp = components[component]

    return (
      <Suspense>
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
                    {baseProps?.required ? (
                      <AsteriskIcon className="ml-1 h-3 w-3" />
                    ) : null}
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
