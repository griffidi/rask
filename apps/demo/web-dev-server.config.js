import { esbuildPlugin } from '@web/dev-server-esbuild';
import { hmrPlugin } from '@web/dev-server-hmr';
import { fromRollup } from '@web/dev-server-rollup';
// import presetenv from 'postcss-preset-env';
// import postcss from 'rollup-plugin-postcss';
import rollupGraphQl from '@rollup/plugin-graphql';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import { fileURLToPath } from 'url';

const tsPaths = fromRollup(typescriptPaths);
const graphql = fromRollup(rollupGraphQl);

export default /** @type {import("@web/dev-server").DevServerConfig} */ ({
  rootDir: './',
  clearTerminalOnReload: true,
  esbuildTarget: 'esnext',
  appIndex: 'index.html',
  watch: true,
  debug: false,
  nodeResolve: {
    exportConditions: ['browser', 'development'],
    dedupe: ['@material/web', '@lit-labs/context', '@lit-labs/task', '@lit/reactive-element', 'lit'],
  },
  port: 8000,
  http2: true,
  // sslKey: './certs/.self-signed-dev-server-ssl.key',
  // sslCert: './certs/.self-signed-dev-server-ssl.cert',
  mimeTypes: {
    // 'src/**/*.json': 'js',
    'src/**/*.graphql': 'js',
  },
  plugins: [
    // postcss({
    //   onImport: (id) => {
    //     console.log(id);
    //   },
    //   plugins: [
    //     presetenv({
    //       stage: 2,
    //       features: {
    //         'logical-properties-and-values': true,
    //         'nesting-rules': true,
    //       },
    //     }),
    //   ],
    // }),
    tsPaths({
      preserveExtensions: true,
    }),
    graphql({
      include: 'src/graphql/**/*.graphql',
    }),
    esbuildPlugin({
      target: 'esnext',
      tsconfig: fileURLToPath(new URL('./tsconfig.json', import.meta.url)),
      ts: true,
    }),
    hmrPlugin(),
  ],
});
