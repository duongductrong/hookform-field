import renderer from "react-test-renderer"
import { expect, it } from "vitest"
import { Form, createField } from "../src"

interface InputProps {}

interface NumberProps {}

interface FileProps {}

interface SelectProps {
  options: any[]
}

it("renders correctly", () => {
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

it("renders correctly custom components", () => {
  const Field = createField(
    {
      text: (props: InputProps) => <input type="text" />,
      number: (props: NumberProps) => <input type="number" />,
      file: (props: FileProps) => <input type="file" />,
      select: (props: SelectProps) => (
        <select>
          <option value="test">Test</option>
        </select>
      ),
    },
    {
      components: {
        root: "section",
        label: "p",
        description: "small",
        message: "small",
      },
    }
  )

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

  const form = renderer.create(<MyForm />)

  expect(form.toJSON()).toMatchSnapshot()
})
