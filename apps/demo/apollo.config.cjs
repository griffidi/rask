module.exports = {
  // client: {
  //   name: '@rask/demo',
  //   service: '@rask/api@development',
  //   includes: ['./src/graphql/**/*.graphql'],
  //   // excludes: ['**/__tests__/**'],
  // },
  client: {
    service: {
      name: '@rask/api',
      includes: ['./src/graphql/**/*.graphql', '../../api/src/graphql/**/*.graphql'],
      url: 'http://localhost:8008/graphql',
      // url: 'c:/repos/rask/api/src/graphql/schema.graphql',
      skipSSLValidation: true,
    },
  },
};
