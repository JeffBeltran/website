/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: ["unused-imports"],
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node"],
  rules: {
    "unused-imports/no-unused-imports": "error",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
      },
    ],
  },
};
