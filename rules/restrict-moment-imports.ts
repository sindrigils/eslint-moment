import { TSESLint, TSESTree } from "@typescript-eslint/experimental-utils";

const rule: TSESLint.RuleModule<"restrictedImport", []> = {
  defaultOptions: [],
  meta: {
    type: "problem",
    docs: {
      description: "Disallow imports from the restricted module 'moment'",
      recommended: false,
    },
    messages: {
      restrictedImport: "Importing from '{{importName}}' is restricted.",
    },
    schema: [],
  },
  create(context) {
    // Helper function to report a restricted import
    function reportIfRestricted(importName: string, node: TSESTree.Node) {
      if (importName === "moment") {
        context.report({
          node,
          messageId: "restrictedImport",
          data: { importName },
        });
      }
    }

    return {
      // Handle ES module imports: import ... from "moment"
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        if (
          node.source &&
          node.source.type === "Literal" &&
          node.source.value === "moment"
        ) {
          reportIfRestricted("moment", node.source);
        }
      },

      // Handle CommonJS require: const x = require("moment")
      CallExpression(node: TSESTree.CallExpression) {
        if (
          node.callee.type === "Identifier" &&
          node.callee.name === "require" &&
          node.arguments.length > 0 &&
          node.arguments[0].type === "Literal" &&
          node.arguments[0].value === "moment"
        ) {
          reportIfRestricted("moment", node.arguments[0]);
        }
      },

      // Handle dynamic imports: import("moment")
      ImportExpression(node: TSESTree.ImportExpression) {
        if (
          node.source &&
          node.source.type === "Literal" &&
          node.source.value === "moment"
        ) {
          reportIfRestricted("moment", node.source);
        }
      },
    };
  },
};

export default rule;
