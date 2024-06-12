/* eslint-disable react/no-unused-prop-types */

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
import { cn } from "./utils"

// Utility type to infer the props
type InferComponentProps<T> = T extends React.ComponentType<infer P> ? P : never

export type FieldBaseProps = {
  name: string
  className?: string
  description?: string
  disabled?: boolean
  id?: string
  label?: string
  placeholder?: string
  required?: boolean
  type?: HTMLInputTypeAttribute
  classNames?: {
    description?: string
    label?: string
    message?: string
    item?: string
  }
  wrapperClassName?: string
}

// Create the createField function
export function createField<T extends Record<string, React.ComponentType<any>>>(
  components: T
) {
  type ComponentName = keyof T
  type SyntheticProps = { component: ComponentName } & FieldBaseProps &
    {
      [K in keyof T]: { component: K } & InferComponentProps<T[K]>
    }[ComponentName]

  const Field: React.FC<SyntheticProps> = ({
    name,
    classNames,
    component,
    wrapperClassName,
    className,
    description,
    label,
    ...baseProps
  }) => {
    const InputComp = components[component]

    return (
      <FormField
        name={name}
        render={({ field, formState: { errors } }) => {
          const errorState = get(errors, name)

          return (
            <FormItem className={cn(wrapperClassName)}>
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

  return memo(Field)
}
