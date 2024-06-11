import { HTMLInputTypeAttribute } from "react"

interface FieldBaseProps {
  component: string
  name: string
  className?: string
  description?: string
  disabled?: boolean
  id?: string
  label?: string
  placeholder?: string

  required?: boolean
  type?: HTMLInputTypeAttribute

  wrapperClassName?: string
}

export type UnionFieldProps = {}

export interface FieldProps extends FieldBaseProps {}
