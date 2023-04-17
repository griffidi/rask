const { resolve } = require("node:path");

module.exports = {
  client: {
    includes: [resolve(__dirname, "./src/graphql/**/*.graphql")],
    service: {
      name: "@rask/api",
      localSchemaFile: resolve(__dirname, "../../api/prisma/schema.graphql"),
    },
  },
};
