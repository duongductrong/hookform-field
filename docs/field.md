# Usage Guide for `createField`

The `createField` function allows you to create a dynamic `Field` component that can render various types of input components with specific props while ensuring type safety and flexibility.

# Define Input Components

Define your input components with their respective props:

```tsx
// Example
import React from "react"

type InputComponentProps = {
  a: string
  value?: unknown
  onChange?: (value: unknown) => void
}
const InputComponent: React.FC<InputComponentProps> = ({ a }) => (
  <input value={a} />
)

type InputNumberComponentProps = {
  b: string
  value?: unknown
  onChange?: (value: unknown) => void
}
const InputNumberComponent: React.FC<InputNumberComponentProps> = ({ b }) => (
  <input value={b} type="number" />
)

type SelectComponentProps = {
  c: string
  value?: unknown
  onChange?: (value: unknown) => void
}
const SelectComponent: React.FC<SelectComponentProps> = ({ c }) => (
  <select>
    <option>{c}</option>
  </select>
)
```

## Usage

Create a map of your components and generate the `Field` component using the `createField` function:

```tsx
const components = {
  text: InputFormFollowControlledInput,
  number: InputFormFollowControlledInput,
  select: InputFormFollowControlledInput,
}

const Field = createField(components)

const App: React.FC = () => (
  <div>
    <Field component="text" name="textField" a="Text Component" />
    <Field component="number" name="numberField" b="Number Component" />
    <Field component="select" name="selectField" c="Select Component" />
  </div>
)

export default App
```
