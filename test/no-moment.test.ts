import { TSESLint } from "@typescript-eslint/experimental-utils";
import rule from "../rules/restrict-moment-imports";

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
});

ruleTester.run("no-moment", rule, {
  valid: [
    // Code that should pass without errors:
    "import dayjs from 'dayjs';",
    "const dayjs = require('dayjs');",
    "import { something } from 'some-other-lib';",
  ],
  invalid: [
    {
      code: "import moment from 'moment';",
      errors: [
        {
          messageId: "restrictedImport",
          data: { importName: "moment" },
        },
      ],
    },
    {
      code: "const moment = require('moment');",
      errors: [
        {
          messageId: "restrictedImport",
          data: { importName: "moment" },
        },
      ],
    },
    {
      code: "import('moment')",
      errors: [
        {
          messageId: "restrictedImport",
          data: { importName: "moment" },
        },
      ],
    },
  ],
});
