/* eslint-disable react/jsx-no-constructed-context-values */
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form"
import FormFieldContext from "./context/form-field-context"

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => (
  <FormFieldContext.Provider value={{ name: props.name }}>
    <Controller {...props} />
  </FormFieldContext.Provider>
)
