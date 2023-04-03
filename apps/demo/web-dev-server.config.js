import { esbuildPlugin } from '@web/dev-server-esbuild';
import { hmrPlugin } from '@web/dev-server-hmr';
import { fileURLToPath } from 'node:url';

export default /** @type {import("@web/dev-server").DevServerConfig} */ ({
  rootDir: './',
  clearTerminalOnReload: true,
  appIndex: 'index.html',
  watch: true,
  debug: false,
  nodeResolve: true,
  port: 8001,
  http2: true,
  // sslKey: fileURLToPath(new URL('./certs/rootCA.key', import.meta.url)),
  // sslCert: fileURLToPath(new URL('./certs/rootCA.pem', import.meta.url)),
  plugins: [
    esbuildPlugin({
      json: true,
      ts: true,
      tsconfig: fileURLToPath(new URL('./tsconfig.json', import.meta.url)),
    }),
    hmrPlugin(),
  ],
});
