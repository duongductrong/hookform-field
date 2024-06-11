module.exports = {
  extends: ["airbnb", "airbnb-typescript", "airbnb/hooks", "prettier"],
  rules: {
    "class-methods-use-this": "off",
    // "@ts-expect-error": "off",

    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-undef": "off",
    "@typescript-eslint/no-param-reassign": "off",
    "@typescript-eslint/no-underscore-dangle": "off",
    "@typescript-eslint/no-nested-ternary": "off",
    "@typescript-eslint/no-case-declarations": "off",

    "no-undef": "off",
    "no-unused-vars": "off",
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    "no-use-before-define": "off",
    "no-nested-ternary": "off",
    "no-case-declarations": "off",
    "arrow-body-style": "off",

    "jsx-a11y/heading-has-content": "off",
    "jsx-a11y/label-has-associated-control": "off",

    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-unknown-property": "off",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "react/function-component-definition": "off",
    "react/no-unstable-nested-components": "off",

    "react-hooks/exhaustive-deps": "off",

    "import/export": "off",
    "import/no-cycle": "warn",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: [],
}
