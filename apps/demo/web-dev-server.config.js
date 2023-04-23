import rollupGraphQl from '@rollup/plugin-graphql';
import { esbuildPlugin } from '@web/dev-server-esbuild';
// import { hmrPlugin } from '@web/dev-server-hmr';
import { fromRollup } from '@web/dev-server-rollup';
// import presetenv from 'postcss-preset-env';
// import postcssPlugin from 'rollup-plugin-postcss';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import { fileURLToPath } from 'url';

// const postcss = fromRollup(postcssPlugin);
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
  sslKey: './certs/.rask-self-signed-ssl.key',
  sslCert: './certs/.rask-self-signed-ssl.cert',
  mimeTypes: {
    'src/**/*.graphql': 'js',
    '*.html': 'html',
  },
  plugins: [
    // postcss({
    //   inject: false,
    //   extract: true,
    //   minimize: false,
    //   plugins: [
    //     presetenv({
    //       stage: 0,
    //       browsers: ['last 1 versions'],
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
    // hmrPlugin(),
  ],
});
