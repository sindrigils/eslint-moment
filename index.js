module.exports = {
  rules: {
    "restrict-moment-imports": require("./rules/restrict-moment-imports"),
  },
  configs: {
    recommended: {
      plugins: ["@sindrigils/moment"],
      rules: {
        "@sindrigils/moment/restrict-moment-imports": "error",
      },
    },
  },
};
