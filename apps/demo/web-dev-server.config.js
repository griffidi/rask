import { esbuildPlugin } from '@web/dev-server-esbuild';
import { hmrPlugin } from '@web/dev-server-hmr';
import { fromRollup } from '@web/dev-server-rollup';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

const tsPaths = fromRollup(typescriptPaths);

export default /** @type {import("@web/dev-server").DevServerConfig} */ ({
  rootDir: './',
  clearTerminalOnReload: true,
  appIndex: 'index.html',
  watch: true,
  debug: false,
  nodeResolve: {
    exportConditions: ['development'],
    dedupe: [
      '@material/web',
      '@lit-labs/context',
      '@lit-labs/task',
      '@lit/reactive-element',
      'lit',
    ],
  },
  esbuildTarget: 'esnext',
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
      ts: true,
    }),
    hmrPlugin(),
  ],
});
