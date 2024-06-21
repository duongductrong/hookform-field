import React from "react"
import renderer from "react-test-renderer"
import { expect, it } from "vitest"
import { FormLabel } from "../src/form-label"
import { Form, FormField, createField } from "../src"

interface InputProps {}

interface NumberProps {}

interface FileProps {}

interface SelectProps {
  options: any[]
}

const Field = createField({
  text: (props: InputProps) => <input type="text" />,
  number: (props: NumberProps) => <input type="number" />,
  file: (props: FileProps) => <input type="file" />,
  select: (props: SelectProps) => (
    <select>
      <option value="test">Test</option>
    </select>
  ),
})

const MyForm = () => {
  return (
    <Form>
      <Field label="Input" component="text" name="a" />
      <Field component="number" name="b" />
      <Field label="File" component="file" name="c" />
      <Field component="select" name="d" options={[]} />
    </Form>
  )
}

it("renders correctly", () => {
  const form = renderer.create(<MyForm />)
  const formInstance = form.root

  expect(formInstance).toBeDefined()

  expect(
    formInstance.findByProps({ component: "text", name: "a" })
  ).toBeDefined()

  expect(
    formInstance.findByProps({ component: "number", name: "b" })
  ).toBeDefined()

  expect(
    formInstance.findByProps({ component: "file", name: "c" })
  ).toBeDefined()

  expect(
    formInstance.findByProps({ component: "select", name: "d" })
  ).toBeDefined()

  expect(form.toJSON()).toMatchSnapshot()
})
