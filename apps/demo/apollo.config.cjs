module.exports = {
  client: {
    name: '@rask/demo',
    service: '@rask/api@development',
    includes: ['./src/graphql/**/*.graphql'],
    // excludes: ['**/__tests__/**'],
  },
};
