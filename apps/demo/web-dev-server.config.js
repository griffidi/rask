import { esbuildPlugin } from '@web/dev-server-esbuild';
import { hmrPlugin } from '@web/dev-server-hmr';
import { fromRollup } from '@web/dev-server-rollup';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import { fileURLToPath } from 'url';

const tsPaths = fromRollup(typescriptPaths);

export default /** @type {import("@web/dev-server").DevServerConfig} */ ({
  rootDir: './',
  clearTerminalOnReload: true,
  esbuildTarget: 'esnext',
  appIndex: 'index.html',
  watch: true,
  debug: false,
  nodeResolve: {
    exportConditions: ['browser', 'development'],
    dedupe: [
      '@material/web',
      '@lit-labs/context',
      '@lit-labs/task',
      '@lit/reactive-element',
      'lit',
    ],
  },
  port: 8001,
  http2: true,
  // sslKey: fileURLToPath(new URL('./certs/rootCA.key', import.meta.url)),
  // sslCert: fileURLToPath(new URL('./certs/rootCA.pem', import.meta.url)),
  plugins: [
    tsPaths({
      preserveExtensions: true,
    }),
    esbuildPlugin({
      target: 'esnext',
      tsconfig: fileURLToPath(new URL('./tsconfig.json', import.meta.url)),
      ts: true,
    }),
    hmrPlugin(),
  ],
});
