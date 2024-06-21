# Hookform Field

![Thumbnail](./docs/thumbnail.png)

## Features
- Type-safe
- Strongly reusable
- Easy to use
- Extends all the awesome features from [react-hook-form](https://react-hook-form.com/).

## Overview

This documentation will guide you through the usage of the custom form components built using [React Hook Form](https://react-hook-form.com/). This package help you manage easily form fields such as text input, number input, file input, and select dropdown, etc.. Below, you will find detailed instructions on how to set up and use these components in your React application.

## Installation

First, install the package via npm/yarn/pnpm:

```bash
# npm
npm install hookform-field react-hook-form

# yarn
yarn install hookform-field react-hook-form

# pnpm
pnpm install hookform-field react-hook-form
```

## Usage

### Step 1: Define Your Custom Fields

You can create custom form fields by using the `createField` function. For example, to create text, number, file, and select fields:

```javascript

// Example: <home>/<your-project>/src/components/form/field.tsx

import React from "react";
import { createField } from "hookform-field";

interface InputProps {}
interface NumberProps {}
interface FileProps {}
interface SelectProps {
  options: any[];
}

const Field = createField({
  text: (props: InputProps) => <input type="text" {...props} />,
  number: (props: NumberProps) => <input type="number" {...props} />,
  file: (props: FileProps) => <input type="file" {...props} />,
  select: (props: SelectProps) => (
    <select {...props}>
      {props.options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ),
});

export default Field;
```

### Step 2: Create Your Form

Next, create a form using the `Form` component and include your custom fields:

```javascript
import React from "react";
import { Form } from "hookform-field";
import Field from "@/components/form/field"; // Import the Field component you created

const MyForm = () => {
  return (
    <Form>
      <Field label="Input" component="text" name="a" />
      <Field component="number" name="b" />
      <Field label="File" component="file" name="c" />
      <Field component="select" name="d" options={[{ value: 'test', label: 'Test' }]} />
    </Form>
  );
};

export default MyForm;
```

The `<Field />` component will be type-safe based on your component values, suggesting the correct props based on the component props.

### Step 3: Render Your Form

Finally, render your form in your application:

```javascript
import React from "react";
import ReactDOM from "react-dom";
import MyForm from "./MyForm"; // Import the MyForm component you created

const App = () => {
  return (
    <div>
      <h1>My Custom Form</h1>
      <MyForm />
    </div>
  );
};
```

## Testing

TBD

## Conclusion

This documentation provides a comprehensive guide to using the custom form components in your React application. By following these steps, you can create and render various form fields and ensure they function correctly through testing.
