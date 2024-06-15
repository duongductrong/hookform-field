import { useEffect, useRef, useState } from "react"
import { FieldValues, UseFormReturn } from "react-hook-form"

export const useFormRef = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>() => {
  const [form, setForm] = useState<UseFormReturn<
    TFieldValues,
    TContext,
    TTransformedValues
  > | null>(null)

  const ref =
    useRef<UseFormReturn<TFieldValues, TContext, TTransformedValues>>(null)

  useEffect(() => {
    if (ref.current) {
      setForm(ref.current)
    }

    return () => {
      setForm(null)
    }
  }, [ref.current])

  return [ref, form] as const
}
